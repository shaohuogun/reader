package org.shaohuogun.reader.publisher.dao;

import org.apache.ibatis.annotations.Mapper;

import org.shaohuogun.reader.publisher.model.Publisher;

@Mapper
public interface PublisherMapper {

	void insert(Publisher publisher);
	
	Publisher selectById(String id);
	
}
