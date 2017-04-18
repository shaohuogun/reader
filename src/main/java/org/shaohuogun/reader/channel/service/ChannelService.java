package org.shaohuogun.reader.channel.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.shaohuogun.reader.channel.dao.ChannelDao;
import org.shaohuogun.reader.channel.model.Channel;

@Service
public class ChannelService {

	@Autowired
	private ChannelDao channelDao;

	@Transactional
	public Channel createChannel(Channel channel) throws Exception {
		if (channel == null) {
			throw new Exception("Invalid argument.");
		}

		channelDao.insert(channel);
		return channelDao.selectById(channel.getId());
	}

	public Channel getChannel(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		return channelDao.selectById(id);
	}
	
	public int getChannelCountByCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new Exception("Invalid argument.");
		}
		
		return channelDao.countByCreator(creator);
	}
	
	public Pagination getChannelsByCreator(String creator, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new Exception("Invalid argument.");
		}
		
		if (pagination == null) {
			throw new Exception("Invalid argument.");
		}
		
		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> channels = channelDao.selectByCreator(creator, offset, limit);
		pagination.setObjects(channels);
		return pagination;
	}

	@Transactional
	public Channel modifyChannel(Channel channel) throws Exception {
		if (channel == null) {
			throw new Exception("Invalid argument.");
		}

		channelDao.update(channel);
		return channelDao.selectById(channel.getId());
	}
	
	public Channel getChannelByPickingStatus(String pickingStatus) throws Exception {
		if (pickingStatus == null) {
			throw new Exception("Invalid argument.");
		}		
		
		return channelDao.selectByPickingStatus(pickingStatus);
	}
	
	public Channel getChannelByPickingBatchNo(String pickingBatchNo) throws Exception {
		if (pickingBatchNo == null) {
			throw new Exception("Invalid argument.");
		}		
		
		return channelDao.selectByPickingBatchNo(pickingBatchNo);
	}
	
}
