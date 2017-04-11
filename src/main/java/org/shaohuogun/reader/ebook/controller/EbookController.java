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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.service.MessageService;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;

@RestController
public class EbookController extends Controller {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/ebook", method = RequestMethod.GET)
	public void createChannel(HttpServletRequest req, @RequestParam(required = true) String channelId) throws Exception {
		String str = "";
		try {
			String tempStr = "";
			
	        ClassLoader classLoader = getClass().getClassLoader();
	        URL url = classLoader.getResource("template/template.html");
			FileInputStream is = new FileInputStream(url.getFile());
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			while ((tempStr = br.readLine()) != null) {
				str = str + tempStr;
			}

			is.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		
		Channel channel = channelService.getChannel(channelId);

//		String channelId = "WX-张兰";
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

				String ebook = new String(str);
				ebook = ebook.replace("###TITLE###", title);
				ebook = ebook.replace("###RELEASE-DATE###", Utility.formatDate(releaseDate));				
				String original = content.getOriginal();
				original = original.replace("<br>", "");
				original = original.replaceAll("<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>", "");
				ebook = ebook.replace("###CONTENT###", original);
				sb.append(ebook);
			}
		}
		
		FileWriter fw = new FileWriter(
				"/Users/iSnailing/Downloads/TempDir/ebook/" + channel.getName() + ".html");
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(sb.toString());
		bw.flush();
		bw.close();
	}

}
