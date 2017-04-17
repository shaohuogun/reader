package org.shaohuogun.reader.channel.model;

import org.shaohuogun.reader.picker.model.PickingObject;

public class Channel extends PickingObject {

	private static final long serialVersionUID = 1L;

	public static final String PICKING_TYPE = "channel";
	
	public static final Character PAGED_NOT = '0';
	public static final Character PAGED_YES = '1';

	private String publisherId;

	private String url;
	
	private String name;

	@Override
	public String getPickingType() {
		return PICKING_TYPE;
	}

	public String getPublisherId() {
		return publisherId;
	}

	public void setPublisherId(String publisherId) {
		this.publisherId = publisherId;
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

}
