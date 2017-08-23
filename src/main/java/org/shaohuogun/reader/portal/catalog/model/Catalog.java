package org.shaohuogun.reader.portal.catalog.model;

import org.hibernate.validator.constraints.NotBlank;
import org.shaohuogun.reader.portal.picker.model.PickableObject;

public class Catalog extends PickableObject {

	private static final long serialVersionUID = 1L;

	public static final String ACTION_TYPE = "catalog";
	
	@NotBlank(message = "不允许为空！")
	private String name;
	
	private String description;

	@Override
	public String getActionType() {
		return ACTION_TYPE;
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
