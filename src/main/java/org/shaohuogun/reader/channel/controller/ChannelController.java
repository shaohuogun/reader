package org.shaohuogun.reader.channel.controller;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChannelController extends Controller {

	@Autowired
	private ChannelService channelService;

	@RequestMapping(value = "/api/channel", method = RequestMethod.POST)
	public Channel createChannel(@RequestBody @Validated Channel channel) throws Exception {		
		channel.setId(Utility.getUUID());
		channel.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		channel.setPickingBatchNo(Utility.getUUID());

		return channelService.createChannel(channel);
	}

	@RequestMapping(value = "/api/channel/{id}", method = RequestMethod.GET)
	public Channel getChannel(@PathVariable String id) throws Exception {
		return channelService.getChannel(id);
	}

	@RequestMapping(value = "/api/channels", method = RequestMethod.GET)
	public Pagination getChannels(@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = channelService.getChannelCountOfCreator(creator);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return channelService.getChannelsOfCreator(creator, pagination);
	}

}
