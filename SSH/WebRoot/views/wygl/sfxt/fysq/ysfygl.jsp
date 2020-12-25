<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>应收费用管理 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfFyYsfyglCntr">
		<div class="row no-gutters">
		<div class="col-3 col-limited-lg">
				<div class="border rounded py-1 tv-cntr">
					<div class="tv-wrapper"><div class="text-black-50 text-center py-1">房产资源列表</div></div>
				</div>
			</div>
			<div class="col-9 col-extended-lg cx-gutter-l p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary" data-cmd="open-scwyj"><i class="fas fa-calendar-times fw-1"></i><span>生成违约金</span></button>
						<button type="button" class="btn btn-outline-danger" data-cmd="del"><i class="fas fa-times fw-1"></i><span>删除</span></button>
                    </div>
				</div>
				
				<div class="main-content">
					<div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-fy-ysfygl fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfFyYsfyglIndexerAll" name="checkAll">
						            	<label for="wgSfFyYsfyglIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>客户名称</th>
						            <th>收费项目</th>
						            <th>收费标准</th>
						            <th>应收金额</th>
						            <th>计费周期</th>
						            <th>应收日期</th>
						            <th>账单月份</th>
						            <th>费用分类</th>
						            <th>收费说明</th>
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
	
	<div class="modal fade" id="wgSfFyYsfyglModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfFyYsfyglModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfFyYsfyglDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="">
	            <input type="hidden" name="ysfyid" value="">
	            <input type="hidden" name="ysfypzid" value="">
	            <input type="hidden" name="sqdm" value="">
	            <input type="hidden" name="fcid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfFyYsfyglModalDtlsLabel">修改收费</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfFyYsfygl_fcmc" class="col-2 col-form-label required">房产名称</label>
	                    <div class="col-4">
							<input type="text" class="form-control" id="wgSfFyYsfygl_fcmc" name="fcmc" maxlength="50" disabled>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
		                
		                
	                    <label for="wgSfFyYsfygl_khid" class="col-2 col-form-label required">客户</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfFyYsfygl_khid" name="khid" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择客户</div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <label for="wgSfFyYsfygl_fylxdm" class="col-2 col-form-label required">费用类型</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfFyYsfygl_fylxdm" name="fylxdm" data-lazy-load="fylx" data-accept-values="01,02,04,05" required>
								<option value="">请选择</option>
							</select>
	                        <div class="invalid-tooltip">请选择费用类型</div>
	                    </div>
	                    
	                	<label for="wgSfFyYsfygl_sfxmdm" class="col-2 col-form-label required">收费项目</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfFyYsfygl_sfxmdm" name="sfxmdm" required>
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费项目</div>
	                    </div>
	                </div>
	                
	                <div class="form-group row">
					    <label for="wgSfFyYsfygl_jfzqq" class="col-2 col-form-label required">计费周期起</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfFyYsfygl_jfzqq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfFyYsfygl_jfzqq_p" id="wgSfFyYsfygl_jfzqq" name="jfzqq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfFyYsfygl_jfzqq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfFyYsfygl_jfzqz" class="col-2 col-form-label required">计费周期止</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfFyYsfygl_jfzqz_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfFyYsfygl_jfzqz_p" id="wgSfFyYsfygl_jfzqz" name="jfzqz" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfFyYsfygl_jfzqz_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
					<div class="form-group row">
					    <label for="wgSfFyYsfygl_ysrq" class="col-2 col-form-label required">应收日期</label>
					    <div class="col-4">
					    	<div class="input-group date" id="wgSfFyYsfygl_ysrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfFyYsfygl_ysrq_p" id="wgSfFyYsfygl_ysrq" name="ysrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfFyYsfygl_ysrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					    
					    <label for="wgSfFyYsfygl_sfzdy" class="col-2 col-form-label required">收费账单月</label>
					    <div class="col-4">
					        <div class="input-group date" id="wgSfFyYsfygl_sfzdy_p" data-target-input="nearest" data-cx-ctrl="date-month">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfFyYsfygl_sfzdy_p" id="wgSfFyYsfygl_sfzdy" name="sfzdy" value=""  maxlength="7" pattern="^\d{4}-((0([1-9]))|(1(0|1|2)))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfFyYsfygl_sfzdy_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">时间格式不正确</div>
					        </div>
					    </div>
					</div>
					
	                <div class="form-group row">
	                    <label for="wgSfFyYsfygl_sfbzid" class="col-2 col-form-label">收费标准</label>
	                    <div class="col-4">
	                        <select class="custom-select" id="wgSfFyYsfygl_sfbzid" name="sfbzid">
								<option value="">请选择</option>
							</select>
							<div class="invalid-tooltip">请选择收费标准</div>
	                    </div>
	                    
	                    <label for="wgSfFyYsfygl_fyje" class="col-2 col-form-label required">应收金额</label>
		                <div class="col-4">
		                    <input type="text" class="form-control" id="wgSfFyYsfygl_fyje" name="fyje" value="" pattern="^0|(0.\d+)|([1-9]\d*)|([1-9]\d*.\d+)$" maxlength="12" required>
		                    <div class="invalid-tooltip">请输入正确的应收金额</div>
		                </div>
	                </div>
	                
	                <div class="form-group row mb-0">
	                    <label for="wgSfFyYsfygl_sfsm" class="col-2 col-form-label">收费说明</label>
	                    <div class="col-10">
	                        <textarea class="form-control" id="wgSfFyYsfygl_sfsm" name="sfsm" maxlength="190" rows="4"></textarea>
	                        <div class="invalid-tooltip">请输入不超过190个字符的收费说明</div>
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
	
	<div class="modal fade" id="wgSfFyYsfyglWyjModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfFyYsfyglWyjModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfFyYsfyglWyjDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfFyYsfyglWyjModalDtlsLabel">生成违约金</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row mt-3">
						<label class="col-2 col-form-label required">房产</label>
	                    <div class="col-10">
							<input type="text" class="form-control" style="background-color:inherit;" name="fczymc" data-cx-ctrl="fcxx-tree" readonly required>
							<div class="invalid-tooltip">请选择房产</div>
	                    </div>
					</div>
	                <div class="form-group row">
					    <label for="wgSfFyYsfyglWyj_wyjjsrq" class="col-md-2 col-form-label required">结算日期</label>
					    <div class="col-md-10">
					    	<div class="input-group date" id="wgSfFyYsfyglWyj_wyjjsrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input" data-target="#wgSfFyYsfyglWyj_wyjjsrq_p" id="wgSfFyYsfyglWyj_wyjjsrq" name="wyjjsrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfFyYsfyglWyj_wyjjsrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确格式的结算日期</div>
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
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/fysq/ysfygl.js') }" />"></script>
</body>
</html>