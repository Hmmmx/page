/*
 * Copyright 2019. All rights reserved.
 */
package com.ctp.core.exception;


public class BizException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BizException(String message) {
        super(message);
    }

    public BizException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
