package org.shaohuogun.reader.portal.read.controller;

import java.util.List;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.read.model.ReadingItem;
import org.shaohuogun.reader.portal.read.model.ReadingList;
import org.shaohuogun.reader.portal.read.service.ReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadController extends Controller {

	@Autowired
	private ReadService readService;

	@RequestMapping(value = "/api/readinglist", method = RequestMethod.POST)
	public ReadingList createReadingList(@RequestBody @Validated ReadingList readingList) throws Exception {
		readingList.setId(Utility.getUUID());
		readingList.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");

		return readService.createReadingList(readingList);
	}

	@RequestMapping(value = "/api/readinglist/{id}", method = RequestMethod.GET)
	public ReadingList getReadingList(@PathVariable String id) throws Exception {
		return readService.getReadingList(id);
	}
	
	@RequestMapping(value = "/api/readinglist/{id}", method = RequestMethod.DELETE)
	public void deleteReadingList(@PathVariable String id) throws Exception {
		readService.deleteReadingList(id);
	}

	@RequestMapping(value = "/api/myreadinglists", method = RequestMethod.GET)
	public List<ReadingList> getMyReadingLists() throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";
		return readService.getReadingListsByCreator(creator);
	}

	@RequestMapping(value = "/api/readingitem", method = RequestMethod.POST)
	public ReadingItem createReadingItem(@RequestBody @Validated ReadingItem readingItem) throws Exception {
		readingItem.setId(Utility.getUUID());
		readingItem.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		
		String listId = readingItem.getListId();
		if ((listId == null) || listId.isEmpty()) {
			String listName = readingItem.getListName();
			ReadingList readingList = new ReadingList();
			readingList.setId(Utility.getUUID());
			readingList.setCreator(readingItem.getCreator());
			readingList.setName(listName);
			
			readingList = readService.createReadingList(readingList);
			readingItem.setListId(readingList.getId());
		} else {
			ReadingList readingList = readService.getReadingList(listId);
			String listName = readingList.getName();
			readingItem.setListName(listName);
		}
		
		return readService.createReadingItem(readingItem);
	}

	@RequestMapping(value = "/api/readingitem/{id}", method = RequestMethod.GET)
	public ReadingItem getReadingItem(@PathVariable String id) throws Exception {
		return readService.getReadingItem(id);
	}

	@RequestMapping(value = "/api/readinglist/{id}/items", method = RequestMethod.GET)
	public Pagination getReadingItems(@PathVariable String id,
			@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		int total = readService.countReadingItemByListId(id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return readService.getReadingItemsByListId(id, pagination);
	}

}
