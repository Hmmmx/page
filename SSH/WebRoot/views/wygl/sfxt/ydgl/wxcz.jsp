<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>微信账户充值 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfYdWxczCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<div class="cx-l-height-1 px-1">
							<span>微信余额：</span>
							<span class="wx-remaining"><span class="number">0</span><span class="loading" style="display:none;"><i class="fas fa-circle-notch fa-spin ml-1"></i></span></span>
						</div>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-cz"><i class="fas fa-hand-holding-usd fw-1"></i><span>充值</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-yd-wxcz fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfYdWxczIndexerAll" name="checkAll">
						            	<label for="wgSfYdWxczIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>操作人员</th>
						            <th>操作类型</th>
						            <th>操作日期</th>
						            <th>变更条数</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="6" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/ydgl/wxcz.js') }" />"></script>
</body>
</html>