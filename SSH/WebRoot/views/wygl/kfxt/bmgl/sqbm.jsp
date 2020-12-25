<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>社区部门 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgKfBmglSqbmCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<label class="col-form-label tbr-label">社区</label>
						<select class="custom-select tbr-form-ctrl cx-f-1" name="sqdm"></select>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus mr-1"></i><span>添加</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgkf-bmgl-sqbm fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            
						            <th>部门名称</th>
						            <th>主管</th>
						            <th>上级主管</th>
						            <th>部门标记</th>
						            <th>操作</th>
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
	
	<div class="modal fade" id="wgKfBmglSqbmModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgKfBmglSqbmModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgKfBmglSqbmDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="sqbmid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgKfBmglSqbmModalDtlsLabel">添加部门</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
                    <div class="form-group row no-gutters">
						<label class="col-4 col-form-label required">部门名称</label>
	                    <div class="col-8">
	                        <input type="text" class="form-control" name="sqbmmc" maxlength="48" placeholder="部门名称" required>
	                        <div class="invalid-tooltip">请输入部门名称</div>
	                    </div>
					</div>
					<div class="form-group row no-gutters">
	                    <label class="col-4 col-form-label required">部门标记</label>
	                    <div class="col-8">
	                    	<!-- <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="slbmbj" id="wgKfBmglSqbm_slbmbj_0" value="0" checked>
									<label class="custom-control-label" for="wgKfBmglSqbm_slbmbj_0">否</label>
								</div>
						        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="slbmbj" id="wgKfBmglSqbm_slbmbj_1" value="1">
									<label class="custom-control-label" for="wgKfBmglSqbm_slbmbj_1">是</label>
								</div>
						    </div> -->
						    <select class="custom-select" name="slbmbj" required>
								<option value="0" selected>默认</option>
								<option value="1">客服</option>
								<option value="2">抄表</option>
							</select>
	                    </div>
	                </div>
	                <%-- <div class="form-group row no-gutters">
	                    <label class="col-4 col-form-label required">主管</label>
	                    <div class="col-8">
	                        <select class="custom-select" name="zgwyhydm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择部门主管</div>
	                    </div>
	                </div> --%>
	                <div class="form-group row no-gutters">
	                    <label class="col-4 col-form-label">主管会员代码</label>
	                    <div class="col-8">
	                        <input type="text" class="form-control" name="zgwyhydm" maxlength="20" placeholder="微信公众号会员代码" pattern="^[\d\(\)\+\-]{6,20}$" autocomplete="off">
	                    	<div class="invalid-tooltip">请输入正确的主管会员代码</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters mb-0">
	                    <label class="col-4 col-form-label">上级主管会员代码</label>
	                    <div class="col-8">
	                        <input type="text" class="form-control" name="sjzgwyhydm" maxlength="20" placeholder="微信公众号会员代码" pattern="^[\d\(\)\+\-]{6,20}$" autocomplete="off">
	                    	<div class="invalid-tooltip">请输入正确的上级主管会员代码</div>
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
	
	<div class="modal fade" id="wgKfBmglSqbmModalStaff" tabindex="-1" role="dialog" aria-labelledby="wgKfBmglSqbmModalStaffLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgKfBmglSqbmStaffFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="sqbmid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgKfBmglSqbmModalStaffLabel">部门职员管理</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
					<div class="form-group row no-gutters">
						<label class="col-12 col-form-label">当前职员列表</label>
	                    <div class="col-12">
	                        <div class="p-sim-ctrl px-0 cx-editable-list" style="height:280px;overflow:auto;"></div>
	                    </div>
					</div>
					
					<div class="form-group row no-gutters mt-4">
	                    <div class="col-8">
	                        <input type="text" class="form-control" name="wyhydm" maxlength="20" placeholder="输入微信公众号会员代码" pattern="^[\d\(\)\+\-]{6,20}$" autocomplete="off" required>
	                    	<div class="invalid-tooltip">请输入正确的会员代码</div>
	                    </div>
	                    <div class="col-4 pl-3 d-flex-center">
	                    	<button type="submit" class="btn btn-outline-primary btn-block" style="padding-top:calc(1px + .375rem);padding-bottom:calc(1px + .375rem);"><i class="fas fa-plus"></i><span>添加</span></button>
	                    </div>
					</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->	
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/kfxt/bmgl/sqbm.js') }" />"></script>
</body>
</html>