package com.cbp.core.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * TXtJgcdId entity. @author MyEclipse Persistence Tools
 */
@Embeddable

public class TXtJgcdId implements java.io.Serializable {

	// Fields

	private String jgid;
	private String cdid;

	// Constructors

	/** default constructor */
	public TXtJgcdId() {
	}

	/** full constructor */
	public TXtJgcdId(String jgid, String cdid) {
		this.jgid = jgid;
		this.cdid = cdid;
	}

	// Property accessors

	@Column(name = "jgid", nullable = false, length = 32)

	public String getJgid() {
		return this.jgid;
	}

	public void setJgid(String jgid) {
		this.jgid = jgid;
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
		if (!(other instanceof TXtJgcdId))
			return false;
		TXtJgcdId castOther = (TXtJgcdId) other;

		return ((this.getJgid() == castOther.getJgid()) || (this.getJgid() != null && castOther.getJgid() != null
				&& this.getJgid().equals(castOther.getJgid())))
				&& ((this.getCdid() == castOther.getCdid()) || (this.getCdid() != null && castOther.getCdid() != null
						&& this.getCdid().equals(castOther.getCdid())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getJgid() == null ? 0 : this.getJgid().hashCode());
		result = 37 * result + (getCdid() == null ? 0 : this.getCdid().hashCode());
		return result;
	}

}