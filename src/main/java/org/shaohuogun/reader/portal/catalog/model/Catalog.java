package org.shaohuogun.reader.portal.catalog.model;

import org.hibernate.validator.constraints.NotBlank;
import org.shaohuogun.common.Model;

public class Catalog extends Model {

	private static final long serialVersionUID = 1L;

	@NotBlank(message = "不允许为空！")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
