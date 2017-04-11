package org.shaohuogun.reader.message.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.message.model.Message;

@Mapper
public interface MessageMapper {

	void insert(Message message);
	
	List<Message> selectAll();
	
	Message selectById(String id);
	
	Message selectByUrl(String url);
	
	int countInChannel(String channelId);
	
	List<Model> selectInChannel(String channelId);
	
	void update(Message message);
	
	Message selectByPickingStatus(String pickingStatus);
	
	Message selectByPickingBatchNo(String pickingBatchNo);
	
}
