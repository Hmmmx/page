<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>缴费月账单- 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCwbbJfydzCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<div class="btn-group d-none">
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
					<input type="hidden" name="yxbj" value="1">
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row my-3">
						<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                    
	                    <label for="wgSfCwbbJfydz_sfzdy_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm pl-0 pl-3xl-3 required">收费账单月</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" id="wgSfCwbbJfydz_sfzdy_p" data-target-input="nearest" data-cx-ctrl="date-month">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbJfydz_sfzdy_p" id="wgSfCwbbJfydz_sfzdy" name="sfzdy" value=""  maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" autocomplete="off" novalidate required>
					            <div class="input-group-append" data-target="#wgSfCwbbJfydz_sfzdy_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确格式的账单月</div>
					        </div>
	                	</div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content d-none">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-cwbb-jfydz fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产信息</th>
						            <th>客户名称</th>
						            <th>手机号码</th>
						            <th>收费项目</th>
						            <th>计费周期</th>
						            <th>上期读数</th>
						            <th>本期读数</th>
						            <th>面积/用量</th>
						            <th>账单月</th>
						            <th>应收日期</th>
						            <th>应收金额</th>
						            <th>已收金额</th>
						            <th>有效状态</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="14" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/jfdcx/jfydz.js') }" />"></script>
</body>
</html>