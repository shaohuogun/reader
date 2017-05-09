package org.shaohuogun.reader.read.service;

import java.util.List;

import org.shaohuogun.common.Model;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.reader.read.dao.ReadDao;
import org.shaohuogun.reader.read.model.ReadingList;
import org.shaohuogun.reader.read.model.ReadingListItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReadService {
	
	@Autowired
	private ReadDao readDao;

	@Transactional
	public ReadingList createList(ReadingList list) throws Exception {
		if (list == null) {
			throw new NullPointerException("Reading list cann't be null.");
		}

		readDao.insertList(list);
		return readDao.selectListById(list.getId());
	}

	public ReadingList getList(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}

		return readDao.selectListById(id);
	}
	
	public int getListCountOfCreator(String creator) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		return readDao.countListByCreator(creator);
	}
	
	public Pagination getListsOfCreator(String creator, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}
		
		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> lists = readDao.selectListsByCreator(creator, offset, limit);
		pagination.setObjects(lists);
		return pagination;
	}

	@Transactional
	public ReadingList modifyList(ReadingList list) throws Exception {
		if (list == null) {
			throw new NullPointerException("Reading list cann't be null.");
		}

		readDao.updateList(list);
		return readDao.selectListById(list.getId());
	}

	@Transactional
	public ReadingListItem createListItem(ReadingListItem listItem) throws Exception {
		if (listItem == null) {
			throw new NullPointerException("Reading list item cann't be null.");
		}

		readDao.insertListItem(listItem);
		return readDao.selectListItemById(listItem.getId());
	}

	public ReadingListItem getListItem(String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new IllegalArgumentException("Reading list item's id cann't be null or empty.");
		}

		return readDao.selectListItemById(id);
	}
	
	public int getListItemCountOfCreator(String creator, String listId) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		if ((listId == null) || listId.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}
		
		return readDao.countListItemByCreator(creator, listId);
	}
	
	public Pagination getListItemsOfCreator(String creator, String listId, Pagination pagination) throws Exception {
		if ((creator == null) || creator.isEmpty()) {
			throw new IllegalArgumentException("Creator cann't be null or empty.");
		}
		
		if ((listId == null) || listId.isEmpty()) {
			throw new IllegalArgumentException("Reading list's id cann't be null or empty.");
		}
		
		if (pagination == null) {
			throw new NullPointerException("Pagination cann't be null.");
		}
		
		int offset = (pagination.getPageIndex() - 1) * pagination.getPageSize();
		int limit = pagination.getPageSize();
		List<Model> listItems = readDao.selectListItemsByCreator(creator, listId, offset, limit);
		pagination.setObjects(listItems);
		return pagination;
	}

	@Transactional
	public ReadingListItem modifyListItem(ReadingListItem listItem) throws Exception {
		if (listItem == null) {
			throw new NullPointerException("Reading list item cann't be null.");
		}

		readDao.updateListItem(listItem);
		return readDao.selectListItemById(listItem.getId());
	}	
	
}
