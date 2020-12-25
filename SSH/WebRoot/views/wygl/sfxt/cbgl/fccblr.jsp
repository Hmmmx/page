<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>房产抄表录入 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCbKhybCblrCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<label class="col-form-label tbr-label">仪表类型</label>
						<select class="custom-select tbr-form-ctrl cx-f-1" name="yblxdm" data-lazy-load="yblx"><option value="">全部</option></select>
						
						<button type="button" class="btn btn-outline-primary" data-cmd="copy"><i class="far fa-copy fw-1"></i><span>复制选项到后面所有行</span></button>
						<button type="button" class="btn btn-outline-primary" data-cmd="save"><i class="far fa-save fw-1"></i><span>保存</span></button>
						<%-- <div class="btn-group">
							<button type="button" class="btn btn-outline-primary" data-cmd="filter"><i class="fas fa-search"></i><span>查询</span></button>
							<button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" data-reference="parent" aria-haspopup="true" aria-expanded="false">
							<span class="sr-only">Toggle</span>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="javascript:;" data-cmd="clear-filter">清空所有查询条件</a> <!-- 可以配置：clear-filter / clear-filter-submit -->
								<a class="dropdown-item" href="javascript:;" data-cmd="toggle-filterbar">打开或隐藏查询栏</a>
							</div>
						</div> --%>
                    </div>
                </div>
                
                <%-- <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
		                <label for="wgSfCbKhybCblr_f_yblxdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm col-form-label">仪表类型</label>
	                    <div class="col-md-3 col-3xl-2 pl-3">
	                        <select class="custom-select custom-select-sm" id="wgSfCbKhybCblr_f_yblxdm" name="yblxdm" data-lazy-load="yblx" data-init-value="">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                </div>
	                </form>
				</div> --%>
				
				<div class="main-content">
					<form id="wgSfCbKhybCblrInputFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-khyb-cblr fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						        	<th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产名称</th>
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
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="14" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/cbgl/fccblr.js') }" />"></script>
</body>
</html>