/**
 * Copyright (C) 2016-2019. All rights reserved.
 */
package com.ctp.core.utils;

import java.util.UUID;


public class UUIDUtil {
    
    private UUIDUtil() {
        
    }

    public static String genId() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
