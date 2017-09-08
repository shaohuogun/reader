package org.shaohuogun.reader.portal.user.controller;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SignupForm {
	
    @NotNull(message = "邮箱不能为空！")
    private String email;
    
    @NotNull(message = "密码不能为空！")
    @Size(min = 6, max = 32, message = "密码最少 {min}，最多 {max}个字符！")
    private String password;
    
	@NotNull(message = "昵称不能为空！")
	@Size(min = 1, max = 64, message = "密码最少 {min}，最多 {max}个字符！")
	private String nickname;
    
    @NotNull(message = "验证码不能为空！")
    private String captcha;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getCaptcha() {
		return captcha;
	}

	public void setCaptcha(String captcha) {
		this.captcha = captcha;
	}
    
}
