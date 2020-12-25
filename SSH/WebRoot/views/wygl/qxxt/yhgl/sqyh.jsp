<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>社区用户管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgQxYhSqyhCntr">
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
						<table class="table table-sm table-zebra table-hover table-fixed table-wgqx-yh-sqyh fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgQxYhSqyhIndexerAll" name="checkAll">
						            	<label for="wgQxYhSqyhIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>登录账号</th>
						            <th>用户名称</th>
						            <th>所属岗位</th>
						            <th>用户类型</th>
						            <th>性别</th>
						            <th>联系电话</th>
						            <th>微信</th>
						            <th>地址</th>
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
	
	<div class="modal fade" id="wgQxYhSqyhModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgQxYhSqyhModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgQxYhSqyhDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="yhid" value="">
	            <input type="hidden" name="sqid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgQxYhSqyhModalDtlsLabel">添加机构用户</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body pb-0">
	            	<div class="form-group row mb-0">
	                    <label for="wgQxYhSqyh_yhdm mb-3" class="col-12 col-md-2 col-form-label required">账号</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_yhdm" name="yhdm" maxlength="30" placeholder="请输入登录账号" pattern="^[A-Za-z0-9_\-\.]{3,30}$" autocomplete="off" required>
	                        <div class="invalid-tooltip">账号包含3到30个以下字符 A-Z 0-9 _ - .</div>
	                    </div>
	                    
	                    <label for="wgQxYhSqyh_yhmc mb-3" class="col-12 col-md-2 col-form-label required">名称</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_yhmc" name="yhmc" maxlength="50" placeholder="请输入用户名称" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的用户名称</div>
	                    </div>
	                
	                	<label for="wgQxYhSqyh_yhmm mb-3" class="col-12 col-md-2 col-form-label required">密码</label>
	                	<div class="col-12 col-md-4 mb-3">
	                        <input type="password" class="form-control" id="wgQxYhSqyh_yhmm" name="yhmm" placeholder="请输入密码" maxlength="30" pattern="^.{3,30}$" required>
	                        <div class="invalid-tooltip">密码的长度必须在3到30之间</div>
	                    </div>
                    
	                    <label for="wgQxYhSqyh_yhlx_0 mb-3" class="col-12 col-md-2 col-form-label">用户类型</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <div class="p-sim-ctrl">
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yhlx" id="wgQxYhSqyh_yhlx_0" value="0" checked>
									<label class="custom-control-label" for="wgQxYhSqyh_yhlx_0">普通用户</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yhlx" id="wgQxYhSqyh_yhlx_1" value="1">
									<label class="custom-control-label" for="wgQxYhSqyh_yhlx_1">管理员</label>
								</div>
		                    </div>
	                    </div>
	                    
	                    <label for="wgQxYhSqyh_gwid mb-3" class="col-12 col-md-2 col-form-label required">所属岗位</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <select class="custom-select"id="wgQxYhSqyh_gwid" name="gwid" required>
								<option value="">选择岗位</option>
							</select>
							<div class="invalid-tooltip">请选择岗位</div>
	                    </div>
	                    
	                    <label for="wgQxYhSqyh_xb_1 mb-3" class="col-12 col-md-2 col-form-label">性别</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <div class="p-sim-ctrl">
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="xb" id="wgQxYhSqyh_xb_1" value="1" checked>
									<label class="custom-control-label" for="wgQxYhSqyh_xb_1">男</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="xb" id="wgQxYhSqyh_xb_2" value="2">
									<label class="custom-control-label" for="wgQxYhSqyh_xb_2">女</label>
								</div>
		                    </div>
	                    </div>
	                
	                    <label for="wgQxYhSqyh_yxbj_1 mb-3" class="col-12 col-md-2 col-form-label">状态</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgQxYhSqyh_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgQxYhSqyh_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgQxYhSqyh_yxbj_0" value="0">
									<label class="custom-control-label" for="wgQxYhSqyh_yxbj_0">禁用</label>
								</div>
		                    </div>
	                    </div>
	                    
	                    <label for="wgQxYhSqyh_wxh mb-3" class="col-12 col-md-2 col-form-label">微信</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_wxh" name="wxh" maxlength="48">
	                        <div class="invalid-tooltip">请输入不超过48个字符的微信号</div>
	                    </div>
	                
	                    <label for="wgQxYhSqyh_dzyx mb-3" class="col-12 col-md-2 col-form-label">邮箱</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_dzyx" name="dzyx" maxlength="48">
	                        <div class="invalid-tooltip">请输入不超过48个字符的邮箱</div>
	                    </div>
	                    
	                    <label for="wgQxYhSqyh_lxdh mb-3" class="col-12 col-md-2 col-form-label">联系电话</label>
	                    <div class="col-12 col-md-4 mb-3">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_lxdh" name="lxdh" maxlength="48">
	                        <div class="invalid-tooltip">请输入不超过48个字符的联系电话</div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0 d-none">
	                    <label for="wgQxYhSqyh_dz" class="col-12 col-md-2 col-form-label">地址</label>
	                    <div class="col-12 col-md-10">
	                        <textarea class="form-control" id="wgQxYhSqyh_dz" name="dz" maxlength="190" rows="2"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的地址</div>
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
	
	<div class="modal fade" id="wgQxYhSqyhModalResetPwd" tabindex="-1" role="dialog" aria-labelledby="wgQxYhSqyhModalResetPwdLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgQxYhSqyhResetPwdFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="yhid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgQxYhSqyhModalResetPwdLabel">重置密码</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row">
	                    <label for="wgQxYhSqyh_account" class="col-md-3 col-form-label required">用户名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgQxYhSqyh_account" name="yhmc" disabled>
	                    </div>
	                </div>
	                
	                <div class="form-group row">
	                    <label for="wgQxYhSqyh_newPwd" class="col-md-3 col-form-label required">新密码</label>
	                    <div class="col-md-9">
	                        <input type="password" class="form-control" id="wgQxYhSqyh_newPwd" name="yhmm" pattern="^.{3,30}$" required>
	                        <div class="invalid-tooltip">新密码长度必须在3到30个字符之间，且不能与旧密码相同</div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgQxYhSqyh_newPwd2" class="col-md-3 col-form-label required">确认密码</label>
	                    <div class="col-md-9">
	                        <input type="password" class="form-control" id="wgQxYhSqyh_newPwd2" name="yhmm2" data-cx-validate="<c:out value='{"eq":"#wgQxYhSqyh_newPwd"}' />" pattern="^.{3,30}$" required>
	                        <div class="invalid-tooltip">两次输入的密码不相同</div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/qxxt/yhgl/sqyh.js') }" />"></script>
</body>
</html>