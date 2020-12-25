/**
 * Copyright (C) 2016-2019. All rights reserved.
 */
package com.ctp.core.utils;

import java.io.IOException;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;


public class MiscUtil {
	private static String MACHINE_SN = ""; //机器编号，分布式时需要编定每台服务器机器编号(暂不需要)
	private static SimpleDateFormat DATE_FMT = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	private static int code; // 自增数
	
	private final static Pattern INVALID_FILENAME_PATTERN = Pattern.compile("[\\\\/:*?\"<>|\r\n\t]");
    
    private MiscUtil() {
        
    }
    
    public static String asFileName(String name) {
		return name==null ? null : INVALID_FILENAME_PATTERN.matcher(name).replaceAll("");
	}
    
    /**
	 * 删除目录下的所有文件
	 * @param path
	 * @param includeDir 是否包含目录本身
	 * @throws IOException
	 */
	public static void deletePathFiles(Path path, final boolean includeDir) throws IOException {
        try {
            Files.deleteIfExists(path);
        } catch (DirectoryNotEmptyException e) {
            Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }
                @Override
                public FileVisitResult postVisitDirectory(Path path, IOException ex) throws IOException {
                    if (includeDir) {
                    	Files.delete(path);
                    }
                    return super.postVisitDirectory(path, ex);
                }
            });
        }
    }

    public static String genDdbh() {
    	code = ++code % 100; // 2位自增数
    	return DATE_FMT.format(new Date()) + MACHINE_SN + Integer.toString(randomInt(1000, 9999)*100 + code);
    }
    
    public static String genHydm() {
    	return Integer.toString(randomInt(100000, 999999));
    }
    
    public static String maskPhoneNumber(String phoneNumber) { // 隐藏电话号码某些位 如138****6666
    	if (StringUtils.isNotBlank(phoneNumber) && phoneNumber.length() > 6) {
    		if (phoneNumber.length() <= 8) {
    			return phoneNumber.replaceAll("^.*(.{4})$", "****$1");
    		} else {
    			return phoneNumber.replaceAll("^(.*).{4}(.{4})$", "$1****$2");
    		}
    	}
    	return phoneNumber;
    }
    
    public static String parseFileName(String path) {
    	if (StringUtils.isNotBlank(path)) {
    		path = path.replaceAll("\\\\", "/");
    		return path.substring(path.lastIndexOf("/")+1);
    	}
    	return path;
    }
    
    public static int randomInt(final int min, final int max) { // 包含最小值，包含最大值
		if (max <= min) {
			return min;
		} else {
			Random random = new Random(); 
			int tmp = Math.abs(random.nextInt());
			return tmp % (max - min + 1) + min;
		}
	}
    
    public static int buildRandom(int length) {
		int num = 1;
		double random = Math.random();
		if (random < 0.1) {
			random = random + 0.1;
		}
		for (int i = 0; i < length; i++) {
			num = num * 10;
		}
		return (int) ((random * num));
	}
	
	public static boolean randomBoolean() {
		Random random = new Random(); 
		int tmp = Math.abs(random.nextInt());
		return tmp % 2 == 0;
	}
	
	public static String rename(String name, String modifier) {
		if (StringUtils.isBlank(name) || StringUtils.isBlank(modifier)) {
			if (StringUtils.isBlank(modifier)) {
				return name;
			} else {
				return modifier;
			}
		} else {
			String ret = null;
			
			if (name.indexOf('.') > -1) {
				ret = name.substring(0, name.lastIndexOf('.')) + "." + modifier + name.substring(name.lastIndexOf('.'));
			} else {
				ret = name + "." + modifier;
			}
			
			return ret;
		}
	}
	
}
