<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>机构岗位管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="syspMgmtCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div id="syspOrgTree"><div class="text-black-50 text-center py-1">机构岗位列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" id="syspAddPos"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-sys-pos">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="syspPosIndexerAll" name="checkAll">
						            	<label for="syspPosIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
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
	
	<div class="modal fade" id="syspModalPosDtls" tabindex="-1" role="dialog" aria-labelledby="syspModalPosDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="syspPosDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="jgid" value="">
	            <input type="hidden" name="gwid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="syspModalPosDtlsLabel">添加机构岗位</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
	                    <label for="syspPos_gwmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="syspPos_gwmc" name="gwmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的岗位名称</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters mb-0">
	                    <label for="syspPos_yxbj_1" class="col-md-3 col-form-label">状态</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="syspPos_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="syspPos_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="syspPos_yxbj_0" value="0">
									<label class="custom-control-label" for="syspPos_yxbj_0">禁用</label>
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
	
	<div class="modal fade" id="syspModalAssignPriv" tabindex="-1" role="dialog" aria-labelledby="syspModalAssignPrivLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="syspAssignPrivFrm" action="<s:url value='/jggw/addGwgn' />" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="assign">
	            <input type="hidden" name="gwid" value="">
	            <input type="hidden" name="jgid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="syspModalAssignPrivLabel">指派权限给岗位</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body p-0">
	                <div class="row no-gutters">
	                    <div class="col-12">
	                        <div class="py-1 tv-cntr tv-in-modal">
								<div id="syspAssignPrivTree"><div class="text-black-50 text-center py-1">权限列表列表</div></div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/ptgl/yyxt/pos.mgmt.js') }" />"></script>
</body>
</html>