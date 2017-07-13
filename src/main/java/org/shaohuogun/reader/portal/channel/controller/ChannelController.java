package org.shaohuogun.reader.portal.channel.controller;

import org.shaohuogun.common.Controller;
import org.shaohuogun.common.Pagination;
import org.shaohuogun.common.Utility;
import org.shaohuogun.reader.portal.channel.model.Channel;
import org.shaohuogun.reader.portal.channel.service.ChannelService;
import org.shaohuogun.reader.portal.progress.model.Progress;
import org.shaohuogun.reader.portal.progress.service.ProgressService;
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
	
	@Autowired
	private ProgressService progressService;

	@RequestMapping(value = "/api/channel", method = RequestMethod.POST)
	public Channel createChannel(@RequestBody @Validated Channel channel) throws Exception {		
		channel.setId(Utility.getUUID());
		channel.setCreator("a11039eb-4ba1-441a-bfdb-0d40f61a53dd");
		channel.setPickingBatchNo(Utility.getUUID());

		channel = channelService.createChannel(channel);
		Progress progress = new Progress();
		progress.setId(channel.getId());
		progressService.addProgress(progress);
		return channel;
	}

	@RequestMapping(value = "/api/channel/{id}", method = RequestMethod.GET)
	public Channel getChannel(@PathVariable String id) throws Exception {
		return channelService.getChannel(id);
	}

	@RequestMapping(value = "/api/mychannels", method = RequestMethod.GET)
	public Pagination getMyChannels(@RequestParam(defaultValue = "1", required = false) int page) throws Exception {
		String creator = "a11039eb-4ba1-441a-bfdb-0d40f61a53dd";

		int total = channelService.getChannelCountOfCreator(creator);
		Pagination pagination = new Pagination();
		pagination.setTotal(total);
		pagination.setPageIndex(page);
		return channelService.getChannelsOfCreator(creator, pagination);
	}

}
