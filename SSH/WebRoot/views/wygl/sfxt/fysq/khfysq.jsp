<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户费用收取- 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfScKhfysqCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary d-none" data-category="ysfy" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
						<button type="button" class="btn btn-outline-primary d-none" data-category="ysfy" data-cmd="confirm"><i class="fas fa-check fw-1"></i><span>确认收费</span></button>
						<button type="button" class="btn btn-outline-primary d-none" data-category="ysfy" data-cmd="dy-ysfytz"><i class="fas fa-print fw-1"></i><span>打印通知</span></button>
						<%-- <button type="button" class="btn btn-outline-primary d-none" data-category="ysfy" data-cmd="open-scwyj"><i class="fas fa-calendar-times fw-1"></i><span>生成违约金</span></button> --%>
						<%-- <button type="button" class="btn btn-outline-danger d-none" data-category="ysfy" data-cmd="del"><i class="fas fa-times fw-1"></i><span>删除</span></button> --%>
						<div class="btn-group d-none" data-category="ysfy">
							<button type="button" class="btn btn-outline-primary" data-cmd="filter"><i class="fas fa-search"></i><span>查询</span></button>
							<button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" data-reference="parent" aria-haspopup="true" aria-expanded="false">
							<span class="sr-only">Toggle</span>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="javascript:;" data-cmd="clear-filter">清空所有查询条件</a> <!-- 可以配置：clear-filter / clear-filter-submit -->
								<a class="dropdown-item" href="javascript:;" data-cmd="toggle-filterbar">打开或隐藏查询栏</a>
							</div>
						</div> 
						
						<button type="button" class="btn btn-outline-primary d-none" data-category="ycxfy" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
						
						<button type="button" class="btn btn-outline-primary d-none" data-category="ysk" data-cmd="open-add"><i class="fas fa-hand-holding-usd fw-1"></i><span>预收款存入</span></button>
						
						<label class="col-form-label d-none" style="vertical-align: middle;line-height: normal;" data-category="yskjz">收费项目</label>
						<select class="custom-select cx-f-1 d-none" style="width:12em;height:auto;line-height:normal;" name="sfxmdm" data-category="yskjz"></select>
						<select class="custom-select cx-f-1 d-none" style="width:12em;height:auto;line-height:normal;" name="zhysfsylx" data-category="yskjz">
							<option value="0">只使用综合预收款</option>
							<option value="1" selected>不使用综合预收款</option>
							<!-- <option value="2">不足时使用综合预收款</option> -->
						</select>
						<button type="button" class="btn btn-outline-primary d-none" data-category="yskjz" data-cmd="open-yskjz"><i class="fas fa-share fw-1"></i><span>结转</span></button>
						
						<button type="button" class="btn btn-outline-primary d-none" data-category="yj" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
                    </div>
                </div>
                
                <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
	                    <label for="wgSfScKhfysq_f_sfxmdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm col-form-label">收费项目</label>
	                    <div class="col-md-3 col-3xl-2 pl-3">
	                        <%-- <select class="custom-select custom-select-sm" id="wgSfScKhfysq_f_sfxmdm" name="sfxmdm">
	                        	<option value="">全部</option>
							</select> --%>
							<select class="custom-select custom-select-sm" id="wgSfScKhfysq_f_sfxmdm" name="sfxmdm" data-cx-ctrl="multi-select" data-param="<c:out value='{"placeholder":"全部", "numDisplayed":2, "showSearch":false}' />" size="1" multiple></select>
	                    </div>
	                    
		                <label for="wgSfScKhfysq_sfzdyq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm pl-0 pl-3xl-3">账单月份</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between pr-0 pr-3xl-3">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfScKhfysq_sfzdyq_p" data-target-input="nearest" data-cx-ctrl="date-month">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhfysq_sfzdyq_p" id="wgSfScKhfysq_sfzdyq" name="sfzdyq" value=""  maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhfysq_sfzdyq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfScKhfysq_sfzdyz_p" data-target-input="nearest" data-cx-ctrl="date-month">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhfysq_sfzdyz_p" id="wgSfScKhfysq_sfzdyz" name="sfzdyz" value=""  maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhfysq_sfzdyz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                    
	                    <label for="wgSfScKhfysq_f_fyfldm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm col-form-label">费用分类</label>
	                    <div class="col-md-3 col-3xl-2 pl-3">
	                        <select class="custom-select custom-select-sm" id="wgSfScKhfysq_f_fyfldm" name="fyfldm">
	                        	<option value="">全部</option>
	                        	<option value="1">正常费用</option>
	                        	<option value="2">违约金</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfScKhfysq_f_pxfs" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm col-form-label">排序方式</label>
	                    <div class="col-md-3 col-3xl-2 pl-3">
	                        <select class="custom-select custom-select-sm" id="wgSfScKhfysq_f_pxfs" name="pxfs">
	                        	<option value="">账单月份（降序）</option>
	                        	<option value="02">账单月份（升序）</option>
	                        	<option value="03">收费项目</option>
	                        	<option value="04">费用分类</option>
							</select>
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                   	<div class="">
                        <ul class="nav nav-tabs nav-tabs-ex" role="tablist">
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_ysfy" class="nav-link" role="tab" data-category="ysfy" data-toggle="tab">应收费用</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_ycxfy" class="nav-link" role="tab" data-category="ycxfy" data-toggle="tab">一次性费用</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_ysk" class="nav-link" role="tab" data-category="ysk" data-toggle="tab">预收费用</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_yskjz" class="nav-link" role="tab" data-category="yskjz" data-toggle="tab">预收结转</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_yj" class="nav-link" role="tab" data-category="yj" data-toggle="tab">押金收退</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_query" class="nav-link" role="tab" data-category="query" data-toggle="tab">已缴凭证</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfScKhfysq_zhxx" class="nav-link" role="tab" data-category="zhxx" data-toggle="tab">综合信息</a></li>
                        </ul>
                    </div>
                    <div class="tab-content">
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_ysfy">
                    		<div class="table-responsive fit2height-tab">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ysfy fixed-thead fixed-row-1st-cell">
								    <thead class="thead-light">
								        <tr>
								            <th class="td-indexer">
								            	<input type="checkbox" id="wgSfScKhfysqYsfyIndexerAll" name="checkAll">
								            	<label for="wgSfScKhfysqYsfyIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
								            	<span>#</span>
								            </th>
								            <th>客户名称</th>
								            <th>收费项目</th>
								            <th>收费标准</th>
								            <th style="overflow:visible;direction:rtl;">应收金额</th>
								            <th>计费周期</th>
								            <th>应收日期</th>
								            <th>账单月份</th>
								            <th>费用分类</th>
								            <th>上期读数</th>
								            <th>本期读数</th>
								            <th>数量</th>
								            <th>单价</th>
								            <th>收费说明</th>
								        </tr>
								    </thead>
									<tbody>
										<tr>
											<td colspan="14" class="table-empty">暂无数据</td>
										</tr>
									</tbody>
								</table>
							</div>
                    	</div>
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_ycxfy">
                    		<div class="table-responsive fit2height-tab">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ycxfy fixed-thead fixed-row-1st-cell">
								    <thead class="thead-light">
								        <tr>
								            <th class="td-indexer">
								            	<input type="checkbox" id="wgSfScKhfysqYcxfyIndexerAll" name="checkAll">
								            	<label for="wgSfScKhfysqYcxfyIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
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
							</div>
                    	</div>
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_ysk">
                    		<div class="table-responsive fit2height-tab">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ysk fixed-thead fixed-row-1st-cell">
								    <thead class="thead-light">
								        <tr>
								            <th class="td-indexer">
								            	<input type="checkbox" id="wgSfScKhfysqYskIndexerAll" name="checkAll">
								            	<label for="wgSfScKhfysqYskIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
								            	<span>#</span>
								            </th>
								            <th>客户名称</th>
								            <th>收费项目</th>
								            <th>余额</th>
								            <th>实收总额</th>
								            <th>实支总额</th>
								            <th>操作</th>
								        </tr>
								    </thead>
									<tbody>
										<tr class="table-row-no-data">
											<td colspan="7" class="table-empty">暂无数据</td>
										</tr>
									</tbody>
								</table>
							</div>
                    	</div>
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_yskjz">
                    		<div class="table-responsive fit2height-tab-pgr">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-yskjz fixed-thead fixed-row-1st-cell">
								    <thead class="thead-light">
								        <tr>
								            <th class="td-indexer">
								            	<input type="checkbox" id="wgSfScKhfysqYskjzIndexerAll" name="checkAll">
								            	<label for="wgSfScKhfysqYskjzIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
								            	<span>#</span>
								            </th>
								            <th>房产名称</th>
								            <th>客户名称</th>
								            <th>收费项目</th>
								            <th>预收余额</th>
								            <th>未缴金额</th>
								        </tr>
								    </thead>
									<tbody>
										<tr>
											<td colspan="6" class="table-empty">暂无数据</td>
										</tr>
									</tbody>
								</table>
							</div>
                    	</div>
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_yj">
                    		<div class="table-responsive fit2height-tab">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-yj fixed-thead fixed-row-1st-cell fixed-row-last-cell">
								    <thead class="thead-light">
								        <tr>
								            <th class="td-indexer">
								            	<input type="checkbox" id="wgSfScKhfysqYjIndexerAll" name="checkAll">
								            	<label for="wgSfScKhfysqYjIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
								            	<span>#</span>
								            </th>
								            <th>客户名称</th>
								            <th>押金类型</th>
								            <th>收款方式</th>
								            <th>收取金额</th>
								            <th>缴费人</th>
								            <th>收款人</th>
								            <th>收款日期</th>
								            <th>收款票据编号</th>
								            <th>收费说明</th>
								            <th>退款类型</th>
								            <th>退款结算类型</th>
								            <th>退款日期</th>
								            <th>退款票据编号</th>
								            <th>退款说明</th>
								            <th>操作</th>
								        </tr>
								    </thead>
									<tbody>
										<tr>
											<td colspan="16" class="table-empty">暂无数据</td>
										</tr>
									</tbody>
								</table>
							</div>
                    	</div>
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_query">
                    		<div class="filterbar d-none">
								<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
								<input type="hidden" name="fcid" value="">
								<input type="hidden" name="ztbj" value="1">
								<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
				                </form>
							</div>
                    		<div class="table-responsive fit2height-tab-pgr">
								<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-pz-khsfpz fixed-thead fixed-row-1st-cell fixed-row-last-cell" style="min-width:1056px">
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
								            <th style="width:0">状态</th>
								            <th style="width:0">作废编号</th>
								            <th style="width:0">作废人员</th>
								            <th style="width:0">作废日期</th>
								            <th style="width:0">作废原因</th>
								            <th style="width:11em;">操作</th>
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
                    	
                    	<div role="tabpanel" class="tab-pane fade pb-0" id="wgSfScKhfysq_zhxx" style="overflow:auto;">
                    		<%@ include file="zhxx.jspf" %>
                    	</div>
                    </div>
                </div>
			</div>
		</div>
		<div class="cx-print-wrapper d-none"><iframe src="<s:url value="/wygl/sfxt/dyhj/getDyhj" />" style="border:0;width:100%;"></iframe></div>
	</div>
	
	<div class="modal fade" id="wgSfScKhsfsqYjthModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYjthModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYjthDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="yjid" value="">
	            <input type="hidden" name="sfpzid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYjthModalDtlsLabel">退回押金</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYjth_fcmc" class="col-md-3 col-form-label required">房产名称</label>
	                    <div class="col-md-9">
							<input type="text" class="form-control" id="wgSfScKhsfsqYjth_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		            </div>
	                <div class="form-group row">
	                    <label for="wgSfScKhsfsqYjth_khmc" class="col-md-3 col-form-label required">客户</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYjth_khmc" name="khmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfScKhsfsqYjth_yjlxmc" class="col-md-3 col-form-label required">押金类型</label>
	                    <div class="col-md-9">
							<input type="text" class="form-control" id="wgSfScKhsfsqYjth_yjlxmc" name="yjlxmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择押金类型</div>
	                    </div>
		            </div>
	                <div class="form-group row">
	                    <label for="wgSfScKhsfsqYjth_thje" class="col-md-3 col-form-label required">退款金额</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYjth_thje" name="thje" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择退款金额</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYjth_thjsfsdm" class="col-md-3 col-form-label required">退款方式</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfScKhsfsqYjth_thjsfsdm" name="thjsfsdm" data-lazy-load="thjsfs" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择退款方式</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYjth_tksj" class="col-md-3 col-form-label required">退款日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfScKhsfsqYjth_tksj_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYjth_tksj_p" id="wgSfScKhsfsqYjth_tksj" name="tksj" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYjth_tksj_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYjth_tkbz" class="col-md-3 col-form-label">退款说明</label>
	                    <div class="col-md-9">
	                        <textarea class="form-control" id="wgSfScKhsfsqYjth_tkbz" name="tkbz" maxlength="100" rows="3"></textarea>
	                        <div class="invalid-tooltip">请输入不超过100个字符的退款说明</div>
	                    </div>
	                </div>
	            </div>
	            <div class="modal-footer p-relative">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                <div style="position:absolute;left:.75em;">
	                	<div class="custom-control custom-checkbox custom-control-inline">
	                        <input type="checkbox" class="custom-control-input" name="print" value="true" id="wgSfScKhsfsqYjth_print">
	                        <label class="custom-control-label" for="wgSfScKhsfsqYjth_print">打印票据</label>
	                    </div>
	                </div>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfScKhsfsqYjModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYjModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYjDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="yjid" value="">
	            <input type="hidden" name="sfpzid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYjModalDtlsLabel">添加押金</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:auto;">
	            	<div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>主要信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYj_fcmc" class="col-2 col-form-label required">房产名称</label>
	                    <div class="col-4">
							<input type="text" class="form-control" id="wgSfScKhsfsqYj_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		                
		                
	                    <label for="wgSfScKhsfsqYj_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYj_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYj_jfr" class="col-2 col-form-label">缴费人</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYj_jfr" name="jfr" maxlength="20">
		                    <div class="invalid-tooltip">请输入缴费人</div>
	                    </div>
	                    
	                    
					    <label for="wgSfScKhsfsqYj_skrmc" class="col-2 col-form-label required">收款人</label>
		                <div class="col-4">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYj_skrmc" name="skrmc" maxlength="20" required disabled>
		                    <div class="invalid-tooltip">请输入收款人</div>
		                </div>
	                </div>
	                
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYj_skfsdm" class="col-2 col-form-label required">收款方式</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYj_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收款方式</div>
	                    </div>
	                    
					    <label for="wgSfScKhsfsqYj_skrq" class="col-2 col-form-label required">收款日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfScKhsfsqYj_skrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYj_skrq_p" id="wgSfScKhsfsqYj_skrq" name="skrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYj_skrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>收费明细</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-yj-add">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th class="required">押金类型</th>
						            <th class="required">收取金额</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td class="td-indexer">
						            	<span>1</span>
						            </td>
						            <td>
						            	<select class="custom-select custom-select-sm cx-f-1" name="yjlxdm" data-lazy-load="yjlx" required>
											<option value="">请选择</option>
										</select>
						            </td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="sqje" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" required></td>
						            <td class="dl-item-cmd">
						            	<div class="btn-group" role="group" aria-label="操作按纽组">
			    							<button type="button" class="btn btn-outline-success p-2 mr-1" style="width:2em;border-radius:50% !important;" data-cmd="plus" title="增加收费"><i class="fas fa-plus"></i></button>
			    							<button type="button" class="btn btn-outline-success p-2" style="width:2em;border-radius:50% !important;" data-cmd="minus" title="清除收费"><i class="fas fa-minus"></i></button>
			    						</div>
						            </td>
								</tr>
							</tbody>
						</table>
					</div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>其他信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYj_skbz" class="col-2 col-form-label">收费说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfScKhsfsqYj_skbz" name="skbz" maxlength="100" style="height: 82px;"></textarea>
	                        <div class="invalid-tooltip">请输入不超过100个字符的收费说明</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	            </div>
	            <div class="modal-footer p-relative">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                <div style="position:absolute;left:.75em;">
	                	<div class="custom-control custom-checkbox custom-control-inline">
	                        <input type="checkbox" class="custom-control-input" name="print" value="true" id="wgSfScKhsfsqYj_print">
	                        <label class="custom-control-label" for="wgSfScKhsfsqYj_print">打印票据</label>
	                    </div>
	                </div>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfScKhsfsqYskModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYskModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYskDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="yskid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <input type="hidden" name="yxbj" value="1">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYskModalDtlsLabel">预收款存入</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:auto;">
	            	<div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>主要信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYsk_fcmc" class="col-2 col-form-label required">房产名称</label>
	                    <div class="col-4">
							<input type="text" class="form-control" id="wgSfScKhsfsqYsk_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		                
		                
	                    <label for="wgSfScKhsfsqYsk_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsk_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYsk_jfr" class="col-2 col-form-label">缴费人</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYsk_jfr" name="jfr" maxlength="20">
		                    <div class="invalid-tooltip">请输入缴费人</div>
	                    </div>
	                    
	                    
					    <label for="wgSfScKhsfsqYsk_skrmc" class="col-2 col-form-label required">收款人</label>
		                <div class="col-4">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYsk_skrmc" name="skrmc" maxlength="20" required disabled>
		                    <div class="invalid-tooltip">请输入收款人</div>
		                </div>
	                </div>
	                
	                <div class="form-group row">
	                	<%-- <label for="wgSfScKhsfsqYsk_ysklx" class="col-2 col-form-label required d-none">类型</label>
	                    <div class="col-4 d-none">
	                        <select class="custom-select" id="wgSfScKhsfsqYsk_ysklx" name="ysklxdm" required>
								<option value="01">预收款存入</option>
								<option value="02">预收款退回</option>
							</select>
	                    </div> --%>
	                    
					    <label for="wgSfScKhsfsqYsk_skfsdm" class="col-2 col-form-label required">收款方式</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsk_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收款方式</div>
	                    </div>
	                    
	                    <label for="wgSfScKhsfsqYsk_fsrq" class="col-2 col-form-label required">日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfScKhsfsqYsk_fsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsk_fsrq_p" id="wgSfScKhsfsqYsk_fsrq" name="fsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsk_fsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>收费明细</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ysk-add">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th class="required">收费项目</th>
						            <th>月份数</th>
						            <th>相应时间段</th>
						            <th class="required">原金额</th>
						            <th>折扣</th>
						            <th>前余额</th>
						            <th class="required">金额</th>
						            <th>后余额</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td class="td-indexer">
						            	<span>1</span>
						            </td>
						            <td>
								        <select class="custom-select custom-select-sm cx-f-1" name="sfxmdm" required>
											<option value="">请选择</option>
										</select>
									</td>
									<td><input type="text" class="form-control form-control-sm cx-f-1" name="yfs" value="" pattern="^([1-9]\d*)$" maxlength="12" disabled></td>
									<td class="td-date">
										<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfScKhsfsqYsk_ysrq_p" data-target-input="nearest" data-cx-ctrl="date-month">
								            <input type="text" class="form-control datetimepicker-input cx-f-1" data-target="#wgSfScKhsfsqYsk_ysrq_p" name="ysrq" value=""  maxlength="7" pattern="^\d{4}-((0([1-9]))|(1(0|1|2)))$" autocomplete="off" novalidate>
								            <div class="input-group-append" data-target="#wgSfScKhsfsqYsk_ysrq_p" data-toggle="datetimepicker">
								                <button class="btn btn-outline-secondary input-group-fix cx-f-1" type="button"><i class="fas fa-calendar-alt"></i></button>
								            </div>
								            <div class="invalid-tooltip">请输入正确的开始时间</div>
								        </div>
								        <span>-</span>
								        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfScKhsfsqYsk_ysrz_p" data-target-input="nearest" data-cx-ctrl="date-month">
								            <input type="text" class="form-control datetimepicker-input cx-f-1" data-target="#wgSfScKhsfsqYsk_ysrz_p" name="ysrz" value=""  maxlength="7" pattern="^\d{4}-((0([1-9]))|(1(0|1|2)))$" autocomplete="off" novalidate>
								            <div class="input-group-append" data-target="#wgSfScKhsfsqYsk_ysrz_p" data-toggle="datetimepicker">
								                <button class="btn btn-outline-secondary input-group-fix cx-f-1" type="button"><i class="fas fa-calendar-alt"></i></button>
								            </div>
								            <div class="invalid-tooltip">请输入正确的结束时间</div>
								        </div>
									</td>
									<td><input type="text" class="form-control form-control-sm cx-f-1" name="yfse" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled></td>
									<td><span data-ysk-zk="Y">-</span><input type="hidden" name="zk" value="1"></td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="qye" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled></td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="fse" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled required></td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="hye" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled></td>
						            <td class="dl-item-cmd">
						            	<div class="btn-group" role="group" aria-label="操作按纽组">
			    							<button type="button" class="btn btn-outline-success p-2 mr-1" style="width:2em;border-radius:50% !important;" data-cmd="plus" title="增加收费"><i class="fas fa-plus"></i></button>
			    							<button type="button" class="btn btn-outline-success p-2" style="width:2em;border-radius:50% !important;" data-cmd="minus" title="清除收费"><i class="fas fa-minus"></i></button>
			    						</div>
						            </td>
								</tr>
							</tbody>
						</table>
					</div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>其他信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYsk_skbz" class="col-2 col-form-label">说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfScKhsfsqYsk_skbz" name="skbz" maxlength="190" style="height: 192px;"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的说明</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	            </div>
	            <div class="modal-footer p-relative">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                <div style="position:absolute;left:.75em;">
	                	<div class="custom-control custom-checkbox custom-control-inline">
	                        <input type="checkbox" class="custom-control-input" name="print" value="true" id="wgSfScKhsfsqYsk_print">
	                        <label class="custom-control-label" for="wgSfScKhsfsqYsk_print">打印票据</label>
	                    </div>
	                </div>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfScKhsfsqYskjzModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYskjzModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYskjzDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYskjzModalDtlsLabel">预收款结转</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYskjz_fsrq" class="col-md-3 col-form-label required">结转日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfScKhsfsqYskjz_fsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYskjz_fsrq_p" id="wgSfScKhsfsqYskjz_fsrq" name="fsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYskjz_fsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYskjz_skbz" class="col-md-3 col-form-label">收款备注</label>
	                    <div class="col-md-9">
	                        <textarea class="form-control" id="wgSfScKhsfsqYskjz_skbz" name="skbz" maxlength="200" rows="3"></textarea>
	                        <div class="invalid-tooltip">请输入不超过200个字符的收款备注</div>
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
	
	<div class="modal fade" id="wgSfScKhsfsqYcxfyModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYcxfyModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYcxfyDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="ycxfyid" value="">
	            <input type="hidden" name="ycxfypzid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYcxfyModalDtlsLabel">添加收费</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:auto;">
	            	<div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>主要信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYcxfy_fcmc" class="col-2 col-form-label required">房产名称</label>
	                    <div class="col-4">
							<input type="text" class="form-control" id="wgSfScKhsfsqYcxfy_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		                
		                
	                    <label for="wgSfScKhsfsqYcxfy_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYcxfy_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYcxfy_jfr" class="col-2 col-form-label">缴费人</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYcxfy_jfr" name="jfr" maxlength="20">
		                    <div class="invalid-tooltip">请输入缴费人</div>
	                    </div>
	                    
	                    
					    <label for="wgSfScKhsfsqYcxfy_skrmc" class="col-2 col-form-label required">收款人</label>
		                <div class="col-4">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYcxfy_skrmc" name="skrmc" maxlength="20" required disabled>
		                    <div class="invalid-tooltip">请输入收款人</div>
		                </div>
	                </div>
	                
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYcxfy_skfsdm" class="col-2 col-form-label required">收款方式</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYcxfy_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收款方式</div>
	                    </div>
	                    
					    <label for="wgSfScKhsfsqYcxfy_skrq" class="col-2 col-form-label required">收款日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfScKhsfsqYcxfy_skrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYcxfy_skrq_p" id="wgSfScKhsfsqYcxfy_skrq" name="skrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYcxfy_skrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>收费明细</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-ycxfy-add">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th class="required">收费项目</th>
						            <th class="required">收款类型</th>
						            <th>单价</th>
						            <th>数量/面积</th>
						            <th class="required">收款金额</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td class="td-indexer">
						            	<span>1</span>
						            </td>
						            <td>
								        <select class="custom-select custom-select-sm cx-f-1" name="sfxmdm" required>
											<option value="">请选择</option>
										</select>
									</td>
						            <td>
						            	<select class="custom-select custom-select-sm cx-f-1" name="sklxdm" data-lazy-load="sklx" required>
											<option value="">请选择</option>
										</select>
						            </td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="dj" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled></td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="sl" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled></td>
						            <td><input type="text" class="form-control form-control-sm cx-f-1" name="sfje" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" disabled required></td>
						            <td class="dl-item-cmd">
						            	<div class="btn-group" role="group" aria-label="操作按纽组">
			    							<button type="button" class="btn btn-outline-success p-2 mr-1" style="width:2em;border-radius:50% !important;" data-cmd="plus" title="增加收费"><i class="fas fa-plus"></i></button>
			    							<button type="button" class="btn btn-outline-success p-2" style="width:2em;border-radius:50% !important;" data-cmd="minus" title="清除收费"><i class="fas fa-minus"></i></button>
			    						</div>
						            </td>
								</tr>
							</tbody>
						</table>
					</div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>其他信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYcxfy_skbz" class="col-2 col-form-label">收费说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfScKhsfsqYcxfy_skbz" name="skbz" maxlength="190" style="height: 82px;"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的收费说明</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	            </div>
	            <div class="modal-footer p-relative">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                <div style="position:absolute;left:.75em;">
	                	<div class="custom-control custom-checkbox custom-control-inline">
	                        <input type="checkbox" class="custom-control-input" name="print" value="true" id="wgSfScKhsfsqYcxfy_print">
	                        <label class="custom-control-label" for="wgSfScKhsfsqYcxfy_print">打印票据</label>
	                    </div>
	                </div>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfScKhsfsqYsfyQrModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYsfyQrModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" style="max-width:600px;" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYsfyQrDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="ysfyidStr" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYsfyQrModalDtlsLabel">确认收费</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYsfyQr_fcmc" class="col-md-3 col-form-label required">房产名称</label>
	                    <div class="col-md-9">
							<input type="text" class="form-control" id="wgSfScKhsfsqYsfyQr_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		            </div>
	                <div class="form-group row">
	                    <label for="wgSfScKhsfsqYsfyQr_khmc" class="col-md-3 col-form-label required">客户</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYsfyQr_khmc" name="khmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYsfyQr_zjeDummy" class="col-md-3 col-form-label">总金额</label>
		                <div class="col-md-9">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYsfyQr_zjeDummy" name="zjeDummy" maxlength="10" disabled>
		                </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYsfyQr_skrmc" class="col-md-3 col-form-label required">收款人</label>
		                <div class="col-md-9">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYsfyQr_skrmc" name="skrmc" maxlength="20" required disabled>
		                    <div class="invalid-tooltip">请输入收款人</div>
		                </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYsfyQr_jfr" class="col-md-3 col-form-label">缴费人</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgSfScKhsfsqYsfyQr_jfr" name="jfr" maxlength="20">
		                    <div class="invalid-tooltip">请输入缴费人</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfScKhsfsqYsfyQr_skfsdm" class="col-md-3 col-form-label required">收款方式</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfScKhsfsqYsfyQr_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收款方式</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYsfyQr_skrq" class="col-md-3 col-form-label required">收款日期</label>
					    <div class="col-md-9">
					    	<div class="input-group date" id="wgSfScKhsfsqYsfyQr_skrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfyQr_skrq_p" id="wgSfScKhsfsqYsfyQr_skrq" name="skrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" readonly required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfyQr_skrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYsfyQr_skbz" class="col-md-3 col-form-label">收款备注</label>
	                    <div class="col-md-9">
	                        <textarea class="form-control" id="wgSfScKhsfsqYsfyQr_skbz" name="skbz" maxlength="190" rows="3"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的收款备注</div>
	                    </div>
	                </div>
	            </div>
	            <div class="modal-footer p-relative">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                <div style="position:absolute;left:.75em;">
	                	<!-- <div class="custom-control custom-checkbox custom-control-inline d-none">
	                        <input type="checkbox" class="custom-control-input" name="print" value="true" id="wgSfScKhsfsqYsfyQr_print">
	                        <label class="custom-control-label" for="wgSfScKhsfsqYsfyQr_print">打印票据</label>
	                    </div> -->
	                    <div class="custom-control custom-radio custom-control-inline mr-1">
							<input type="radio" class="custom-control-input" name="dylx" id="wgSfScKhsfsqYsfyQr_dylx_0" value="0">
							<label class="custom-control-label" for="wgSfScKhsfsqYsfyQr_dylx_0">不打印票据</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline mr-1">
							<input type="radio" class="custom-control-input" name="dylx" id="wgSfScKhsfsqYsfyQr_dylx_1" value="1">
							<label class="custom-control-label" for="wgSfScKhsfsqYsfyQr_dylx_1">打印明细</label>
						</div>
						<div class="custom-control custom-radio custom-control-inline mr-0">
							<input type="radio" class="custom-control-input" name="dylx" id="wgSfScKhsfsqYsfyQr_dylx_2" value="2">
							<label class="custom-control-label" for="wgSfScKhsfsqYsfyQr_dylx_2">打印汇总</label>
						</div>
	                </div>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<!-- 
	<div class="modal fade" id="wgSfScKhsfsqYsfyWyjModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYsfyWyjModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYsfyWyjDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYsfyWyjModalDtlsLabel">生成违约金</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row mt-3">
						<label class="col-2 col-form-label required">房产</label>
	                    <div class="col-10">
							<input type="text" class="form-control" style="background-color:inherit;" name="fczymc" data-cx-ctrl="fcxx-tree" readonly required>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
					</div>
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYsfyWyj_wyjjsrq" class="col-md-2 col-form-label required">结算日期</label>
					    <div class="col-md-10">
					    	<div class="input-group date" id="wgSfScKhsfsqYsfyWyj_wyjjsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfyWyj_wyjjsrq_p" id="wgSfScKhsfsqYsfyWyj_wyjjsrq" name="wyjjsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfyWyj_wyjjsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确格式的结算日期</div>
					        </div>
					    </div>
	                </div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div> -->
	
	<div class="modal fade" id="wgSfScKhsfsqYsfyModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfScKhsfsqYsfyModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfScKhsfsqYsfyDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="ysfyid" value="">
	            <input type="hidden" name="ysfypzid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfScKhsfsqYsfyModalDtlsLabel">添加收费</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfScKhsfsqYsfy_fcmc" class="col-2 col-form-label required">房产名称</label>
	                    <div class="col-4">
							<input type="text" class="form-control" id="wgSfScKhsfsqYsfy_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		                
		                
	                    <label for="wgSfScKhsfsqYsfy_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsfy_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<!-- <label for="wgSfScKhsfsqYsfy_fylxdm_01" class="col-2 col-form-label required">费用类型</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl fylxdm-wrapper">
		                    </div>
	                    </div> -->
	                    <label for="wgSfScKhsfsqYsfy_fylxdm" class="col-2 col-form-label required">费用类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsfy_fylxdm" name="fylxdm" data-lazy-load="fylx" data-accept-values="01,02,04,05" required>
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择费用类型</div>
	                    </div>
	                    
	                	<label for="wgSfScKhsfsqYsfy_sfxmdm" class="col-2 col-form-label required">收费项目</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsfy_sfxmdm" name="sfxmdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费项目</div>
	                    </div>
	                </div>
	                
	                <div class="form-group row">
					    <label for="wgSfScKhsfsqYsfy_jfzqq" class="col-2 col-form-label required">计费周期起</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfScKhsfsqYsfy_jfzqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfy_jfzqq_p" id="wgSfScKhsfsqYsfy_jfzqq" name="jfzqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfy_jfzqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfScKhsfsqYsfy_jfzqz" class="col-2 col-form-label required">计费周期止</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfScKhsfsqYsfy_jfzqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfy_jfzqz_p" id="wgSfScKhsfsqYsfy_jfzqz" name="jfzqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfy_jfzqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfScKhsfsqYsfy_ysrq" class="col-2 col-form-label required">应收日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfScKhsfsqYsfy_ysrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfy_ysrq_p" id="wgSfScKhsfsqYsfy_ysrq" name="ysrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfy_ysrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfScKhsfsqYsfy_sfzdy" class="col-2 col-form-label required">收费账单月</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfScKhsfsqYsfy_sfzdy_p" data-target-input="nearest" data-cx-ctrl="date-month">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfScKhsfsqYsfy_sfzdy_p" id="wgSfScKhsfsqYsfy_sfzdy" name="sfzdy" value=""  maxlength="7" pattern="^\d{4}-((0([1-9]))|(1(0|1|2)))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfScKhsfsqYsfy_sfzdy_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
					
	                <div class="form-group row">
	                    <label for="wgSfScKhsfsqYsfy_sfbzid" class="col-2 col-form-label">收费标准</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfScKhsfsqYsfy_sfbzid" name="sfbzid">
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                    
	                    <label for="wgSfScKhsfsqYsfy_fyje" class="col-2 col-form-label required">应收金额</label>
		                <div class="col-4">
		                    <input type="text" class="form-control" id="wgSfScKhsfsqYsfy_fyje" name="fyje" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" required>
		                    <div class="invalid-tooltip">请输入正确的应收金额</div>
		                </div>
	                </div>
	                
	                <div class="form-group row mb-0">
	                    <label for="wgSfScKhsfsqYsfy_sfsm" class="col-2 col-form-label">收费说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfScKhsfsqYsfy_sfsm" name="sfsm" maxlength="190" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的收费说明</div>
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
	
	<div class="modal fade" id="wgSfScKhfysqYskmxModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<div class="modal-header">
	                <h5 class="modal-title">预付款明细</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="table-responsive" style="height:520px;">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-khfysq-yskmx fixed-thead">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>类型</th>
						            <th>相应时间段</th>
						            <th>收款时间</th>
						            <th>前金额</th>
						            <th>发生额</th>
						            <th>后金额</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="9" class="table-empty">暂无数据</td>
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
	
	<div class="modal fade" id="wgSfScKhfysqSfpzmxModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysq/yj.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysq/zhxx.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysq/khfysq.js') }" />"></script>
</body>
</html>