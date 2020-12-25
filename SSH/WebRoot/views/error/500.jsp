<%@ page language="java" isErrorPage="true" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>500 - 社区运营管理统一工作平台</title>
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
                    <div class="text-center"><span style="font-size:24px;"><i class="far fa-frown text-warning"></i> 500: 系统内部错误</span></div>
                    <hr>
                    <div class="text-center">系统内部出错，请重试。若该问题仍然存在，请联系技术人员</div>
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