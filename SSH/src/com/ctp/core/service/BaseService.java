package com.ctp.core.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ctp.core.dao.BaseDao;


@Service("BaseService")

public class BaseService {
	@Resource
	protected BaseDao dao;

}