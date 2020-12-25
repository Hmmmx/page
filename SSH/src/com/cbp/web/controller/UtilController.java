package com.cbp.web.controller;

import java.io.File;

import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ctp.core.model.Result;
import com.ctp.core.utils.MiscUtil;
import com.ctp.web.controller.BaseController;

@Controller
public class UtilController extends BaseController {
	private static Logger logger = Logger.getLogger(UtilController.class);
	
	private static final int OVERDUE_UPLOAD_DAYS = 7; // 上传文件夹内只保存7天内的文件
	
	private static final SimpleDateFormat DATEFMT = new SimpleDateFormat("yyyy-MM-dd");
	private static final SimpleDateFormat TIMEFMT = new SimpleDateFormat("HHmmss");
	
	@RequestMapping("/keepalive")
	@ResponseBody
	public Result keepAlive(){
		return this.success();
    }
	
	@RequestMapping(value = "/jsonerror/generic")
	@ResponseBody
	public Result jsonError(HttpServletRequest request) {
		String cmd  = request.getParameter("cmd");
		if ("forceLogout".equalsIgnoreCase(cmd)) {
			return this.error("账号在另一地点登录，你被迫下线");
		} else if ("redirect".equalsIgnoreCase(cmd)) {
			return this.error("账号状态异常，请退出后重新登录");
		} else {
			return this.error("未知错误");
		}
	}
	
	@RequestMapping(value = "/error/{code}")
	public String error(@PathVariable String code, HttpServletRequest request) {
		return "error/" + code;
	}
	
	
	/**
	 * 处理文件上传，并自动清理过期文件，返回上传成功的文件信息
	 * 支持多个文件同时上传
	 * @param files 前端多个文件同时上传时使用该参数名
	 * @param file  前端单个文件上传时使用该参数名
	 * @return
	 */
	@PostMapping(value = "/upload")
	@ResponseBody
	public Result upload(MultipartFile[] files, MultipartFile file) throws Exception {
		String rootPath = this.getRoot();
		String folder = "upload"; // 文件临时保存在tomcat webapps下对应应用的upload文件夹中
		Path savePath = Paths.get(rootPath, folder, DATEFMT.format(Calendar.getInstance().getTime()));
		if (!Files.exists(savePath)) {
			try {
				Files.createDirectories(savePath);
			} catch (IOException ex) {
				logger.error("创建上传文件夹错误：", ex);
				return this.error("创建上传文件夹错误: " + ex.getLocalizedMessage());
			}
		}
		this.clearObsoleteUpload(Paths.get(rootPath, folder)); // 首先清理过期的文件
		
		boolean hasError = false;
		List<HashMap<String, Object>> tmpSavedFileList = new ArrayList<HashMap<String, Object>>();
		
		List<MultipartFile> fileList = new ArrayList<MultipartFile>();
		if (file != null) {
			fileList.add(file);
		}
		if (files != null) {
			for (int i = 0; i < files.length; i++) fileList.add(files[i]);
		}
		
		for (int i=0; i<fileList.size(); i++) {
			MultipartFile f = fileList.get(i);
			
			String fileName = MiscUtil.asFileName(f.getOriginalFilename());
			fileName = MiscUtil.rename(fileName, TIMEFMT.format(new Date())+MiscUtil.randomInt(1000, 9999));
			if (StringUtils.isNotBlank(fileName)) { // 忽略文件名为空的请求
				Path targetPath = savePath.resolve(fileName);
				int modifier = 1;
				while (Files.exists(targetPath)) { //有相同文件名，重命名文件
					String newname = MiscUtil.rename(fileName, Integer.toString(modifier));
					targetPath = savePath.resolve(newname);
					modifier++;
				}
	
				try {
					File tmpFile = new File(targetPath.toString());
					f.transferTo(tmpFile);
					HashMap<String, Object> fileInfo = new HashMap<String, Object>();
					fileInfo.put("name", f.getOriginalFilename());
					fileInfo.put("type", tmpFile.getName().substring(tmpFile.getName().lastIndexOf('.') + 1));
					fileInfo.put("path", tmpFile.getAbsolutePath().substring(rootPath.toString().length()-1).replaceAll("\\\\", "/"));
					String mimeType = URLConnection.guessContentTypeFromName(f.getName());
			        if (mimeType == null) mimeType = "application/octet-stream";
			        fileInfo.put("mime", mimeType);
					fileInfo.put("size", tmpFile.length());
					tmpSavedFileList.add(fileInfo);
				} catch (Exception ex) {
					logger.error("导入上传的文件错误：", ex);
					hasError = true;
					break;
				}
			}
		}
		
		if (hasError) {
			return this.error("上传的文件错误");
		} else {
			return this.success(tmpSavedFileList);
		}

	}
	
	private void clearObsoleteUpload(Path target) {
		try (Stream<Path> subPaths = Files.list(target)) {
			long overdue = (new Date()).getTime() - 24 * 3600 * 1000 * OVERDUE_UPLOAD_DAYS;
			List<Path> subPathList = subPaths.collect(Collectors.toList());
			for (Path path: subPathList) {
				if (overdue - Files.getLastModifiedTime(path).toMillis() > 0) {
					//if (Files.isDirectory(path)) clearObsoleteUpload(path);
					//Files.deleteIfExists(path);
					MiscUtil.deletePathFiles(path, true);
				}
			}
		} catch(IOException ex) {
			logger.error("清除过期上传文件错误 (此异常不重复出现可忽略)：", ex);
		}
	}
}
