package com.cbp.core.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * TWgXtJgcdId entity. @author MyEclipse Persistence Tools
 */
@Embeddable

public class TWgXtJgcdId implements java.io.Serializable {

	// Fields

	private String sqid;
	private String cdid;

	// Constructors

	/** default constructor */
	public TWgXtJgcdId() {
	}

	/** full constructor */
	public TWgXtJgcdId(String sqid, String cdid) {
		this.sqid = sqid;
		this.cdid = cdid;
	}

	// Property accessors

	@Column(name = "sqid", nullable = false, length = 32)

	public String getSqid() {
		return this.sqid;
	}

	public void setSqid(String sqid) {
		this.sqid = sqid;
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
		if (!(other instanceof TWgXtJgcdId))
			return false;
		TWgXtJgcdId castOther = (TWgXtJgcdId) other;

		return ((this.getSqid() == castOther.getSqid()) || (this.getSqid() != null && castOther.getSqid() != null
				&& this.getSqid().equals(castOther.getSqid())))
				&& ((this.getCdid() == castOther.getCdid()) || (this.getCdid() != null && castOther.getCdid() != null
						&& this.getCdid().equals(castOther.getCdid())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getSqid() == null ? 0 : this.getSqid().hashCode());
		result = 37 * result + (getCdid() == null ? 0 : this.getCdid().hashCode());
		return result;
	}

}