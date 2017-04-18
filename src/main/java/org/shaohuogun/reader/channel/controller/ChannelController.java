package org.shaohuogun.reader.channel.controller;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.publisher.model.Publisher;
import org.shaohuogun.reader.publisher.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChannelController extends Controller {

	@Autowired
	private PublisherService publisherService;

	@Autowired
	private ChannelService channelService;

	@RequestMapping(value = "/api/publisher/{id}/channel", method = RequestMethod.POST)
	public Channel createChannel(@PathVariable String id, @RequestBody Channel channel) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		Publisher publisher = publisherService.getPublisher(id);
		if (publisher == null) {
			throw new Exception("Invalid argument.");
		}

		channel.setId(Utility.getUUID());
		channel.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		channel.setPublisherId(id);
		channel.setPickingBatchNo(Utility.getUUID());

		return channelService.createChannel(channel);
	}

	@RequestMapping(value = "/api/channel/{id}", method = RequestMethod.GET)
	public Channel getChannel(@PathVariable String id) throws Exception {
		if ((id == null) || id.isEmpty()) {
			throw new Exception("Invalid argument.");
		}

		return channelService.getChannel(id);
	}

	@RequestMapping(value = "/api/channel", method = RequestMethod.GET)
	public Pagination getChannels(@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = channelService.getChannelCountByCreator(creator);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return channelService.getChannelsByCreator(creator, pagination);
	}

}
