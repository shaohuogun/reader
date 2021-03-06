package org.shaohuogun.reader.portal.ebook.model;

import org.hibernate.validator.constraints.NotBlank;
import org.shaohuogun.common.Entity;

public class Ebook extends Entity {

	private static final long serialVersionUID = 1L;
	
	public static final String FORMAT_MOBI = "mobi";
	public static final String FORMAT_AZW3 = "azw3"; 
	public static final String FORMAT_EPUB = "epub";
	
	@NotBlank(message = "不允许为空！")
	private String categoryType;
	
	@NotBlank(message = "不允许为空！")	
	private String categoryId;
	
	@NotBlank(message = "不允许为空！")
	private String format;
	
	@NotBlank(message = "不允许为空！")
	private String name;
	
	@NotBlank(message = "不允许为空！")
	private String path;
	
	private Integer downloads = 0;

	public String getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Integer getDownloads() {
		return downloads;
	}

	public void setDownloads(Integer downloads) {
		this.downloads = downloads;
	}
	
}
