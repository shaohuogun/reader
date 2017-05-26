package org.shaohuogun.reader.message.model;

import java.util.Date;

import org.shaohuogun.reader.picker.model.PickableObject;

public class Message extends PickableObject {

	private static final long serialVersionUID = 1L;
	
	public static final String PICKING_TYPE = "message";
	
	private String channelId;
	
	private String url;
	
	private String title;
	
	private Date releaseDate;
	
	private Integer pageview;
	
	private Integer commentCount;
	
	private String digest;
	
	private String content;
	
	@Override
	public String getPickingType() {
		return PICKING_TYPE;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Integer getPageview() {
		return pageview;
	}

	public void setPageview(Integer pageview) {
		this.pageview = pageview;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}
	
	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
