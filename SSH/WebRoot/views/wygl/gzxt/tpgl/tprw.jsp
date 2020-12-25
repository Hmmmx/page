<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>投票任务管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgGzTpTprwCntr">
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
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wggz-tp-tprw fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgGzTpTprwIndexerAll" name="checkAll">
						            	<label for="wgGzTpTprwIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>名称</th>
						            <th>投票范围</th>
						            <th>类型</th>
						            <th>参与人数</th>
						            <th>开始日期</th>
						            <th>结束日期</th>
						            <th>状态</th>
						            <th>说明</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="10" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgGzTpTprwModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgGzTpTprwModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgGzTpTprwDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="cmd" value="">
	            <input type="hidden" name="tprwid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgGzTpTprwModalDtlsLabel">添加投票</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="overflow:auto;height:560px;">
	            	<div class="row no-gutters">
		            	<div class="col-12">
		            		<div class="form-group row">
			                    <label for="wgGzTpTprw_tpmc" class="col-md-2 col-form-label required">名称</label>
			                    <div class="col-md-10">
			                        <input type="text" class="form-control" id="wgGzTpTprw_tpmc" name="tpmc" maxlength="80" placeholder="投票名称" required>
			                        <div class="invalid-tooltip">请输入不超过80个字符的投票名称</div>
			                    </div>
			                </div>
			                
			                <div class="form-group row">
			                    <label for="wgGzTpTprw_fwmc" class="col-md-2 col-form-label required">投票范围</label>
			                    <div class="col-md-4">
			                        <input type="text" class="form-control" id="wgGzTpTprw_fwmc" name="fwmc" data-cx-ctrl="fcxx-tree" required>
			                        <div class="invalid-tooltip">请选择投票范围</div>
			                    </div>
			                    
			                    <label for="wgGzTpTprw_rwlx_1" class="col-md-2 col-form-label required">类型</label>
			                    <div class="col-md-4">
			                        <div class="p-sim-ctrl">
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="rwlx" id="wgGzTpTprw_rwlx_1" value="1" checked>
											<label class="custom-control-label" for="wgGzTpTprw_rwlx_1">公众号用户</label>
										</div>
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="rwlx" id="wgGzTpTprw_rwlx_2" value="2">
											<label class="custom-control-label" for="wgGzTpTprw_rwlx_2">仅业主</label>
										</div>
				                    </div>
			                    </div>
			                </div>
			                
			                <div class="form-group row">
				                <label for="wgGzTpTprw_ksrq" class="col-md-2 col-form-label required">开始日期</label>
							    <div class="col-md-4">
							    	<div class="input-group date" id="wgGzTpTprw_ksrq_p" data-target-input="nearest" data-cx-ctrl="date-time">
							            <input type="text" class="form-control datetimepicker-input" data-target="#wgGzTpTprw_ksrq_p" id="wgGzTpTprw_ksrq" name="ksrq" maxlength="16" autocomplete="off" required novalidate>
							            <div class="input-group-append" data-target="#wgGzTpTprw_ksrq_p" data-toggle="datetimepicker">
							                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
							            </div>
							            <div class="invalid-tooltip">请输入正确格式的开始日期</div>
							        </div>
							    </div>
			                
				                <label for="wgGzTpTprw_jsrq" class="col-md-2 col-form-label required">结束日期</label>
							    <div class="col-md-4">
							    	<div class="input-group date" id="wgGzTpTprw_jsrq_p" data-target-input="nearest" data-cx-ctrl="date-time">
							            <input type="text" class="form-control datetimepicker-input" data-target="#wgGzTpTprw_jsrq_p" id="wgGzTpTprw_jsrq" name="jsrq" maxlength="16" autocomplete="off" required novalidate>
							            <div class="input-group-append" data-target="#wgGzTpTprw_jsrq_p" data-toggle="datetimepicker">
							                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
							            </div>
							            <div class="invalid-tooltip">请输入正确格式的结束日期</div>
							        </div>
							    </div>
			                </div>
			                <div class="form-group row mb-0 d-none">
			                    <label for="wgGzTpTprw_yxbj_1" class="col-md-2 col-form-label">状态</label>
			                    <div class="col-md-4">
			                        <div class="p-sim-ctrl">
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="wgGzTpTprw_yxbj_1" value="1" checked>
											<label class="custom-control-label" for="wgGzTpTprw_yxbj_1">有效</label>
										</div>
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="wgGzTpTprw_yxbj_0" value="0">
											<label class="custom-control-label" for="wgGzTpTprw_yxbj_0">无效</label>
										</div>
				                    </div>
			                    </div>
			                </div>
			                <div class="form-group row mb-0">
							    <label for="wgGzTpTprw_rwsm" class="col-2 col-form-label">说明</label>
							    <div class="col-10">
							        <textarea class="form-control" id="wgGzTpTprw_rwsm" name="rwsm" maxlength="480" rows="3"></textarea>
							    </div>
							</div>
		            	</div>
	            	</div>
	            	<div class="tpwt-wrapper"></div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgGzTpTprwViewModal" tabindex="-1" role="dialog" aria-labelledby="wgGzTpTprwViewModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgGzTpTprwViewFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="tprwid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgGzTpTprwViewModalLabel">投票详情</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="overflow:auto;height:520px;">
	            	<div class="row no-gutters">
		            	<div class="col-12">
		            		<div class="form-group row mb-2">
			                    <div class="col-md-2">名称</div>
			                    <div class="col-md-10">
			                        <span data-data="tpmc"></span>
			                    </div>
			                </div>
			                <div class="form-group row mb-2">
			                    <div class="col-md-2">投票范围</div>
			                    <div class="col-md-4">
			                        <span data-data="fwmc"></span>
			                    </div>
			                    
			                    <div class="col-md-2 offset-md-1">类型</div>
			                    <div class="col-md-3">
			                        <span data-data="rwlx"></span>
			                    </div>
			                </div>
			                <div class="form-group row mb-2">
			                    <div class="col-md-2">开始日期</div>
			                    <div class="col-md-4">
			                        <span data-data="ksrq"></span>
			                    </div>
			                    
			                    <div class="col-md-2 offset-md-1">结束日期</div>
			                    <div class="col-md-3">
			                        <span data-data="jsrq"></span>
			                    </div>
			                </div>
			                <div class="form-group row mb-2">
			                    <div class="col-md-2">状态</div>
			                    <div class="col-md-4">
			                        <span data-data="yxbj"></span>
			                    </div>
			                    
			                    <div class="col-md-2 offset-md-1">参与人数</div>
			                    <div class="col-md-3">
			                        <span data-data="tpzs"></span>
			                    </div>
			                </div>
			                <div class="form-group row cx-f-sm text-black-50 mb-0">
			                    <div class="col-md-2">说明</div>
			                    <div class="col-md-10">
			                        <span data-data="rwsm"></span>
			                    </div>
			                </div>
		            	</div>
	            	</div>
	            	<div class="tpwt-wrapper"></div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/gzxt/tpgl/tprw.js') }" />"></script>
</body>
</html>