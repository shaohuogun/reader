package org.shaohuogun.reader.portal.ebook.controller;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.ebook.model.Ebook;

public abstract class Postman {

	public static void send(Properties props, String outputDir, Ebook ebook) {
		Session session = Session.getDefaultInstance(props, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(props.getProperty("mail.userName"),
						props.getProperty("mail.password"));
			}
		});

		try {
			MimeMessage mimeMessage = new MimeMessage(session);
			mimeMessage.setSubject(ebook.getName(), Utility.ENCODE_UTF8);
			mimeMessage.setFrom(new InternetAddress(props.getProperty("mail.from")));
			mimeMessage.setReplyTo(new Address[] { new InternetAddress(props.getProperty("mail.from")) });
			mimeMessage.setRecipients(MimeMessage.RecipientType.TO,
					InternetAddress.parse(props.getProperty("mail.to")));

			MimeMultipart mimeMultipart = new MimeMultipart("mixed");
			MimeBodyPart attachment = new MimeBodyPart();
			mimeMultipart.addBodyPart(attachment);
			mimeMessage.setContent(mimeMultipart);

			String ebookPath = String.format("%s/%s/%s", outputDir, ebook.getPath(), ebook.getName());
			DataSource dataSource = new FileDataSource(ebookPath);
			DataHandler dataHandler = new DataHandler(dataSource);
			attachment.setDataHandler(dataHandler);
			attachment.setFileName(MimeUtility.encodeText(ebook.getName()));
			mimeMessage.saveChanges();
			Transport.send(mimeMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

}
