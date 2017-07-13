package org.shaohuogun.reader.portal.progress.model;

public class Progress {
	
	private String id;
	
	private Integer amount = 0;
	
	private Integer count = 0;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
	
	public Integer getPercentage() {
		if (this.amount == 0) {
			return 0;
		}
		
		return Math.floorDiv((this.count * 100), this.amount);
	}
	
}
