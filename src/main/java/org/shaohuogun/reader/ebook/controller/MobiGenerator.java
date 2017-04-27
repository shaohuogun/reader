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
import org.shaohuogun.reader.ebook.model.Ebook;
import org.shaohuogun.reader.message.model.Message;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

public class MobiGenerator {

	private static final Logger logger = Logger.getLogger(MobiGenerator.class);

	private static final String[] templateNames = { "cover.html", "copyright.html", "toc.html", "content.html",
			"about.html", "content.opf", "toc.ncx" };

	private Configuration config;

	private final String kindlegenDir;
	
	private final String templateDir;

	private final String outputDir;
	
	private String mobiFilePath;

	private Channel channel;

	private List<Model> messages;

	public MobiGenerator(String kindlegenDir, String templateDir, String outputDir) throws Exception {
		this.kindlegenDir = kindlegenDir;
		this.templateDir = templateDir;
		this.outputDir = outputDir;
		
		Version version = new Version(2, 3, 26);
		this.config = new Configuration(version);
		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(templateDir);
		this.config.setDirectoryForTemplateLoading(new File(url.getFile()));
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
		if ((content == null) || content.isEmpty()) {
			throw new IllegalArgumentException("Content cann't be null or empty.");
		}

		if ((fileName == null) || fileName.isEmpty()) {
			throw new IllegalArgumentException("File's name cann't be null or empty.");
		}

		
		String filePath = String.format("%s/%s/%s", this.outputDir, mobiFilePath, fileName);
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

	private void generateFromTemplate(Map<String, Object> mobiMap) throws Exception {
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
		String imgDstPath = String.format("%s/%s/%s", this.outputDir, mobiFilePath, "cover.jpg");
		
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
	
	public Ebook generate(Channel channel, List<Model> messages) throws Exception {
		if (channel == null) {
			throw new NullPointerException("Channel cann't be null.");
		}
		
		if ((messages == null) || messages.isEmpty()) {
			throw new IllegalArgumentException("Messages cann't be null or empty.");
		}
		
		this.channel = channel;
		this.messages = messages;
				
		String creatorPath = String.format("%s/%s", this.outputDir, channel.getCreator());
		File creatorDir = new File(creatorPath);
        if (!creatorDir.exists()) {
            boolean isSuccess = creatorDir.mkdir();
            if (!isSuccess) {
                throw new RuntimeException("Failed to create the directory:" + creatorPath);
            }       	
        }

		String channelPath = String.format("%s/%s", creatorPath, channel.getId());
		File channelDir = new File(channelPath);
        if (!channelDir.exists()) {
            boolean isSuccess = channelDir.mkdir();
            if (!isSuccess) {
                throw new RuntimeException("Failed to create the directory:" + channelPath);
            }       	
        }
        
		String mobiFileName = channel.getName() + ".mobi";
		mobiFilePath = String.format("%s/%s", channel.getCreator(), channel.getId());
		      
		Map<String, Object> mobiMap = generateMobiMap4Template();
		generateFromTemplate(mobiMap);
		copyCoverImage();
		
		String opfFilePath = String.format("%s/%s/%s", this.outputDir, mobiFilePath, templateNames[5]);
		String cmdString = String.format("%s/kindlegen %s -o %s", this.kindlegenDir, opfFilePath, mobiFileName);
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
		
		Ebook ebook = new Ebook();
		ebook.setId(Utility.getUUID());
		ebook.setCreator(channel.getCreator());
		ebook.setChannelId(channel.getId());
		ebook.setName(mobiFileName);
		ebook.setPath(mobiFilePath);
		return ebook;
	}

}
