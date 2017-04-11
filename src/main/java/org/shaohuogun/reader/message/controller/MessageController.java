package org.shaohuogun.reader.message.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.service.MessageService;

@RestController
public class MessageController extends Controller {

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/pageview", method = RequestMethod.POST)
	public void pageview(HttpServletRequest req) {
		int length = req.getContentLength();
		System.out.println(length);
	}
	
	@RequestMapping(value = "/wxmsglist", method = RequestMethod.POST)
	public void processWxMsgList(HttpServletRequest req) throws Exception {
		String wxHisAddr = StringEscapeUtils.unescapeHtml4(req.getParameter("hisaddr"));
		String wxMsgList = StringEscapeUtils.unescapeHtml4(req.getParameter("msglist"));
		System.out.println(wxHisAddr);
		
		JSONObject jsonMsgList = new JSONObject(wxMsgList);
		JSONArray jsonMsgArray = jsonMsgList.getJSONArray("list");
		for (int i = 0; i < jsonMsgArray.length(); i++) {
			JSONObject jsonMsg = jsonMsgArray.getJSONObject(i);
			JSONObject jsonMsgInfo = jsonMsg.getJSONObject("comm_msg_info");
			int type = jsonMsgInfo.getInt("type");
			long datetime = jsonMsgInfo.getLong("datetime");
			Date releaseDate = new Date(datetime * 1000);
			if (type == 49) {
				JSONObject jsonMsgExtInfo = jsonMsg.getJSONObject("app_msg_ext_info");
				String title = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("title"));
				String author = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("author"));
				String digest = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("digest")).replace("\\n", "n");
				String contentUrl = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("content_url")).replace("\\/", "/");
				// String sourceUrl = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("source_url")).replace("\\/", "/");
				// String coverUrl = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("cover")).replace("\\/", "/");
				
				Message message = new Message();
				message.setId(Utility.getUUID());
				message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
				message.setChannelId("WX-"+ author);
				message.setUrl(contentUrl);
				message.setTitle(title);
				message.setReleaseDate(releaseDate);
				message.setPageview(0);
				message.setCommentCount(0);
				message.setDigest(digest);
				
				messageService.createMessage(message);
			} else if (type == 1) {
				String original = jsonMsgInfo.getString("content");
				SimpleDateFormat releaseDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				Content content = new Content();
				content.setId(Utility.getUUID());
				content.setCreator("WX-张兰");
				content.setMessageId(releaseDateFormat.format(releaseDate));
				content.setOriginal(original);
				messageService.createContent(content);				
			}
		}
	}

	@RequestMapping(value = "/channel/{id}/message", method = RequestMethod.GET)
	public Pagination getMessagesInChannel(@PathVariable String id,
			@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		int total = messageService.getMessageCountInChannel(id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return messageService.getMessagesInChannel(id, pagination);
	}

	@RequestMapping(value = "/message/{id}", method = RequestMethod.GET)
	public Message getMessage(@PathVariable String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}
		
		return messageService.getMessage(id);
	}

	@RequestMapping(value = "/message/{id}/content", method = RequestMethod.GET)
	public Content getContentByMessageId(@PathVariable String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}
		
		return messageService.getContentByMessageId(id);
	}

}