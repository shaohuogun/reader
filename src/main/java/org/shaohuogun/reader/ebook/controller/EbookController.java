package org.shaohuogun.reader.ebook.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.model.Message;
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

	@Value("${ebook.output.directory}")
	private String outputDirectory;

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/api/ebook/generate", method = RequestMethod.GET)
	public void generateEbook(@RequestParam(required = true) String targetType,
			@RequestParam(required = true) String targetId) throws Exception {
		if ((targetId == null) || targetId.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		ClassLoader classLoader = getClass().getClassLoader();
		String innerString = "";
		try {
			String tempString = "";
			URL url = classLoader.getResource("template/ebook-message.html");
			FileInputStream is = new FileInputStream(url.getFile());
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempString = br.readLine()) != null) {
				innerString = innerString + tempString;
			}
			is.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}

		String outerString = "";
		try {
			String tempString = "";
			URL url = classLoader.getResource("template/ebook-channel.html");
			FileInputStream is = new FileInputStream(url.getFile());
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempString = br.readLine()) != null) {
				outerString = outerString + tempString;
			}
			is.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}

		int total = messageService.getMessageCountInChannel(targetId);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageSize(total);
		pagination.setPageIndex(1);
		pagination = messageService.getMessagesInChannel(targetId, pagination);
		List<Model> messages = pagination.getObjects();
		StringBuffer contentSb = new StringBuffer();
		for (Model curMessage : messages) {
			if (curMessage instanceof Message) {
				String title = ((Message) curMessage).getTitle();
				Date releaseDate = ((Message) curMessage).getReleaseDate();
				Content content = messageService.getContentByMessageId(curMessage.getId());

				String chapter = new String(innerString);
				chapter = chapter.replace("###TITLE###", title);
				chapter = chapter.replace("###RELEASE-DATE###", Utility.formatDate(releaseDate));
				String original = content.getOriginal();
				original = original.replace("<br>", "");
				original = original.replaceAll("<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>", "");
				chapter = chapter.replace("###CONTENT###", original);
				contentSb.append(chapter);
			}
		}

		Channel channel = channelService.getChannel(targetId);
		outerString = outerString.replace("###TITLE###", channel.getName());
		outerString = outerString.replace("###BODY###", contentSb.toString());
		String ebookName = channel.getName() + ".html";
		String ebookPath = outputDirectory + "/" + ebookName;
		FileWriter fw = new FileWriter(ebookPath);
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(outerString);
		bw.flush();
		bw.close();
	}

	@RequestMapping(value = "/api/ebook/download", method = RequestMethod.GET)
	public void downloadEbook(@RequestParam(required = true) String targetType,
			@RequestParam(required = true) String targetId, HttpServletResponse resp) throws Exception {
		if ((targetId == null) || targetId.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		Channel channel = channelService.getChannel(targetId);
		String ebookName = channel.getName() + ".html";
		String ebookPath = outputDirectory + "/" + ebookName;

		File ebook = new File(ebookPath);

		resp.reset();
		resp.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(ebookName, "UTF-8") + "\"");
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
