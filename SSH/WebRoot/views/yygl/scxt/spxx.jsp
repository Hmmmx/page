<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>系统菜单管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="spxxCntr">
		<div class="row no-gutters">
			<div class="col-12">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" id="spxxAdd"><i class="fas fa-plus"></i><span>添加</span></button>
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
					<form id ="filter"action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	               
	                    
	                <div class="form-group row">
	                 
	                <label for="spxx_f_splbid" class="col-1 col-form-label col-form-label-sm">商品类别</label>
	                    <div class="col-2">
	                        <select class="custom-select custom-select-sm" id="spxx_f_splbid" name="splbid" data-init-value="">
	                        	<option value="">请选择</option>
							</select>
	                    </div>
	                    <label for="spxx_f_spmc" class="col-1 col-form-label col-form-label-sm">商品名称</label>
	                    <div class="col-2">
	                        <input type="text" class="form-control form-control-sm" id="spxx_f_spmc" name="spmc" maxlength="50" >
	                        
	                    </div>
	                    
	                    <label for="spxx_f_yxbj" class="col-1 col-form-label col-form-label-sm">状态</label>
	                    <div class="col-2">
	                        <select class="custom-select custom-select-sm" id="spxx_f_yxbj" name="yxbj" data-init-value="">
	                        	<option value="">请选择</option>
	                        	<option value="0">无效</option>
	                        	<option value="1">有效</option>
							</select>
	                    </div>
	                    </div>
	                </form>
	             </div>

				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-hover table-zebra table-fixed table-spxx">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="spxxIndexerAll" name="checkAll">
						            	<label for="spxxIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>商品图片</th>
						            <th>商品名称</th>
						            <th>商品类别</th>
						            <th>商品说明</th>
						            <th>商品原价</th>
						            <th>商品现价</th>
						            <th>会员价</th>
						            <th>排列序号</th>
						            <th>有效状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="11" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="spxxModalDtls" tabindex="-1" role="dialog" aria-labelledby="spxxModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="spxxFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="spid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="spxxModalDtlsLabel" >添加商品信息</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="row no-gutters">
		            	<div class="col-6">
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_splbid" class="col-3 col-form-label required">商品类别</label>
			                    <div class="col-9">
			                        <select class="custom-select"id="spxx_splbid" name="splbid" required>
										<option selected>选择商品类别</option>
									</select>
			                    </div>
			                </div>
		            		<div class="form-group row no-gutters mb-2">
			                    <label for="spxx_spmc" class="col-3 col-form-label required">名称</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_spmc" name="spmc" maxlength="50" required>
			                        <div class="invalid-tooltip">请输入不超过50个字符的商品名称</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_spsm" class="col-3 col-form-label required">说明</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_spsm" name="spsm" maxlength="100" required>
			                        <div class="invalid-tooltip">请输入不超过100个字符的商品说明</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_spyjje" class="col-3 col-form-label required">原价</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_spyjje" name="spyjje" maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" required>
			                        <div class="invalid-tooltip">请输入不超过10位的金额</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_spje" class="col-3 col-form-label required">现价</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_spje" name="spje" maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" required>
			                        <div class="invalid-tooltip">请输入不超过10位的金额</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_hyje" class="col-3 col-form-label required">会员价</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_hyje" name="hyje" maxlength="10" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" required>
			                        <div class="invalid-tooltip">请输入不超过10位的金额</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-2">
			                    <label for="spxx_plxh" class="col-3 col-form-label required">序号</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="spxx_plxh" name="plxh" maxlength="5" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" required>
			                        <div class="invalid-tooltip">请输入不超过5位数的排列序号</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-0">
			                    <label for="spxx_yxbj_1" class="col-3 col-form-label">状态</label>
			                    <div class="col-9">
			                        <div class="p-sim-ctrl">
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="spxx_yxbj_1" value="1" checked>
											<label class="custom-control-label" for="spxx_yxbj_1">正常</label>
										</div>
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="yxbj" id="spxx_yxbj_0" value="0">
											<label class="custom-control-label" for="spxx_yxbj_0">禁用</label>
										</div>
				                    </div>
			                    </div>
			                </div>
		            	</div>
		            	<div class="col-6 pl-2">
		            		<div class="p-sim-ctrl prd-img-wrapper">
		            			<input type="text" class="form-control d-none" name="sptplj" value="" required>
		            			<div class="invalid-tooltip">请上传商品图片</div>
		            			<img src="<s:url value='/resources/img/no-pic.png' />" data-default-pic="<s:url value='/resources/img/no-pic.png' />" class="prd-img" alt="商品图片">
		            			<div class="prd-img-action-bar"><button type="button" class="btn btn-info" data-cmd="upload"><i class="fas fa-upload mr-1"></i>上传图片</button></div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/yygl/scxt/spxx.js') }" />"></script>
</body>
</html>