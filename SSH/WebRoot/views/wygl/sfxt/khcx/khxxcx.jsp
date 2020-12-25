<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户信息查询 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfWycxKhxxcxCntr">
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
					<input type="hidden" name="yxbj" value="1">
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
						<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                    
	                    <label for="wgSfWycxKhxxcx_jsrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">接收日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxKhxxcx_jsrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxKhxxcx_jsrqq_p" id="wgSfWycxKhxxcx_jsrqq" name="jsrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxKhxxcx_jsrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxKhxxcx_jsrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxKhxxcx_jsrqz_p" id="wgSfWycxKhxxcx_jsrqz" name="jsrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxKhxxcx_jsrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
						<%-- <label for="wgSfWycxKhxxcx_f_xbdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">性别</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxKhxxcx_f_xbdm" name="xbdm">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
	                        	<option value="1">男</option>
	                        	<option value="0">女</option>
							</select>
	                    </div> --%>
	                    
	                    <label for="wgSfWycxKhxxcx_f_khlxdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">客户类型</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxKhxxcx_f_khlxdm" name="khlxdm" data-lazy-load="khlx">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxKhxxcx_f_khmc" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">客户名称</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxKhxxcx_f_khmc" name="khmc" maxlength="10">
	                    </div>
	                    
	                    <label for="wgSfWycxKhxxcx_tsrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">退出日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxKhxxcx_tsrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxKhxxcx_tsrqq_p" id="wgSfWycxKhxxcx_tsrqq" name="tsrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxKhxxcx_tsrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxKhxxcx_tsrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxKhxxcx_tsrqz_p" id="wgSfWycxKhxxcx_tsrqz" name="tsrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxKhxxcx_tsrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
	                	<label for="wgSfWycxKhxxcx_fc_dkbj" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">银行代扣</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxKhxxcx_fc_dkbj" name="dkbj">
								<option value="">全部</option>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxKhxxcx_fc_dkfadm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">代扣方案</label>
						<div class="col-md-3 col-3xl-2">
							<select class="custom-select custom-select-sm" id="wgSfWycxKhxxcx_fc_dkfadm" name="dkfadm" data-lazy-load="dkfa">
								<option value="">全部</option>
							</select>
						</div>
						
		                <label for="wgSfWycxKhxxcx_f_yhzh" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">银行账号</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxKhxxcx_f_yhzh" name="yhzh" maxlength="50">
	                    </div>
	                    
	                    <label for="wgSfWycxKhxxcx_f_sjhm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm pl-0 pl-2xl-gutter">接受短信手机</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxKhxxcx_f_sjhm" name="sjhm" maxlength="30">
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-wycx-khxxcx fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产信息</th>
									<th>建筑面积(㎡)</th>
									<th>客户名称</th>
									<th>客户类型</th>
									
									<th>性别</th>
									<th>手机号码</th>
									<th>证件类型</th>
									<th>证件号码</th>
									<th>接收日期</th>
									
									<th>退出日期</th>
									<th>合同编号</th>
									<th>是否代扣</th>
									<th>银行方案</th>
									<th>银行账号</th>
									
									<th>银行户名</th>
									<th>有效状态</th>
									<th>备注</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="18" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/khcx/khxxcx.js') }" />"></script>
</body>
</html>