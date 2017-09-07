package org.shaohuogun.reader.portal.user.controller;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginForm {

    @NotNull(message = "邮箱不能为空！")
    private String email;
    
    @NotNull(message = "密码不能为空！")
    @Size(min = 6, max = 32, message = "密码最少 {min}，最大 {max}个字符！")
    private String password;

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
    
}
