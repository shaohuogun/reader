package org.shaohuogun.reader.publisher.model;

import org.shaohuogun.common.Model;

public class Publisher extends Model {
	
	private static final long serialVersionUID = 1L;
	
	public static final Character SEX_FEMALE = '0';
	public static final Character SEX_MALE = '1';
	
	private String name;

	private String nickname;

	private Character sex;

	private String portrait;

	private String profile;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Character getSex() {
		return sex;
	}

	public void setSex(Character sex) {
		this.sex = sex;
	}

	public String getPortrait() {
		return portrait;
	}

	public void setPortrait(String portrait) {
		this.portrait = portrait;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}
	
}
