<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>物业汇助手</title>
	<%@ include file="../meta.jspf" %>
	<%@ include file="../scripts.jspf" %>
	<script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/bx/bxgl.js')}" />"></script>
</head>
<body class="snow" data-root-url="<s:url value="/" />">
	<div class="page-title page-wide">
		<div>
			<i class="fas fa-tools text-primary mr-1"></i><span>报修管理</span>
		</div>
		<div class="link left cx-f-sm disabled" data-cmd="switch-sq">
			<span data-f-name="sqmc">当前社区</span>
		</div>
		<div class="link cx-f-sm disabled" data-cmd="create-bx">
			<span>新建报修</span>
		</div>
	</div>
	
	<div class="page-body">
		<div class="cx-status-bar" style="position: sticky;top: 41px;z-index: 4;background-color: white;">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item" role="presentation"><a href="#status1" class="nav-link" role="tab" data-status="" data-toggle="tab">全部</a></li>
				<li class="nav-item" role="presentation"><a href="#status2" class="nav-link active" role="tab" data-status="0" data-toggle="tab">待受理</a></li>
				<li class="nav-item" role="presentation"><a href="#status3" class="nav-link" role="tab" data-status="1" data-toggle="tab">处理中</a></li>
				<li class="nav-item" role="presentation"><a href="#status4" class="nav-link" role="tab" data-status="2" data-toggle="tab">待审核</a></li>
				<li class="nav-item" role="presentation"><a href="#status5" class="nav-link" role="tab" data-status="3" data-toggle="tab">已完成</a></li>
			</ul>
		</div>
		
		<div class="bxxx-list-wrapper">
			<div class="bxxx-list-body"></div>
		</div>
	</div>
	
	<div class="modal fade" id="commonSqModalDtls" tabindex="-1" role="dialog" aria-labelledby="commonSqModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="commonSqModalDtlsLabel">切换社区</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="sq-list-wrapper"></div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<div class="modal fade" id="allotBxModal" tabindex="-1" role="dialog" aria-labelledby="allotBxModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="bxid">
	        	<input type="hidden" name="bxcllxdm" value="2">
	            <div class="modal-header">
	                <h5 class="modal-title" id="allotBxModalLabel">报修调拨</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="form-group row no-gutters">
		                <label class="col-2 col-form-label">部门</label>
		                <div class="col-10">
		                    <select class="custom-select" name="towybmid" required>
		                    	<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择部门</div>
		                </div>
		            </div>
	            	<div class="form-group row no-gutters mb-0">
		                <label class="col-2 col-form-label">说明</label>
		                <div class="col-10">
		                    <textarea class="form-control" name="clnr" maxlength="180" rows="4" placeholder="可附加简要调拨说明"></textarea>
		                </div>
		            </div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<div class="modal fade" id="processBxModal" tabindex="-1" role="dialog" aria-labelledby="processBxModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="bxid">
	        	<input type="hidden" name="bxcllxdm" value="3">
	            <div class="modal-header">
	                <h5 class="modal-title" id="processBxModalLabel">报修处理</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body p-0" style="background-color:#f5f5f5;">
	            	<div class="cx-paragraph">
	                <div class="form-group row no-gutters">
		                <label class="col-2 col-form-label">结果</label>
		                <div class="col-10">
		                    <select class="custom-select" name="cljgdm" required>
		                    	<option value="">请选择</option>
		                    	<option value="0">未处理成功</option>
		                    	<option value="1">处理成功</option>
							</select>
							<div class="invalid-tooltip">请选择处理结果</div>
		                </div>
		            </div>
	            	<div class="form-group row no-gutters mb-0">
		                <label class="col-2 col-form-label">说明</label>
		                <div class="col-10">
		                    <textarea class="form-control" name="clsm" maxlength="180" rows="4" placeholder="处理结果详细说明" required></textarea>
		                </div>
		            </div>
		            </div>
		            <div class="cx-paragraph mb-0">
		            <div class="card border-0">
						<div class="card-header cx-d-flex-between bg-white p-0 pb-1">
							<span><i class="far fa-image text-primary mr-1"></i><span>相应图片</span></span>
							<button type="button" class="btn btn-outline-primary btn-sm rounded-circle cx-btn" data-cmd="upload"><i class="fas fa-plus"></i></button>
						</div>
						<div class="card-body px-0">
			                <div class="row no-gutters mb-0 bx-img-wrapper">
			                    <div class="no-data"><span>可上传最多4张图片辅助说明</span></div>
			                </div>
						</div>
					</div>
					</div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<div class="modal fade" id="submitBxclModal" tabindex="-1" role="dialog" aria-labelledby="submitBxclModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="bxid">
	        	<input type="hidden" name="bxcllxdm" value="4">
	            <div class="modal-header">
	                <h5 class="modal-title" id="submitBxclModalLabel">报修提交</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body py-4">
	                <div class="form-group row no-gutters mb-0">
		                <label class="col-2 col-form-label">说明</label>
		                <div class="col-10">
		                    <textarea class="form-control" name="clnr" maxlength="180" rows="4" placeholder="可附加简要说明"></textarea>
		                </div>
		            </div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<div class="modal fade" id="fallbackBxclModal" tabindex="-1" role="dialog" aria-labelledby="fallbackBxclModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="bxid">
	        	<input type="hidden" name="bxcllxdm" value="5">
	            <div class="modal-header">
	                <h5 class="modal-title" id="fallbackBxclModalLabel">报修退回</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body py-4">
	                <div class="form-group row no-gutters mb-0">
		                <label class="col-2 col-form-label">说明</label>
		                <div class="col-10">
		                    <textarea class="form-control" name="clnr" maxlength="180" rows="4" placeholder="可附加简要退回说明"></textarea>
		                </div>
		            </div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
	
	<div class="modal fade" id="undoBxclModal" tabindex="-1" role="dialog" aria-labelledby="undoBxclModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="bxid">
	        	<input type="hidden" name="bxcllxdm" value="7">
	            <div class="modal-header">
	                <h5 class="modal-title" id="undoBxclModalLabel">报修重新激活</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body py-4">
	                <div class="form-group row no-gutters mb-0">
		                <label class="col-2 col-form-label">说明</label>
		                <div class="col-10">
		                    <textarea class="form-control" name="clnr" maxlength="180" rows="4" placeholder="可附加简要说明"></textarea>
		                    <div class="cx-f-xs text-black-50">如若报修需要重新激活，激活后状态为处理中</div>
		                </div>
		            </div>
	            </div>
	            <div class="modal-footer justify-content-center">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	            </div>
	            </form>
	        </div>
	    </div>
	</div>
</body>
</html>