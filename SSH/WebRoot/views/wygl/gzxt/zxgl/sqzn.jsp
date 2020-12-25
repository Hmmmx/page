<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>指南管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgGzZxSqznCntr">
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
						<table class="table table-sm table-zebra table-hover table-fixed table-wggz-zx-sqzn fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgGzZxSqznIndexerAll" name="checkAll">
						            	<label for="wgGzZxSqznIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>指南标题</th>
						            <th>链接地址</th>
						            <th>发表日期</th>
						            <th>状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="6" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgGzZxSqznModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgGzZxSqznModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgGzZxSqznDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="cmd" value="">
	            <input type="hidden" name="znid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgGzZxSqznModalDtlsLabel">添加指南</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="row no-gutters">
		            	<div class="col-12">
		            		<div class="form-group row no-gutters">
			                    <label for="wgGzZxSqzn_znbt" class="col-md-3 col-form-label required">指南标题</label>
			                    <div class="col-md-9">
			                        <input type="text" class="form-control" id="wgGzZxSqzn_znbt" name="znbt" maxlength="30" placeholder="指南标题" required>
			                        <div class="invalid-tooltip">请输入不超过30个字符的指南标题</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters">
			                    <label for="wgGzZxSqzn_znljdz" class="col-md-3 col-form-label required">链接地址</label>
			                    <div class="col-md-9">
			                        <input type="text" class="form-control" id="wgGzZxSqzn_znljdz" name="znljdz" maxlength="480" placeholder="指南链接地址" required>
			                        <div class="invalid-tooltip">请输入不超过480个字符的指南链接地址</div>
			                    </div>
			                </div>
			                
			                <div class="form-group row no-gutters">
				                <label for="wgGzZxSqzn_fbrq" class="col-md-3 col-form-label required">发表日期</label>
							    <div class="col-md-9">
							    	<div class="input-group date" id="wgGzZxSqzn_fbrq_p" data-target-input="nearest" data-cx-ctrl="date">
							            <input type="text" class="form-control datetimepicker-input" data-target="#wgGzZxSqzn_fbrq_p" id="wgGzZxSqzn_fbrq" name="fbrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
							            <div class="input-group-append" data-target="#wgGzZxSqzn_fbrq_p" data-toggle="datetimepicker">
							                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
							            </div>
							            <div class="invalid-tooltip">时间格式不正确</div>
							        </div>
							    </div>
			                </div>
			                <div class="form-group row no-gutters mb-0">
			                    <label for="wgGzZxSqzn_yxbj_1" class="col-md-3 col-form-label">状态</label>
			                    <div class="col-md-9">
			                        <div class="p-sim-ctrl">
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="wgGzZxSqzn_yxbj_1" value="1" checked>
											<label class="custom-control-label" for="wgGzZxSqzn_yxbj_1">有效</label>
										</div>
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="wgGzZxSqzn_yxbj_0" value="0">
											<label class="custom-control-label" for="wgGzZxSqzn_yxbj_0">无效</label>
										</div>
				                    </div>
			                    </div>
			                </div>
			                <%-- <div class="form-group row no-gutters text-info mb-0">
			                	<label for="wgGzZxSqzn_yxbj_1" class="col-md-3 col-form-label">注意</label>
			                	<div class="col-md-9">
			                		<span class="cx-f-sm">同一批指南的所有图片必须是同一比例（推荐比例为1:1，例如300x300）</span>
			                	</div>
			                </div> --%>
		            	</div>
		            	<%-- <div class="col-6 pl-2">
		            		<div class="p-sim-ctrl prd-img-wrapper" style="height: 388px;">
		            			<input type="text" class="form-control d-none" name="zntpdz" value="" required>
		            			<div class="invalid-tooltip">请上传指南图片</div>
		            			<img src="<s:url value='/resources/img/no-pic.png' />" data-default-pic="<s:url value='/resources/img/no-pic.png' />" class="prd-img" alt="指南图片">
		            			<div class="prd-img-action-bar"><button type="button" class="btn btn-info" data-cmd="upload"><i class="fas fa-upload mr-1"></i>上传图片</button></div>
		            		</div>
		            	</div> --%>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/gzxt/zxgl/sqzn.js') }" />"></script>
</body>
</html>