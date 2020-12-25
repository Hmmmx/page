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
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/jf/jf.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-receipt text-primary mr-1"></i><span>缴费</span>
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
			<div class="cx-status-bar">
				<ul class="nav nav-tabs nav-tabs-ex" role="tablist">
					<li class="nav-item" role="presentation"><a href="#jf_due" class="nav-link" role="tab" data-category="due" data-toggle="tab">未缴费用</a></li>
					<li class="nav-item" role="presentation"><a href="#jf_done" class="nav-link" role="tab" data-category="done" data-toggle="tab">已缴费用</a></li>
					<li class="nav-item" role="presentation"><a href="#jf_pre" class="nav-link" role="tab" data-category="pre" data-toggle="tab">预缴费用</a></li>
				</ul>
			</div>
			<div class="tab-content jf-wrapper">
				<div role="tabpanel" class="tab-pane fade" id="jf_due">
					<div class="no-data"><span>暂无未缴费用</span></div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="jf_done">
					<div class="no-data"><span>暂无已缴费用</span></div>
				</div>
				<div role="tabpanel" class="tab-pane fade exists-action-bar" id="jf_pre">
					<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
					<div class="p-1">
						<div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">房产</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <select class="custom-select" name="fcid" required>
		                        	<option value="">请选择</option>
								</select>
								<div class="invalid-tooltip">请选择房产</div>
		                    </div>
						</div>
						<div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">客户</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <select class="custom-select" name="khid" required>
		                        	<option value="">请选择</option>
								</select>
								<div class="invalid-tooltip">请选择客户</div>
		                    </div>
						</div>
						<div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">收费项目</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <select class="custom-select" name="sfxmdm" required>
		                        	<option value="">请选择</option>
								</select>
								<div class="invalid-tooltip">请选择收费项目</div>
		                    </div>
						</div>
						<div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">车卡</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <select class="custom-select" name="khckid" required>
		                        	<option value="">请选择</option>
								</select>
								<div class="invalid-tooltip">请选择车卡</div>
		                    </div>
						</div>
						<div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">续费月数</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <select class="custom-select" name="xfys" required>
		                        	<option value="">请选择</option>
		                        	<option value="1">1个月</option>
		                        	<option value="2">2个月</option>
		                        	<option value="3">3个月</option>
		                        	<option value="4">4个月</option>
		                        	<option value="5">5个月</option>
		                        	<option value="6">6个月</option>
		                        	<option value="7">7个月</option>
		                        	<option value="8">8个月</option>
		                        	<option value="9">9个月</option>
		                        	<option value="10">10个月</option>
		                        	<option value="11">11个月</option>
		                        	<option value="12">12个月</option>
								</select>
								<div class="invalid-tooltip">请选择月份数</div>
		                    </div>
						</div>
						<!-- <div class="form-group row no-gutters">
							<label class="col-2 col-form-label" style="flex: 0 0 20%;max-width: 20%;">金额</label>
		                    <div class="col-10" style="flex: 0 0 80%;max-width: 80%;">
		                        <input type="text" class="form-control" name="dummyJe" maxlength="12" disabled>
		                    </div>
						</div> -->
						<div class="cx-d-flex-center mt-4">
							<span>金额：</span><span class="cx-price cx-f-lg" data-f-name="je">0</span>
						</div>
	                </div>
					</form>
				</div>
			</div>
		</div>
	</section>
	
	<section class="page-action-bar page-wide d-none">
		<div class="container-fluid">
			<div class="row no-gutters">
				<div class="col"> <!-- <i class="fas fa-file-invoice-dollar mr-1"></i> -->
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-success btn-pill px-5" data-cmd="submit-yc"><i class="fas fa-check mr-1"></i>确认付款</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>