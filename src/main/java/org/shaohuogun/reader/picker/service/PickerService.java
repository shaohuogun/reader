package org.shaohuogun.reader.picker.service;

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
	
	@Value("${picker.service.url}")
	private String pickerServiceUrl;
	
	public void sendRequest(JSONObject jsonRequest) throws Exception {
		if (jsonRequest == null) {
			throw new Exception("Invalid argument.");
		}

		HttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost(pickerServiceUrl);
		StringEntity params = new StringEntity(jsonRequest.toString(), Utility.ENCODE_UTF8);
		httpPost.addHeader("Content-Type", "application/json;charset=UTF-8");
		httpPost.addHeader("Accept", "application/json");
		httpPost.setEntity(params);
		HttpResponse httpResponse = httpClient.execute(httpPost);

		StatusLine statusLine = httpResponse.getStatusLine();
		int statusCode = statusLine.getStatusCode();
		if (statusCode != HttpStatus.SC_OK) {
			throw new Exception("Fail to request the picker service.");
		}
	}

}
