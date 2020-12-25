<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>预收款余额 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCwbbYskyeCntr">
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
	                    
		                <label for="wgSfCwbbYskye_f_sfxmdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收费项目</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYskye_f_sfxmdm" name="sfxmdm">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                	
	                	<label for="wgSfCwbbYskye_f_dqye" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">当前余额</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbYskye_f_dqye" name="dqye" maxlength="10" placeholder="显示余额大于等于该值的房产" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$">
	                        <div class="invalid-tooltip">请输入正确的余额</div>
	                    </div>
	                    
	                    <label for="wgSfCwbbYskye_f_khmc" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">客户名称</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbYskye_f_khmc" name="khmc" maxlength="10">
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-cwbb-ysk-ye fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产信息</th>
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
									<td colspan="8" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfCwbbYskyeYskmxModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
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
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-cwbb-ysk-ye-yskmx fixed-thead">
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
									<td colspan="7" class="table-empty">暂无数据</td>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fycx/yskye.js') }" />"></script>
</body>
</html>