<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>批量费用核定 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfHdPlhdCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="back" disabled><i class="fas fa-arrow-left fw-1"></i><span>返回</span></button>
						<button type="button" class="btn btn-outline-primary" data-cmd="save" disabled><i class="far fa-save fw-1"></i><span>保存</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                   	<div class="nav-tabs-responsive d-none">
                        <ul class="nav nav-tabs" role="tablist">
							<li class="nav-item" role="presentation"><a href="#wgSfHdPlhd_sq" class="nav-link active" role="tab" data-type="sq" data-toggle="tab">选择社区</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfHdPlhd_sfbz" class="nav-link" role="tab" data-type="sfbz" data-toggle="tab">应用标准</a></li>
                        </ul>
                    </div>
                    <div class="tab-content">
		                <div role="tabpanel" class="tab-pane fade py-0 show active" id="wgSfHdPlhd_sq">
		                	<div class="w-limited-1">
		                		<div class="d-flex-center" style="height:420px;">
		                			<form id="wgSfHdplhdBaSqFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
									
									<div class="form-group row" style="width:480px;">
					                    <label for="wgSfHdPlhd_basq_sqdm" class="col-12 col-md-2 col-form-label required">社区</label>
					                    <div class="col-12 col-md-7">
					                        <select class="custom-select" id="wgSfHdPlhd_basq_sqdm" name="sqdm" required>
												<option value="">请选择</option>
											</select>
											<div class="invalid-tooltip">请选择社区</div>
					                    </div>
					                    <div class="col-12 col-md-3 d-flex-center">
					                    	<button type="submit" class="btn btn-outline-primary"><i class="fas fa-check fw-1"></i><span>确定</span></button>
					                    </div>
					                </div>
									</form>
		                		</div>
		                	</div>
		                </div>
		                <div role="tabpanel" class="tab-pane fade py-0" id="wgSfHdPlhd_sfbz">
		                	<div class="w-limited-1">
		                		<div class="row no-gutters">
					            	<div class="col-12 col-md-6">
					            		<div class="border rounded p-3" style="height:100%;">
					            		<form id="wgSfHdplhdBaApplyFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
					            		<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check fw-1"></i><span>确定</span></button>
					            		
						                <div class="form-group row">
						                    <label for="wgSfHdPlhd_ba_sfbzid" class="col-12 col-md-3 col-form-label required">收费标准</label>
						                    <div class="col-12 col-md-9">
						                        <select class="custom-select" id="wgSfHdPlhd_ba_sfbzid" name="sfbzid" required>
													<option value="">请选择</option>
												</select>
												<div class="invalid-tooltip">请选择收费标准</div>
						                    </div>
						                </div>
						                <div class="form-group row d-none">
										    <label for="wgSfHdPlhd_ba_yxrqq" class="col-12 col-md-3 col-form-label">开始日期</label>
										    <div class="col-12 col-md-9">
										    	<div class="input-group date" id="wgSfHdPlhd_ba_yxrqq_p" data-target-input="nearest" data-cx-ctrl="date">
										            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfHdPlhd_ba_yxrqq_p" id="wgSfHdPlhd_ba_yxrqq" name="yxrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
										            <div class="input-group-append" data-target="#wgSfHdPlhd_ba_yxrqq_p" data-toggle="datetimepicker">
										                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
										            </div>
										            <div class="invalid-tooltip">请输入正确开始日期</div>
										        </div>
										    </div>
										</div>
										<div class="form-group row d-none">
										    <label for="wgSfHdPlhd_ba_yxrqz" class="col-12 col-md-3 col-form-label">结束日期</label>
										    <div class="col-12 col-md-9">
										        <div class="input-group date" id="wgSfHdPlhd_ba_yxrqz_p" data-target-input="nearest" data-cx-ctrl="date">
										            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfHdPlhd_ba_yxrqz_p" id="wgSfHdPlhd_ba_yxrqz" name="yxrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
										            <div class="input-group-append" data-target="#wgSfHdPlhd_ba_yxrqz_p" data-toggle="datetimepicker">
										                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
										            </div>
										            <div class="invalid-tooltip">时间格式不正确</div>
										        </div>
										    </div>
										</div>
						                <div class="form-group row mb-0">
						                    <label for="wgSfHdPlhd_ba_khlxdm" class="col-12 col-md-3 col-form-label">客户类型</label>
						                    <div class="col-12 col-md-9">
						                        <select class="custom-select" id="wgSfHdPlhd_ba_khlxdm" name="khlxdm">
													<option value="ALL" selected>全部</option>
													<option value="00">业主</option> <!-- 这些选项值务必与数据库中的t_wg_dm_khlx保持一致 -->
													<option value="03">租客</option>
													<option value="05">开发商</option>
												</select>
						                    </div>
						                </div>
						                </form>
						                <div class="text-black-50 cx-f-sm mt-3 pt-3">
						                	<p class="mb-2">说明：</p>
						                	<ol style="margin-bottom:0;padding-inline-start: 15px;">
						                		<li class="mb-2">请先等待房产资源树加载完成再选择收费标准</li>
						                		<li class="mb-2">同一房产下只能选一个客户</li>
						                		<!-- <li class="mb-2">如展开到客户层级，则可按实际任意选择客户</li> -->
						                		<li class="mb-2">如不展开到客户直接选择上级节点，则默认选中第一个符合条件的客户。例如：客户类型是租客时，默认只选择租客，房产下没有设置租客时则不会选中任何客户</li>
						                		<!-- <li class="mb-1">切换客户类型选项时，会重置所有的选顶</li> -->
						                		<li class="mb-1">切换选项时，会查询选定条件下的已核定的客户并自动选中树中相应的节点</li>
						                		<li class="mb-1"><i class="far fa-check-square tv-cbx-checked mr-1"></i>表示下级节点部分选中，<i class="fas fa-check-square tv-cbx-checked mr-1"></i>表示下级节点全部选中</li>
						                	</ol>
						                </div>
						                </div>
					                </div>
					                <div class="col-12 col-md-6 cx-gutter-l">
					                	<div class="border rounded py-2 tv-cntr tv-exclude-toolbar">
					                		<div class="tv-wrapper"></div>
					                	</div>
					                </div>
					            </div>
		                	</div>
		                </div>
	                </div>
                </div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fyhd/plhd.js') }" />"></script>
</body>
</html>