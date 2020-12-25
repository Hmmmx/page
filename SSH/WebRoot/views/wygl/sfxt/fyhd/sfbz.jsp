<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>收费标准配置 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfHdSfbzCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-add"><i class="fas fa-plus fw-1"></i><span>添加</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-hd-sfbz fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfHdSfbzIndexerAll" name="checkAll">
						            	<label for="wgSfHdSfbzIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>收费标准名称</th>
						            <th>费用类型</th>
						            <th>收费项目</th>
						            <th>计费方式</th>
						            <th>单价</th>
						            <th>单位</th>
						            <th>精度</th>
						            <th>状态</th>
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
	
	<div class="modal fade" id="wgSfHdSfbzModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfHdSfbzModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfHdSfbzDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="sfbzid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfHdSfbzModalDtlsLabel">添加收费标准</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body" style="height:520px;overflow-y:scroll;">
	            	<div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>收费标准</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	            	<div class="form-group row">
	                    <label for="wgSfHdSfbz_sfbzmc" class="col-2 col-form-label required">名称</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfHdSfbz_sfbzmc" name="sfbzmc" maxlength="50" required>
	                        <div class="invalid-tooltip">请输入收费标准名称</div>
	                    </div>
	                
	                    <label for="wgSfHdSfbz_sqdm" class="col-2 col-form-label required">社区名称</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_sqdm" name="sqdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择社区名称</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <%-- <label for="wgSfHdSfbz_fylxdm" class="col-2 col-form-label required">费用类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_fylxdm" name="fylxdm" data-lazy-load="fylx" required>
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择费用类型</div>
	                    </div> --%>
	                
	                    <label for="wgSfHdSfbz_sfxmdm" class="col-2 col-form-label required">收费项目</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_sfxmdm" name="sfxmdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费项目</div>
	                    </div>
	                    
	                    <label for="wgSfHdSfbz_jffsdm" class="col-2 col-form-label required">计费方式</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_jffsdm" name="jffsdm" data-lazy-load="jffs" required>
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择计费方式</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfHdSfbz_jddm" class="col-2 col-form-label required">精度</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_jddm" name="jddm" required>
								<option value="">请选择</option>
								<option value="0">整数</option>
								<option value="1">一位小数</option>
								<option value="2">两位小数</option>
								<option value="3">三位小数</option>
								<option value="4">四位小数</option>
							</select>
	                        <div class="invalid-tooltip">请选择精度</div>
	                    </div>
	                    
	                    <label for="wgSfHdSfbz_dj" class="col-2 col-form-label">单价</label>
	                    <div class="col-4">
	                        <input type="text" class="form-control" id="wgSfHdSfbz_dj" name="dj" maxlength="12" pattern="^0|(0\.\d+)|([1-9]\d*)|([1-9]\d*\.\d+)$">
	                        <div class="invalid-tooltip">请输入正确单价</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfHdSfbz_dwdm" class="col-2 col-form-label">单位</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_dwdm" name="dwdm" data-lazy-load="dw">
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择单位</div>
	                    </div>
	                    
	                    <label for="wgSfHdSfbz_wyjid" class="col-2 col-form-label">违约金类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_wyjid" name="wyjid">
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择违约金类型</div>
	                    </div>
	                </div>
	                
	                <div class="form-group row">
	                    <label for="wgSfHdSfbz_jfgs" class="col-2 col-form-label">收费系数公式</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfHdSfbz_jfgs" name="jfgs" maxlength="200" rows="5" disabled></textarea>
	                        <div class="invalid-tooltip">请输入收费系数公式</div>
	                        <div class="text-black-50 cx-f-xs">每行设置一个条件，公式示例: 1-5=1.2 表示1到5楼系数为1.2，21+=1.8表示21楼及以上楼层系数为1.8</div>
	                    </div>
	                </div>
	                </div>
	                </div>
	                
	                <div class="paragraph">
	            	<div class="p-header disabled">
	            	<span>收费周期</span>
	            	</div>
	            	<div class="p-body" style="display:block;">
	                <div class="form-group row">
	                    <label for="wgSfHdSfbz_ysybj" class="col-2 col-form-label">应收月</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfHdSfbz_ysybj" name="ysybj">
								<option value="0" selected>计费开始日期所在月</option>
								<option value="1">计费结束日期所在月</option>
							</select>
	                        <div class="invalid-tooltip">请选择应收月</div>
	                    </div>
	                    
	                    <label for="wgSfHdSfbz_ysysl" class="col-2 col-form-label d-none">应收月</label>
	                    <div class="col-6">
	                        <div class="cx-range">
		                        <input type="range" class="custom-range" id="wgSfHdSfbz_ysysl" name="ysysl" value="0" min="0" max="6" step="1">
		                        <div class="cx-tooltip">不延后</div>
	                        </div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfHdSfbz_ysrbj_1" class="col-2 col-form-label">应收日</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="ysrbj" id="wgSfHdSfbz_ysrbj_1" value="1" checked>
									<label class="custom-control-label" for="wgSfHdSfbz_ysrbj_1">月末</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="ysrbj" id="wgSfHdSfbz_ysrbj_0" value="0">
									<label class="custom-control-label" for="wgSfHdSfbz_ysrbj_0">指定日期</label>
								</div>
		                    </div>
	                    </div>
	                    
	                    <label for="wgSfHdSfbz_ysrsl" class="col-2 col-form-label d-none">应收日</label>
	                    <div class="col-6">
	                        <div class="cx-range">
		                        <input type="range" class="custom-range" id="wgSfHdSfbz_ysrsl" name="ysrsl" value="1" min="1" max="28" step="1" disabled>
		                        <div class="cx-tooltip">1号</div>
	                        </div>
	                    </div>
	                </div>
	                <div class="form-group row mb-0">
	                    <label for="wgSfHdSfbz_zdysl" class="col-2 col-form-label">账单月</label>
	                    <div class="col-4">
	                    	<div class="cx-range">
		                        <input type="range" class="custom-range" id="wgSfHdSfbz_zdysl" name="zdysl" value="0" min="-3" max="3" step="1">
		                        <div class="cx-tooltip">应收月当月</div>
	                        </div>
	                    </div>
	                
	                    <label for="wgSfHdSfbz_yxbj_1" class="col-2 col-form-label">状态</label>
	                    <div class="col-4">
	                        <div class="p-sim-ctrl">
								<div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfHdSfbz_yxbj_1" value="1" checked>
									<label class="custom-control-label" for="wgSfHdSfbz_yxbj_1">有效</label>
								</div>
		                        <div class="custom-control custom-radio custom-control-inline">
									<input class="custom-control-input" type="radio" name="yxbj" id="wgSfHdSfbz_yxbj_0" value="0">
									<label class="custom-control-label" for="wgSfHdSfbz_yxbj_0">无效</label>
								</div>
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
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fyhd/sfbz.js') }" />"></script>
</body>
</html>