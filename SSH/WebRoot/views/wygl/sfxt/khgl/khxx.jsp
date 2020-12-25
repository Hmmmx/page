<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户信息管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfKhKhxxCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-khxx fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfKhKhxxIndexerAll" name="checkAll">
						            	<label for="wgSfKhKhxxIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>客户</th>
						            <th>客户类型</th>
						            <th>性别</th>
						            <th>联系电话</th>
						            <th>接收短信手机号码</th>
						            <th>银行代扣</th>
						            <th>状态</th>
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
	
	<div class="modal fade" id="wgSfKhKhxxModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfKhKhxxModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfKhKhxxDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="khid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfKhKhxxModalDtlsLabel">添加客户</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:scroll;">
	            	<div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>主要信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="form-group row">
	                    <label for="wgSfKhKhxx_khmc" class="col-2 col-form-label required">客户名称</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_khmc" name="khmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的客户名称</div>
	                    </div>
		                
		                
	                    <label for="wgSfKhKhxx_khlxdm" class="col-2 col-form-label required">客户类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfKhKhxx_khlxdm" name="khlxdm" data-lazy-load="khlx" 
	                        		data-exist="false" data-cx-validate="<c:out value='{"attr":{"name":"data-exist", "value":"false", "op":"eq"}}' />" required>
	                        	<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip" data-def-msg="请选择客户类型" data-exist-msg="业主与租客分别只能设置一个">请选择客户类型</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_lxdh" class="col-2 col-form-label">联系电话</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_lxdh" name="lxdh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的联系电话</div>
	                    </div>
	                    
	                	<label for="wgSfKhKhxx_sjhm" class="col-2 col-form-label">接收短信手机号码</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_sjhm" name="sjhm" maxlength="32">
	                        <div class="invalid-tooltip">请输入不超过32个字符的接收短信手机号码</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_yxbj_1" class="col-2 col-form-label">状态</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfKhKhxx_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgSfKhKhxx_yxbj_1">有效</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfKhKhxx_yxbj_0" value="0">
									<label class="custom-control-label" for="wgSfKhKhxx_yxbj_0">无效</label>
								</div>
		                    </div>
	                    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header">
	            	<span>基本信息</span>
	            	<span><i class="fas fa-angle-right collapsed" data-expanded-class="fas fa-angle-down expanded" data-collapsed-class="fas fa-angle-right collapsed"></i></span>
	            	</div>
	            	<div class="p-body">
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_zjlxdm" class="col-2 col-form-label">证件类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfKhKhxx_zjlxdm" name="zjlxdm" data-lazy-load="zjlx">
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择证件类型</div>
	                    </div>
	                    
	                    <label for="wgSfKhKhxx_zjhm" class="col-2 col-form-label">证件号码</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_zjhm" name="zjhm" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的证件号码</div>
	                    </div>
	                </div>
	                <div class="form-group row">
					    <label for="wgSfKhKhxx_csrq" class="col-2 col-form-label">出生日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfKhKhxx_csrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfKhKhxx_csrq_p" id="wgSfKhKhxx_csrq" name="csrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfKhKhxx_csrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
	                    <label for="wgSfKhKhxx_xbdm_1" class="col-2 col-form-label">性别</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl">
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="xbdm" id="wgSfKhKhxx_xbdm_x" value="" checked>
									<label class="custom-control-label" for="wgSfKhKhxx_xbdm_x">未填写</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="xbdm" id="wgSfKhKhxx_xbdm_1" value="1">
									<label class="custom-control-label" for="wgSfKhKhxx_xbdm_1">男</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="xbdm" id="wgSfKhKhxx_xbdm_0" value="0">
									<label class="custom-control-label" for="wgSfKhKhxx_xbdm_0">女</label>
								</div>
		                    </div>
	                    </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfKhKhxx_jsrq" class="col-2 col-form-label">接收日期</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfKhKhxx_jsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfKhKhxx_jsrq_p" id="wgSfKhKhxx_jsrq" name="jsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfKhKhxx_jsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfKhKhxx_tcrq" class="col-2 col-form-label">退出日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfKhKhxx_tcrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfKhKhxx_tcrq_p" id="wgSfKhKhxx_tcrq" name="tcrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfKhKhxx_tcrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_htbh" class="col-2 col-form-label">合同编号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_htbh" name="htbh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的合同编号</div>
	                    </div>
		                
		                <label for="wgSfKhKhxx_crzh" class="col-2 col-form-label">出入证号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_crzh" name="crzh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的出入证号</div>
	                    </div>
	                </div>
					</div>
					</div>
					
					<div class="paragraph">
	            	<div class="p-header">
	            	<span>代扣信息</span>
	            	<span><i class="fas fa-angle-right collapsed" data-expanded-class="fas fa-angle-down expanded" data-collapsed-class="fas fa-angle-right collapsed"></i></span>
	            	</div>
	            	<div class="p-body">
	                <div class="form-group row">
						<label for="wgSfKhKhxx_dkbj_0" class="col-2 col-form-label required">银行代扣</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="dkbj" id="wgSfKhKhxx_dkbj_1" value="1">
									<label class="custom-control-label" for="wgSfKhKhxx_dkbj_1">是</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="dkbj" id="wgSfKhKhxx_dkbj_0" value="0" checked>
									<label class="custom-control-label" for="wgSfKhKhxx_dkbj_0">否</label>
								</div>
		                    </div>
	                    </div>
	                    
	                    <label for="wgSfKhKhxx_dkfadm" class="col-2 col-form-label">代扣方案</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfKhKhxx_dkfadm" name="dkfadm" data-lazy-load="dkfa">
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择代扣方案</div>
	                    </div>
	                </div>
	                <div class="form-group row">
		                <label for="wgSfKhKhxx_yhzh" class="col-2 col-form-label">银行账号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_yhzh" name="yhzh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的银行账号</div>
	                    </div>
	                    
	                    <label for="wgSfKhKhxx_yhzhmc" class="col-2 col-form-label">户名</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_yhzhmc" name="yhzhmc" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的户名</div>
	                    </div>
	                </div>
	                <div class="form-group row">
		                <label for="wgSfKhKhxx_yhzjhm" class="col-2 col-form-label">账号证件号码</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_yhzjhm" name="yhzjhm" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的账号证件号码</div>
	                    </div>
	                    
	                    <label for="wgSfKhKhxx_yhhh" class="col-2 col-form-label">银行行号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_yhhh" name="yhhh" maxlength="32">
	                        <div class="invalid-tooltip">请输入不超过32个字符的银行行号</div>
	                    </div>
	                </div>
	                <div class="form-group row">
		                <label for="wgSfKhKhxx_yhhb" class="col-2 col-form-label">银行行别</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_yhhb" name="yhhb" maxlength="32">
	                        <div class="invalid-tooltip">请输入不超过32个字符的银行行别</div>
	                    </div>
	                    
	                    <label for="wgSfKhKhxx_jfbh" class="col-2 col-form-label">缴费编号</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_jfbh" name="jfbh" maxlength="50">
	                        <div class="invalid-tooltip">请输入不超过50个字符的缴费编号</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header">
	            	<span>联系信息</span>
	            	<span><i class="fas fa-angle-right collapsed" data-expanded-class="fas fa-angle-down expanded" data-collapsed-class="fas fa-angle-right collapsed"></i></span>
	            	</div>
	            	<div class="p-body">
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_dzyx" class="col-2 col-form-label">电子邮箱</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_dzyx" name="dzyx" maxlength="32">
	                        <div class="invalid-tooltip">请输入不超过32个字符的电子邮箱</div>
	                    </div>
		                
		                <label for="wgSfKhKhxx_khbq" class="col-2 col-form-label">客户标签</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_khbq" name="khbq" maxlength="32">
	                        <div class="invalid-tooltip">请输入不超过32个字符的客户标签</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_jjlxrxm" class="col-2 col-form-label">紧急联系人姓名</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_jjlxrxm" name="jjlxrxm" maxlength="100">
	                        <div class="invalid-tooltip">请输入不超过100个字符的紧急联系人姓名</div>
	                    </div>
		                
		                <label for="wgSfKhKhxx_jjlxrdh" class="col-2 col-form-label">紧急联系人电话</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_jjlxrdh" name="jjlxrdh" maxlength="100">
	                        <div class="invalid-tooltip">请输入不超过100个字符的紧急联系人电话</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfKhKhxx_jzdz" class="col-2 col-form-label">居住地址</label>
	                    <div class="col-10">
	                        <input type="text" class="form-control" id="wgSfKhKhxx_jzdz" name="jzdz" maxlength="100">
	                        <div class="invalid-tooltip">请输入不超过100个字符的居住地址</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header">
	            	<span>其他信息</span>
	            	<span><i class="fas fa-angle-right collapsed" data-expanded-class="fas fa-angle-down expanded" data-collapsed-class="fas fa-angle-right collapsed"></i></span>
	            	</div>
	            	<div class="p-body">
	                <div class="form-group row mb-0">
	                    <label for="wgSfKhKhxx_bz" class="col-2 col-form-label">备注</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfKhKhxx_bz" name="bz" maxlength="480" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过480个字符的备注</div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/khgl/khxx.js') }" />"></script>
</body>
</html>