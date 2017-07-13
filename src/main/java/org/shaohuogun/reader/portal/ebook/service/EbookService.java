package org.shaohuogun.reader.portal.ebook.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.portal.ebook.dao.EbookDao;
import org.shaohuogun.reader.portal.ebook.model.Ebook;
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

	public int getEbookCountInChannel(String channelId) {
		if ((channelId == null) || channelId.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}
		
		return ebookDao.countByChannelId(channelId);
	}

	public Pagination getEbooksInChannel(String channelId, Pagination pagination) {
		if ((channelId == null) || channelId.isEmpty()) {
			throw new IllegalArgumentException("Channel's id cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> ebooks = ebookDao.selectByChannelId(channelId, offset, limit);
		pagination.setObjects(ebooks);
		return pagination;
	}

	public int getEbookCountOfCreator(String creator) {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		return ebookDao.countByCreator(creator);
	}
	
	public Pagination getEbooksOfCreator(String creator, Pagination pagination) {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}

		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> ebooks = ebookDao.selectByCreator(creator, offset, limit);
		pagination.setObjects(ebooks);
		return pagination;
	}
	
}
