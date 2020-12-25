/*
 * Copyright 2019. All rights reserved.
 */
package com.ctp.core.model;

import java.util.HashMap;
import org.springframework.util.StringUtils;


public class Result extends HashMap<String, Object> {
	private static final long serialVersionUID = 1L;

	private static final String SUCCESS = "0";

    private static final String ERROR = "1";

    public static Result success(String message) {
        Result result = new Result();
        result.put("code", SUCCESS);
        result.put("message", StringUtils.isEmpty(message) ? "操作成功" : message);
        return result;
    }

    public static Result error(String message) {
        Result result = new Result();
        result.put("code", ERROR);
        result.put("message", StringUtils.isEmpty(message) ? "操作失败" : message);
        return result;
    }

    @Override
    public Result put(String key, Object value) {
        super.put(key, value);
        return this;
    }
  
    
}
