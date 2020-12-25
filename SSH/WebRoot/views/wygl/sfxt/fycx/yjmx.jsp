<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>押金费用明细 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfCwbbYjmxCntr">
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
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
						<label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
                       		<div class="invalid-tooltip">请选择房产资源</div>
	                    </div>
	                    
	                    <label for="wgSfCwbbYjmx_f_czlx" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">押金收退</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYjmx_f_czlx" name="czlx" required>
	                        	<option value="">请选择</option>
	                        	<option value="0">收取</option>
	                        	<option value="1">退款</option>
							</select>
							<div class="invalid-tooltip">请选择查询押金收退类型</div>
	                    </div>
	                    
	                    <label for="wgSfCwbbYjmx_f_khmc" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">客户名称</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" id="wgSfCwbbYjmx_f_khmc" name="khmc" maxlength="10">
	                    </div>
	                
	                	<label for="wgSfCwbbYjmx_skrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收款日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between" data-czlx="0">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbYjmx_skrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbYjmx_skrqq_p" id="wgSfCwbbYjmx_skrqq" name="skrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbYjmx_skrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbYjmx_skrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbYjmx_skrqz_p" id="wgSfCwbbYjmx_skrqz" name="skrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbYjmx_skrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                	
                        <label for="wgSfCwbbYjmx_f_skfsdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">收款方式</label>
	                    <div class="col-md-3 col-3xl-2" data-czlx="0">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYjmx_f_skfsdm" name="skfsdm" data-lazy-load="skfs" data-accept-values="01,02,03,04,05,06,07,08,09,10,21,22,23,24,25,26,27,28,29,30">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                	
		                <label for="wgSfCwbbYjmx_f_yjlxdm" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">押金类型</label>
	                    <div class="col-md-3 col-3xl-2" data-czlx="0">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYjmx_f_yjlxdm" name="yjlxdm" data-lazy-load="yjlx">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                
	                	<label for="wgSfCwbbYjmx_tkrqq_p_tk" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">退款日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between" data-czlx="1">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbYjmx_tkrqq_p_tk" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbYjmx_tkrqq_p_tk" id="wgSfCwbbYjmx_tkrqq_tk" name="tkrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbYjmx_tkrqq_p_tk" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgSfCwbbYjmx_tkrqz_p_tk" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfCwbbYjmx_tkrqz_p_tk" id="wgSfCwbbYjmx_tkrqz_tk" name="tkrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgSfCwbbYjmx_tkrqz_p_tk" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                	
                        <label for="wgSfCwbbYjmx_f_thjsfsdm_tk" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm pl-0 pl-2xl-gutter">退款结算方式</label>
	                    <div class="col-md-3 col-3xl-2" data-czlx="1">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYjmx_f_thjsfsdm_tk" name="thjsfsdm" data-lazy-load="thjsfs">
	                        	<option value="">全部</option>
							</select>
	                    </div>
	                	
		                <%-- <label for="wgSfCwbbYjmx_f_yjlxdm_tk" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">押金类型</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <select class="custom-select custom-select-sm" id="wgSfCwbbYjmx_f_yjlxdm_tk" name="yjlxdm" data-lazy-load="yjlx">
	                        	<option value="">全部</option>
							</select>
	                    </div> --%>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-cwbb-yjmx fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产信息</th>
						            <th>客户名称</th>
						            <th>押金类型</th>
						            <th>发生金额</th>
						            <th>发生日期</th>
						            
						            <th>结算方式</th>
						            <th>操作人</th>
						            <th>票据编号</th>
						            <th>凭证号</th>
						            <th>退回状态</th>
						            
						            <th>备注</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="12" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fycx/yjmx.js') }" />"></script>
</body>
</html>