<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>社区岗位管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgQxGwSqgwCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">机构列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgqx-gw-sqgw fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgQxGwSqgwIndexerAll" name="checkAll">
						            	<label for="wgQxGwSqgwIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>岗位名称</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="3" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgQxGwSqgwModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgQxGwSqgwModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgQxGwSqgwDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="sqid" value="">
	            <input type="hidden" name="gwid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgQxGwSqgwModalDtlsLabel">添加机构岗位</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
	                    <label for="wgQxGwSqgw_gwmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgQxGwSqgw_gwmc" name="gwmc" maxlength="48" required>
	                        <div class="invalid-tooltip">请输入不超过48个字符的岗位名称</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters mb-0">
	                    <label for="wgQxGwSqgw_yxbj_1" class="col-md-3 col-form-label">状态</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgQxGwSqgw_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgQxGwSqgw_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgQxGwSqgw_yxbj_0" value="0">
									<label class="custom-control-label" for="wgQxGwSqgw_yxbj_0">禁用</label>
								</div>
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
	
	<div class="modal fade" id="wgQxGwSqgwModalQx" tabindex="-1" role="dialog" aria-labelledby="wgQxGwSqgwModalQxLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgQxGwSqgwQxFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="assign">
	            <input type="hidden" name="gwid" value="">
	            <input type="hidden" name="sqid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgQxGwSqgwModalQxLabel">指派权限给岗位</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body p-0">
	                <div class="row no-gutters">
	                    <div class="col-12">
	                        <div class="py-1 tv-cntr tv-in-modal">
								<div class="tv-wrapper"><div class="text-black-50 text-center py-1">权限列表列表</div></div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/qxxt/gwgl/sqgw.js') }" />"></script>
</body>
</html>