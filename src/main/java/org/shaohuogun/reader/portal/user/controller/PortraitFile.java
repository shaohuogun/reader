package org.shaohuogun.reader.portal.user.controller;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class PortraitFile {

    private CommonsMultipartFile content;

    public void setContent(CommonsMultipartFile content) {
        this.content = content;
    }

    public CommonsMultipartFile getContent() {
        return content;
    }
    
}
