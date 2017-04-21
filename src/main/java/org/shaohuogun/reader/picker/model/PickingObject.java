package org.shaohuogun.reader.picker.model;

import javax.validation.constraints.Min;

import org.shaohuogun.common.Model;

public abstract class PickingObject extends Model {

	private static final long serialVersionUID = 1L;
	
	public final static String KEY_TARGET_URL = "targetUrl";
	public final static String KEY_TARGET_TYPE = "targetType";
	public final static String KEY_BATCH_NO = "batchNo";

	public static final String STATUS_INITIAL = "initial";
	public static final String STATUS_PICKING = "picking";
	public static final String STATUS_FINISHED = "finished";

	private String pickingStatus = STATUS_INITIAL;

	private String pickingBatchNo;
	
	@Min(value = 1, message = "最小值为：1")
	private Integer pickingAmount = 1;

	private Integer pickingCount = 0;

	public abstract String getPickingType();

	public String getPickingStatus() {
		return pickingStatus;
	}

	public void setPickingStatus(String pickingStatus) {
		this.pickingStatus = pickingStatus;
	}

	public String getPickingBatchNo() {
		return pickingBatchNo;
	}

	public void setPickingBatchNo(String pickingBatchNo) {
		this.pickingBatchNo = pickingBatchNo;
	}

	public Integer getPickingAmount() {
		return pickingAmount;
	}

	public void setPickingAmount(Integer pickingAmount) {
		this.pickingAmount = pickingAmount;
	}

	public Integer getPickingCount() {
		return pickingCount;
	}

	public void setPickingCount(Integer pickingCount) {
		this.pickingCount = pickingCount;
	}

}
