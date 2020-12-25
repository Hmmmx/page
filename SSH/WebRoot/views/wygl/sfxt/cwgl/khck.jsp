<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户车卡管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCwKhckCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-khck fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfCwKhckIndexerAll" name="checkAll">
						            	<label for="wgSfCwKhckIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>客户</th>
						            <th>车牌号码</th>
						            <th>车位</th>
						            <th>收费标准</th>
						            <th>车卡号</th>
						            <th>车卡类型</th>
						            <th>结束日期</th>
						            <th>状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="10" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfCwKhckModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfCwKhckModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfCwKhckDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="khckid" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfCwKhckModalDtlsLabel">添加车卡</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfCwKhck_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfCwKhck_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
		                
	                    <label for="wgSfCwKhck_sfbzid" class="col-2 col-form-label required">收费标准</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfCwKhck_sfbzid" name="sfbzid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfCwKhck_cphm" class="col-2 col-form-label">车牌号码</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfCwKhck_cphm" name="cphm" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的车牌号码</div>
	                    </div>
	                    
	                    <label for="wgSfCwKhck_cwhm" class="col-2 col-form-label">车位</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfCwKhck_cwhm" name="cwhm" maxlength="50" data-cx-ctrl="suggest">
	                        <div class="invalid-tooltip">请输入正确的车位号码</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfCwKhck_ckh" class="col-2 col-form-label">车卡号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfCwKhck_ckh" name="ckh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的车卡号</div>
	                    </div>
	                	
	                    <label for="wgSfCwKhck_cklxdm" class="col-2 col-form-label">车卡类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfCwKhck_cklxdm" name="cklxdm" data-lazy-load="cklx">
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择车卡类型</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfCwKhck_kkrq" class="col-2 col-form-label">开卡日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfCwKhck_kkrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwKhck_kkrq_p" id="wgSfCwKhck_kkrq" name="kkrq" value="" maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwKhck_kkrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfCwKhck_jsrq" class="col-2 col-form-label">结束日期</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfCwKhck_jsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwKhck_jsrq_p" id="wgSfCwKhck_jsrq" name="jsrq" value="" maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwKhck_jsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
	                
	                <div class="form-group row">
	                    <label for="wgSfCwKhck_ztbj_1" class="col-2 col-form-label">状态</label>
	                    <div class="col-10">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="ztbj" id="wgSfCwKhck_ztbj_1" value="1" checked>
									<label class="custom-control-label" for="wgSfCwKhck_ztbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="ztbj" id="wgSfCwKhck_ztbj_9" value="9">
									<label class="custom-control-label" for="wgSfCwKhck_ztbj_9">作废</label>
								</div>
		                    </div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfCwKhck_bz" class="col-2 col-form-label">备注</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfCwKhck_bz" name="bz" maxlength="480" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过480个字符的备注</div>
	                    </div>
	                </div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/cwgl/khck.js') }" />"></script>
</body>
</html>