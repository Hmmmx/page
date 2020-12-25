<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>送盘文件导出 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfDkSpwjdcCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-spwjdc"><i class="fas fa-file-download fw-1"></i><span>导出</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-dk-spwjdc fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfDkSpwjdcIndexerAll" name="checkAll">
						            	<label for="wgSfDkSpwjdcIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>代扣方案</th>
						            <th>送盘日期</th>
						            <th>送盘文件名</th>
						            <th>送盘人</th>
						            <th>回盘日期</th>
						            <th style="width:0;">回盘文件名</th>
						            <th>回盘人</th>
						            <th>总金额</th>
						            <th>银行扣款日期</th>
						            <th>扣款总金额</th>
						            <th>对账状态</th>
						            <th>对账结果</th>
						            <th>销号状态</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr class="table-row-no-data">
									<td colspan="16" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfDkSpwjdcModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfDkSpwjdcModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfDkSpwjdcDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="dkjlid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfDkSpwjdcModalDtlsLabel">送盘文件导出</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">	                
	                    <label for="wgSfDkSpwjdc_sqdm" class="col-md-3 col-form-label required">社区名称</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfDkSpwjdc_sqdm" name="sqdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择社区名称</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                	<label for="wgSfDkSpwjdc_dkfadm" class="col-md-3 col-form-label required">代扣方案</label>
	                    <div class="col-md-9">
	                        <select class="custom-select" id="wgSfDkSpwjdc_dkfadm" name="dkfadm" data-lazy-load="dkfa" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择代扣方案</div>
	                    </div>
	                </div>
	                <!-- <div class="form-group row mb-0">
	                    <label for="wgSfDkSpwjdc_sfbzid" class="col-md-3 col-form-label required">收费标准</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl" style="min-height:280px;max-height:280px;overflow:auto;">
								<div class="custom-control custom-checkbox text-black-50 no-data-div">
			                        <input type="checkbox" class="custom-control-input" name="sfbzid" value="dummy" id="wgSfDkSpwjdc_sfbzid_dummy" disabled>
			                        <label class="custom-control-label" for="wgSfDkSpwjdc_sfbzid_dummy">无标准 (请先选择社区)</label>
			                    </div>
							</div>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                </div> -->
	                <div class="form-group row mb-0">
	                    <label for="wgSfDkSpwjdc_sfxmdm" class="col-md-3 col-form-label required">收费项目</label>
	                    <div class="col-md-9">
	                        <div class="p-sim-ctrl" style="min-height:280px;max-height:280px;overflow:auto;">
								<div class="custom-control custom-checkbox text-black-50 no-data-div">
			                        <input type="checkbox" class="custom-control-input" name="sfxmdm" value="dummy" id="wgSfDkSpwjdc_sfxmdm_dummy" disabled>
			                        <label class="custom-control-label" for="wgSfDkSpwjdc_sfxmdm_dummy">无收费项目 (请先选择社区)</label>
			                    </div>
							</div>
							<div class="invalid-tooltip">请选择收费项目</div>
							<div class="mt-1">
								<div class="custom-control custom-checkbox">
			                        <input type="checkbox" class="custom-control-input" name="sfxmdmAll" value="allDummy" id="wgSfDkSpwjdc_sfxmdm_all_dummy">
			                        <label class="custom-control-label" for="wgSfDkSpwjdc_sfxmdm_all_dummy">全选</label>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/yhdk/spwjdc.js') }" />"></script>
</body>
</html>