<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>收费凭证明细 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCwbbSfpzmxCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<div class="btn-group">
							<button type="button" class="btn btn-outline-primary" data-cmd="filter"><i class="fas fa-search"></i><span>查询</span></button>
							<button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" data-reference="parent" aria-haspopup="true" aria-expanded="false">
							<span class="sr-only">Toggle</span>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="javascript:;" data-cmd="clear-filter">清空所有查询条件</a> <!-- 可以配置：clear-filter / clear-filter-submit -->
								<a class="dropdown-item" href="javascript:;" data-cmd="toggle-filterbar">打开或隐藏查询栏</a>
							</div>
						</div>
						<button type="button" class="btn btn-outline-primary" data-cmd="dc"><i class="fas fa-file-download fw-1"></i><span>导出</span></button>
                    </div>
                </div>
                
                <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
						<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                    
	                    <label for="wgSfCwbbSfpzmx_skrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收款日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbSfpzmx_skrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbSfpzmx_skrqq_p" id="wgSfCwbbSfpzmx_skrqq" name="skrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbSfpzmx_skrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbSfpzmx_skrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbSfpzmx_skrqz_p" id="wgSfCwbbSfpzmx_skrqz" name="skrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbSfpzmx_skrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
		                <label for="wgSfCwbbSfpzmx_f_pzlydm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">凭证来源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbSfpzmx_f_pzlydm" name="pzlydm" data-lazy-load="pzly" data-cx-ctrl="multi-select" data-param="<c:out value='{"placeholder":"全部", "numDisplayed":2, "showSearch":false}' />" size="1" multiple></select>
	                    </div>
	                    
	                	<label for="wgSfCwbbSfpzmx_f_skfsdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收款方式</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbSfpzmx_f_skfsdm" name="skfsdm" data-lazy-load="skfs">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfCwbbSfpzmx_f_pjbh" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">票据编号</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbSfpzmx_f_pjbh" name="pjbh" maxlength="30">
	                    </div>
	                    
	                    <label for="wgSfCwbbSfpzmx_f_pzh" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">凭证号</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbSfpzmx_f_pzh" name="pzh" maxlength="30">
	                    </div>
	                
	                	<label for="wgSfCwbbSfpzmx_f_skr" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收款人</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbSfpzmx_f_skr" name="skr">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                    <!-- <label for="wgSfCwbbSfpzmx_f_jfr" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">缴费人</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbSfpzmx_f_jfr" name="jfr" maxlength="10">
	                    </div> -->
	                	<!-- 
	                	<label for="wgSfCwbbSfpzmx_zfrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">作废日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbSfpzmx_zfrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbSfpzmx_zfrqq_p" id="wgSfCwbbSfpzmx_zfrqq" name="zfrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbSfpzmx_zfrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbSfpzmx_zfrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbSfpzmx_zfrqz_p" id="wgSfCwbbSfpzmx_zfrqz" name="zfrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbSfpzmx_zfrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                	
	                    <label for="wgSfCwbbSfpzmx_f_zfry" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">作废人员</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbSfpzmx_f_zfry" name="zfry" maxlength="10">
	                    </div>
	                    -->
	                    <label for="wgSfCwbbSfpzmx_f_ztbj" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">状态</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbSfpzmx_f_ztbj" name="ztbj">
	                        	<option value="">全部</option>
	                        	<option value="1" selected>正常</option>
	                        	<option value="9">作废</option>
							</select>
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-cwbb-sfpzmx fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产名称</th>
						            <th>客户名称</th>
						            <th>凭证号</th>
						            <th>凭证来源</th>
						            <th>收款方式</th>
						            
						            <th>票据编号</th>
						            <th>票据类型</th>
						            <th>金额</th>
						            <th>缴费人</th>
						            <th>收款人</th>
						            
						            <th>收款日期</th>
						            <th>收款备注</th>
						            <th>状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="15" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="cx-print-wrapper d-none"><iframe src="<s:url value="/wygl/sfxt/dyhj/getDyhj" />" style="border:0;width:100%;"></iframe></div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfCwbbSfpzmxModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<div class="modal-header">
	                <h5 class="modal-title">收费凭证明细</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="table-responsive" style="height:520px;">
						<table class="table table-sm table-fixed table-wgsf-fy-khfysq-nodata d-none">
							<tbody>
								<tr>
									<td class="table-empty">无明细数据</td>
								</tr>
							</tbody>
						</table>
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ysfy-mx fixed-thead fixed-row-1st-cell d-none">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>客户名称</th>
						            <th>收费项目</th>
						            <th>收费标准</th>
						            <th>应收金额</th>
						            <th>计费周期</th>
						            <th>应收日期</th>
						            <th>账单月</th>
						            <th>费用分类</th>
						            <th>收费说明</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="10" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ycxfy-mx fixed-thead fixed-row-1st-cell d-none">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>客户名称</th>
						            <th>收费项目</th>
						            <th>收款方式</th>
						            <th>收款类型</th>
						            <th>收款金额</th>
						            <th>缴费人</th>
						            <th>收款人</th>
						            <th>收款日期</th>
						            <th>收费说明</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="10" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ysk-mx fixed-thead fixed-row-1st-cell d-none">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>客户名称</th>
						            <th>收费项目</th>
						            <th>相应时间段</th>
						            <th>收款日期</th>
						            <th>前余额</th>
						            <th>金额</th>
						            <th>后余额</th>
						            <th>收费说明</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="9" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-yj-mx fixed-thead fixed-row-1st-cell d-none">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>客户名称</th>
						            <th>押金类型</th>
						            <th>收款方式</th>
						            <th>收取金额</th>
						            <th>缴费人</th>
						            <th>收款人</th>
						            <th>收款日期</th>
						            <th>收费说明</th>
						            <th>退款类型</th>
						            <th style="width:0">退款结算类型</th> <!-- 在列表中以收款方式显示，不在明细表中显示 -->
						            <th>退款日期</th>
						            <th>退费说明</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="13" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fycx/sfpzmx.js') }" />"></script>
</body>
</html>