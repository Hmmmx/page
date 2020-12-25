package com.cbp.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TWgXtSplittable entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_wg_xt_splittable")

public class TWgXtSplittable implements java.io.Serializable {

	// Fields

	private String id;
	private String oldTable;
	private String jgDm;
	private String newTable;

	// Constructors

	/** default constructor */
	public TWgXtSplittable() {
	}

	/** minimal constructor */
	public TWgXtSplittable(String id) {
		this.id = id;
	}

	/** full constructor */
	public TWgXtSplittable(String id, String oldTable, String jgDm, String newTable) {
		this.id = id;
		this.oldTable = oldTable;
		this.jgDm = jgDm;
		this.newTable = newTable;
	}

	// Property accessors
	@Id

	@Column(name = "id", unique = true, nullable = false, length = 32)

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "old_table", length = 100)

	public String getOldTable() {
		return this.oldTable;
	}

	public void setOldTable(String oldTable) {
		this.oldTable = oldTable;
	}

	@Column(name = "jg_dm", length = 32)

	public String getJgDm() {
		return this.jgDm;
	}

	public void setJgDm(String jgDm) {
		this.jgDm = jgDm;
	}

	@Column(name = "new_table", length = 100)

	public String getNewTable() {
		return this.newTable;
	}

	public void setNewTable(String newTable) {
		this.newTable = newTable;
	}

}