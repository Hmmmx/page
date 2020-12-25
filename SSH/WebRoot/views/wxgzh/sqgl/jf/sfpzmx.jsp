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
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/jf/sfpzmx.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-receipt text-primary mr-1"></i><span>已缴费用明细</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
		<div class="link home cx-f-sm">
			<span>主页</span>
		</div>
	</section>
	
	<section class="page-body exists-action-bar action-bar-bg-white">
		<div>
			<div class="jf-mx">
				<div class="jf-mx-smry mb-3">
					<p class="text-center mb-1 jf-sq">
						<i class="fas fa-city text-primary mr-1"></i><span>小区</span>
					</p>
					<p class="text-center cx-f-xs text-black-50 mb-2 jf-fc">
						<i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span>房产</span>
					</p>
					<p class="text-center cx-f-xs mb-2 jf-sum">
						<span class="text-black-50">已缴金额</span><span class="cx-price cx-f-xl">0.00</span>
					</p>
				</div>
				<div class="jf-mx-wrapper">
					
				</div>
			</div>
		</div>
	</section>
</body>
</html>