package org.shaohuogun.reader.portal.ebook.service;

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
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.PortalConstants;
import org.shaohuogun.reader.portal.ebook.model.Ebook;
import org.shaohuogun.reader.portal.message.model.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

@Service
public class MobiGenerator {

	private static final Logger logger = Logger.getLogger(MobiGenerator.class);

	private static final String[] templateNames = { "cover.html", "copyright.html", "toc.html", "content.html",
			"about.html", "content.opf", "toc.ncx" };

	@Value("${ebook.kindlegen.dir}")
	private String kindlegenDir;

	@Value("${ebook.template.mobi.dir}")
	private String templateDir;

	@Value("${ebook.output.mobi.dir}")
	private String outputDir;
	
	public String getOutputDir() {
		return outputDir;
	}

	private Map<String, Object> generateDataModel(final String categoryId, final String categoryName, final List<Message> messages) throws Exception {
		if (categoryId == null) {
			throw new NullPointerException("Category's id cann't be null.");
		}

		if (categoryName == null) {
			throw new NullPointerException("Category's name cann't be null.");
		}
		
		if ((messages == null) || messages.isEmpty()) {
			throw new IllegalArgumentException("Messages cann't be null or empty.");
		}
		
		Map<String, Object> dataModel = new HashMap<String, Object>();
		dataModel.put("channelId", categoryId);
		dataModel.put("channelName", categoryName);
		dataModel.put("uuid", Utility.getMd5Code(categoryName.getBytes()));
		dataModel.put("format", "periodical");
		dataModel.put("createTime", new Date());
		dataModel.put("messageCount", messages.size());

		List<HashMap<String, Object>> messageMaps = new ArrayList<HashMap<String, Object>>();
		for (int i = 0; i < messages.size(); i++) {
			Message message = messages.get(i);
			HashMap<String, Object> messageMap = new HashMap<String, Object>();

			String title = message.getTitle().replace('<', '[').replace('>', ']');
			messageMap.put("title", title);
			messageMap.put("releaseDate", message.getReleaseDate());
			messageMap.put("url", message.getUrl());
			messageMap.put("content", message.getContent());
			messageMaps.add(messageMap);
		}

		dataModel.put("messages", messageMaps);
		return dataModel;
	}

	private void outputContent2File(final String content, final String filePath) throws Exception {
		if ((content == null) || content.isEmpty()) {
			throw new IllegalArgumentException("Content cann't be null or empty.");
		}

		if ((filePath == null) || filePath.isEmpty()) {
			throw new IllegalArgumentException("File's path cann't be null or empty.");
		}

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

	private void executeTemplate(final Map<String, Object> dataModel, final String ebookPath) throws Exception {
		if ((dataModel == null) || dataModel.isEmpty()) {
			throw new IllegalArgumentException("Data model cann't be null or empty.");
		}
		
		if ((ebookPath == null) || ebookPath.isEmpty()) {
			throw new IllegalArgumentException("Ebook's path cann't be null or empty.");
		}
		
		Version version = new Version(2, 3, 26);
		Configuration config = new Configuration(version);
		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(templateDir);
		config.setDirectoryForTemplateLoading(new File(url.getFile()));
		
		for (int i = 0; i < templateNames.length; i++) {
			String templateName = templateNames[i];
			Template template = config.getTemplate(templateName);
			StringWriter sw = new StringWriter();
			template.process(dataModel, sw);
			sw.flush();
			StringBuffer sb = sw.getBuffer();
			sw.close();

			String filePath = String.format("%s/%s", ebookPath, templateName);
			outputContent2File(sb.toString(), filePath);
		}
	}

	private void copyCoverImage(String ebookPath) throws Exception {
		if ((ebookPath == null) || ebookPath.isEmpty()) {
			throw new IllegalArgumentException("Ebook's path cann't be null or empty.");
		}
		
		ClassLoader classLoader = getClass().getClassLoader();
		URL url = classLoader.getResource(this.templateDir);
		String imgSrcPath = String.format("%s/%s", url.getFile(), "cover.jpg");
		String imgDstPath = String.format("%s/%s", ebookPath, "cover.jpg");

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
	
	public Ebook generate(final String creator, final String categoryId, final String categoryName, List<Message> messages) throws Exception {
		if (creator == null) {
			throw new NullPointerException("Creator cann't be null.");
		}
		
		if (categoryId == null) {
			throw new NullPointerException("Category's id cann't be null.");
		}

		if (categoryName == null) {
			throw new NullPointerException("Category's name cann't be null.");
		}
		
		if ((messages == null) || messages.isEmpty()) {
			throw new IllegalArgumentException("Messages cann't be null or empty.");
		}
		
		String ebookPath = String.format("%s/%s", this.outputDir, creator);
		File ebookDir = new File(ebookPath);
		if (!ebookDir.exists()) {
			boolean isSuccess = ebookDir.mkdir();
			if (!isSuccess) {
				throw new RuntimeException("Failed to create the directory:" + ebookPath);
			}
		}
		
		ebookPath = String.format("%s/%s", ebookPath, categoryId);
		ebookDir = new File(ebookPath);
		if (!ebookDir.exists()) {
			boolean isSuccess = ebookDir.mkdir();
			if (!isSuccess) {
				throw new RuntimeException("Failed to create the directory:" + ebookPath);
			}
		}
		
		Map<String, Object> dataModel = generateDataModel(categoryId, categoryName, messages);
		executeTemplate(dataModel, ebookPath);
		copyCoverImage(ebookPath);
		
		String opfFilePath = String.format("%s/%s", ebookPath, templateNames[5]);
		String ebookName = String.format("%s.%s", categoryName, Ebook.FORMAT_MOBI);
		String cmdString = String.format("%s/kindlegen %s -o %s", this.kindlegenDir, opfFilePath, ebookName);
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
		ebook.setCreator(creator);
		ebook.setCategoryType(PortalConstants.CATEGORY_TYPE_CHANNEL);
		ebook.setCategoryId(categoryId);
		ebook.setFormat(Ebook.FORMAT_MOBI);
		ebook.setName(ebookName);
		String subPath = String.format("%s/%s", creator, categoryId);
		ebook.setPath(subPath);
		return ebook;
	}

}
