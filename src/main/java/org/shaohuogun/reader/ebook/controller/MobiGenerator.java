package org.shaohuogun.reader.ebook.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.shaohuogun.common.Model;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.message.model.Message;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

public class MobiGenerator {

	private static final Logger logger = Logger.getLogger(MobiGenerator.class);

	private static final String[] templateNames = { "cover.html", "copyright.html", "toc.html", "content.html",
			"about.html", "content.opf", "toc.ncx" };

	private Configuration config;

	private final String kindlegenPath;
	
	private final String templateDir;

	private final String outputDir;

	private Channel channel;

	private List<Model> messages;

	public MobiGenerator(String kindlegenPath, String templateDir, String outputDir) throws Exception {
		this.kindlegenPath = kindlegenPath;
		Version version = new Version(2, 3, 26);
		this.config = new Configuration(version);
		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(templateDir);
		this.config.setDirectoryForTemplateLoading(new File(url.getFile()));
		this.templateDir = templateDir;
		this.outputDir = outputDir;
	}

	private Map<String, Object> generateMobiMap4Template() throws Exception {
		Map<String, Object> mobiMap = new HashMap<String, Object>();
		mobiMap.put("channelId", channel.getId());
		mobiMap.put("channelName", channel.getName());
		mobiMap.put("uuid", Utility.getMd5Code(channel.getName().getBytes()));
		mobiMap.put("format", "periodical");
		mobiMap.put("createTime", new Date());
		mobiMap.put("messageCount", messages.size());

		List<HashMap<String, Object>> messageMaps = new ArrayList<HashMap<String, Object>>();
		for (Model model : messages) {
			if (model instanceof Message) {
				Message message = (Message) model;
				HashMap<String, Object> messageMap = new HashMap<String, Object>();

				String title = message.getTitle().replace('<', '[').replace('>', ']');
				messageMap.put("title", title);
				messageMap.put("releaseDate", message.getReleaseDate());
				messageMap.put("url", message.getUrl());
				messageMap.put("content", message.getDigest());

				messageMaps.add(messageMap);
			}
		}

		mobiMap.put("messages", messageMaps);
		return mobiMap;
	}

	private void outputContent2File(final String content, final String fileName) throws Exception {
		if ((content == null) || content.isEmpty() || (fileName == null) || fileName.isEmpty()) {
			throw new NullPointerException("Content and file's name cann't be null or empty.");
		}

		String filePath = String.format("%s/%s", this.outputDir, fileName);
		File newFile = new File(filePath);
		if (!newFile.exists()) {
			if (!newFile.createNewFile()) {
				throw new RuntimeException("Failed to create a new file: " + filePath);
			}
		}

		FileOutputStream outputStream = new FileOutputStream(newFile);
		outputStream.write(content.getBytes());
		outputStream.close();
	}

	private void generateTemplateFile(Map<String, Object> mobiMap) throws Exception {
		for (int i = 0; i < templateNames.length; i++) {
			String templateName = templateNames[i];
			Template template = this.config.getTemplate(templateName);
			StringWriter sw = new StringWriter();
			template.process(mobiMap, sw);
			sw.flush();
			StringBuffer sb = sw.getBuffer();
			sw.close();
			outputContent2File(sb.toString(), templateName);
		}
	}
	
	private void copyCoverImage() throws Exception {
		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(this.templateDir);
		String imgSrcPath = String.format("%s/%s", url.getFile(), "cover.jpg");
		String imgDstPath = String.format("%s/%s", this.outputDir, "cover.jpg");
		
		File imgSrcFile = new File(imgSrcPath);
		File imgDstFile = new File(imgDstPath);
		FileInputStream is = new FileInputStream(imgSrcFile);
		FileOutputStream os = new FileOutputStream(imgDstFile);
		
		int readSize = 0;
		byte[] readByte = new byte[1024];
		while ((readSize = is.read(readByte)) != -1) {
			os.write(readByte, 0, readSize);
		}
		
		is.close();
		os.close();
	}

	private String generateMobi() throws Exception {
		copyCoverImage();
		
		String mobiFileName = channel.getName() + ".mobi";
		String opfFilePath = String.format("%s/%s", this.outputDir, templateNames[5]);

		String cmdString = String.format("%s/kindlegen %s -o %s", this.kindlegenPath, opfFilePath, mobiFileName);
		Process process = Runtime.getRuntime().exec(cmdString);
		process.waitFor();

		String result = "";
		String tempString;
		InputStream is = process.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		while ((tempString = br.readLine()) != null) {
			result += tempString;
		}
		is.close();

		logger.info(result);
		return String.format("%s/%s", this.outputDir, mobiFileName);
	}

	public String generate(Channel channel, List<Model> messages) throws Exception {
		this.channel = channel;
		this.messages = messages;
		Map<String, Object> mobiMap = this.generateMobiMap4Template();
		this.generateTemplateFile(mobiMap);
		return this.generateMobi();
	}

}
