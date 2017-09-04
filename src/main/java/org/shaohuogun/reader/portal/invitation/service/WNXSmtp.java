package org.shaohuogun.reader.portal.invitation.service;

import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.apache.log4j.Logger;


public class WNXSmtp {

    private static final String MAIL_SMTP_TLS = "mail.smtp.starttls.enable";
    private static final String MAIL_SMTP_AUTH = "mail.smtp.auth";
    private static final String PROTOCOL_SMTP = "smtp";
    private static final int MAIL_SMTP_PORT = 587;

    /**
     * 非法邮件提示
     */
    protected static final String INVALID_EMAIL = "邮件格式不合法，例如：发件人、收件人、主题、正文等为空！";

    /**
     * 邮件服务器域名
     */
    private String domainName;

    /**
     * 邮件服务器登录帐号
     */
    private String userName;

    /**
     * 邮件服务器鉴权密码
     */
    private String password;

    /**
     * 邮件会话
     */
    private Session session;

    /**
     * 邮件传输
     */
    private Transport transport;

    public WNXSmtp() {
        super();
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String getHost() {
        return PROTOCOL_SMTP + "." + domainName;
    }

    private void connect() {
        String host = getHost();
        Properties props = System.getProperties();
        props.put(MAIL_SMTP_TLS, "true");
        props.put(MAIL_SMTP_AUTH, "true");

        // 获取邮件会话
        session = Session.getInstance(props);
        try {
            // 连接服务器的邮箱
            transport = session.getTransport(PROTOCOL_SMTP);
            transport.connect(host, MAIL_SMTP_PORT, userName, password);
        } catch (MessagingException e) {
            Logger.getLogger(this.getClass()).error(e.getMessage());
        }
    }

    public void close() {
        if (null != transport) {
            try {
                transport.close();
            } catch (MessagingException e) {
                Logger.getLogger(this.getClass()).error(e.getMessage());
                transport = null;
            }
        }
    }

    public void send(final String addresser, final String addressee,
            final String subject, final String content) throws Exception {
        if ((null == addresser) || addresser.isEmpty() || (null == addressee)
                || addressee.isEmpty() || (null == subject)
                || subject.isEmpty() || (null == content) || content.isEmpty()) {
            throw new Exception(INVALID_EMAIL);
        }

        // 如果连接已经断开则重新建立连接
        if ((null == transport) || !transport.isConnected()) {
            connect();
        }

        // 构造邮件消息
        MimeMessage message = new MimeMessage(session);
        try {
            InternetAddress fromAddr = new InternetAddress(addresser);
            InternetAddress toAddr = new InternetAddress(addressee);
            message.setFrom(fromAddr);
            message.addRecipient(Message.RecipientType.TO, toAddr);
            message.setSubject(subject);
            message.setText(content);
            message.setSentDate(new Date());
            
            // 发送邮件消息
            transport.sendMessage(message, message.getAllRecipients());
        } catch (AddressException e) {
            Logger.getLogger(this.getClass()).error(e.getMessage());
        } catch (MessagingException e) {
            Logger.getLogger(this.getClass()).error(e.getMessage());
        }
    }

}
