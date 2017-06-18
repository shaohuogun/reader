package org.shaohuogun.reader.read.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.read.dao.ReadDao;
import org.shaohuogun.reader.read.model.ReadingList;
import org.shaohuogun.reader.read.model.ReadingItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReadService {

	@Autowired
	private ReadDao readDao;

	@Transactional
	public ReadingList createReadingList(ReadingList readingList) throws Exception {
		if (readingList == null) {
			throw new NullPointerException("Reading list cann't be null.");
		}

		readDao.insertReadingList(readingList);
		return readDao.selectReadingListById(readingList.getId());
	}

	public ReadingList getReadingList(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}

		return readDao.selectReadingListById(id);
	}

	public int getReadingListCount(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}

		return readDao.countReadingListByCreator(creator);
	}

	public Pagination getReadingLists(String creator, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}

		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> readingLists = readDao.selectReadingListsByCreator(creator, offset, limit);
		pagination.setObjects(readingLists);
		return pagination;
	}

	@Transactional
	public ReadingList modifyReadingList(ReadingList readingList) throws Exception {
		if (readingList == null) {
			throw new NullPointerException("Reading list cann't be null.");
		}

		readDao.updateReadingList(readingList);
		return readDao.selectReadingListById(readingList.getId());
	}

	@Transactional
	public ReadingItem createReadingItem(ReadingItem readingItem) throws Exception {
		if (readingItem == null) {
			throw new NullPointerException("Reading item cann't be null.");
		}

		readDao.insertReadingItem(readingItem);
		return readDao.selectReadingItemById(readingItem.getId());
	}

	public ReadingItem getReadingItem(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Reading item's id cann't be null or empty.");
		}

		return readDao.selectReadingItemById(id);
	}

	public int getReadingItemCount(String listId) throws Exception {
		if ((listId == null) || listId.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}

		return readDao.countReadingItemByListId(listId);
	}

	public Pagination getReadingItems(String listId, Pagination pagination) throws Exception {
		if ((listId == null) || listId.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}

		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}

		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> readingItems = readDao.selectReadingItemsByListId(listId, offset, limit);
		pagination.setObjects(readingItems);
		return pagination;
	}

	@Transactional
	public ReadingItem modifyReadingItem(ReadingItem readingItem) throws Exception {
		if (readingItem == null) {
			throw new NullPointerException("Reading item cann't be null.");
		}

		readDao.updateReadingItem(readingItem);
		return readDao.selectReadingItemById(readingItem.getId());
	}

}
