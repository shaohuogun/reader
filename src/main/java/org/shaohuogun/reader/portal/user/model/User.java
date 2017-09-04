package org.shaohuogun.reader.portal.user.model;

import java.util.Date;

import org.shaohuogun.common.Entity;

public class User extends Entity {
	
	private static final long serialVersionUID = 1L;
	
	public static final String STATUS_DISABLED = "disabled";
    public static final String STATUS_ENABLED = "enabled";
    
    public static final Character SEX_FEMALE = '0';
    public static final Character SEX_MALE = '1';
    
	private String email;
	
	private String nickname;
	
	private String password;
	
	private String portraitId;
	
	private String profile;
	
	private String name;
	
	private Character sex;
	
	private Date birthday;
	
	private String idNumber;
	
	private String mobile;
	
	private String qq;
	
	private String wechat;
	
	private String microblog;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPortraitId() {
		return portraitId;
	}

	public void setPortraitId(String portraitId) {
		this.portraitId = portraitId;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Character getSex() {
		return sex;
	}

	public void setSex(Character sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getWechat() {
		return wechat;
	}

	public void setWechat(String wechat) {
		this.wechat = wechat;
	}

	public String getMicroblog() {
		return microblog;
	}

	public void setMicroblog(String microblog) {
		this.microblog = microblog;
	}	
	
}
