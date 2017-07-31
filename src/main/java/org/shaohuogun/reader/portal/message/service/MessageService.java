package org.shaohuogun.reader.portal.message.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.portal.message.dao.MessageDao;
import org.shaohuogun.reader.portal.message.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

	@Autowired
	private MessageDao messageDao;

	@Transactional
	public Message createMessage(Message message) throws Exception {
		if (message == null) {
			throw new NullPointerException("Message cann't be null.");
		}

		Message oldMessage = messageDao.selectByUrl(message.getUrl());
		if (oldMessage != null) {
			return oldMessage;
		} else {
			messageDao.insert(message);
			return messageDao.selectById(message.getId());
		}
	}

	public List<Message> getAllMessage() {
		return messageDao.selectAll();
	}

	public Message getMessage(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Message's id cann't be null or empty.");
		}

		return messageDao.selectById(id);
	}

	@Transactional
	public Message modifyMessage(Message message) throws Exception {
		if (message == null) {
			throw new NullPointerException("Message cann't be null.");
		}

		messageDao.update(message);
		return messageDao.selectById(message.getId());
	}

	public int getMessageCountInChannel(String channelId) throws Exception {
		if ((channelId == null) || channelId.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}
		
		return messageDao.countByChannelId(channelId);
	}

	public Pagination getMessagesInChannel(String channelId, Pagination pagination) throws Exception {
		if ((channelId == null) || channelId.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> messages = messageDao.selectByChannelId(channelId, offset, limit);
		pagination.setObjects(messages);
		return pagination;
	}

	public Message getMessageByPickingStatus(String pickingStatus) throws Exception {
		if ((pickingStatus == null) || pickingStatus.isEmpty()) {
			throw new IllegalArgumentException("Picking status cann't be null or empty.");
		}	

		return messageDao.selectByStatus(pickingStatus);
	}
	
	public Message getMessageBySerialNumber(String pickingBatchNo) throws Exception {
		if ((pickingBatchNo == null) || pickingBatchNo.isEmpty()) {
			throw new IllegalArgumentException("Picking batch no cann't be null or empty.");
		}	
		
		return messageDao.selectBySerialNumber(pickingBatchNo);
	}

}
