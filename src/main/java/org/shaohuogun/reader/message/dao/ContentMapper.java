package org.shaohuogun.reader.message.dao;

import org.apache.ibatis.annotations.Mapper;

import org.shaohuogun.reader.message.model.Content;

@Mapper
public interface ContentMapper {
	
	void insert(Content content);
	
	Content selectById(String id);
	
	Content selectByMessage(String messageId);

	void update(Content content);
	
}
