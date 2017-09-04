package org.shaohuogun.reader.portal.message.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.PortalConstants;
import org.shaohuogun.reader.portal.catalog.model.Catalog;
import org.shaohuogun.reader.portal.catalog.service.CatalogService;
import org.shaohuogun.reader.portal.channel.model.Channel;
import org.shaohuogun.reader.portal.channel.service.ChannelService;
import org.shaohuogun.reader.portal.message.model.Message;
import org.shaohuogun.reader.portal.message.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController extends Controller {
	
	@Autowired
	private CatalogService catalogService;

	@Autowired
	private ChannelService channelService;

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
				String contentUrl = StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("content_url"))
						.replace("\\/", "/");
				// String sourceUrl =
				// StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("source_url")).replace("\\/",
				// "/");
				// String coverUrl =
				// StringEscapeUtils.unescapeHtml4(jsonMsgExtInfo.getString("cover")).replace("\\/",
				// "/");

				Message message = new Message();
				message.setId(Utility.getUUID());
				message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
				message.setCategoryId("WX-" + author);
				message.setUrl(contentUrl);
				message.setTitle(title);
				message.setReleaseDate(releaseDate);
				message.setPageview(0);
				message.setCommentCount(0);
				message.setDigest(digest);

				messageService.createMessage(message);
			} else if (type == 1) {
				String content = jsonMsgInfo.getString("content");

				Message message = new Message();
				message.setId(Utility.getUUID());
				message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
				message.setCategoryId("WX-张兰");
				message.setUrl("");
				message.setTitle("hello world!");
				message.setReleaseDate(releaseDate);
				message.setPageview(0);
				message.setCommentCount(0);
				message.setDigest("");
				message.setContent(content);
				messageService.createMessage(message);
			}
		}
	}

	@RequestMapping(value = "/api/message", method = RequestMethod.POST)
	public Message createMessage(
			@RequestParam(defaultValue = PortalConstants.CATEGORY_TYPE_CHANNEL, required = false) String categoryType,
			@RequestBody @Validated Message message) throws Exception {
		message.setId(Utility.getUUID());
		message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		message.setCategoryType(categoryType);
		
		String categoryId = message.getCategoryId();
		if ((categoryId != null) && !categoryId.isEmpty()) {
			String categoryName = null;
			if (PortalConstants.CATEGORY_TYPE_CATALOG.equalsIgnoreCase(categoryType)) {
				Catalog catalog = catalogService.getCatalog(categoryId);
				categoryName = catalog.getName();
			} else if (PortalConstants.CATEGORY_TYPE_CHANNEL.equalsIgnoreCase(categoryType)) {
				Channel channel = channelService.getChannel(categoryId);
				categoryName = channel.getName();
			}
			
			message.setCategoryName(categoryName);
		} else {
			String categoryName = message.getCategoryName();
			if (PortalConstants.CATEGORY_TYPE_CATALOG.equalsIgnoreCase(categoryType)) {
				Catalog catalog = new Catalog();
				catalog.setId(Utility.getUUID());
				catalog.setCreator(message.getCreator());
				catalog.setName(categoryName);
				
				catalog = catalogService.createCatalog(catalog);
				message.setCategoryId(catalog.getId());
			} 		
		}
		
		return messageService.createMessage(message);
	}

	@RequestMapping(value = "/api/channel/{id}/messages", method = RequestMethod.GET)
	public Pagination getMessagesInChannel(@PathVariable String id,
			@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		int total = messageService.countMessageInCategory(PortalConstants.CATEGORY_TYPE_CHANNEL, id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return messageService.getMessagesInCategory(PortalConstants.CATEGORY_TYPE_CHANNEL, id, pagination);
	}

	@RequestMapping(value = "/api/message/{id}", method = RequestMethod.GET)
	public Message getMessage(@PathVariable String id) throws Exception {
		return messageService.getMessage(id);
	}

}
