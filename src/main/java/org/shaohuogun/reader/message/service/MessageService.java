package org.shaohuogun.reader.message.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.message.dao.ContentDao;
import org.shaohuogun.reader.message.dao.MessageDao;
import org.shaohuogun.reader.message.model.Content;
import org.shaohuogun.reader.message.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

	@Autowired
	private MessageDao messageDao;

	@Autowired
	private ContentDao contentDao;

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
		
		return messageDao.countInChannel(channelId);
	}

	public Pagination getMessagesInChannel(String id, Pagination pagination) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> messages = messageDao.selectInChannel(id, offset, limit);
		pagination.setObjects(messages);
		return pagination;
	}

	@Transactional
	public Content createContent(Content content) throws Exception {
		if (content == null) {
			throw new NullPointerException("Content cann't be null.");
		}

		contentDao.insert(content);
		return contentDao.selectById(content.getId());
	}

	public Content getContent(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Content's id cann't be null or empty.");
		}

		return contentDao.selectById(id);
	}

	public Content getContentByMessageId(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Message's id cann't be null or empty.");
		}

		return contentDao.selectByMessageId(id);
	}

	@Transactional
	public Content modifyContent(Content content) throws Exception {
		if (content == null) {
			throw new NullPointerException("Content cann't be null.");
		}

		contentDao.update(content);
		return contentDao.selectById(content.getId());
	}

	public Message getMessageByPickingStatus(String pickingStatus) throws Exception {
		if ((pickingStatus == null) || pickingStatus.isEmpty()) {
			throw new IllegalArgumentException("Picking status cann't be null or empty.");
		}	

		return messageDao.selectByPickingStatus(pickingStatus);
	}
	
	public Message getMessageByPickingBatchNo(String pickingBatchNo) throws Exception {
		if ((pickingBatchNo == null) || pickingBatchNo.isEmpty()) {
			throw new IllegalArgumentException("Picking batch no cann't be null or empty.");
		}	
		
		return messageDao.selectByPickingBatchNo(pickingBatchNo);
	}

}
