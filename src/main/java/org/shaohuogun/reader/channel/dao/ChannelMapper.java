package org.shaohuogun.reader.channel.dao;

import org.apache.ibatis.annotations.Mapper;

import org.shaohuogun.reader.channel.model.Channel;

@Mapper
public interface ChannelMapper {

	void insert(Channel channel);
	
	Channel selectById(String id);
	
	void update(Channel channel);
	
	Channel selectByPickingStatus(String pickingStatus);

	Channel selectByPickingBatchNo(String pickingBatchNo);
}
