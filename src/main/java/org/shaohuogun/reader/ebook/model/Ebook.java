package org.shaohuogun.reader.ebook.model;

import org.hibernate.validator.constraints.NotBlank;
import org.shaohuogun.common.Model;

public class Ebook extends Model {

	private static final long serialVersionUID = 1L;
	
	public static final String FORMAT_MOBI = "mobi";
	public static final String FORMAT_AZW3 = "azw3"; 
	public static final String FORMAT_EPUB = "epub"; 
	
	@NotBlank(message = "不允许为空！")
	private String channelId;
	
	@NotBlank(message = "不允许为空！")
	private String format;
	
	@NotBlank(message = "不允许为空！")
	private String name;
	
	@NotBlank(message = "不允许为空！")
	private String path;
	
	private Integer downloads = 0;

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
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
