<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>房产信息管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfFcFcxxCntr">
		<div class="row no-gutters">
			<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add" data-type="all" disabled><i class="fas fa-plus fw-1"></i><span>添加</span></button>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="back" disabled><i class="fas fa-arrow-left fw-1"></i><span>返回</span></button>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-add" data-type="sq" data-sub-type="qy" disabled><i class="fas fa-plus fw-1"></i><span>添加区域</span></button>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-add" data-type="qy" data-sub-type="ly" disabled><i class="fas fa-plus fw-1"></i><span>添加楼宇</span></button>
						<div class="btn-group d-none" role="group" data-cmd="open-add">
							<button type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<i class="fas fa-plus fw-1"></i><span>添加</span>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item py-2" href="javascript:;" data-type="ly" data-sub-type="dy"><i class="fas fa-plus fw-1 mr-1"></i><span>单元</span></a>
								<a class="dropdown-item py-2" href="javascript:;" data-type="dy" data-sub-type="fc"><i class="fas fa-plus fw-1 mr-1"></i><span>房产</span></a>
							</div>
						</div> 
						<%-- <div class="btn-group d-none" data-cmd="open-add">
							<button type="button" class="btn btn-outline-primary" data-type="dy" data-sub-type="fc"><i class="fas fa-plus fw-1"></i><span>添加房产</span></button>
							<button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button>
							<div class="dropdown-menu dropdown-menu-right">
								<a class="dropdown-item" href="javascript:;" data-type="ly" data-sub-type="dy"><i class="fas fa-plus fw-1 mr-1"></i><span>添加单元</span></a>
								<a class="dropdown-item" href="javascript:;" data-type="dy" data-sub-type="fc"><i class="fas fa-plus fw-1 mr-1"></i><span>添加房产</span></a>
							</div>
						</div> --%>
						<%-- <button type="button" class="btn btn-outline-primary d-none" data-cmd="open-add" data-type="ly" data-sub-type="dy" disabled><i class="fas fa-plus fw-1"></i><span>添加单元</span></button> --%>
						<button type="button" class="btn btn-outline-primary d-none" data-cmd="open-add" data-type="dy" data-sub-type="fc" disabled><i class="fas fa-plus fw-1"></i><span>添加房产</span></button>
                        <button type="button" class="btn btn-outline-primary" data-cmd="update" disabled><i class="fas fa-pencil-alt fw-1"></i><span>修改</span></button>
                        <button type="button" class="btn btn-outline-primary d-none" data-cmd="add" disabled><i class="far fa-save fw-1"></i><span>保存</span></button>
                        <button type="button" class="btn btn-outline-danger" data-cmd="del" disabled><i class="fas fa-times fw-1"></i><span>删除</span></button>
                    </div>
                    <%-- <div class="toolbar-misc">
                    	<div class="custom-control custom-checkbox custom-control-inline mr-0">
	                        <input type="checkbox" class="custom-control-input" name="updateEnabled" value="true" id="wgSfFcFcxx_updateEnabled">
	                        <label class="custom-control-label" for="wgSfFcFcxx_updateEnabled">允许编辑</label>
	                    </div>
	                    <span class="switch">
	                    	<label for="wgSfFcFcxx_updateEnabled"><span>允许编辑</span></label>
							<input type="checkbox" class="switch" name="updateEnabled" value="true" id="wgSfFcFcxx_updateEnabled" disabled>
							<label for="wgSfFcFcxx_updateEnabled"><span class="d-none">允许编辑</span></label>
						</span>
                    </div> --%>
                   </div>
				
				<div class="main-content">
                    <div class="nav-tabs-responsive d-none">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_zyDtls" class="nav-link active" role="tab" data-type="zy" data-toggle="tab">通用信息</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_sqDtls" class="nav-link" role="tab" data-type="sq" data-toggle="tab">社区信息</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_qyDtls" class="nav-link" role="tab" data-type="qy" data-toggle="tab">区域信息</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_lyDtls" class="nav-link" role="tab" data-type="ly" data-toggle="tab">楼宇信息</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_dyDtls" class="nav-link" role="tab" data-type="dy" data-toggle="tab">单元信息</a></li>
							<li class="nav-item" role="presentation"><a href="#wgSfFcFcxx_fcDtls" class="nav-link" role="tab" data-type="fc" data-toggle="tab">房产信息</a></li>
                        </ul>
                    </div>
                    
                    <!-- Tab panes -->
	                <div class="tab-content">
		                <div role="tabpanel" class="tab-pane fade show active" id="wgSfFcFcxx_zyDtls">
		                	<div class="w-limited-1">
		                		<div class="d-flex-center text-center text-black-50 cx-f-xs" style="height:420px;">
		                			<span class="px-2 py-1" style="background-color: #f5f5f5;border-radius: 1rem;">请从左边房产资源树中选择节点</span>
		                		</div>
		                	</div>
		                </div>
		                <div role="tabpanel" class="tab-pane fade" id="wgSfFcFcxx_sqDtls">
		                	<div class="w-limited-1"><%@ include file="sq.jspf" %></div>
		                </div>
		                <div role="tabpanel" class="tab-pane fade" id="wgSfFcFcxx_qyDtls">
	                    	<div class="w-limited-1"><%@ include file="qy.jspf" %></div>
	                    </div>
	                    <div role="tabpanel" class="tab-pane fade" id="wgSfFcFcxx_lyDtls">
	                    	<div class="w-limited-1"><%@ include file="ly.jspf" %></div>
	                    </div>
	                    <div role="tabpanel" class="tab-pane fade" id="wgSfFcFcxx_dyDtls">
	                    	<div class="w-limited-1"><%@ include file="dy.jspf" %></div>
	                    </div>
	                    <div role="tabpanel" class="tab-pane fade" id="wgSfFcFcxx_fcDtls">
	                    	<div class="w-limited-1"><%@ include file="fc.jspf" %></div>
	                    </div>
		            </div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fcgl/fcxx.js') }" />"></script>
</body>
</html>