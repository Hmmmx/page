<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>短信账户充值 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfYdDxczCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<div class="cx-l-height-1 px-1">
							<span>短信余额：</span>
							<span class="dx-remaining"><span class="number">0</span><span class="loading" style="display:none;"><i class="fas fa-circle-notch fa-spin ml-1"></i></span></span>
						</div>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-cz"><i class="fas fa-hand-holding-usd fw-1"></i><span>充值</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-yd-dxcz fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfYdDxczIndexerAll" name="checkAll">
						            	<label for="wgSfYdDxczIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
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
	
	<div class="modal fade" id="wgSfYdDxczModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfYdDxczModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfYdDxczDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="dkjlid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfYdDxczModalDtlsLabel">短信充值</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">	                
	                    <label for="wgSfYdDxcz_sqdm" class="col-md-3 col-form-label required">社区名称</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfYdDxcz_sqdm" name="sqdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择社区名称</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfYdDxcz_dkfadm" class="col-md-3 col-form-label required">代扣方案</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfYdDxcz_dkfadm" name="dkfadm" data-lazy-load="dkfa" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择代扣方案</div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/ydgl/dxcz.js') }" />"></script>
</body>
</html>