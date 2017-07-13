package org.shaohuogun.reader.portal.channel.model;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.shaohuogun.reader.portal.picker.model.PickableObject;

public class Channel extends PickableObject {

	private static final long serialVersionUID = 1L;

	public static final String PICKING_TYPE = "channel";
	
	public static final String CATEGORY_BOOK = "book";
	public static final String CATEGORY_BLOG = "blog";
	
	@NotBlank(message = "不允许为空！")
	private String category;

	@URL(message = "请输入格式正确的URL！")
	private String url;
	
	@NotBlank(message = "不允许为空！")
	private String name;
	
	@NotBlank(message = "不允许为空！")
	private String publisher;
	
	private String description;

	@Override
	public String getPickingType() {
		return PICKING_TYPE;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
