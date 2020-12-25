<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>社区物管</title>
	<%@ include file="../meta.jspf" %>
	<%@ include file="../scripts.jspf" %>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/tp/tprwmx.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-vote-yea text-primary mr-1"></i><span>投票问题</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
		<div class="link home cx-f-sm">
			<span>主页</span>
		</div>
	</section>
	
	<section class="page-body">
		<div>
			<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
			
			<div class="row no-gutters mt-3 mb-4">
				<label class="col-12 col-form-label">选择符合投票范围的房产<span class="cx-f-xs text-black-50 ml-1">已排除进行过投票的房产</span></label>
				<div class="col-12">
					<select class="custom-select" name="fcid" data-cx-ctrl="multi-select" data-param="<c:out value='{"placeholder":"全部", "numDisplayed":1, "showSearch":false}' />" size="1" multiple></select>
					
				</div>
			</div>
			
			<div class="tpwt-wrapper"></div>
			</form>
		</div>
	</section>
	
	<section class="page-action-bar page-wide">
		<div class="container-fluid">
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill px-5" data-cmd="vote"><i class="fas fa-vote-yea mr-1"></i>提交投票</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>