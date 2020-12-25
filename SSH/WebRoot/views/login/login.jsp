<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>登录 - 社区运营管理统一工作平台</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="UTF-8">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">
	
	<link rel="apple-touch-icon-precomposed" href="<s:url value="/resources/img/logo/qyy-128.png" />"/>
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-128.png" />" sizes="128x128" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-96.png" />" sizes="96x96" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-64.png" />" sizes="64x64" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-48.png" />" sizes="48x48" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-32.png" />" sizes="32x32" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-16.png" />" sizes="16x16" type="image/png">
	<link rel="icon" href="<s:url value="/resources/img/logo/qyy-32.ico" />" type="image/x-icon">
	
	<link rel="stylesheet" href="<s:url value="/resources/components/bs4/css/bootstrap.min.css" />" />
	<link rel="stylesheet" href="<s:url value="/resources/components/fa-5.12.0/css/all.css" />" />
	<link rel="stylesheet" href="<s:url value="${StaticRsrcUtil.appendVersion('/resources/css/override.css') }" />" />
	<link rel="stylesheet" href="<s:url value="${StaticRsrcUtil.appendVersion('/resources/css/base.css') }" />" />
	<link rel="stylesheet" href="<s:url value="${StaticRsrcUtil.appendVersion('/resources/css/main.css') }" />" />
</head>
<body class="login" data-root-url="<s:url value="/" />">
	<header class="header login-header">
	    <nav class="navbar navbar-expand-md navbar-dark">
	        <div class="d-flex justify-content-start align-items-center">
		        <div class="brand-ex">
		             <a class="navbar-brand mr-0 mr-md-2" href="javascript:;" aria-label="Toggle sidebar">
		                 <img src="<s:url value="/resources/img/logo/qyy-128.png" />">
		             </a>
		        </div>
		        <div class="brand-name header-info" style="color:#3399CC;">
					<span>社区运营管理统一工作平台</span>
				</div>
	        </div>
	        <div class="quick-links d-none">
	        	<span><i class="fas fa-phone-alt mr-1"></i>400-1234-567</span>
	        </div>
	    </nav>
	</header>

	<section class="main">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 flat-col">
					<div class="content" style="min-height: calc(100vh - 48px - 65px);">
						<div class="row login-body">
							<div class="col-12 col-md-6 d-none d-md-block">
				            	<div class="login-title">
					            	<div class="text-center d-inline-block">
						            	<div class="mt-4"><img src="<s:url value="/resources/img/logo/qyy-128.png" />" height="120"></div>
						            	<p class="login-caption">
							            	<span>社区运营管理统一工作平台</span>
							            	<span>United Platforms of Community Operation Management</span>
						            	</p>
					            	</div>
				            	</div>
				            </div>
				            
				            <div class="col-12 col-md-6">
				                <div class="login-content">
					                <form id="loginFrm" action="<s:url value="/login" />" method="POST" role="form" data-auto-validate="true" novalidate>
					                    <input type="hidden" name="cmd" value="login">
					                    <input type="hidden" name="sourceUrl" value="">
					                    <div class="">
						                    <h5 class="login-welcome">欢迎登录<span class="d-sm-inline d-md-none"> - 社区运营管理统一工作平台</span></h5>
						                    <hr>
					                    </div>
				                        <div class="input-group mb-3" style="display:none">
					                        <span class="input-group-prepend" title="系统类型">
					                        	<span class="input-group-text" style="color:#4682b4;">
					                            <i class="fas fa-cogs fa-fw scale-125"></i>
					                            </span>
					                        </span>
					                        <select class="custom-select" name="ptlx">
					                        	<option value="0">平台管理</option>
					                        	<option value="1">运营管理</option>
					                        	<option value="2" selected>社区管理</option>
											</select>
					                    </div>
					                    
					                    <div class="input-group my-4">
					                        <span class="input-group-prepend" title="账号">
					                        	<span class="input-group-text text-primary">
					                            <i class="far fa-user fa-fw scale-125"></i>
					                            </span>
					                        </span>
					                        <input type="text" name="yhdm" class="form-control input-group-fix" placeholder="请输入账号" value="" pattern="^[A-Za-z0-9_\-\.]{3,30}$" autocomplete="off" autofocus required>
					                        <div class="invalid-tooltip" style="left: 46px;">账号包含3到30个以下字符 A-Z 0-9 _ - .</div>
					                    </div>
				
					                    <div class="input-group mb-3">
					                        <span class="input-group-prepend" title="密码">
					                        	<span class="input-group-text text-info">
					                            <i class="fas fa-key fa-fw scale-125"></i>
					                            </span>
					                        </span>
					                        <input type="password" name="yhmm" class="form-control input-group-fix" placeholder="请输入密码" value="" pattern="^.{3,30}$" required>
					                        <div class="invalid-tooltip" style="left: 46px;">密码的长度必须在3到30之间</div>
					                    </div>
					                    
					                    <!-- <div class="mb-3">
						                    <div class="custom-control custom-checkbox custom-control-inline">
						                        <input type="checkbox" class="custom-control-input" name="rememberme" value="true" id="remembermeChk">
						                        <label class="custom-control-label" for="remembermeChk">记住账号</label>
						                    </div>
					                    </div> -->
					                    <div class="form-group d-flex-between">
					                    	<label for="switch-rememberme" class="mb-0"><span>记住账号</span></label>
											<span class="switch switch-sm">
												<input type="checkbox" class="switch" name="rememberme" value="true" id="switch-rememberme">
												<label for="switch-rememberme"><span class="d-none">记住账号</span></label>
											</span>
										</div>
					                    <button class="btn btn-primary btn-block" type="submit" style="min-height:2.375rem;"><i class="fas fa-sign-in-alt scale-125"></i><span class="ml-1">登录</span></button>
					                    
					                </form>
				                </div>
				            </div>
						</div>
					</div>
					
					<div class="footer login-footer d-block">
					    <div class="text-center">
					        <div>
						        <div class="d-none">
						            e-mail: <a href="mailto:services@abstract.com" target="_blank">services@abstract.com</a>
						        </div>
						         <div class="d-flex-center">
						            <span title="Copyright">&copy; 2020 清远市汇业科技有限公司</span>
						            
						            <a class="ml-3" href="http://wljg.gdgs.gov.cn/corpsrch.aspx?key=441802000176445" target="_blank"><img src="<s:url value="/resources/img/gdgs.png" />"></a>
						            <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备20002055号-1</a>
						        </div>
					        </div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<script src="<s:url value="/resources/components/jquery/jquery-3.3.1.min.js" />"></script>
	<script src="<s:url value="/resources/components/jquery/jquery.cookie.js" />"></script>
	<script src="<s:url value="/resources/components/bs4/js/bootstrap.bundle.min.js" />"></script>
	<script src="<s:url value="/resources/components/jquery/jquery.json-2.4.min.js" />"></script>
	<script src="<s:url value="/resources/components/jquery/jquery.color.js" />"></script>
	<script src="<s:url value="/resources/components/jquery/jquery.color.svg-names.js" />"></script>
	<script src="<s:url value="/resources/components/vue/vue.js" />"></script>
	<script src="<s:url value="/resources/components/pnotify4/dist/iife/PNotify.js" />"></script>
	<script src="<s:url value="/resources/components/pnotify4/dist/iife/PNotifyButtons.js" />"></script>
	<script src="<s:url value="/resources/components/pnotify4/dist/iife/PNotifyMobile.js" />"></script>
	<script src="<s:url value="/resources/components/moment/min/moment.min.js" />"></script>
	<script src="<s:url value="/resources/components/moment/locale/zh-cn.js" />"></script>
	<script src="<s:url value="/resources/components/bs4-dtp/build/js/tempusdominus-bootstrap-4.min.js" />"></script>
	    
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/common/nls.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/common/misc.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/common/ctrl.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/common/meta.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/login/login.js') }" />"></script>
</body>
</html>