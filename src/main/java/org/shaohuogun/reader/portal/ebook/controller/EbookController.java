package org.shaohuogun.reader.portal.ebook.controller;

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
import org.shaohuogun.reader.portal.PortalConstants;
import org.shaohuogun.reader.portal.catalog.model.Catalog;
import org.shaohuogun.reader.portal.catalog.service.CatalogService;
import org.shaohuogun.reader.portal.channel.model.Channel;
import org.shaohuogun.reader.portal.channel.service.ChannelService;
import org.shaohuogun.reader.portal.ebook.model.Ebook;
import org.shaohuogun.reader.portal.ebook.service.EbookService;
import org.shaohuogun.reader.portal.ebook.service.MobiGenerator;
import org.shaohuogun.reader.portal.message.model.Message;
import org.shaohuogun.reader.portal.message.service.MessageService;
import org.shaohuogun.reader.portal.progress.model.Progress;
import org.shaohuogun.reader.portal.progress.service.ProgressService;
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
	private CatalogService catalogService;

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@Autowired
	private MobiGenerator mobiGenerator;

	@Autowired
	private EbookService ebookService;

	@Autowired
	private ProgressService progressService;

	@RequestMapping(value = "/api/ebook/generate", method = RequestMethod.GET)
	public Ebook generateEbook(@RequestParam(required = true) String categoryType,
			@RequestParam(required = true) String categoryId) throws Exception {
		String creator = null;
		String categoryName = null;
		if (PortalConstants.CATEGORY_TYPE_CATALOG.equalsIgnoreCase(categoryType)) {
			Catalog catalog = catalogService.getCatalog(categoryId);
			creator = catalog.getCreator();
			categoryName = catalog.getName();
		} else if (PortalConstants.CATEGORY_TYPE_CHANNEL.equalsIgnoreCase(categoryType)) {
			Channel channel = channelService.getChannel(categoryId);
			creator = channel.getCreator();
			categoryName = channel.getName();
		}
		
		int total = messageService.countMessageInCategory(categoryType, categoryId);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageSize(total);
		pagination.setPageIndex(1);
		pagination = messageService.getMessagesInCategory(categoryType, categoryId, pagination);
		List<Model> models = pagination.getObjects();
		List<Message> messages = new ArrayList<Message>();
		for (int i = 0; i < models.size(); i++) {
			messages.add((Message) models.get(i));
		}

		Progress progress = new Progress();
		progress.setId("G-" + categoryId);
		progress.setAmount(messages.size());
		progressService.addProgress(progress);

		Ebook ebook = mobiGenerator.generate(creator, categoryId, categoryName, messages);
		logger.info(ebook.getPath());
		progressService.incProgressCount(("G-" + categoryId), messages.size());
		return ebookService.createEbook(ebook);
	}

	@RequestMapping(value = "/api/ebook/{id}/download", method = RequestMethod.GET)
	public void downloadEbook(@PathVariable String id, HttpServletResponse resp) throws Exception {
		Ebook ebook = ebookService.getEbook(id);
		String ebookPath = String.format("%s/%s/%s", mobiGenerator.getOutputDir(), ebook.getPath(), ebook.getName());

		File ebookFile = new File(ebookPath);
		resp.reset();
		resp.setHeader("Content-Disposition",
				"attachment;filename=\"" + URLEncoder.encode(ebook.getName(), "UTF-8") + "\"");
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
		int total = ebookService.countEbookInCategory(PortalConstants.CATEGORY_TYPE_CHANNEL, id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return ebookService.getEbooksInCategory(PortalConstants.CATEGORY_TYPE_CHANNEL, id, pagination);
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
