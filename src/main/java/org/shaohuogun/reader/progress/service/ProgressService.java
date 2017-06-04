package org.shaohuogun.reader.progress.service;

import java.util.HashMap;
import java.util.Map;

import org.shaohuogun.reader.progress.model.Progress;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {
	
	private Map<String, Progress> progressMap = new HashMap<String, Progress>();
	
	public void addProgress(Progress progress) {
		if (progress == null) {
			throw new IllegalArgumentException("Progress cann't be null or empty.");
		}
		
		if (progressMap.containsKey(progress.getId())) {
			throw new IllegalArgumentException("Progress's name is in conflict.");
		}
		
		progressMap.put(progress.getId(), progress);
	}
	
	public void incProgressAmount(String name, Integer value) {
		if ((name == null) || name.isEmpty()) {
			throw new IllegalArgumentException("Name cann't be null or empty.");
		}
		
		if (value == null) {
			throw new IllegalArgumentException("Value cann't be null or empty.");
		}
		
		Progress progress = progressMap.get(name);
		progress.setAmount(progress.getAmount() + value);
		progressMap.put(name, progress);
	}
	
	public void incProgressCount(String name, Integer value) {
		if ((name == null) || name.isEmpty()) {
			throw new IllegalArgumentException("Name cann't be null or empty.");
		}
		
		if (value == null) {
			throw new IllegalArgumentException("Value cann't be null or empty.");
		}
		
		Progress progress = progressMap.get(name);
		progress.setCount(progress.getCount() + value);
		progressMap.put(name, progress);
	}
	
	public Progress getProgress(String name) {
		if ((name == null) || name.isEmpty()) {
			throw new IllegalArgumentException("Name cann't be null or empty.");
		}
		
		return progressMap.get(name);
	}
	
}
