package org.shaohuogun.reader.portal.user.model;

import java.io.Serializable;

public class Portrait implements Serializable {
	
    private static final long serialVersionUID = 1L;

	private Long id;
	
	private String userId;

	private byte[] content;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}
	
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserId() {
        return userId;
    }

	public void setContent(byte[] content) {
		this.content = content;
	}

	public byte[] getContent() {
		return content;
	}
    
}
