package org.shaohuogun.reader.scheduler;

import java.util.Date;

import org.json.JSONObject;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerContext;
import org.shaohuogun.reader.channel.model.Channel;
import org.shaohuogun.reader.channel.service.ChannelService;
import org.shaohuogun.reader.message.model.Message;
import org.shaohuogun.reader.message.service.MessageService;
import org.shaohuogun.reader.picker.model.PickableObject;
import org.shaohuogun.reader.picker.service.PickerService;
import org.shaohuogun.reader.plugin.quartz.QuartzConfig;
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
public class PickingRequestJob implements Job {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Value("${quartz.job.picking.request.repeat-interval}")
	private long repeatInterval;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		try {
			Scheduler scheduler = jobExecutionContext.getScheduler();
			SchedulerContext schedulerContext = scheduler.getContext();
			ApplicationContext applicationContext = (ApplicationContext) schedulerContext.get("applicationContext");
			PickerService pickerService = (PickerService) applicationContext.getBean("pickerService");

			ChannelService channelService = (ChannelService) applicationContext.getBean("channelService");
			Channel channel = channelService.getChannelByPickingStatus(PickableObject.STATUS_INITIAL);
			if (channel != null) {
				String targetUrl = channel.getUrl();
				String targetType = channel.getPickingType();
				String batchNo = channel.getPickingBatchNo();
				if (channel.getPickingAmount() > 1) {
					for (int i = 1; i <= channel.getPickingAmount(); i++) {
						JSONObject jsonRequest = new JSONObject();
						jsonRequest.put(PickableObject.KEY_TARGET_URL, (targetUrl + i));
						jsonRequest.put(PickableObject.KEY_TARGET_TYPE, targetType);
						jsonRequest.put(PickableObject.KEY_BATCH_NO, batchNo);
						pickerService.sendRequest(jsonRequest);
					}
				} else {
					JSONObject jsonRequest = new JSONObject();
					jsonRequest.put(PickableObject.KEY_TARGET_URL, targetUrl);
					jsonRequest.put(PickableObject.KEY_TARGET_TYPE, targetType);
					jsonRequest.put(PickableObject.KEY_BATCH_NO, batchNo);
					pickerService.sendRequest(jsonRequest);
				}

				channel.setLastModifyDate(new Date());
				channel.setPickingStatus(PickableObject.STATUS_PICKING);
				channelService.modifyChannel(channel);
			}

			MessageService messageService = (MessageService) applicationContext.getBean("messageService");
			Message message = messageService.getMessageByPickingStatus(PickableObject.STATUS_INITIAL);
			if (message != null) {
				String targetUrl = message.getUrl();
				String targetType = message.getPickingType();
				String batchNo = message.getPickingBatchNo();
				if (message.getPickingAmount() > 1) {
					for (int i = 1; i <= message.getPickingAmount(); i++) {
						targetUrl += i;

						JSONObject jsonRequest = new JSONObject();
						jsonRequest.put(PickableObject.KEY_TARGET_URL, targetUrl);
						jsonRequest.put(PickableObject.KEY_TARGET_TYPE, targetType);
						jsonRequest.put(PickableObject.KEY_BATCH_NO, batchNo);
						pickerService.sendRequest(jsonRequest);
					}
				} else {
					JSONObject jsonRequest = new JSONObject();
					jsonRequest.put(PickableObject.KEY_TARGET_URL, targetUrl);
					jsonRequest.put(PickableObject.KEY_TARGET_TYPE, targetType);
					jsonRequest.put(PickableObject.KEY_BATCH_NO, batchNo);
					pickerService.sendRequest(jsonRequest);
				}

				message.setLastModifyDate(new Date());
				message.setPickingStatus(PickableObject.STATUS_PICKING);
				messageService.modifyMessage(message);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	@Bean(name = "pickingRequestBean")
	public JobDetailFactoryBean pickingRequestBean() {
		return QuartzConfig.createJobDetail(this.getClass());
	}

	@Bean(name = "pickingRequestTrigger")
	public SimpleTriggerFactoryBean pickingRequestTrigger(@Qualifier("pickingRequestBean") JobDetail jobDetail) {
		return QuartzConfig.createSimpleTrigger(jobDetail, repeatInterval);
	}

}
