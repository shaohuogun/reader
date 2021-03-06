package org.shaohuogun.reader.portal.message.model;

import java.util.Date;

import org.shaohuogun.reader.portal.picker.model.PickableObject;

public class Message extends PickableObject {

	private static final long serialVersionUID = 1L;
	
	public static final String ACTION_TYPE = "message";
	
	public static final String KEY_TITLE = "title";
	public static final String KEY_RELEASE_DATE = "releaseDate";
	public static final String KEY_PAGEVIEW = "pageview";
	public static final String KEY_COMMENT_COUNT = "commentCount";
	public static final String KEY_DIGEST = "digest";
	public static final String KEY_CONTENT = "content";
	
	private String categoryType;
	
	private String categoryId;
	
	private String categoryName;
	
	private String title;
	
	private Date releaseDate;
	
	private Integer pageview;
	
	private Integer commentCount;
	
	private String digest;
	
	private String content;
	
	@Override
	public String getActionType() {
		return ACTION_TYPE;
	}

	public String getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	/**
	 * @return the categoryName
	 */
	public String getCategoryName() {
		return categoryName;
	}

	/**
	 * @param categoryName the categoryName to set
	 */
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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
