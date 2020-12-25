<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>社区物管</title>
	<%@ include file="meta.jspf" %>
	<link rel="stylesheet" href="<s:url value="${StaticRsrcUtil.appendVersion('/resources/components/swiper-5.3.1/css/swiper.min.css')}" />" />
	
	<%@ include file="scripts.jspf" %>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/components/swiper-5.3.1/js/swiper.min.js')}" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/home.js')}" />"></script>
</head>
<body class="light" data-root-url="<s:url value="/" />">
	<section class="banner page-wide">
		<div>
			<div class="swiper-container border-bottom">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide cx-d-flex-center">
			        	<div class="cx-d-flex-center" style="background-color:skyblue;min-height:100px;"><a href="#"><img class="w-100" src="<s:url value="/resources/img/gz/sqgl/banner-20200501.jpg" />"></a></div>
			        </div>
			    </div>
			    
			    <div class="swiper-pagination"></div>
			</div>
			<div class="bubble-group cx-f-sm">
				<div class="bubble p-relative" data-cmd="sq">
					<a href="#"><i class="fas fa-home mr-1"></i><span>请绑定房产</span></a>
					<span class="cx-badge"></span>
				</div>
				<div class="bubble circle d-none" data-cmd="lxdh">
					<a href="tel:07636852345"><i class="fas fa-phone fa-rotate-90"></i></a>
				</div>
			</div>
		</div>
	</section>
	
	<section class="quick-prds">
		<div>
			<ul>
				<li>
				<div class="prd" data-type="prd" data-cmd="jf">
					<span><img src="<s:url value="/resources/img/gz/sqgl/jf-20200501.png" />"></span><span class="cx-badge"></span><span class="prd-title">缴费</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="bx">
					<span><img src="<s:url value="/resources/img/gz/sqgl/bx-20200501.png" />"></span><span class="cx-badge"></span><span class="prd-title">报修</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="km">
					<span><img src="<s:url value="/resources/img/gz/sqgl/km-20200501.png" />"></span><span class="prd-title">开门</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="fc">
					<span><img src="<s:url value="/resources/img/gz/sqgl/fc-20200501.png" />"></span><span class="cx-badge"></span><span class="prd-title">房产</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="zs">
					<span><img src="<s:url value="/resources/img/gz/sqgl/zs-20200501.png" />"></span><span class="prd-title">租售</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="gx">
					<span><img src="<s:url value="/resources/img/gz/sqgl/gx-20200501.png" />"></span><span class="prd-title">二手</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="tp">
					<span><img src="<s:url value="/resources/img/gz/sqgl/tp-20200501.png" />"></span><span class="prd-title">投票</span>
				</div>
				</li>
				<li>
				<div class="prd" data-type="prd" data-cmd="zn">
					<span><img src="<s:url value="/resources/img/gz/sqgl/zn-20200501.png" />"></span><span class="prd-title">指南</span>
				</div>
				</li>
			</ul>
		</div>
	</section>
	
	<section class="quick-info">
		<div class="container-fluid">
			<div class="info-header">
				<div class="row no-gutters">
					<div class="col cx-d-flex-start"><i class="iconfont iconnews cx-scale-1 mr-1" style="color:#4285f4;"></i>社区资讯</div>
				</div>
			</div>
			<div class="info-body">
				<div class="info-list">
					<div class="loading">
						<span><i class="fas fa-circle-notch mr-1"></i>更多...</span>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<div class="modal fade" id="homeSqModalDtls" tabindex="-1" role="dialog" aria-labelledby="homeSqModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="homeSqModalDtlsLabel">切换我的小区</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="sq-list-wrapper"></div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</body>
</html>