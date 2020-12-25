<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户费用核定 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfHdFyhdCntr">
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
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-hd-fyhd fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfHdFyhdIndexerAll" name="checkAll">
						            	<label for="wgSfHdFyhdIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>客户</th>
						            <th>费用类型</th>
						            <th>收费项目</th>
						            <th>收费标准</th>
						            <th>开始日期</th>
						            <th>结束日期</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="8" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfHdFyhdModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfHdFyhdModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfHdFyhdDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="hdid" value="">
	            <input type="hidden" name="fcid" value="">
	            <input type="hidden" name="yxbj" value="1">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfHdFyhdModalDtlsLabel">添加收费标准</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfHdFyhd_fcmc" class="col-md-3 col-form-label required">房产名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgSfHdFyhd_fcmc" name="fcmc" maxlength="50" disabled>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfHdFyhd_khid" class="col-md-3 col-form-label required">客户名称</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfHdFyhd_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfHdFyhd_sfbzid" class="col-md-3 col-form-label required">收费标准</label>
	                    <div class="col-md-9">
	                        <%-- <select class="custom-select" id="wgSfHdFyhd_sfbzid" name="sfbzid" required>
								<option value="">请选择</option>
							</select> --%>
							<select class="custom-select" id="wgSfHdFyhd_sfbzid" name="sfbzid" data-cx-ctrl="multi-select" data-param="<c:out value='{"placeholder":"请选择", "numDisplayed":3, "showSearch":false}' />" size="1" multiple required></select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfHdFyhd_yxrqq" class="col-md-3 col-form-label">开始日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfHdFyhd_yxrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfHdFyhd_yxrqq_p" id="wgSfHdFyhd_yxrqq" name="yxrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfHdFyhd_yxrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确开始日期</div>
					        </div>
					    </div>
					</div>
					<div class="form-group row mb-0">
					    <label for="wgSfHdFyhd_yxrqz" class="col-md-3 col-form-label">结束日期</label>
					    <div class="col-md-9">
					        <div class="input-group date" id="wgSfHdFyhd_yxrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfHdFyhd_yxrqz_p" id="wgSfHdFyhd_yxrqz" name="yxrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfHdFyhd_yxrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fyhd/fyhd.js') }" />"></script>
</body>
</html>