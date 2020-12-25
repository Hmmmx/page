package com.cbp.core.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * TWgXtGwcdId entity. @author MyEclipse Persistence Tools
 */
@Embeddable

public class TWgXtGwcdId implements java.io.Serializable {

	// Fields

	private String gwid;
	private String cdid;

	// Constructors

	/** default constructor */
	public TWgXtGwcdId() {
	}

	/** full constructor */
	public TWgXtGwcdId(String gwid, String cdid) {
		this.gwid = gwid;
		this.cdid = cdid;
	}

	// Property accessors

	@Column(name = "gwid", nullable = false, length = 32)

	public String getGwid() {
		return this.gwid;
	}

	public void setGwid(String gwid) {
		this.gwid = gwid;
	}

	@Column(name = "cdid", nullable = false, length = 32)

	public String getCdid() {
		return this.cdid;
	}

	public void setCdid(String cdid) {
		this.cdid = cdid;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof TWgXtGwcdId))
			return false;
		TWgXtGwcdId castOther = (TWgXtGwcdId) other;

		return ((this.getGwid() == castOther.getGwid()) || (this.getGwid() != null && castOther.getGwid() != null
				&& this.getGwid().equals(castOther.getGwid())))
				&& ((this.getCdid() == castOther.getCdid()) || (this.getCdid() != null && castOther.getCdid() != null
						&& this.getCdid().equals(castOther.getCdid())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getGwid() == null ? 0 : this.getGwid().hashCode());
		result = 37 * result + (getCdid() == null ? 0 : this.getCdid().hashCode());
		return result;
	}

}