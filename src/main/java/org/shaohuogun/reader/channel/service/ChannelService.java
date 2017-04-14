package org.shaohuogun.reader.channel.service;

import java.util.List;

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
	
	public List<Channel> getChannelsByCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		return channelDao.selectByCreator(creator);
	}

	public List<Channel> getChannels(Pagination pagination) throws Exception {
		if (pagination == null) {
			throw new Exception("Invalid argument.");
		}

		// TODO Auto-generated method stub
		return null;
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
