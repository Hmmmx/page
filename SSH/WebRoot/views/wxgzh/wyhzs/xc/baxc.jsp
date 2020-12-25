<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>物业汇助手</title>
	<%@ include file="../meta.jspf" %>
	<link rel="stylesheet" href="<s:url value="/resources/components/bs4-dtp/build/css/tempusdominus-bootstrap-4.min.css" />" />
	<%@ include file="../scripts.jspf" %>
	<script src="<s:url value="/resources/components/bs4-dtp/build/js/tempusdominus-bootstrap-4.min.js" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/xc/baxc.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<div class="page-title page-wide">
		<div>
			<i class="fas fa-user-shield text-primary mr-1"></i><span>保安巡查</span>
		</div>
		<div class="link left cx-f-sm disabled" data-cmd="switch-sq">
			<span data-f-name="sqmc">当前社区</span>
		</div>
		<div class="link cx-f-sm disabled" data-cmd="query">
			<span><i class="fas fa-search"></i></span>
		</div>
	</div>
	
	<div class="page-body">		
		<div class="baxc-list-wrapper">
			<div class="baxc-list-body"></div>
		</div>
	</div>
	
	<div class="modal fade" id="queryListModal" tabindex="-1" role="dialog" aria-labelledby="queryListModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="queryListModalLabel">查询巡查</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">状态</label>
	                    <div class="col-9">
	                    	<select class="custom-select" name="ztbj">
	                    		<option value="">全部</option>
	                    		<option value="0">不正常</option>
	                    		<option value="1">正常</option>
	                    	</select>
	                    </div>
		            </div>
	            	<div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">开始时间</label>
	                	<div class="col-9">
	                		<div class="input-group date" id="queryListDtp_xcrqq_p" data-target-input="nearest" data-cx-ctrl="date-time">
							    <input type="text" class="form-control datetimepicker-input" id="queryListDtp_xcrqq" name="xcrqq" data-target="#queryListDtp_xcrqq_p" placeholder="巡查开始时间"  maxlength="16" autocomplete="off" novalidate>
							    <div class="input-group-append" data-target="#queryListDtp_xcrqq_p" data-toggle="datetimepicker">
							        <button class="btn btn-outline-secondary input-group-fix align-items-center" type="button"><i class="fas fa-calendar-alt"></i></button>
							    </div>
							</div>
	                	</div>
		            </div>
		            <div class="form-group row no-gutters mb-0">
		                <label class="col-3 col-form-label">结束时间</label>
	                	<div class="col-9">
	                		<div class="input-group date" id="queryListDtp_xcrqz_p" data-target-input="nearest" data-cx-ctrl="date-time">
							    <input type="text" class="form-control datetimepicker-input" id="queryListDtp_xcrqz" name="xcrqz" data-target="#queryListDtp_xcrqz_p" placeholder="巡查开始时间"  maxlength="16" autocomplete="off" novalidate>
							    <div class="input-group-append" data-target="#queryListDtp_xcrqz_p" data-toggle="datetimepicker">
							        <button class="btn btn-outline-secondary input-group-fix align-items-center" type="button"><i class="fas fa-calendar-alt"></i></button>
							    </div>
							</div>
	                	</div>
		            </div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
</body>
</html>