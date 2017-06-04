package org.shaohuogun.reader.progress.controller;

import org.shaohuogun.common.Controller;
import org.shaohuogun.reader.progress.model.Progress;
import org.shaohuogun.reader.progress.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgressController extends Controller {
	
	@Autowired
	private ProgressService progressService;

	@RequestMapping(value = "/api/progress/{name}", method = RequestMethod.GET)
	public Integer getProgress(@PathVariable String name) throws Exception {
		Progress progress = progressService.getProgress(name);
		return progress.getPercentage();
	}
	
}
