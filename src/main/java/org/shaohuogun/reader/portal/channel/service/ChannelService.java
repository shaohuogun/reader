package org.shaohuogun.reader.portal.channel.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.shaohuogun.reader.portal.channel.dao.ChannelDao;
import org.shaohuogun.reader.portal.channel.model.Channel;

@Service
public class ChannelService {

	@Autowired
	private ChannelDao channelDao;

	@Transactional
	public Channel createChannel(Channel channel) throws Exception {
		if (channel == null) {
			throw new NullPointerException("Channel cann't be null.");
		}

		channelDao.insert(channel);
		return channelDao.selectById(channel.getId());
	}

	public Channel getChannel(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}

		return channelDao.selectById(id);
	}
	
	public int getChannelCountOfCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		return channelDao.countByCreator(creator);
	}
	
	public Pagination getChannelsOfCreator(String creator, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
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
			throw new NullPointerException("Channel cann't be null.");
		}

		channelDao.update(channel);
		return channelDao.selectById(channel.getId());
	}
	
	public Channel getChannelByStatus(String status) throws Exception {
		if ((status == null) || status.isEmpty()) {
			throw new IllegalArgumentException("Status cann't be null or empty.");
		}		
		
		return channelDao.selectByStatus(status);
	}
	
	public Channel getChannelBySerialNumber(String serialNumber) throws Exception {
		if ((serialNumber == null) || serialNumber.isEmpty()) {
			throw new IllegalArgumentException("Serial number cann't be null or empty.");
		}		
		
		return channelDao.selectBySerialNumber(serialNumber);
	}
	
}
