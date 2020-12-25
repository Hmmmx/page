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
	<div id="jgWgCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div id="wgOrgTree"><div class="text-black-50 text-center py-1">组织机构列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" id="wgAddOrg"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-wg-org">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgOrgIndexerAll" name="checkAll">
						            	<label for="wgOrgIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>机构代码</th>
						            <th>机构名称</th>
						            <th>序号</th>
						            <th>有效期</th>
						            <th>社区类型</th>
						            <th>上级机构</th>
						            <th>联系电话</th>
						            <th>备注</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="10" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgModalOrgDtls" tabindex="-1" role="dialog" aria-labelledby="wgModalOrgDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgOrgDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="sqid" value="">
	            <input type="hidden" name="sjsqid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgModalOrgDtlsLabel">添加组织机构</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_sqdm" class="col-md-3 col-form-label required">代码</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_sqdm" name="sqdm" maxlength="32" required>
	                        <div class="invalid-tooltip">请输入不超过32个字符的机构代码</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_sqmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_sqmc" name="sqmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的机构名称</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_plxh" class="col-md-3 col-form-label required">序号</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_plxh" name="plxh" maxlength="5" pattern="^0|([1-9]\d*)$" required>
	                        <div class="invalid-tooltip">请输入不超过5位数的序号</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_sqlx_1" class="col-md-3 col-form-label">类型</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="sqlx" id="wgOrg_sqlx_0" value="0">
									<label class="custom-control-label" for="wgOrg_sqlx_0">导航</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="sqlx" id="wgOrg_sqlx_1" value="1" checked>
									<label class="custom-control-label" for="wgOrg_sqlx_1">物业公司</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="sqlx" id="wgOrg_sqlx_2" value="2">
									<label class="custom-control-label" for=wgOrg_sqlx_2>小区</label>
								</div>
		                    </div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_syqxq" class="col-md-3 col-form-label">有效期</label>
	                    <div class="col-md-4 pr-compact-md-1 mb-3 mb-md-0">
	                    	<div class="input-group date" id="wgOrgSyqxq" data-target-input="nearest">
                                <input type="text" class="form-control datetimepicker-input" data-target="#wgOrgSyqxq" id="wgOrg_syqxq" name="syqxq" value="" placeholder="开始日期"  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#wgOrgSyqxq" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">时间格式不正确</div>
                            </div>
	                    </div>
	                    <label for="wgOrg_syqxz" class="col-md-1 col-form-label text-center">-</label>
	                    <div class="col-md-4 pl-compact-md-1">
	                        <div class="input-group date" id="wgOrgSyqxz" data-target-input="nearest">
                                <input type="text" class="form-control datetimepicker-input" data-target="#wgOrgSyqxz" id="wgOrg_syqxz" name="syqxz" value="" placeholder="结束日期"  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#wgOrgSyqxz" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">时间格式不正确</div>
                            </div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_lxr" class="col-md-3 col-form-label">联系人</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_lxr" name="lxr" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的联系人</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_lxdh" class="col-md-3 col-form-label">联系电话</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_lxdh" name="lxdh" maxlength="20">
	                        <div class="invalid-tooltip">请输入不超过20个字符的联系电话</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="wgOrg_dz" class="col-md-3 col-form-label ">地址</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_dz" name="dz" maxlength="190" >
	                        <div class="invalid-tooltip">请输入不超过190个字符的地址</div>
	                    </div>
	                </div>
	                 <div class="form-group row no-gutters">
	                    <label for="wgOrg_bz" class="col-md-3 col-form-label ">备注</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgOrg_bz" name="bz" maxlength="480">
	                        <div class="invalid-tooltip">请输入不超过480个字符的备注</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters mb-0">
	                    <label for="wgjgOrg_yxbj_1" class="col-md-3 col-form-label">状态</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgjgOrg_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgjgOrg_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgjgOrg_yxbj_0" value="0">
									<label class="custom-control-label" for="wgjgOrg_yxbj_0">禁用</label>
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
	
	<div class="modal fade" id="wgModalAssignSysMenu" tabindex="-1" role="dialog" aria-labelledby="wgModalAssignSysMenu" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgAssignOrgMenuFrm" action="<s:url value='/wgjg/addXtJggn' />" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="assign">
	            <input type="hidden" name="sqid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgModalAssignSysMenuLabel">指派系统菜单给机构</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body p-0">
	                <div class="row no-gutters">
	                    <div class="col-12">
	                        <div class="py-1 tv-cntr tv-in-modal">
								<div id="wgjgAssignSysMenuTree"><div class="text-black-50 text-center py-1">系统菜单列表</div></div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/ptgl/wgxt/org.wg.js') }" />"></script>
</body>
</html>