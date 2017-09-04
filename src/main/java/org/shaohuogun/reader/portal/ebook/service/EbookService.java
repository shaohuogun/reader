package org.shaohuogun.reader.portal.ebook.service;

import java.util.List;

import org.shaohuogun.common.Entity;
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

	public int countEbookInCategory(String categoryType, String categoryId) {
		if ((categoryType == null) || categoryType.isEmpty()) {
			throw new IllegalArgumentException("Category's type cann't be null or empty.");
		}

		if ((categoryId == null) || categoryId.isEmpty()) {
			throw new IllegalArgumentException("Category's id cann't be null or empty.");
		}

		return ebookDao.countByCategory(categoryType, categoryId);
	}

	public Pagination getEbooksInCategory(String categoryType, String categoryId, Pagination pagination) {
		if ((categoryType == null) || categoryType.isEmpty()) {
			throw new IllegalArgumentException("Category's type cann't be null or empty.");
		}

		if ((categoryId == null) || categoryId.isEmpty()) {
			throw new IllegalArgumentException("Category's id cann't be null or empty.");
		}

		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Entity> ebooks = ebookDao.selectByCategory(categoryType, categoryId, offset, limit);
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
		List<Entity> ebooks = ebookDao.selectByCreator(creator, offset, limit);
		pagination.setObjects(ebooks);
		return pagination;
	}

}
