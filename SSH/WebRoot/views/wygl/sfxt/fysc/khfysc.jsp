<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户费用生成- 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfScKhfyscCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="save"><i class="fas fa-wrench fw-1"></i><span>生成</span></button>
                    </div>
                </div>
				
				<div class="main-content">
					<div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysc fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfScKhfyscIndexerAll" name="checkAll">
						            	<label for="wgSfScKhfyscIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>收费项目</th>
						            <th>收费标准</th>
						            <th>计费周期</th>
						            <th>应收日期</th>
						            
						            <th>账单月</th>
						            <th>生成条数</th>
						            <th>总金额</th>
						            <th>状态</th>
						            <th>收费说明</th>
						            
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="12" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
                </div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfScKhfyscModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhfyscModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhfyscDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhfyscModalDtlsLabel">客户费用生成</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfScKhfysc_sqdm" class="col-12 col-md-3 col-form-label required">社区名称</label>
	                    <div class="col-12 col-md-9">
	                        <select class="custom-select" id="wgSfScKhfysc_sqdm" name="sqdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择社区</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfScKhfysc_sfbzid" class="col-12 col-md-3 col-form-label required">收费标准</label>
	                    <div class="col-12 col-md-9">
	                        <select class="custom-select" id="wgSfScKhfysc_sfbzid" name="sfbzid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfScKhfysc_jfqsrq" class="col-12 col-md-3 col-form-label required">计费日起</label>
					    <div class="col-12 col-md-9">
					    	<div class="input-group date" id="wgSfScKhfysc_jfqsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhfysc_jfqsrq_p" id="wgSfScKhfysc_jfqsrq" name="jfqsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhfysc_jfqsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确的日期</div>
					        </div>
					    </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfScKhfysc_jfjsrq" class="col-12 col-md-3 col-form-label required">计费日止</label>
					    <div class="col-12 col-md-9">
					        <div class="input-group date" id="wgSfScKhfysc_jfjsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhfysc_jfjsrq_p" id="wgSfScKhfysc_jfjsrq" name="jfjsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhfysc_jfjsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确的日期</div>
					        </div>
					    </div>
					</div>
	                <div class="form-group row">
	                    <label for="wgSfScKhfysc_zje" class="col-12 col-md-3 col-form-label">分摊金额</label>
	                    <div class="col-12 col-md-9">
	                        <input type="text" class="form-control" id="wgSfScKhfysc_zje" name="zje" maxlength="12" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$">
                       		<div class="invalid-tooltip">请输入正确的总金额</div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhfysc_bz" class="col-12 col-md-3 col-form-label">收费说明</label>
	                    <div class="col-12 col-md-9">
	                        <textarea class="form-control" id="wgSfScKhfysc_bz" name="bz" maxlength="190" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的备注</div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysc/khfysc.js') }" />"></script>
</body>
</html>