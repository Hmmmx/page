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
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/zn/znjl.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-list-ul text-primary mr-1"></i><span>指南与规范</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
		<div class="link home cx-f-sm">
			<span>主页</span>
		</div>
	</section>
	
	<section class="page-body">
		<div class="quick-info">
			<div class="info-body"><div class="info-list"></div></div>
		</div>
	</section>
</body>
</html>