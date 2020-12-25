<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>回盘文件销号 - 社区运营管理统一工作平台</title>
</head>
<body>
	<div id="wgSfDkHpwjxhCntr">
		<div class="row no-gutters">
			<div class="col-12 p-relative">
				<div class="toolbar">
					<div>
						<button type="button" class="btn btn-outline-primary d-none" disabled><i class="fas fa-file-upload fw-1"></i><span>导入</span></button>
                    </div>
                </div>
				
				<div class="main-content">
                    <div class="table-responsive fit2height">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-dk-hpwjxh fixed-thead fixed-row-1st-cell fixed-row-last-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="wgSfDkHpwjxhIndexerAll" name="checkAll">
						            	<label for="wgSfDkHpwjxhIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>社区名称</th>
						            <th>代扣方案</th>
						            <th>送盘日期</th>
						            <th>送盘文件名</th>
						            <th>送盘人</th>
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
									<td colspan="13" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="wgSfDkHpwjxhModalDtls" tabindex="-1" role="dialog" aria-labelledby="wgSfDkHpwjxhModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="wgSfDkHpwjxhDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="dkjlid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="wgSfDkHpwjxhModalDtlsLabel">回盘文件上传</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group row">
	                    <label for="wgSfDkHpwjxh_ykkkrq" class="col-md-8 offset-md-2 col-form-label required">银行扣款日期</label>
	                    <div class="col-md-8 offset-md-2">
	                        <div class="input-group date" id="wgSfDkHpwjxh_ykkkrq_p" data-target-input="nearest" data-cx-ctrl="date">
					            <input type="text" class="form-control datetimepicker-input cx-f-1" data-target="#wgSfDkHpwjxh_ykkkrq_p" id="wgSfDkHpwjxh_ykkkrq" name="ykkkrq" value=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" required novalidate>
					            <div class="input-group-append" data-target="#wgSfDkHpwjxh_ykkkrq_p" data-toggle="datetimepicker">
					                <button class="btn btn-outline-secondary input-group-fix cx-f-1" type="button"><i class="fas fa-calendar-alt"></i></button>
					            </div>
					            <div class="invalid-tooltip">请输入正确格式的扣款日期</div>
					        </div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <div class="col-md-8 offset-md-2 text-center">
	                        <button type="button" class="btn btn-outline-primary btn-block" data-cmd="upload"><i class="fas fa-upload mr-1"></i>上传回盘文件</button>
	                    </div>
	                </div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	            </form>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="wgSfDkHpwjxhJyjgModalDtls" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<div class="modal-header">
	                <h5 class="modal-title">回盘文件检验结果</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="table-responsive" style="height:520px;">
						<table class="table table-sm table-zebra table-hover table-fixed table-wgsf-dk-hpwjxh-jyjg fixed-thead fixed-row-1st-cell">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<span>#</span>
						            </th>
						            <th>房产名称</th>
						            <th><div>送盘银行账号</div><div>回盘银行账号</div></th>
						            <th><div>送盘账号名称</div><div>回盘账号名称</div></th>
						            <th><div>送盘金额</div><div>回盘金额</div></th>
						            <th>检验结果</th>
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
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wygl/sfxt/yhdk/hpwjxh.js') }" />"></script>
</body>
</html>