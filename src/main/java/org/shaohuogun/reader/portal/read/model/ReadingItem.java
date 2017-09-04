package org.shaohuogun.reader.portal.read.model;

import org.shaohuogun.common.Entity;

public class ReadingItem extends Entity {

	private static final long serialVersionUID = 1L;
	
	public static final String STATUS_WANT = "want";
	public static final String STATUS_READING = "reading";
	public static final String STATUS_READ = "read";
	
	private String bookName;
	
	private String bookId;
	
	private String listId;
	
	private String status = STATUS_WANT;

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}
	
	public String getListId() {
		return listId;
	}
	
	public void setListId(String listId) {
		this.listId = listId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
