package org.shaohuogun.reader.portal.picker.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;
import org.shaohuogun.common.Utility;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PickerService {
	
	@Value("${service.url.picker}")
	private String serviceUrlOfPicker;
	
	public String sendRequest(JSONObject jsonReq) throws Exception {
		if (jsonReq == null) {
			throw new NullPointerException("Request cann't be null.");
		}

		HttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(serviceUrlOfPicker);
		StringEntity params = new StringEntity(jsonReq.toString(), Utility.ENCODE_UTF8);
		httpPost.addHeader("Content-Type", "application/json;charset=UTF-8");
		httpPost.addHeader("Accept", "application/json");
		httpPost.setEntity(params);
		HttpResponse httpResp = httpClient.execute(httpPost);
		
		StatusLine statusLine = httpResp.getStatusLine();
		int statusCode = statusLine.getStatusCode();
		if (statusCode != HttpStatus.SC_OK) {
			throw new Exception("Fail to call the picker service, status code: " + statusCode);
		}
		
		InputStream is = httpResp.getEntity().getContent();
		StringBuffer sb = new StringBuffer();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		String line;
		while ((line = br.readLine()) != null) {
			sb.append(line);
		}
		
		return sb.toString();
	}

}
