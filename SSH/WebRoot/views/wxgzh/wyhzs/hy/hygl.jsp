<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>物业汇助手</title>
	<%@ include file="../meta.jspf" %>
	<%@ include file="../scripts.jspf" %>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/hy/hygl.js')}" />"></script>
</head>
<body class="light" data-root-url="<s:url value="/" />">
	<div class="page-title page-wide">
		<div>
			<i class="far fa-user text-primary mr-1"></i><span>会员信息</span>
		</div>
		<div class="back d-none">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
	</div>
	
	<div class="page-body">
		<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
		
		<div class="cx-paragraph text-center text-success py-3 cx-f-lg">
			<span>会员代码：</span><span class="font-weight-bold" data-f-name="hydm">-</span>
		</div>
		
		<div class="cx-paragraph">
			<div class="form-group row no-gutters">
                <label class="col-2 col-form-label">姓名</label>
                <div class="col-10">
                    <input type="text" class="form-control" name="wyhymc" maxlength="12" pattern="^.{1,12}$" required>
                	<div class="invalid-tooltip">请输入姓名</div>
                </div>
            </div>
            
			<div class="form-group row no-gutters mb-0">
                <label class="col-2 col-form-label">手机</label>
                <div class="col-10">
                    <input type="text" class="form-control" name="sjhm" maxlength="30" pattern="^[\d\(\)\+\- ]{11,30}$" required>
                	<div class="invalid-tooltip">请输入正确的手机号码</div>
                </div>
            </div>
		</div>
		
		<div class="cx-paragraph" data-f-name="hybm">
			<div class="cx-para-title"><span>所属社区部门</span></div>
			<div class="cx-pair-list cx-f-sm">
				<div class="no-data">
					<span>暂无所属部门</span>
				</div>
			</div>
		</div>
		</form>
	</div>
	
	<div class="page-action-bar">
		<div>
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill" data-cmd="save"><i class="far fa-save fa-fw"></i>保存信息</button>
					<button type="button" class="btn btn-outline-secondary btn-pill ml-2" data-cmd="unbind" disabled><i class="fas fa-unlink fa-fw"></i>解除部门</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>