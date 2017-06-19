package org.shaohuogun.reader.ebook.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.ebook.model.Ebook;
import org.shaohuogun.reader.ebook.service.EbookService;
import org.shaohuogun.reader.ebook.service.MobiGenerator;
import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EbookController extends Controller {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private MobiGenerator mobiGenerator;
	
	@Autowired
	private EbookService ebookService;

	@RequestMapping(value = "/api/ebook/generate", method = RequestMethod.GET)
	public Ebook generateEbook(@RequestParam(required = true) String targetType,
			@RequestParam(required = true) String targetId) throws Exception {
		Channel channel = channelService.getChannel(targetId);
		int total = messageService.getMessageCountInChannel(targetId);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageSize(total);
		pagination.setPageIndex(1);
		pagination = messageService.getMessagesInChannel(targetId, pagination);
		List<Model> models = pagination.getObjects();
		List<Message> messages = new ArrayList<Message>();
		for (int i = 0; i < models.size(); i++) {
			messages.add((Message) models.get(i));
		}
		
		Ebook ebook = mobiGenerator.generate(channel, messages);
		logger.info(ebook.getPath());
		return ebookService.createEbook(ebook);
	}
	
	@RequestMapping(value = "/api/ebook/{id}/download", method = RequestMethod.GET)
	public void downloadEbook(@PathVariable String id, HttpServletResponse resp) throws Exception {
		Ebook ebook = ebookService.getEbook(id);
		String ebookPath = String.format("%s/%s/%s", mobiGenerator.getOutputDir(), ebook.getPath(), ebook.getName());

		File ebookFile = new File(ebookPath);
		resp.reset();
		resp.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(ebook.getName(), "UTF-8") + "\"");
		resp.addHeader("Content-Length", String.valueOf(ebookFile.length()));
		resp.setContentType("application/octet-stream;charset=UTF-8");

		InputStream inputStream = new BufferedInputStream(new FileInputStream(ebookFile));
		OutputStream outputStream = new BufferedOutputStream(resp.getOutputStream());
		byte[] buffer = new byte[1024];
		int readBytes;
		while (-1 != (readBytes = inputStream.read(buffer, 0, buffer.length))) {
			outputStream.write(buffer, 0, readBytes);
		}
		outputStream.flush();
		outputStream.close();
		inputStream.close();
	}
	
	@RequestMapping(value = "/api/channel/{id}/ebooks", method = RequestMethod.GET)
	public Pagination getEbooksInChannel(@PathVariable String id,
			@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		int total = ebookService.getEbookCountInChannel(id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return ebookService.getEbooksInChannel(id, pagination);
	}
	
	@RequestMapping(value = "/api/myebooks", method = RequestMethod.GET)
	public Pagination getMyEbooks(@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = ebookService.getEbookCountOfCreator(creator);
		Pagination pagination = new Pagination();
		pagination.setPageSize(16);
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return ebookService.getEbooksOfCreator(creator, pagination);
	}	
	
	@RequestMapping(value = "/api/ebook/{id}/post", method = RequestMethod.GET)
	public Ebook postEbook(@PathVariable String id) throws Exception {
		Ebook ebook = ebookService.getEbook(id);

		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource("mail.properties");

		FileInputStream fis = new FileInputStream(url.getFile());
		Properties props = new Properties();
		props.load(fis);
		fis.close();

		Postman.send(props, mobiGenerator.getOutputDir(), ebook);
		return ebook;
	}

}
