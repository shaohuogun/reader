package org.shaohuogun.reader.publisher.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.shaohuogun.reader.publisher.dao.PublisherDao;
import org.shaohuogun.reader.publisher.model.Publisher;

@Service
public class PublisherService {
	
	@Autowired
	private PublisherDao publisherDao;
	
	@Transactional
	public Publisher createPublisher(Publisher publisher) throws Exception {
		if (publisher == null) {
			throw new NullPointerException("Publisher cann't be null.");
		}
		
		publisherDao.insert(publisher);
		return publisherDao.selectById(publisher.getId());
	}
	
	public Publisher getPublisher(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Publisher id cann't be null or empty.");
		}
		
		return publisherDao.selectById(id);
	}
	
}
