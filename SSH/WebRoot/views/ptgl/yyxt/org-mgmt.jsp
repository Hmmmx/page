<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>组织机构管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="sysoMgmtCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div id="sysoOrgTree"><div class="text-black-50 text-center py-1">组织机构列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" id="sysoAddOrg"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-sys-org">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="sysoOrgIndexerAll" name="checkAll">
						            	<label for="sysoOrgIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>机构代码</th>
						            <th>机构名称</th>
						            <th>序号</th>
						            <th>有效期</th>
						            <th>上级机构</th>
						            <th>联系人</th>
						            <th>联系电话</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="9" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="sysoModalOrgDtls" tabindex="-1" role="dialog" aria-labelledby="sysoModalOrgDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="sysoOrgDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="jgid" value="">
	            <input type="hidden" name="sjjgid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="sysoModalOrgDtlsLabel">添加组织机构</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_jgdm" class="col-md-3 col-form-label required">代码</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="sysoOrg_jgdm" name="jgdm" maxlength="32" required>
	                        <div class="invalid-tooltip">请输入不超过32个字符的机构代码</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_jgmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="sysoOrg_jgmc" name="jgmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的机构名称</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_plxh" class="col-md-3 col-form-label required">序号</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="sysoOrg_plxh" name="plxh" maxlength="5" pattern="^\d+$" required>
	                        <div class="invalid-tooltip">请输入不超过5位数的序号</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_syqxq" class="col-md-3 col-form-label">有效期</label>
	                    <div class="col-md-4 pr-compact-md-1 mb-3 mb-md-0">
	                    	<div class="input-group date" id="sysoOrgSyqxq" data-target-input="nearest">
                                <input type="text" class="form-control datetimepicker-input" data-target="#sysoOrgSyqxq" id="sysoOrg_syqxq" name="syqxq" value="" placeholder="开始日期"  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#sysoOrgSyqxq" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">时间格式不正确</div>
                            </div>
	                    </div>
	                    <label for="wgOrg_syqxz" class="col-md-1 col-form-label text-center">-</label>
	                    <div class="col-md-4 pl-compact-md-1">
	                        <div class="input-group date" id="sysoOrgSyqxz" data-target-input="nearest">
                                <input type="text" class="form-control datetimepicker-input" data-target="#sysoOrgSyqxz" id="sysoOrg_syqxz" name="syqxz" value="" placeholder="结束日期"  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#sysoOrgSyqxz" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">时间格式不正确</div>
                            </div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_lxr" class="col-md-3 col-form-label">联系人</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="sysoOrg_lxr" name="lxr" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的联系人</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="sysoOrg_lxdh" class="col-md-3 col-form-label">联系电话</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="sysoOrg_lxdh" name="lxdh" maxlength="20">
	                        <div class="invalid-tooltip">请输入不超过20个字符的联系电话</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters mb-0">
	                    <label for="sysoOrg_yxbj_1" class="col-md-3 col-form-label">状态</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="sysoOrg_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="sysoOrg_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="sysoOrg_yxbj_0" value="0">
									<label class="custom-control-label" for="sysoOrg_yxbj_0">禁用</label>
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
	
	<div class="modal fade" id="sysoModalAssignSysMenu" tabindex="-1" role="dialog" aria-labelledby="sysoModalAssignSysMenuLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="sysoAssignOrgMenuFrm" action="<s:url value='/xtjg/addXtJggn' />" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="assign">
	            <input type="hidden" name="jgid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="sysoModalAssignSysMenuLabel">指派系统菜单给机构</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body p-0">
	                <div class="row no-gutters">
	                    <div class="col-12">
	                        <div class="py-1 tv-cntr tv-in-modal">
								<div id="sysoAssignSysMenuTree"><div class="text-black-50 text-center py-1">系统菜单列表</div></div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/ptgl/yyxt/org.mgmt.js') }" />"></script>
</body>
</html>