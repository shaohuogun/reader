package org.shaohuogun.reader.portal.invitation.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.shaohuogun.common.Entity;

public class Invitation extends Entity {
	
	private static final long serialVersionUID = 1L;

	public static final String STATUS_SENT = "sent";
	public static final String STATUS_ACCEPTED = "accepted";

	public static final Character TYPE_JOIN = '1';

	@NotNull(message = "类型不能为空！")
	private Character type;

	@NotNull(message = "收件人不能为空！")
	@Email(message = "收件人格式不正确！")
	private String addressee;

	@NotNull(message = "主题不能为空！")
	@Size(min = 1, max = 128, message = "主题最少 {min}，最多 {max}个字符！")
	private String subject;

	@NotNull(message = "内容不能为空！")
	private String content;

	public void setType(Character type) {
		this.type = type;
	}

	public Character getType() {
		return type;
	}

	public void setAddressee(String addressee) {
		this.addressee = addressee;
	}

	public String getAddressee() {
		return addressee;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
