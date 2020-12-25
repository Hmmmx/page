<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>发送微信通知 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfYdWxtzCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-cz"><i class="fas fa-hand-holding-usd fw-1"></i><span>充值</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="nav-tabs-responsive d-none">
                        <ul class="nav nav-tabs" role="tablist">
							<li class="nav-item" role="presentation"><a href="#wgSfYdWxtz_mb" class="nav-link active" role="tab" data-type="mb" data-toggle="tab">选择模板</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfYdWxtz_fs" class="nav-link" role="tab" data-type="fs" data-toggle="tab">发送</a></li>
                        </ul>
                    </div>
                    <div class="tab-content">
		                <div role="tabpanel" class="tab-pane fade py-0 show active" id="wgSfYdWxtz_mb">
		                	<div class="w-limited-1">
		                		<div class="d-flex-center pt-5">
		                			<form id="wgSfYdWxtzMbFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
									
									<div class="form-group row" style="width:600px;">
					                    <label for="wgSfYdWxtz_mb_mbdm" class="col-12 col-md-3 col-form-label required">模板</label>
					                    <div class="col-12 col-md-9">
					                        <select class="custom-select" id="wgSfYdWxtz_mb_mbdm" name="mbdm" required>
												<option value="">请选择</option>
											</select>
											<div class="invalid-tooltip">请选择模板</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <label for="wgSfYdWxtz_mb_mbnr" class="col-12 col-md-3 col-form-label">模板内容</label>
					                    <div class="col-12 col-md-9">
					                        <textarea class="form-control bg-white" id="wgSfYdWxtz_mb_mbnr" name="mbnr" maxlength="500" rows="8" disabled></textarea>
	                        				<div class="invalid-tooltip">请输入不超过500个字符的模板内容</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <div class="col-12 col-md-9 offset-md-3">
					                    	<button type="button" class="btn btn-outline-primary" style="width:120px;" data-cmd="next"><span>下一步</span><i class="fas fa-arrow-right ml-1"></i></button>
					                    </div>
					                </div>
									</form>
		                		</div>
		                	</div>
		                </div>
		                <div role="tabpanel" class="tab-pane fade py-0" id="wgSfYdWxtz_fs">
		                	<div class="w-limited-1">
				            	<div class="d-flex-center pt-5">
				            		<form id="wgSfYdWxtzFsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
				            		<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check fw-1"></i><span>确定</span></button>
				            		
					                <div class="form-group row" style="width:600px;">
					                    <label for="wgSfYdWxtz_fs_fczymc" class="col-12 col-md-3 col-form-label required">房产资源</label>
					                    <div class="col-12 col-md-9">
					                        <input type="text" class="form-control" id="wgSfYdWxtz_fs_fczymc" name="fczymc" data-cx-ctrl="fcxx-tree" required>
				                       		<div class="invalid-tooltip">请选择房产资源</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
									    <label for="wgSfYdWxtz_fs_xjrq" class="col-12 col-md-3 col-form-label required">限缴日期</label>
									    <div class="col-12 col-md-9">
									    	<div class="input-group date" id="wgSfYdWxtz_fs_xjrq_p" data-target-input="nearest" data-cx-ctrl="date">
									            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfYdWxtz_fs_xjrq_p" id="wgSfYdWxtz_fs_xjrq" name="xjrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate required>
									            <div class="input-group-append" data-target="#wgSfYdWxtz_fs_xjrq_p" data-toggle="datetimepicker">
									                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
									            </div>
									            <div class="invalid-tooltip">请输入正确的限缴日期</div>
									        </div>
									    </div>
									</div>
					                <div class="form-group row" style="width:600px;">
					                    <label for="wgSfYdWxtz_fs_dkbj" class="col-12 col-md-3 col-form-label">缴费类型</label>
					                    <div class="col-12 col-md-9">
					                        <select class="custom-select" id="wgSfYdWxtz_fs_dkbj" name="dkbj">
												<option value="" selected>请选择</option>
												<option value="0">门前缴费</option>
												<option value="1">银行代扣</option>
											</select>
					                    </div>
					                </div>
									<div class="form-group row" style="width:600px;">
					                	<label for="wgSfYdWxtz_fs_dkfadm" class="col-md-3 col-form-label">代扣方案</label>
					                    <div class="col-12 col-md-9">
					                        <select class="custom-select" id="wgSfYdWxtz_fs_dkfadm" name="dkfadm" data-lazy-load="dkfa">
												<option value="">请选择</option>
											</select>
											<div class="invalid-tooltip">请选择代扣方案</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <label for="wgSfYdWxtz_fs_xzje" class="col-12 col-md-3 col-form-label">起始金额</label>
					                    <div class="col-12 col-md-9">
					                        <input type="text" class="form-control" id="wgSfYdWxtz_fs_xzje" name="xzje" placeholder="只发送到费用金额大于该值的房产客户" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$">
				                       		<div class="invalid-tooltip">请输入正确的起始金额</div>
					                    </div>
					                </div>
					                <div class="form-group row" style="width:600px;">
					                    <div class="col-12 col-md-9 offset-md-3">
					                    	<button type="button" class="btn btn-outline-primary" style="width:120px;" data-cmd="prev"><i class="fas fa-arrow-left mr-1"></i><span>上一步</span></button>
					                    	<button type="button" class="btn btn-outline-primary" style="width:120px;" data-cmd="send"><i class="far fa-paper-plane mr-1"></i><span>发送</span></button>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/ydgl/wxtz.js') }" />"></script>
</body>
</html>