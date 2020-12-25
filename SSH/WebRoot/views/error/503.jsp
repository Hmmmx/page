<%@ page language="java" isErrorPage="true" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>503 - 社区运营管理统一工作平台</title>
    <%@ include file="../common/meta.jspf" %>
</head>
<body>
	<header class="header">
	    <nav class="navbar navbar-expand-md">
	        <div>
	         <div class="brand-ex">
	             <a class="navbar-brand mr-0 mr-md-2" href="javascript:;" aria-label="Toggle sidebar" title="显示或隐藏菜单栏">
	                 <img src="<s:url value='/resources/img/logo/qyy-128.png' />" class="rounded-circle">
	             </a>
	         </div>
	        </div>
	    </nav>
	</header>
	
	<div class="container-fluid">
        <div class="row cx-content">
            <div class="col-12 col-md-6 offset-md-3" style="margin-top: 6rem;margin-bottom:6rem;">
                <form method="POST" role="form">
                    <div class="text-center"><span style="font-size:24px;"><i class="far fa-frown text-warning"></i> 503: 系统临时错误</span></div>
                    <hr>
                    <div class="text-center">临时的服务器维护或者过载，服务器当前无法处理请求，请稍后重试</div>
                </form>
            </div>
        </div>
    </div>
    
    <div class="container-fluid" style="margin-top:120px;">
		<div class="row flex-xl-nowrap">
			<div class="col-12">
	    	<%@ include file="../common/footer.jspf" %>
	    	</div>
		</div>
	</div>
</body>
</html>