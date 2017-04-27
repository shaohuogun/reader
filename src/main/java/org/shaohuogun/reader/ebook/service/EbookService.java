package org.shaohuogun.reader.ebook.service;

import org.shaohuogun.reader.ebook.dao.EbookDao;
import org.shaohuogun.reader.ebook.model.Ebook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EbookService {
	
	@Autowired
	private EbookDao ebookDao;
	
	@Transactional
	public Ebook createEbook(Ebook ebook) throws Exception {
		if (ebook == null) {
			throw new NullPointerException("Ebook cann't be null.");
		}
		
		ebookDao.insert(ebook);
		return ebookDao.selectById(ebook.getId());
	}
	
	public Ebook getEbook(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Ebook id cann't be null or empty.");
		}
		
		return ebookDao.selectById(id);
	}

}
