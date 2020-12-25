<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>保安巡查明细 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgKfBaxcXcmxCntr">
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
                    </div>
                </div>
                
                <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
	                    <label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">社区</label>
	                    <div class="col-md-3 col-3xl-2">
	                    	<select class="custom-select custom-select-sm" name="sqdm" required><option value="">请选择</option></select>
	                    </div>
	                	
	                	<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">职员</label>
	                    <div class="col-md-3 col-3xl-2">
	                    	<select class="custom-select custom-select-sm" name="hyid">
	                    		<option value="">全部</option>
	                    	</select>
	                    </div>
	                    
	                    <label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">状态</label>
	                    <div class="col-md-3 col-3xl-1">
	                    	<select class="custom-select custom-select-sm" name="ztbj">
	                    		<option value="">全部</option>
	                    		<option value="0">不正常</option>
	                    		<option value="1">正常</option>
	                    	</select>
	                    </div>
	                
	                    <label for="wgKfBaxcXcmx_f_xcrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">巡查时间</label>
	                	<div class="col-md-4 col-3xl-3 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgKfBaxcXcmx_f_xcrqq_p" data-target-input="nearest" data-cx-ctrl="date-time">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgKfBaxcXcmx_f_xcrqq_p" id="wgKfBaxcXcmx_f_xcrqq" name="xcrqq" value=""  maxlength="16" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgKfBaxcXcmx_f_xcrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgKfBaxcXcmx_f_xcrqz_p" data-target-input="nearest" data-cx-ctrl="date-time">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgKfBaxcXcmx_f_xcrqz_p" id="wgKfBaxcXcmx_f_xcrqz" name="xcrqz" value=""  maxlength="16" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgKfBaxcXcmx_f_xcrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgkf-baxc-xcmx fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>巡查地点</th>
						            <th>职员</th>
						            <th>巡查时间</th>
						            <th>状态</th>
						            
						            <th>说明</th>
						            <th>说明图片</th>
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
			</div>
		</div>
	</div>
	
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/kfxt/baxc/xcmx.js') }" />"></script>
</body>
</html>