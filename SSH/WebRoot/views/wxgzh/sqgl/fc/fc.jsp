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
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/fc/fc.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-home text-primary mr-1"></i><span>我的房产</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
		<div class="link home cx-f-sm">
			<span>主页</span>
		</div>
	</section>
	
	<section class="page-body exists-action-bar my-property-list">
		<div class="my-property-wrapper">
			<div class="no-data"><span>暂无任何房产，请绑定</span></div>
		</div>
	</section>
	

	<section class="page-action-bar page-wide">
		<div class="container-fluid">
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill px-5" data-cmd="bind"><i class="fas fa-link mr-1"></i>绑定房产</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>