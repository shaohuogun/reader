package org.shaohuogun.reader.portal.picker.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.channel.model.Channel;
import org.shaohuogun.reader.portal.channel.service.ChannelService;
import org.shaohuogun.reader.portal.message.model.Message;
import org.shaohuogun.reader.portal.message.service.MessageService;
import org.shaohuogun.reader.portal.picker.model.PickableObject;
import org.shaohuogun.reader.portal.progress.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HookController extends Controller {

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@Autowired
	private ProgressService progressService;

	@RequestMapping(value = "/api/hook/channel", method = RequestMethod.POST)
	public void receiveChannel(HttpServletRequest req) throws Exception {
		req.setCharacterEncoding(Utility.ENCODE_UTF8);
		StringBuffer sb = new StringBuffer();
		InputStream is = req.getInputStream();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		String line;
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}

		String json = sb.toString();
		if ((json == null) || json.isEmpty()) {
			StringBuffer sb1 = new StringBuffer();
			sb1.append(req.getRemoteAddr());
			sb1.append("[");
			sb1.append(req.getRemoteHost());
			sb1.append(":");
			sb1.append(req.getRemotePort());
			sb1.append("]");
			throw new Exception("The picking result from [" + sb1.toString() + "]  is invalid.");
		}

		JSONObject jsonResult = new JSONObject(json);
		String serialNumber = jsonResult.getString(PickableObject.KEY_SERIAL_NUMBER);	
		JSONObject jsonContent = new JSONObject(jsonResult.getString(PickableObject.KEY_CONTENT));
		JSONArray jsonMsgs = jsonContent.getJSONArray("messages");
		Channel channel = channelService.getChannelBySerialNumber(serialNumber);
		for (int i = 0; i < jsonMsgs.length(); i++) {
			JSONObject jsonMsg = jsonMsgs.getJSONObject(i);

			Message message = new Message();
			message.setId(Utility.getUUID());
			message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
			message.setChannelId(channel.getId());

			URL targetUrl = new URL(channel.getUrl());
			String basePath = targetUrl.getProtocol() + "://" + targetUrl.getAuthority();
			message.setUrl(basePath + jsonMsg.getString("url"));
			message.setTitle(jsonMsg.getString("title"));
			message.setReleaseDate(Utility.parseDate(jsonMsg.getString("releaseDate")));
			message.setPageview(Integer.valueOf(jsonMsg.getString("pageview")));
			message.setCommentCount(Integer.valueOf(jsonMsg.getString("commentCount")));
			message.setDigest(jsonMsg.getString("digest"));

			message.setSerialNumber(Utility.getUUID());
			messageService.createMessage(message);
		}

		channel.setLastModifyDate(new Date());
		channel.setCount(channel.getCount() + 1);
		if (channel.getAmount() == channel.getCount()) {
			channel.setStatus(PickableObject.STATUS_PICKED);
		}
		channelService.modifyChannel(channel);
		progressService.incProgressAmount(channel.getId(), jsonMsgs.length());
	}
	
	@RequestMapping(value = "/api/hook/message", method = RequestMethod.POST)
	public void receiveMessage(HttpServletRequest req) throws Exception {
		req.setCharacterEncoding(Utility.ENCODE_UTF8);
		StringBuffer sb = new StringBuffer();
		InputStream is = req.getInputStream();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		String line;
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}

		String json = sb.toString();
		if ((json == null) || json.isEmpty()) {
			StringBuffer sb1 = new StringBuffer();
			sb1.append(req.getRemoteAddr());
			sb1.append("[");
			sb1.append(req.getRemoteHost());
			sb1.append(":");
			sb1.append(req.getRemotePort());
			sb1.append("]");
			throw new Exception("The picking result from [" + sb1.toString() + "]  is invalid.");
		}

		JSONObject jsonResult = new JSONObject(json);
		String serialNumber = jsonResult.getString(PickableObject.KEY_SERIAL_NUMBER);	
		JSONObject jsonContent = new JSONObject(jsonResult.getString(PickableObject.KEY_CONTENT));
		
		Message message = messageService.getMessageBySerialNumber(serialNumber);
		message.setLastModifyDate(new Date());
		message.setCount(message.getCount() + 1);
		if (message.getAmount() == message.getCount()) {
			message.setStatus(PickableObject.STATUS_PICKED);
		}

		message.setContent(jsonContent.getString("content"));
		messageService.modifyMessage(message);
		progressService.incProgressCount(message.getChannelId(), 1);
	}

}
