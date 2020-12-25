<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>物业汇助手</title>
	<%@ include file="../meta.jspf" %>
	
<link rel="stylesheet" href="<s:url value="/resources/components/bs4-dtp/build/css/tempusdominus-bootstrap-4.min.css" />" />
	<link rel="stylesheet" href="<s:url value="/resources/components/bs-treeview/bootstrap-treeview.min.css" />" />
	<%@ include file="../scripts.jspf" %>
	<script src="<s:url value="/resources/components/bs4-dtp/build/js/tempusdominus-bootstrap-4.min.js" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/wg.js')}" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/components/bs-treeview/src/js/bootstrap-treeview.js') }" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/wyhzs/cb/cbgl.js')}" />"></script>
</head>
<body class="light" data-root-url="<s:url value="/" />">
	<div class="page-title page-wide">
		<div>
			<i class="far fa-edit text-primary mr-1"></i><span>物业抄表</span>
		</div>
		<div class="link left cx-f-sm disabled" style="padding-left:.75rem;" data-cmd="switch-sq">
			<span data-f-name="sqmc">当前社区</span>
		</div>
	</div>
	
	<div class="page-body">
		<div class="cx-filter-bar sticky-to-title">
		<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
			<div class="px-1">
				<div class="form-group row no-gutters mb-0">
	                <div class="col-8">
	                    <input type="text" class="form-control border-0" style="height:calc(1.5em + .25rem + 2px);padding:.125rem .5rem;background-color:inherit;" style="background-color:inherit;" name="fczymc" placeholder="选择楼宇或以下级别房产" data-cx-ctrl="fcxx-tree" readonly required>
	                </div>
				
	                <div class="col-4 pl-3 pr-2">
	                    <select class="custom-select" style="height:calc(1.5em + .25rem + 2px);padding:.125rem .5rem;color: gray;" name="yblxdm" data-lazy-load="yblx" data-selected-value="01" required>
	                    	<option value="">选择仪表</option>
						</select>
	                </div>
	            </div>
            </div>
		</form>
		</div>
		
		<div class="cbmx-list-wrapper">
		<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
			<div class="cbmx-list-body">
				<div class="no-data">
					<span>暂无数据</span>
				</div>
			</div>
		</form>
		</div>
	</div>
	
	<div class="page-action-bar" style="z-index:3;"><!-- 小于弹出的房产树控件 -->
		<div>
			<div class="row no-gutters">
				<div class="col">
					<div class="btn-pill-wrapper">
					<button type="button" class="btn btn-primary btn-pill" data-cmd="save"><i class="far fa-save fa-fw"></i>保存</button>
					</div>
				</div>
			</div>
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
	
	<div class="modal fade" id="cbmxMoreModal" tabindex="-1" role="dialog" aria-labelledby="cbmxMoreModalLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form  action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	        	<input type="hidden" name="khybcbid">
	        	<input type="hidden" name="khybid">
	            <div class="modal-header">
	                <h5 class="modal-title" id="cbmxMoreModalLabel">抄表明细</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">房产号码</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="fchm" disabled>
		                </div>
		            </div>
		            <!-- <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">客户名称</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="khmc" disabled>
		                </div>
		            </div> -->
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">更换新表</label>
		                <div class="col-9">
		                    <select class="custom-select" name="ghbj">
								<option value="0">否</option>
								<option value="1">是</option>
							</select>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">旧表用量</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="jbyl" placeholder="旧表最后一次用量" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$" disabled>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">上次抄表</label>
		                <div class="col-9">
		                    <div class="input-group date" id="cbmxMoreCblrSqDtp_p" data-target-input="nearest" data-cx-ctrl="date">
							    <input type="text" class="form-control datetimepicker-input" name="sqcbrq" data-target="#cbmxMoreCblrSqDtp_p" placeholder="上次抄表日期"  maxlength="10" autocomplete="off" disabled novalidate>
							    <div class="input-group-append" data-target="#cbmxMoreCblrSqDtp_p" data-toggle="datetimepicker">
							        <button class="btn btn-outline-secondary input-group-fix align-items-center" type="button"><i class="fas fa-calendar-alt"></i></button>
							    </div>
							</div>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">本次抄表</label>
		                <div class="col-9">
		                    <div class="input-group date" id="cbmxMoreCblrBqDtp_p" data-target-input="nearest" data-cx-ctrl="date">
							    <input type="text" class="form-control datetimepicker-input" name="bqcbrq" data-target="#cbmxMoreCblrBqDtp_p" placeholder="本次抄表日期" maxlength="10" autocomplete="off" disabled novalidate>
							    <div class="input-group-append" data-target="#cbmxMoreCblrBqDtp_p" data-toggle="datetimepicker">
							        <button class="btn btn-outline-secondary input-group-fix align-items-center" type="button"><i class="fas fa-calendar-alt"></i></button>
							    </div>
							</div>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">上次读数</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="sqds" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$" disabled>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">本次读数</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="bqds" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$" required>
		                </div>
		            </div>
		            <div class="form-group row no-gutters">
		                <label class="col-3 col-form-label">本次用量</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="bqyl" readonly required>
		                </div>
		            </div>
	                <div class="form-group row no-gutters mb-0">
		                <label class="col-3 col-form-label">说明</label>
		                <div class="col-9">
		                    <input type="text" class="form-control" name="bz">
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