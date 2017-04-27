package org.shaohuogun.reader.publisher.controller;

import javax.servlet.http.HttpServletRequest;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.publisher.model.Publisher;
import org.shaohuogun.reader.publisher.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublisherController extends Controller {

	@Autowired
	private PublisherService publisherService;

	@RequestMapping(value = "/api/publisher", method = RequestMethod.POST)
	public Publisher createPublisher(HttpServletRequest req, @RequestBody Publisher publisher) throws Exception {
		publisher.setId(Utility.getUUID());
		publisher.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");		
		return publisherService.createPublisher(publisher);
	}

	@RequestMapping(value = "/api/publisher/{id}", method = RequestMethod.GET)
	public Publisher getPublisher(@PathVariable String id) throws Exception {
		return publisherService.getPublisher(id);
	}

}
