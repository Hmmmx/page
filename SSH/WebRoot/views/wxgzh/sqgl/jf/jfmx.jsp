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
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/jf/jfmx.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-receipt text-primary mr-1"></i><span>立即缴费</span>
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
				<div class="jf-mx-smry my-4">
					<p class="text-center mb-1 jf-sq">
						<i class="fas fa-city text-primary mr-1"></i><span>小区</span>
					</p>
					<p class="text-center cx-f-xs text-black-50 mb-2 jf-fc">
						<i class="fas fa-map-marked-alt fa-fw text-info mr-1"></i><span>房产</span>
					</p>
				</div>
				<div class="jf-mx-wrapper">
				</div>
				<div class="jf-mx-smry my-3">
					<p class="cx-d-flex-between cx-f-xs jf-sum px-2">
						<span class="text-black-50">合计金额</span><span class="cx-price cx-f-sm" style="color:black">0.00</span>
					</p>
					<p class="cx-d-flex-between cx-f-xs jf-sum-fee px-2">
						<span class="text-black-50">微信支付手续费</span><span class="cx-price cx-f-sm" style="color:black">0.00</span>
					</p>
					<p class="cx-d-flex-between cx-f-xs jf-sum-total px-2">
						<span class="text-black-50">待缴金额</span><span class="cx-price cx-f-sm" style="color:black">0.00</span>
					</p>
				</div>
			</div>
		</div>
	</section>
	
	<section class="page-action-bar bg-white page-wide">
		<div class="container-fluid">
			<div class="row no-gutters">
				<div class="col cx-d-flex-center">
					<span class="cx-f-xs jf-sum">
						<span class="text-black-50">待缴金额</span><span class="cx-price cx-f-lg">0.00</span>
					</span>
				</div>
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-success btn-pill px-4" data-cmd="pay" disabled><i class="fas fa-check"></i><span class="ml-1">确认付款</span></button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>