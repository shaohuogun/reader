package org.shaohuogun.reader.portal.picker.model;

import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.URL;
import org.shaohuogun.common.Model;

public abstract class PickableObject extends Model {

	private static final long serialVersionUID = 1L;
	
	public final static String KEY_ACTION_TYPE = "actionType";
	public final static String KEY_SERIAL_NUMBER = "serialNumber";
	public final static String KEY_URL = "url";
	public final static String KEY_AMOUNT = "amount";
	public static final String KEY_CONTENT = "content";
	public static final String KEY_HOOK_URL = "hookUrl";	

	public static final String STATUS_INITIAL = "initial";
	public static final String STATUS_PICKING = "picking";
	public static final String STATUS_PICKED = "picked";

	private String serialNumber;
	
	@URL(message = "请输入格式正确的URL！")
	private String url;
	
	@Min(value = 1, message = "最小值为：1")
	private Integer amount = 1;

	private Integer count = 0;
	
	private String status = STATUS_INITIAL;
	
	public abstract String getActionType();
	
	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Integer getCount() {
		return count;
	}
	
	public void setCount(Integer count) {
		this.count = count;
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
}
