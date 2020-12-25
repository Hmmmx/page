<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>组织机构管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfckxxCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper" id="wgCkJgTree"><div class="text-black-50 text-center py-1">组织机构列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" data-cmd="add"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-ck fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfckIndexerAll" name="checkAll">
						            	<label for="wgSfckIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>机构名称</th>
						            <th>车库名称</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="4" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgCkModalCkglDtls" tabindex="-1" role="dialog" aria-labelledby="wgCkModalCkglDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgCkDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="ckid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgCkModalCkglDtlsLabel">添加机构车库</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
					<div class="form-group row no-gutters my-3">
	                    <label for="wgCk_ckmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="wgCk_ckmc" name="ckmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的机构名称</div>
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
	
	
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/cwgl/ckgl.js') }" />"></script>
</body>
</html>