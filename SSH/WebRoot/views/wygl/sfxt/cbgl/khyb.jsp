<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户仪表管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCbKhybCntr">
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
						<button type="button" class="btn btn-outline-primary" data-cmd="open-batch-add"><i class="far fa-clone fw-1"></i><span>批量添加</span></button>
					</div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-khyb fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfCbKhybIndexerAll" name="checkAll">
						            	<label for="wgSfCbKhybIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>客户</th>
						            <th>仪表编号</th>
						            <th>仪表类型</th>
						            <th>收费标准</th>
						            <th>开始日期</th>
						            <th>结束日期</th>
						            <th>状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="9" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfCbKhybCbjlModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<div class="modal-header">
	                <h5 class="modal-title">抄表记录</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="table-responsive" style="height:520px;">
	            		<form id="wgSfCbKhybCbjlInputFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-khyb-cblr fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						        	<th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th style="width:0">房产名称</th>
						            <th>客户名称</th>
						            <th>仪表类型</th>
						            <th>仪表编号</th>
						            <th>仪表倍率</th>
						            <th>更换新表</th>
						            <th>旧表最后一次用量</th>
						            <th>上次抄表日期</th>
						            <th>本次抄表日期</th>
						            <th>上次读数</th>
						            <th>本次读数</th>
						            <th>本次用量</th>
						            <th>备注</th>
						            <th style="width:5em;text-align:center;">操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="15" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
						</form>
					</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfCbKhybModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfCbKhybModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfCbKhybDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="khybid" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfCbKhybModalDtlsLabel">添加仪表</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfCbKhyb_khid" class="col-md-2 col-form-label required">客户</label>
	                    <div class="col-md-4">
	                        <select class="custom-select" id="wgSfCbKhyb_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
		                
		                
	                    <label for="wgSfCbKhyb_ybbh" class="col-md-2 col-form-label required">仪表编号</label>
	                    <div class="col-md-4">
	                        <input type="text" class="form-control" id="wgSfCbKhyb_ybbh" name="ybbh" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的仪表编号</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfCbKhyb_yblxdm" class="col-md-2 col-form-label required">仪表类型</label>
	                    <div class="col-md-4">
	                        <select class="custom-select" id="wgSfCbKhyb_yblxdm" name="yblxdm" data-lazy-load="yblx" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择仪表类型</div>
	                    </div>
	                    
	                    <label for="wgSfCbKhyb_sfbzid" class="col-md-2 col-form-label required">收费标准</label>
	                    <div class="col-md-4">
	                        <select class="custom-select" id="wgSfCbKhyb_sfbzid" name="sfbzid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfCbKhyb_ksrq" class="col-md-2 col-form-label">开始日期</label>
					    <div class="col-md-4">
					    	<div class="input-group date" id="wgSfCbKhyb_ksrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCbKhyb_ksrq_p" id="wgSfCbKhyb_ksrq" name="ksrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCbKhyb_ksrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfCbKhyb_jsrq" class="col-md-2 col-form-label">结束日期</label>
					    <div class="col-md-4">
					        <div class="input-group date" id="wgSfCbKhyb_jsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCbKhyb_jsrq_p" id="wgSfCbKhyb_jsrq" name="jsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCbKhyb_jsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfCbKhyb_azrq" class="col-md-2 col-form-label">安装日期</label>
					    <div class="col-md-4">
					    	<div class="input-group date" id="wgSfCbKhyb_azrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCbKhyb_azrq_p" id="wgSfCbKhyb_azrq" name="azrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCbKhyb_azrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfCbKhyb_ds" class="col-md-2 col-form-label">底数</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhyb_ds" name="ds" value="0" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12">
		                    <div class="invalid-tooltip">请输入正确的底数</div>
		                </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfCbKhyb_lc" class="col-md-2 col-form-label">量程</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhyb_lc" name="lc" value="99999999" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12">
		                    <div class="invalid-tooltip">请输入正确的量程</div>
		                </div>
					    
					    <label for="wgSfCbKhyb_bl" class="col-md-2 col-form-label required">倍率</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhyb_bl" name="bl" value="1" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" required>
		                    <div class="invalid-tooltip">请输入正确的倍率</div>
		                </div>
					</div>
	                
	                
	                <div class="form-group row">
	                    <label for="wgSfCbKhyb_yxbj_1" class="col-md-2 col-form-label">状态</label>
	                    <div class="col-md-10">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfCbKhyb_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgSfCbKhyb_yxbj_1">有效</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfCbKhyb_yxbj_0" value="0">
									<label class="custom-control-label" for="wgSfCbKhyb_yxbj_0">无效</label>
								</div>
		                    </div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfCbKhyb_bz" class="col-md-2 col-form-label">备注</label>
	                    <div class="col-md-10">
	                        <textarea class="form-control" id="wgSfCbKhyb_bz" name="bz" maxlength="480" rows="6"></textarea>
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
	
	<div class="modal fade" id="wgSfCbKhybBatchModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfCbKhybBatchModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfCbKhybBatchDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfCbKhybBatchModalDtlsLabel">批量添加仪表</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label class="col-md-2 col-form-label required">房产资源</label>
	                    <div class="col-md-10">
	                        <input type="text" class="form-control" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfCbKhybBatch_yblxdm" class="col-md-2 col-form-label required">仪表类型</label>
	                    <div class="col-md-4">
	                        <select class="custom-select" id="wgSfCbKhybBatch_yblxdm" name="yblxdm" data-lazy-load="yblx" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择仪表类型</div>
	                    </div>
	                    
	                    <label for="wgSfCbKhybBatch_ybbh" class="col-md-2 col-form-label required">仪表编号</label>
	                    <div class="col-md-4">
	                        <input type="text" class="form-control" id="wgSfCbKhybBatch_ybbh" name="ybbh" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的仪表编号</div>
	                    </div>
	                </div>
					<div class="form-group row">
	                    <label for="wgSfCbKhybBatch_sfbzid" class="col-md-2 col-form-label required">收费标准</label>
	                    <div class="col-md-4">
	                        <select class="custom-select" id="wgSfCbKhybBatch_sfbzid" name="sfbzid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                    
					    <label for="wgSfCbKhybBatch_bl" class="col-md-2 col-form-label required">倍率</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhybBatch_bl" name="bl" value="1" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" required>
		                    <div class="invalid-tooltip">请输入正确的倍率</div>
		                </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfCbKhybBatch_lc" class="col-md-2 col-form-label">量程</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhybBatch_lc" name="lc" value="99999999" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12">
		                    <div class="invalid-tooltip">请输入正确的量程</div>
		                </div>
					    
					    <label for="wgSfCbKhybBatch_ds" class="col-md-2 col-form-label">底数</label>
		                <div class="col-md-4">
		                    <input type="text" class="form-control" id="wgSfCbKhybBatch_ds" name="ds" value="0" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12">
		                    <div class="invalid-tooltip">请输入正确的底数</div>
		                </div>
					</div>
	                
	                <div class="form-group row mb-0">
	                    <label for="wgSfCbKhybBatch_bz" class="col-md-2 col-form-label">备注</label>
	                    <div class="col-md-10">
	                        <textarea class="form-control" id="wgSfCbKhybBatch_bz" name="bz" maxlength="480" rows="6"></textarea>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/cbgl/khyb.js') }" />"></script>
</body>
</html>