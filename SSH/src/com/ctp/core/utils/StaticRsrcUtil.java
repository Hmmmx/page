package com.ctp.core.utils;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 获取静态资源文件，或资源文件的一些属性
 * @author Stanley
 *
 */
public class StaticRsrcUtil {
	private static String RSRC_ROOT= null;
	//private static Map<String, Long> CACHE_RSRC_MAP = new HashMap<String, Long>();
	static {
		try {
			RSRC_ROOT = URLDecoder.decode(StaticRsrcUtil.class.getResource("/").getPath(), "UTF-8") + "../.."; // Web项目根目录: WebRoot / WebContent
		} catch (Exception ex) {
			//
		}
	}
	
	/**
	 * 获取静态资源文件的版本号。
	 * 用于在jsp页面中可以给单独的静态文件配置相应文件的版本号，以解决浏览器缓存的问题。
	 * 如 /resources/js/test.js?v=92378438 (不同的版本号作为参数浏览器会认为是不同的URL，会重新下载URL的内容)
	 * @param file
	 * @return 带版本号的文件路径
	 */
	public static String appendVersion(String file) { // 以日期时间戳作为文件的版本号
		try {
			/*if (!CACHE_RSRC_MAP.containsKey(file)) {
				CACHE_RSRC_MAP.put(file, new File(RSRC_ROOT + file).lastModified());
			}
			return file + "?v=" + CACHE_RSRC_MAP.get(file);*/
			return file + "?v=" + new File(RSRC_ROOT + file).lastModified(); // 开发阶段每次请求都访问文件方便开发，产品阶段改回用缓存以提高性能
		} catch (Exception ex) {
			return file;
		}
	}
	
	public static long getVersion(String file) { // 以日期时间戳作为文件的版本号
		try {
			/*if (!CACHE_RSRC_MAP.containsKey(file)) {
				CACHE_RSRC_MAP.put(file, new File(RSRC_ROOT + file).lastModified());
			}
			return CACHE_RSRC_MAP.get(file);*/
			return new File(RSRC_ROOT + file).lastModified(); // 开发阶段每次请求都访问文件方便开发，产品阶段改回用缓存以提高性能
		} catch (Exception ex) {
			return 0;
		}
	}
	
	/**
	 * 取得目录下最新的文件并返回相对于根目录的相对路径
	 * 主要用于某些经常更新的资源，网站标题图等，更新到路径后能马上能获取最新的资源而不用更新代码
	 * @param relativeDir
	 * @return 该路径下最新的文件
	 */
	public static String getLatestSubFile(String relativeDir) {
		if (relativeDir.charAt(relativeDir.length()-1) != '/') 
			relativeDir += "/";
		Path target = new File(RSRC_ROOT + relativeDir).toPath();
		
		try (Stream<Path> subPaths = Files.list(target)) {
			long modifiedTime = 0;
			Path subPath = null;
			List<Path> subPathList = subPaths.collect(Collectors.toList());
			for (Path path: subPathList) {
				long time = Files.getLastModifiedTime(path).toMillis();
				if (time > modifiedTime) {
					modifiedTime = time;
					subPath = path;
				}
			}
			if (subPath == null) 
				return relativeDir;
			else 
				return relativeDir + subPath.getFileName().toString();
		} catch(IOException ex) {
			return relativeDir;
		}
	}
}
