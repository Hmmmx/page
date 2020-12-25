<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>系统菜单管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="splbCntr">
		<div class="row no-gutters">
			<div class="col-12">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" id="splbAdd"><i class="fas fa-plus"></i><span>添加</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-hover table-zebra table-fixed table-splb">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="splbIndexerAll" name="checkAll">
						            	<label for="splbIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>商品类别名称</th>
						            <th>排列序号</th>
						            <th>有效状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="5" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="splbModalDtls" tabindex="-1" role="dialog" aria-labelledby="splbModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="splbFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <input type="hidden" name="splbid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="splbModalDtlsLabel">添加商品类别</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
	                    <label for="splb_splbmc" class="col-md-3 col-form-label required">名称</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="splb_splbmc" name="splbmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入不超过50个字符的商品类别名称</div>
	                    </div>
	                </div>
	                <div class="form-group row no-gutters">
	                    <label for="splb_plxh" class="col-md-3 col-form-label required">序号</label>
	                    <div class="col-md-9">
	                        <input type="text" class="form-control" id="splb_plxh" name="plxh" maxlength="5" pattern="^0|([1-9]\d*)$" required>
	                        <div class="invalid-tooltip">请输入不超过5位数的排列序号</div>
	                    </div>
	                </div>
	                
	                <div class="form-group row no-gutters mb-0">
	                    <label for="splb_yxbj_1" class="col-md-3 col-form-label">状态</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="splb_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="splb_yxbj_1">正常</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="splb_yxbj_0" value="0">
									<label class="custom-control-label" for="splb_yxbj_0">禁用</label>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/yygl/scxt/splb.js') }" />"></script>
</body>
</html>