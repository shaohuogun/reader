package org.shaohuogun.reader.ebook.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.message.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EbookController extends Controller {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Value("${ebook.kindlegen.dir}")
	private String kindlegenDir;
	
	@Value("${ebook.mobi.template.dir}")
	private String mobiTemplateDir;

	@Value("${ebook.mobi.output.dir}")
	private String mobiOutputDir;

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/api/ebook/generate", method = RequestMethod.GET)
	public void generateEbook(@RequestParam(required = true) String targetType,
			@RequestParam(required = true) String targetId) throws Exception {		
		MobiGenerator mobiGenerator = new MobiGenerator(kindlegenDir, mobiTemplateDir, mobiOutputDir);
		Channel channel = channelService.getChannel(targetId);
		int total = messageService.getMessageCountInChannel(targetId);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageSize(total);
		pagination.setPageIndex(1);
		pagination = messageService.getMessagesInChannel(targetId, pagination);
		List<Model> messages = pagination.getObjects();
		logger.info(mobiGenerator.generate(channel, messages));
	}
	
	@RequestMapping(value = "/api/ebook/download", method = RequestMethod.GET)
	public void downloadEbook(@RequestParam(required = true) String targetType,
			@RequestParam(required = true) String targetId, HttpServletResponse resp) throws Exception {
		Channel channel = channelService.getChannel(targetId);
		String mobiFileName = channel.getName() + ".mobi";
		String mobiFilePath = String.format("%s/%s", this.mobiOutputDir, mobiFileName);

		File ebook = new File(mobiFilePath);
		resp.reset();
		resp.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(mobiFileName, "UTF-8") + "\"");
		resp.addHeader("Content-Length", String.valueOf(ebook.length()));
		resp.setContentType("application/octet-stream;charset=UTF-8");

		InputStream inputStream = new BufferedInputStream(new FileInputStream(ebook));
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

}
