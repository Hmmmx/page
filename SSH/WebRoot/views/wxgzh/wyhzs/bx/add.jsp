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
	<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/bx/add.js')}" />"></script>
</head>
<body class="light" data-root-url="<s:url value="/" />">
	<div class="page-title page-wide">
		<div>
			<i class="fas fa-tools text-primary mr-1"></i><span>新增报修</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
	</div>
	
	<div class="page-body">
		<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
		<div class="cx-paragraph">
			<div class="form-group row no-gutters">
                <label class="col-2 col-form-label">分类</label>
                <div class="col-10">
                    <select class="custom-select" name="bxsxdm" data-lazy-load="bxsx" required>
                    	<option value="">请选择</option>
					</select>
					<div class="invalid-tooltip">请选择分类</div>
                </div>
            </div>
            <div class="form-group row no-gutters">
                <label class="col-2 col-form-label">类型</label>
                <div class="col-10">
                    <select class="custom-select" name="bxlxdm" data-lazy-load="bxlx" required>
                    	<option value="">请选择</option>
					</select>
					<div class="invalid-tooltip">请选择类型</div>
                </div>
            </div>
            <div class="form-group row no-gutters">
                <label class="col-2 col-form-label">联系人</label>
                <div class="col-10">
                    <input type="text" class="form-control" name="lxr" maxlength="12" required>
                    <div class="invalid-tooltip">请输入联系人</div>
                </div>
            </div>
            <div class="form-group row no-gutters">
                <label class="col-2 col-form-label">电话</label>
                <div class="col-10">
                    <input type="text" class="form-control" name="lxdh" maxlength="30" placeholder="固话或手机号码" pattern="^[\d\(\)\+\- ]{4,30}$" required>
                	<div class="invalid-tooltip">请输入正确的联系电话</div>
                </div>
            </div>
            <div class="form-group row no-gutters mb-0">
                <label class="col-2 col-form-label">地址</label>
                <div class="col-10">
                    <input type="text" class="form-control" name="txdz" maxlength="90" placeholder="地址或房号">
                </div>
            </div>
        </div>
        <div class="cx-paragraph">
            <div class="form-group row no-gutters mb-0">
                <label class="col-2 col-form-label">问题</label>
                <div class="col-10">
                    <textarea class="form-control" name="bxnr" maxlength="480" rows="4" placeholder="简要报修问题描述" required></textarea>
                    <div class="invalid-tooltip">请输入问题描述</div>
                </div>
            </div>
		</div>
		<div class="cx-paragraph">
			<div class="card border-0">
				<div class="card-header cx-d-flex-between bg-white p-0 pb-1">
					<span><i class="far fa-image text-primary mr-1"></i><span>相应图片</span></span>
					<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" data-cmd="upload"><i class="fas fa-plus"></i></button>
				</div>
				<div class="card-body px-0">
	                <div class="row no-gutters mb-0 bx-img-wrapper">
	                    <div class="no-data"><span>可上传最多4张图片辅助说明</span></div>
	                </div>
				</div>
			</div>
		</div>
		</form>
	</div>
	
	<div class="page-action-bar pb-2">
		<div>
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill" data-cmd="save"><i class="far fa-save fa-fw"></i>提交报修</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>