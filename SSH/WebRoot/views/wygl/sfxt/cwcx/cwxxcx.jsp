<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>业主车位查询 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfWycxCwxxcxCntr">
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
	                    
	                    <label for="wgSfWycxCwxxcx_kkrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">开卡日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxCwxxcx_kkrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxCwxxcx_kkrqq_p" id="wgSfWycxCwxxcx_kkrqq" name="kkrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxCwxxcx_kkrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxCwxxcx_kkrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxCwxxcx_kkrqz_p" id="wgSfWycxCwxxcx_kkrqz" name="kkrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxCwxxcx_kkrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
						<label for="wgSfWycxCwxxcx_f_cklxdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">车卡类型</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxCwxxcx_f_cklxdm" name="cklxdm" data-lazy-load="cklx">
	                        	<option value="">全部</option>
	                        	<option value="_NULL_">未填写</option>
							</select>
	                    </div>
	                    
	                    <label for="wgSfWycxCwxxcx_f_ckh" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">车卡号</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxCwxxcx_f_ckh" name="ckh" maxlength="30">
	                    </div>
	                    
	                    <label for="wgSfWycxCwxxcx_jsrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">结束日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxCwxxcx_jsrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxCwxxcx_jsrqq_p" id="wgSfWycxCwxxcx_jsrqq" name="jsrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxCwxxcx_jsrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfWycxCwxxcx_jsrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfWycxCwxxcx_jsrqz_p" id="wgSfWycxCwxxcx_jsrqz" name="jsrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfWycxCwxxcx_jsrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                
	                    <label for="wgSfWycxCwxxcx_f_cphm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">车牌号码</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxCwxxcx_f_cphm" name="cphm" maxlength="30">
	                    </div>
	                    
	                    <label for="wgSfWycxCwxxcx_f_cwhm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">车位号码</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfWycxCwxxcx_f_cwhm" name="cwhm" maxlength="30">
	                    </div>
	                    
	                    <label for="wgSfWycxCwxxcx_f_ztbj" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">状态</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfWycxCwxxcx_f_ztbj" name="ztbj">
	                        	<option value="">全部</option>
	                        	<option value="1">有效</option>
	                        	<option value="9">作废</option>
							</select>
	                    </div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-wycx-cwxxcx fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>车库名称</th>
						            <th>房产名称</th>
									<th>车位号码</th>
									<th>车位面积(㎡)</th>
									<th>客户名称</th>
									
									<th>车卡号</th>
									<th>车卡类型</th>
									<th>收费标准</th>
									<th>车牌号码</th>
									<th>开卡日期</th>
									
									<th>结束日期</th>
									<th>状态</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="13" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/cwcx/cwxxcx.js') }" />"></script>
</body>
</html>