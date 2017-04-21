package org.shaohuogun.reader.channel.model;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import org.shaohuogun.reader.picker.model.PickingObject;

public class Channel extends PickingObject {

	private static final long serialVersionUID = 1L;

	public static final String PICKING_TYPE = "channel";
	
	public static final Character PAGED_NOT = '0';
	public static final Character PAGED_YES = '1';

	@URL(message = "请输入格式正确的URL！")
	private String url;
	
	@NotBlank(message = "不允许为空！")
	private String name;
	
	private String description;

	@Override
	public String getPickingType() {
		return PICKING_TYPE;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
