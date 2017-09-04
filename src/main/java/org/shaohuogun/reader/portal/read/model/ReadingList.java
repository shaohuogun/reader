package org.shaohuogun.reader.portal.read.model;

import org.hibernate.validator.constraints.NotBlank;
import org.shaohuogun.common.Entity;

public class ReadingList extends Entity {

	private static final long serialVersionUID = 1L;

	@NotBlank(message = "不允许为空！")
	private String name;

	private String description;

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
