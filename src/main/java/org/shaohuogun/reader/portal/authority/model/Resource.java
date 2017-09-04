package org.shaohuogun.reader.portal.authority.model;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Resource implements Serializable {

	private static final long serialVersionUID = 1L;

	private String id;

	private String parentId;

	@NotNull(message = "名称不能为空！")
	@Size(min = 1, max = 64, message = "名称最少 {min}，最大 {max}个字符！")
	private String name;

	@Size(min = 1, max = 512, message = "描述最少 {min}，最大 {max}个字符！")
	private String description;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getParentId() {
		return parentId;
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
