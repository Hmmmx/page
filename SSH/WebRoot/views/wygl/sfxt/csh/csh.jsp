<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>初始化 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCshCshCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-confirm"><i class="fas fa-check fw-1"></i><span>确定</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="nav-tabs-responsive d-none">
                        <ul class="nav nav-tabs" role="tablist">
							<li class="nav-item" role="presentation"><a href="#wgSfCshCsh_upload" class="nav-link active" role="tab" data-type="upload" data-toggle="tab">选择文件</a></li>
						</ul>
                    </div>
                    <div class="tab-content">
		                <div role="tabpanel" class="tab-pane fade py-0 show active" id="wgSfCshCsh_upload">
		                	<div class="w-limited-1">
		                		<div class="d-flex-center pt-5">
		                			<form id="wgSfCshCshUploadFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
									
									<div class="form-group row" style="width:600px;">
					                    <label for="wgSfCshCsh_upload_sqdm" class="col-12 col-md-3 col-form-label required">社区</label>
					                    <div class="col-12 col-md-9">
					                        <select class="custom-select" id="wgSfCshCsh_upload_sqdm" name="sqdm" required>
												<option value="">请选择</option>
											</select>
											<div class="invalid-tooltip">请选择社区</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <label for="wgSfCshCsh_upload_wjdm" class="col-12 col-md-3 col-form-label required">文件类型</label>
					                    <div class="col-12 col-md-9">
					                        <select class="custom-select" id="wgSfCshCsh_upload_wjdm" name="wjdm" required>
												<option value="">请选择</option>
												<option value="01">房产客户信息</option>
												<option value="02">客户欠费信息</option>
												<option value="03">客户预收信息</option>
												<option value="04">车库车位信息</option>
												<option value="05">客户车位信息</option>
												<option value="06">客户押金信息</option>
											</select>
											<div class="invalid-tooltip">请选择文件类型</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <div class="col-12 col-md-9 offset-md-3 text-center">
					                        <button type="button" class="btn btn-outline-primary btn-block" data-cmd="upload"><i class="fas fa-upload mr-1"></i>上传文件</button>
					                    </div>
					                </div>
									</form>
		                		</div>
		                	</div>
		                </div>
	                </div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/csh/csh.js') }" />"></script>
</body>
</html>