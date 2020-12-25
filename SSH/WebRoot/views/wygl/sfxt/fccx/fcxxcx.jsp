<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>房产信息查询 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfWycxFcxxcxCntr">
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
						<%--
						<div class="btn-group" role="group">
							<button type="button" class="btn btn-outline-primary" data-cmd="filter"><i class="fas fa-search"></i><span>查询</span></button>
							<button type="button" class="btn btn-outline-primary" data-cmd="toggle-filterbar" title="打开或隐藏查询栏"><i class="fas fa-sort"></i></button> <!-- 可以配置：clear-filter / clear-filter-submit -->
							<button type="button" class="btn btn-outline-primary" data-cmd="clear-filter" title="清空所有查询条件" style="width:2.5em"><i class="fas fa-backspace"></i></button>
						</div>
						--%>
						<button type="button" class="btn btn-outline-primary" data-cmd="dc"><i class="fas fa-file-download fw-1"></i><span>导出</span></button>
                    </div>
                </div>
                
                <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<input type="hidden" name="yxbj" value="1">
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
						<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                    
	                    <label for="wgSfWycxFcxxcx_slrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收楼日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxFcxxcx_slrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxFcxxcx_slrqq_p" id="wgSfWycxFcxxcx_slrqq" name="slrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxFcxxcx_slrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxFcxxcx_slrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxFcxxcx_slrqz_p" id="wgSfWycxFcxxcx_slrqz" name="slrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxFcxxcx_slrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
	                	<label for="wgSfWycxFcxxcx_fc_fclxdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">房产类型</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_fc_fclxdm" name="fclxdm">
								<option value="">全部</option>
								<option value="_NULL_">未填写</option>
								<option value="1">普通住宅</option>
								<option value="5">商铺</option>
								<option value="2">公寓</option>
								<option value="3">别墅</option>
								<option value="4">写字楼</option>
								<!-- <option value="6">小高层</option>
								<option value="7">高层</option> -->
								<option value="8">其他</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxFcxxcx_fc_fcxzdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">房产性质</label>
						<div class="col-md-2 col-3xl-2">
							<select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_fc_fcxzdm" name="fcxzdm">
								<option value="">全部</option>
								<option value="_NULL_">未填写</option>
								<option value="1">商铺房</option>
								<option value="2">经济适用房</option>
								<option value="3">房改房</option>
								<option value="4">廉租房</option>
								<option value="5">周转房</option>
								<option value="6">人才房</option>
								<option value="7">公租房</option>
								<option value="8">其他</option>
							</select>
						</div>
		                <label for="wgSfWycxFcxxcx_f_slzt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收楼状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_slzt" name="slzt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">未收楼</option>
	                        	<option value="1">已收楼</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxFcxxcx_f_rzzt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">入住状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_rzzt" name="rzzt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">未入住</option>
	                        	<option value="1">已入住</option>
							</select>
	                    </div>
	                
	                	<label for="wgSfWycxFcxxcx_f_cszt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">出售状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_cszt" name="cszt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">待售</option>
	                        	<option value="1">已售</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxFcxxcx_f_fczt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">房产状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_fczt" name="fczt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">无效</option>
	                        	<option value="1">有效</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxFcxxcx_f_zlzt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">租赁状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_zlzt" name="zlzt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">待租</option>
	                        	<option value="1">已租</option>
							</select>
	                    </div>
	                    
	                    <%-- <label for="wgSfWycxFcxxcx_f_czzt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">是否可租</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_czzt" name="czzt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">不可租</option>
	                        	<option value="1">可租</option>
							</select>
	                    </div> --%>
	                    
	                    <label for="wgSfWycxFcxxcx_f_zxzt" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">装修状态</label>
	                    <div class="col-md-2 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxFcxxcx_f_zxzt" name="zxzt">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="0">未装修</option>
	                        	<option value="1">装修中</option>
	                        	<option value="2">已装修</option>
							</select>
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-wycx-fcxxcx fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产信息</th>
						            <th>楼层</th>
						            <th>所属户型</th>
						            <th>房产性质</th>
						            <th>房产类型</th>
						            <th>建筑面积(㎡)</th>
						            <th>套内面积(㎡)</th>
						            <th>收楼日期</th>
						            <th>收楼状态</th>
						            <th>入住状态</th>
						            <th>装修状态</th>
						            <th>房产状态</th>
						            <th>租赁状态</th>
						            <th>出售状态</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="15" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fccx/fcxxcx.js') }" />"></script>
</body>
</html>