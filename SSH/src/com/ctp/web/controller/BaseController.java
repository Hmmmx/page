
/*
 * Copyright 2019. All rights reserved.
 */
package com.ctp.web.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ctp.core.exception.BizException;
import com.ctp.core.model.Result;
import com.ctp.core.utils.MiscUtil;


public class BaseController {
	private final Logger log = LoggerFactory.getLogger(BaseController.class);

	private static final SimpleDateFormat SHORT_DATE_FMT = new SimpleDateFormat("yyyy-MM-dd");
	
	@Autowired
	private HttpServletRequest request;

	protected HttpServletRequest getRequest() {
		return this.request;
	}
	protected String getPtlx() {// 0：平台 1：运营 2：社区
		return (String) request.getSession().getAttribute("ptlx");
	}
	protected String getJglx() {//1:物业公司，0：社区
		return (String) request.getSession().getAttribute("jglx");
	}
	protected String getYhlx() {//1:管理员，0：普通用户
		return (String) request.getSession().getAttribute("yhlx");
	}
	protected String getSjjgid() {
		return (String) request.getSession().getAttribute("sjjgid");
	}
	protected String getSjjgdm() {
		return (String) request.getSession().getAttribute("sjjgdm");
	}
	protected String getSjjgmc() {
		return (String) request.getSession().getAttribute("sjjgmc");
	}
	protected String getJgid() {
		return (String) request.getSession().getAttribute("jgid");
	}
	protected String getJgdm() {
		return (String) request.getSession().getAttribute("jgdm");
	}
	protected String getJgmc() {
		return (String) request.getSession().getAttribute("jgmc");
	}
	protected String getJgSyqxz() {
		return (String) request.getSession().getAttribute("jgsyqxz");
	}
	protected String getYhid() {
		return (String) request.getSession().getAttribute("yhid");
	}
	protected String getYhdm() {
		return (String) request.getSession().getAttribute("yhdm");
	}
	protected String getYhmc() {
		return (String) request.getSession().getAttribute("yhmc");
	}
	protected String getGwid() {
		return (String) request.getSession().getAttribute("gwid");
	}
	protected String getRoot() {
		return this.request.getSession().getServletContext().getRealPath("/");
	}
	protected String getRelativePath(String path) { // 取相对根目录的相对路径;
		return path.substring(this.getRoot().length()-1).replaceAll("\\\\", "/");
	}
	protected String getRelativePath(Path path) {
		return this.getRelativePath(path.toAbsolutePath().toString());
	}

	protected Result success() {
		return Result.success(null);
	}

	protected Result error() {
		return Result.error(null);
	}

	protected Result success(String message) {
		return Result.success(message);
	}

	protected Result error(String message) {
		return Result.error(message);
	}

	protected Result success(Object data) {
		return success(null, data);
	}

	protected Result success(String message, Object data) {
		Result result = Result.success(message);
		result.put("data", data);
		return result;
	}

	@ExceptionHandler(value = { Exception.class, RuntimeException.class })
	@ResponseBody
	private Result handleExceptions(Exception e) {
		if (e instanceof BizException) {
			log.error("异常信息 => ".concat(e.getMessage()));
		} else {
			log.error("异常信息 => ", e);
		}
		return this.error(e != null ? e.getMessage() : "");
	}

	/**
	 *  持久化临时文件到目标目录中，返回相应的路径
	 * @param tmpFile
	 * @return
	 * @throws IOException
	 */
	protected String persistFile(String type, String tmpFile) throws IOException{
		String rootPath = this.getRoot(); // 文件保存在tomcat webapps下 
		Path savePath = Paths.get(rootPath, "persistence", type, SHORT_DATE_FMT.format(Calendar.getInstance().getTime()));
		if (!Files.exists(savePath)) {
			Files.createDirectories(savePath);
		}
	
		Path target = savePath.resolve(MiscUtil.parseFileName(tmpFile));
		Files.copy(Paths.get(rootPath, tmpFile), target); // 从临时文件夹中复制，保存到永久目录中
		return target.toString().substring(rootPath.length()-1).replaceAll("\\\\", "/");
	}
	
	/**
	 * 判断当前文件路径是否在永久目录persistence下
	 * @param file
	 * @return
	 * @throws IOException
	 */
	protected boolean isPersistentFile(String file) throws IOException{
		return file.indexOf("/persistence/") > -1;
	}
}
