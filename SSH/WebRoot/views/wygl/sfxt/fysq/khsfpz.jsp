<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户收费凭证管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfScKhsfpzCntr">
		<div class="row no-gutters">
		<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-danger d-none" data-cmd="open-repeal"><i class="fas fa-trash-alt"></i><span>作废</span></button>
                    </div>
				</div>
				
				<div class="filterbar d-none">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<input type="hidden" name="fcid" value="">
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                </form>
				</div>
				
				<div class="main-content">
					<div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-pz-khsfpz fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfScKhsfpzIndexerAll" name="checkAll">
						            	<label for="wgSfScKhsfpzIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
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
						            <th>作废编号</th>
						            <th>作废人员</th>
						            <th>作废日期</th>
						            <th>作废原因</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="18" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfScKhsfpzMxModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
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
	
	<div class="modal fade" id="wgSfScKhsfpzModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfpzModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfpzDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="sfpzid" value="">
	            <input type="hidden" name="sfpzidStr" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfpzModalDtlsLabel">收费凭证作废</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row d-none">
	                    <label for="wgSfScKhsfpz_zfry" class="col-md-3 col-form-label">作废人</label>
	                    <div class="col-md-9">
							<input type="text" class="form-control" id="wgSfScKhsfpz_zfry" name="zfry" maxlength="20" disabled>
							<div class="invalid-tooltip">请输入作废人</div>
	                    </div>
		            </div>
	                <div class="form-group row d-none">
					    <label for="wgSfScKhsfpz_zfrq" class="col-md-3 col-form-label">作废日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfScKhsfpz_zfrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfpz_zfrq_p" id="wgSfScKhsfpz_zfrq" name="zfrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" disabled novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfpz_zfrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfpz_zfyy" class="col-md-3 col-form-label">作废说明</label>
	                    <div class="col-md-9">
	                        <textarea class="form-control" id="wgSfScKhsfpz_zfyy" name="zfyy" maxlength="190" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的作废说明</div>
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
	
	<div class="modal fade" id="wgSfScKhsfpzEditModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfpzEditModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfpzEditDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="sfpzid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfpzEditModalDtlsLabel">修改收费凭证</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row mt-3">
	                    <label for="wgSfScKhsfpzEdit_skfsdm" class="col-md-3 col-form-label required">收款方式</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfScKhsfpzEdit_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30" required>
	                        	<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收款方式</div>
	                    </div>
		            </div>
	                <div class="form-group row mt-3">
					    <label for="wgSfScKhsfpzEdit_skrq" class="col-md-3 col-form-label required">收款日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfScKhsfpzEdit_skrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfpzEdit_skrq_p" id="wgSfScKhsfpzEdit_skrq" name="skrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate required>
					            <div class="input-group-append" data-target="#wgSfScKhsfpzEdit_skrq_p" data-toggle="datetimepicker">
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysq/khsfpz.js') }" />"></script>
</body>
</html>