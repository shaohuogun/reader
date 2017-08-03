package org.shaohuogun.reader.portal.scheduler;

import java.util.Date;

import org.json.JSONObject;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerContext;
import org.shaohuogun.reader.portal.channel.model.Channel;
import org.shaohuogun.reader.portal.channel.service.ChannelService;
import org.shaohuogun.reader.portal.message.model.Message;
import org.shaohuogun.reader.portal.message.service.MessageService;
import org.shaohuogun.reader.portal.picker.model.PickableObject;
import org.shaohuogun.reader.portal.picker.service.PickerService;
import org.shaohuogun.reader.portal.plugin.quartz.QuartzConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.springframework.stereotype.Component;

@Component
@DisallowConcurrentExecution
public class SendingRequestJob implements Job {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Value("${quartz.job.sending.request.repeat-interval}")
	private long repeatInterval;

	@Value("${hook.url.channel}")
	private String hookUrlOfChannel;

	@Value("${hook.url.message}")
	private String hookUrlOfMessage;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		try {
			Scheduler scheduler = jobExecutionContext.getScheduler();
			SchedulerContext schedulerContext = scheduler.getContext();
			ApplicationContext applicationContext = (ApplicationContext) schedulerContext.get("applicationContext");
			PickerService pickerService = (PickerService) applicationContext.getBean("pickerService");

			ChannelService channelService = (ChannelService) applicationContext.getBean("channelService");
			Channel channel = channelService.getChannelByStatus(PickableObject.STATUS_INITIAL);
			if (channel != null) {
				String actionType = channel.getActionType();
				String url = channel.getUrl();
				int amount = channel.getAmount();

				JSONObject jsonContent = new JSONObject();
				jsonContent.put(PickableObject.KEY_URL, url);
				jsonContent.put(PickableObject.KEY_AMOUNT, amount);

				JSONObject jsonReq = new JSONObject();
				jsonReq.put(PickableObject.KEY_ACTION_TYPE, actionType);
				jsonReq.put(PickableObject.KEY_CONTENT, jsonContent.toString());
				jsonReq.put(PickableObject.KEY_HOOK_URL, hookUrlOfChannel);
				String serialNumber = pickerService.sendRequest(jsonReq);

				channel.setLastModifyDate(new Date());
				channel.setSerialNumber(serialNumber);
				channel.setStatus(PickableObject.STATUS_PICKING);
				channelService.modifyChannel(channel);
			}

			MessageService messageService = (MessageService) applicationContext.getBean("messageService");
			Message message = messageService.getMessageByStatus(PickableObject.STATUS_INITIAL);
			if (message != null) {
				String actionType = message.getActionType();
				String url = message.getUrl();
				int amount = message.getAmount();

				JSONObject jsonContent = new JSONObject();
				jsonContent.put(PickableObject.KEY_URL, url);
				jsonContent.put(PickableObject.KEY_AMOUNT, amount);

				JSONObject jsonReq = new JSONObject();
				jsonReq.put(PickableObject.KEY_ACTION_TYPE, actionType);
				jsonReq.put(PickableObject.KEY_CONTENT, jsonContent.toString());
				jsonReq.put(PickableObject.KEY_HOOK_URL, hookUrlOfMessage);
				String serialNumber = pickerService.sendRequest(jsonReq);

				message.setLastModifyDate(new Date());
				message.setSerialNumber(serialNumber);
				message.setStatus(PickableObject.STATUS_PICKING);
				messageService.modifyMessage(message);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	@Bean(name = "sendingRequestBean")
	public JobDetailFactoryBean sendingRequestBean() {
		return QuartzConfig.createJobDetail(this.getClass());
	}

	@Bean(name = "sendingRequestTrigger")
	public SimpleTriggerFactoryBean sendingRequestTrigger(@Qualifier("sendingRequestBean") JobDetail jobDetail) {
		return QuartzConfig.createSimpleTrigger(jobDetail, repeatInterval);
	}

}
