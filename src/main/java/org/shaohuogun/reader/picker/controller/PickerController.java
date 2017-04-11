package org.shaohuogun.reader.picker.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.service.MessageService;
import org.shaohuogun.reader.picker.model.PickingObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PickerController extends Controller {

	@Autowired
	private ChannelService channelService;

	@Autowired
	private MessageService messageService;

	@RequestMapping(value = "/picker", method = RequestMethod.POST)
	public void receiveResult(HttpServletRequest req) throws Exception {
		req.setCharacterEncoding(Utility.UTF8);
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
		String targetType = jsonResult.getString(PickingObject.KEY_TARGET_TYPE);
		String batchNo = jsonResult.getString(PickingObject.KEY_BATCH_NO);
		if (Channel.PICKING_TYPE.equalsIgnoreCase(targetType)) {
			Channel channel = channelService.getChannelByPickingBatchNo(batchNo);
			channel.setLastModifyDate(new Date());
			channel.setPickingCount(channel.getPickingCount() + 1);
			if (channel.getPickingAmount() == channel.getPickingCount()) {
				channel.setPickingStatus(PickingObject.STATUS_FINISHED);
			}

			JSONArray jsonMsgs = jsonResult.getJSONArray("messages");
			for (int i = 0; i < jsonMsgs.length(); i++) {
				JSONObject jsonMsg = jsonMsgs.getJSONObject(i);

				Message message = new Message();
				message.setId(Utility.getUUID());
				message.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
				message.setChannelId(channel.getId());
				message.setUrl(channel.getBasePath() + jsonMsg.getString("url"));
				message.setTitle(jsonMsg.getString("title"));
				message.setReleaseDate(Utility.parseDate(jsonMsg.getString("releaseDate")));
				message.setPageview(Integer.valueOf(jsonMsg.getString("pageview")));
				message.setCommentCount(Integer.valueOf(jsonMsg.getString("commentCount")));
				message.setDigest(jsonMsg.getString("digest"));
				
				if (channel.getPickingStrategy().indexOf("csdn") != -1) {
					message.setPickingStrategy("csdn-message");
				} else if (channel.getPickingStrategy().indexOf("ppzw") != -1) {
					message.setPickingStrategy("ppzw-message");
				}
				
				message.setPickingBatchNo(Utility.getUUID());  
				messageService.createMessage(message);
			}

			channelService.modifyChannel(channel);
		} else if (Message.PICKING_TYPE.equalsIgnoreCase(targetType)) {
			Message message = messageService.getMessageByPickingBatchNo(batchNo);
			message.setLastModifyDate(new Date());
			message.setPickingCount(message.getPickingCount() + 1);
			if (message.getPickingAmount() == message.getPickingCount()) {
				message.setPickingStatus(PickingObject.STATUS_FINISHED);
			}
			
			Content content = new Content();
			content.setId(Utility.getUUID());
			content.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
			content.setMessageId(message.getId());
			content.setOriginal(jsonResult.getString("content"));
			messageService.createContent(content);
			messageService.modifyMessage(message);
		}
	}

}