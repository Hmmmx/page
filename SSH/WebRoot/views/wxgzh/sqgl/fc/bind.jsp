<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>社区物管</title>
	<%@ include file="../meta.jspf" %>
	<link rel="stylesheet" href="<s:url value="/resources/components/bs-treeview/bootstrap-treeview.min.css" />" />
	
	<%@ include file="../scripts.jspf" %>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/wg.js')}" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/components/bs-treeview/src/js/bootstrap-treeview.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/sqgl/fc/bind.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<section class="page-title page-wide">
		<div>
			<i class="fas fa-link text-primary mr-1"></i><span>绑定房产</span>
		</div>
		<div class="back">
			<span><i class="fas fa-chevron-left"></i></span>
		</div>
		<div class="link home cx-f-sm">
			<span>主页</span>
		</div>
	</section>
	
	
	<section class="page-body exists-action-bar my-property-details">
	<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
		<div>
			<div>
				<div class="form-group row no-gutters mt-3">
                    <label class="col-2 col-form-label">小区</label>
                    <div class="col-10">
                        <select class="custom-select" name="jgid" required>
							<option value="">请选择</option>
						</select>
                      	<div class="invalid-tooltip">请选择小区</div>
                    </div>
                </div>
                
				<div class="form-group row no-gutters">
					<label class="col-2 col-form-label">房产</label>
                    <div class="col-10">
                        <input type="text" class="form-control" style="background-color:inherit;" name="fczymc" placeholder="所在小区相应房产" data-cx-ctrl="fcxx-tree" readonly required>
                    	<div class="invalid-tooltip">请选择房产</div>
                    </div>
				</div>
				
				<div class="form-group row no-gutters">
                    <label class="col-2 col-form-label">姓名</label>
                    <div class="col-10">
                        <input type="text" class="form-control" name="khmc" maxlength="12" placeholder="房产在物业登记的任意一个姓名" pattern="^.{2,12}$" required>
                    	<div class="invalid-tooltip">请输入姓名</div>
                    </div>
                </div>
                
				<div class="form-group row no-gutters mb-0">
                    <label class="col-2 col-form-label">手机</label>
                    <div class="col-10">
                        <input type="text" class="form-control" name="sjhm" maxlength="30" placeholder="与上面姓名匹配的手机号码" pattern="^[\d\(\)\+\- ]{11,30}$" required>
                    	<div class="invalid-tooltip">请输入正确的手机号码</div>
                    </div>
                </div>
	            <!--   
				<div class="card">
					<div class="card-header"><i class="fas fa-mobile-alt text-primary mr-1"></i><span>联系信息</span></div>
					<div class="card-body">
						
	                    
						<div class="form-group row no-gutters mb-0">
		                    <label class="col-2 col-form-label">手机</label>
		                    <div class="col-10">
		                        <input type="text" class="form-control" name="sjhm" maxlength="30" pattern="^[\d\(\)\+\- ]{11,30}$" required>
		                      		<div class="invalid-tooltip">请输入正确的手机号码</div>
		                    </div>
		                </div>
					</div>
				</div>
				 -->
			</div>
		</div>
	</form>
	</section>

	<section class="page-action-bar page-wide">
		<div class="container-fluid">
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill px-5" data-cmd="bind"><i class="fas fa-link mr-1"></i>立即绑定</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>