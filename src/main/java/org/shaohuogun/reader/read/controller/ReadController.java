package org.shaohuogun.reader.read.controller;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.read.model.ReadingList;
import org.shaohuogun.reader.read.model.ReadingListItem;
import org.shaohuogun.reader.read.service.ReadService;
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
	public ReadingList createList(@RequestBody @Validated ReadingList list) throws Exception {		
		list.setId(Utility.getUUID());
		list.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		
		return readService.createList(list);
	}

	@RequestMapping(value = "/api/readinglist/{id}", method = RequestMethod.GET)
	public ReadingList getList(@PathVariable String id) throws Exception {
		return readService.getList(id);
	}

	@RequestMapping(value = "/api/readinglists", method = RequestMethod.GET)
	public Pagination getLists(@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = readService.getListCountOfCreator(creator);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return readService.getListsOfCreator(creator, pagination);
	}
	
	@RequestMapping(value = "/api/readinglistitem", method = RequestMethod.POST)
	public ReadingListItem createListItem(@RequestBody @Validated ReadingListItem listItem) throws Exception {		
		listItem.setId(Utility.getUUID());
		listItem.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		
		return readService.createListItem(listItem);
	}

	@RequestMapping(value = "/api/readinglistitem/{id}", method = RequestMethod.GET)
	public ReadingListItem getListItem(@PathVariable String id) throws Exception {
		return readService.getListItem(id);
	}

	@RequestMapping(value = "/api/readinglist/{id}/items", method = RequestMethod.GET)
	public Pagination getListItems(@PathVariable String id, @RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = readService.getListItemCountOfCreator(creator, id);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return readService.getListItemsOfCreator(creator, id, pagination);
	}
	
}
