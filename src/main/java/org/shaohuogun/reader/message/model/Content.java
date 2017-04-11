package org.shaohuogun.reader.message.model;

import org.shaohuogun.common.Model;

public class Content extends Model {
	
	private static final long serialVersionUID = 1L;
	
	private String messageId;
	
	private String original;

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public String getOriginal() {
		return original;
	}

	public void setOriginal(String original) {
		this.original = original;
	}

}
