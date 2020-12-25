<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>客户工单跟踪 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgKfGdglGdgzCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
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
                    </div>
                </div>
                
                <div class="filterbar">
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
					
					<div class="form-group row">
						<!-- <label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">房产资源</label>
	                    <div class="col-md-3 col-3xl-2">
	                        <input type="text" class="form-control form-control-sm" name="fczymc" data-cx-ctrl="fcxx-tree" required>
	                    </div> -->
	                    <label class="col-md-1 col-3xl-1 col-form-label col-form-label-sm required">社区</label>
	                    <div class="col-md-3 col-3xl-2">
	                    	<select class="custom-select custom-select-sm" name="sqdm" required><option value="">请选择</option></select>
	                    </div>
	                    
	                    <label for="wgKfGdglGdgz_f_bxrqq_p" class="col-md-1 col-3xl-1 col-form-label col-form-label-sm">报修日期</label>
	                	<div class="col-md-3 col-3xl-2 d-flex align-items-center justify-content-between">
	                		<div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgKfGdglGdgz_f_bxrqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgKfGdglGdgz_f_bxrqq_p" id="wgKfGdglGdgz_f_bxrqq" name="bxrqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgKfGdglGdgz_f_bxrqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					        <span class="cx-f-sm cx-l-height-1">-</span>
					        <div class="input-group input-group-sm date" style="display:inline-flex;width:47%;" id="wgKfGdglGdgz_f_bxrqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgKfGdglGdgz_f_bxrqz_p" id="wgKfGdglGdgz_f_bxrqz" name="bxrqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
					            <div class="input-group-append" data-target="#wgKfGdglGdgz_f_bxrqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
	                	</div>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height-pgr">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgkf-gdgl-gdgz fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>分类</th>
						            <th>类型</th>
						            <th>来源</th>
						            
						            <th>联系人</th>
						            <th>联系电话</th>
						            <th>地址</th>
						            <th>报修日期</th>
						            <th>问题</th>
						            
						            <th>当前部门</th>
						            <th>当前职员</th>
						            <th>处理状态</th>
						            <th>处理结果</th>
						            <th>完成日期</th>
						            
						            <th>说明</th>
						            <th>状态</th>
						            <th>操作</th>
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
	
	<div class="modal fade" id="wgKfGdglGdgzModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgKfGdglGdgzModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgKfGdglGdgzDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="bxid" value="">
	            <input type="hidden" name="bxlydm" value="1">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgKfGdglGdgzModalDtlsLabel">添加工单</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
                    <div class="form-group row no-gutters">
						<label class="col-2 col-form-label required">社区</label>
	                    <div class="col-10">
	                    	<select class="custom-select" name="sqdm" required><option value="">请选择</option></select>
	                    	<div class="invalid-tooltip">请选择社区</div>
							<!-- <input type="text" class="form-control" style="background-color:inherit;" name="fczymc" placeholder="请选择一个社区或具体到一个房产" data-cx-ctrl="fcxx-tree" readonly required>
							<div class="invalid-tooltip">请选择一个社区或具体到一个房产</div> -->
	                    </div>
					</div>
					<div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label required">分类</label>
	                    <div class="col-10">
	                        <select class="custom-select" name="bxsxdm" data-lazy-load="bxsx" required>
	                        	<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择分类</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label required">类型</label>
	                    <div class="col-10">
	                        <select class="custom-select" name="bxlxdm" data-lazy-load="bxlx" data-accept-values="0,1,2,9" required>
	                        	<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择类型</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label required">联系人</label>
	                    <div class="col-10">
	                        <input type="text" class="form-control" name="lxr" maxlength="12" placeholder="联系人" required>
	                        <div class="invalid-tooltip">请输入联系人</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label required">电话</label>
	                    <div class="col-10">
	                        <input type="text" class="form-control" name="lxdh" maxlength="30" placeholder="固话或手机号码" pattern="^[\d\(\)\+\- ]{4,30}$" required>
	                    	<div class="invalid-tooltip">请输入正确的联系电话</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label">地址</label>
	                    <div class="col-10">
	                        <input type="text" class="form-control" name="txdz" maxlength="90" placeholder="地址或房号">
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label class="col-2 col-form-label required">问题</label>
	                    <div class="col-10">
	                        <textarea class="form-control" name="bxnr" maxlength="480" rows="4" placeholder="简要报修问题描述" required></textarea>
	                        <div class="invalid-tooltip">请输入问题描述</div>
	                    </div>
	                </div>
	                <div class="card">
						<div class="card-header d-flex-between px-3 py-1">
							<span><i class="far fa-image text-primary mr-1"></i><span>相应图片</span></span>
							<button type="button" class="btn btn-outline-primary btn-sm rounded-circle" style="width:2em;height:2em;align-items: center;" data-cmd="upload"><i class="fas fa-plus"></i></button>
						</div>
						<div class="card-body p-3">
			                <div class="row no-gutters mb-0 bx-img-wrapper">
			                    <div class="cx-hint"><span>可上传最多4张图片辅助说明</span></div>
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
	
	<div class="modal fade" id="wgKfGdglGdgzModalCljlmx" tabindex="-1" role="dialog" aria-labelledby="wgKfGdglGdgzModalCljlmxLabel" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgKfGdglGdgzCljlmxFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="bxid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgKfGdglGdgzModalCljlmxLabel">工单详细处理信息</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="row">
	            		<div class="col-6">
	            			<div class="paragraph" data-f-name="bxxx">
				            	<div class="p-header disabled">
				            		<span>报修信息</span>
				            	</div>
				            	<div class="p-body" style="display:block;">
			            			<div class="form-group row">
										<label class="col-2 col-form-label">社区</label>
					                    <div class="col-4">
					                    	<input type="text" class="form-control" name="sqmc" readonly>
					                    </div>
					                    
					                    <label class="col-2 col-form-label">来源</label>
					                    <div class="col-4">
					                    	<input type="text" class="form-control" name="bxlymc" readonly>
					                    </div>
									</div>
									<div class="form-group row">
					                    <label class="col-2 col-form-label">分类</label>
					                    <div class="col-4">
					                        <input type="text" class="form-control" name="bxsxmc" readonly>
					                    </div>
					                
					                    <label class="col-2 col-form-label">类型</label>
					                    <div class="col-4">
					                    	<input type="text" class="form-control" name="bxlxmc" readonly>
					                    </div>
					                </div>
					                <div class="form-group row">
					                    <label class="col-2 col-form-label">联系人</label>
					                    <div class="col-4">
					                        <input type="text" class="form-control" name="lxr" readonly>
					                    </div>
					                
					                    <label class="col-2 col-form-label" readonly>电话</label>
					                    <div class="col-4">
					                        <input type="text" class="form-control" name="lxdh" readonly>
					                    </div>
					                </div>
					                <div class="form-group row">
					                    <label class="col-2 col-form-label">地址</label>
					                    <div class="col-10">
					                        <input type="text" class="form-control" name="txdz" readonly>
					                    </div>
					                </div>
					                <div class="form-group row">
					                    <label class="col-2 col-form-label">问题</label>
					                    <div class="col-10">
					                        <textarea class="form-control" name="bxnr" rows="4" readonly></textarea>
					                    </div>
					                </div>
					                <div class="card">
										<div class="card-header d-flex-between px-3 py-1">
											<span><i class="far fa-image text-primary mr-1"></i><span>相应图片</span></span>
										</div>
										<div class="card-body p-3">
							                <div class="row no-gutters mb-0 bx-img-wrapper">
							                    <div class="cx-hint" style="height:200px;"><span>无图片</span></div>
							                </div>
										</div>
									</div>
								</div>
							</div>
	            		</div>
	            		<div class="col-6" data-f-name="clmx" style="max-height:651px;overflow-y:auto;">
	            			<%-- <div class="paragraph" data-f-name="clmx">
	            				<div class="p-header disabled">
				            		<span>处理流程</span>
				            	</div>
				            	<div class="p-body" style="display:block;">
				            		
				            	</div>
				            </div> --%>
				            <div class="paragraph" data-f-name="jgmx">
				            	<div class="p-header disabled">
				            		<span>处理结果</span>
				            	</div>
				            	<div class="p-body" style="display:block;">
				            		<div class="form-group row">
					            		<label class="col-2 col-form-label">处理状态</label>
					                    <div class="col-4">
					                    	<input type="text" class="form-control" name="clztmc" readonly>
					                    </div>
					                    
					                    <label class="col-2 col-form-label">处理结果</label>
					                    <div class="col-4">
					                        <input type="text" class="form-control" name="cljgmc" readonly>
					                    </div>
				                	</div>
				                    <div class="form-group row">
					                    <label class="col-2 col-form-label">说明</label>
					                    <div class="col-10">
					                        <textarea class="form-control" name="clsm" maxlength="240" rows="11" style="height: 271px;" readonly></textarea>
					                    </div>
					                </div>
	                    
				            		<div class="card">
										<div class="card-header d-flex-between px-3 py-1">
											<span><i class="far fa-image text-primary mr-1"></i><span>处理图片</span></span>
										</div>
										<div class="card-body p-3">
							                <div class="row no-gutters mb-0 bx-img-wrapper">
							                    <div class="cx-hint" style="height:200px;"><span>无图片</span></div>
							                </div>
										</div>
									</div>
				            	</div>
				            </div>
	            		</div>
	            	</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<%-- <div class="modal fade" id="wgKfGdglGdgzModalCljlDtls" tabindex="-1" role="dialog" aria-labelledby="wgKfGdglGdgzModalCljlDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgKfGdglGdgzCljlDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="bxid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgKfGdglGdgzModalCljlDtlsLabel">修改工单</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:scroll;">
	            	<div class="paragraph" data-section="bxxx">
	            	<div class="p-header disabled">
	            	<span>报修信息</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
                    <div class="form-group row mb-0">
						<label class="col-2 col-form-label">房产</label>
	                    <div class="col-5">
	                        <input type="text" class="form-control-plaintext" name="fcmc" readonly>
	                    </div>
					
	                    <label class="col-2 col-form-label">类型</label>
	                    <div class="col-3">
	                        <input type="text" class="form-control-plaintext" name="bxlxmc" readonly>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label class="col-2 col-form-label">联系人</label>
	                    <div class="col-5">
	                        <input type="text" class="form-control-plaintext" name="lxr" maxlength="12" readonly>
	                    </div>
	                
	                    <label class="col-2 col-form-label">电话</label>
	                    <div class="col-3">
	                        <input type="text" class="form-control-plaintext" name="lxdh" maxlength="30" readonly>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label class="col-2 col-form-label">问题</label>
	                    <div class="col-10">
	                        <textarea class="form-control-plaintext" name="bxnr" maxlength="480" readonly></textarea>
	                    </div>
	                </div>
	                <div class="card">
						<div class="card-header d-flex-between px-3 py-1">
							<span><i class="far fa-image text-primary mr-1"></i><span>相应图片</span></span>
							<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" style="width:2em;height:2em;align-items: center;" data-cmd="upload" disabled><i class="fas fa-plus"></i></button>
						</div>
						<div class="card-body p-3">
			                <div class="row no-gutters mb-0 bx-img-wrapper" data-static="Y">
			                    <div class="cx-hint"><span>可上传最多4张图片辅助说明</span></div>
			                </div>
						</div>
					</div>
	                </div>
	                </div>
	                
	                <div class="paragraph" data-section="cljl">
	            	<div class="p-header disabled">
	            	<span>处理记录</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	                <div class="form-group row">
	                    <label class="col-2 col-form-label required">处理状态</label>
	                    <div class="col-4">
	                        <select class="custom-select" name="clztdm" required>
	                        	<option value="0">未受理</option>
	                        	<option value="1">已受理</option>
	                        	<option value="2">处理中</option>
	                        	<option value="3">已完成</option>
							</select>
							<div class="invalid-tooltip">请选择处理状态</div>
	                    </div>
	                
	                    <label class="col-2 col-form-label required">处理结果</label>
	                    <div class="col-4">
	                        <select class="custom-select" name="cljgdm" required>
	                        	<option value="0">未处理成功</option>
	                        	<option value="1">处理成功</option>
							</select>
							<div class="invalid-tooltip">请选择处理结果</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label class="col-2 col-form-label">说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" name="clsm" maxlength="240" rows="4" placeholder="简要处理说明"></textarea>
	                        <div class="invalid-tooltip">请输入说明</div>
	                    </div>
	                </div>
	                <div class="card">
						<div class="card-header d-flex-between px-3 py-1">
							<span><i class="far fa-image text-primary mr-1"></i><span>处理图片</span></span>
							<button type="button" class="btn btn-outline-primary btn-sm rounded-circle" style="width:2em;height:2em;align-items: center;" data-cmd="upload"><i class="fas fa-plus"></i></button>
						</div>
						<div class="card-body p-3">
			                <div class="row no-gutters mb-0 bx-img-wrapper">
			                    <div class="cx-hint"><span>可上传最多4张图片辅助说明</span></div>
			                </div>
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
	        </div>
	    </div>
	</div> --%>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/kfxt/gdgl/gdgz.js') }" />"></script>
</body>
</html>