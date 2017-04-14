package org.shaohuogun.reader.ebook.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EbookController extends Controller {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/api/ebook", method = RequestMethod.GET)
	public void createChannel(HttpServletRequest req, @RequestParam(required = true) String channelId,
			@RequestParam(required = true) String book) throws Exception {
		ClassLoader classLoader = getClass().getClassLoader();

		String innerString = "";
		try {
			String tempStr1 = "";
			URL url = classLoader.getResource("template/ebook-message.html");
			FileInputStream is = new FileInputStream(url.getFile());
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempStr1 = br.readLine()) != null) {
				innerString = innerString + tempStr1;
			}
			is.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}

		String outerString = "";
		try {
			String tempStr2 = "";
			URL url = classLoader.getResource("template/ebook-channel.html");
			FileInputStream is = new FileInputStream(url.getFile());
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempStr2 = br.readLine()) != null) {
				outerString = outerString + tempStr2;
			}
			is.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}

		int total = messageService.getMessageCountInChannel(channelId);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageSize(total);
		pagination.setPageIndex(1);

		pagination = messageService.getMessagesInChannel(channelId, pagination);
		List<Model> messages = pagination.getObjects();
		StringBuffer sb = new StringBuffer();
		for (Model curMessage : messages) {
			if (curMessage instanceof Message) {
				String title = ((Message) curMessage).getTitle();
				Date releaseDate = ((Message) curMessage).getReleaseDate();
				Content content = messageService.getContentByMessageId(curMessage.getId());

				String ebook = new String(innerString);
				ebook = ebook.replace("###TITLE###", title);
				ebook = ebook.replace("###RELEASE-DATE###", Utility.formatDate(releaseDate));
				String original = content.getOriginal();
				original = original.replace("<br>", "");
				original = original.replaceAll("<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>", "");
				ebook = ebook.replace("###CONTENT###", original);
				sb.append(ebook);
			}
		}
		
		outerString = outerString.replace("###TITLE###", book);
		outerString = outerString.replace("###BODY###", sb.toString());
		FileWriter fw = new FileWriter("/Users/iSnailing/Downloads/TempDir/ebook/" + book + ".html");
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(outerString);
		bw.flush();
		bw.close();
	}

}
