<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>社区运营管理统一工作平台</title>
</head>
<body>
	<div id="ddpzCntr">
		<div class="row no-gutters">
			<div class="col-12">
				<div class="toolbar">
					<div>
                        <button type="button" class="btn btn-outline-primary" data-cmd="add"><i class="fas fa-plus"></i><span>添加</span></button>
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
					<form action="#" role="form" method="POST" data-type="filter" data-auto-validate="true" novalidate>
					<button type="submit" class="btn btn-outline-primary d-none"><i class="fas fa-check mr-1"></i><span>确定</span></button>
	                
	                <div class="form-group row">
	                    <label for="ddpz_f_xdsjq" class="col-1 col-form-label col-form-label-sm">下单时间起</label>
	                    <div class="col-2">
	                    	<div class="input-group input-group-sm  date" id="ddpz_fc_xdsjq" data-target-input="nearest" data-cx-ctrl="date">
                                <input type="text" class="form-control datetimepicker-input" data-target="#ddpz_fc_xdsjq" id="ddpz_f_xdsjq" name="xdsjq" value="" placeholder=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#ddpz_fc_xdsjq" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">请输入正确格式的日期</div>
                            </div>
	                    </div>
	                    
	                    <label for="ddpz_f_xdsjz" class="col-1 col-form-label col-form-label-sm">下单时间止</label>
	                    <div class="col-2">
	                        <div class="input-group input-group-sm  date" id="ddpz_fc_xdsjz" data-target-input="nearest" data-cx-ctrl="date">
                                <input type="text" class="form-control datetimepicker-input" data-target="#ddpz_fc_xdsjz" id="ddpz_f_xdsjz" name="xdsjz" value="" placeholder=""  maxlength="10" pattern="^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$" autocomplete="off" novalidate>
                                <div class="input-group-append" data-target="#ddpz_fc_xdsjz" data-toggle="datetimepicker">
                                    <button class="btn btn-outline-secondary input-group-fix" type="button"><i class="fas fa-calendar-alt"></i></button>
                                </div>
                                <div class="invalid-tooltip">请输入正确格式的日期</div>
                            </div>
	                    </div>
	                    
	                    <label for="ddpz_f_ddztdm" class="col-1 col-form-label col-form-label-sm">订单状态</label>
	                    <div class="col-2">
	                        <select class="custom-select custom-select-sm" id="ddpz_f_ddztdm" name="ddztdm" data-init-value="">
	                        	<option value="">请选择</option>
							</select>
	                    </div>
	                
	                	<%-- 
	                    <label for="ddpz_f_zffsdm" class="col-1 col-form-label col-form-label-sm">支付方式</label>
	                    <div class="col-2">
	                        <select class="custom-select custom-select-sm" id="ddpz_f_zffsdm" name="zffsdm" data-init-value="">
	                        	<option value="">请选择</option>
							</select>
	                    </div>
	                    
	                    <label for="ddpz_f_zfbj" class="col-1 col-form-label col-form-label-sm">支付状态</label>
	                    <div class="col-2">
	                        <select class="custom-select custom-select-sm" id="ddpz_f_zfbj" name="zfbj" data-init-value="">
	                        	<option value="">请选择</option>
	                        	<option value="0">未支付</option>
	                        	<option value="1">已支付</option>
	                        	<option value="2">已退款</option>
							</select>
	                    </div> --%>
	                </div>
	                </form>
				</div>
				
				<div class="main-content">
					<div class="table-responsive">
						<table class="table table-sm table-zebra table-hover table-fixed table-ddpz">
						    <thead class="thead-light">
						        <tr>
						            <th class="td-indexer">
						            	<input type="checkbox" id="ddpzIndexerAll" name="checkAll">
						            	<label for="ddpzIndexerAll" class="checkbox"><i class="far fa-square unchecked"></i><i class="far fa-check-square checked"></i></label>
						            	<span>#</span>
						            </th>
						            <th>订单编号</th>
						            <th>会员代码</th>
						            <th>下单时间</th>
						            <th>成交金额</th>
						            <th>订单状态</th>
						            <th>联系人</th>
						            <th>联系电话</th>
						            <th>操作</th>
						        </tr>
						    </thead>
							<tbody>
								<tr>
									<td colspan="9" class="table-empty">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="ddpzModalDtls" tabindex="-1" role="dialog" aria-labelledby="ddpzModalDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="ddpzDtlsFrm" action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="create">
	            <div class="modal-header">
	                <h5 class="modal-title" id="ddpzModalDtlsLabel">添加订单</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="row no-gutters">
	            		<div class="col-6 pr-2">
	            			<div class="form-group row no-gutters">
			                	<label for="ddpz_lxr" class="col-3 col-form-label required">联系人</label>
			                	<div class="col-9">
			                        <input type="text" class="form-control" id="ddpz_lxr" name="lxr" maxlength="30" required>
			                        <div class="invalid-tooltip">请输入联系人</div>
			                    </div>
		                    </div>
			                <div class="form-group row no-gutters">
			                    <label for="ddpz_lxdh" class="col-3 col-form-label required">联系电话</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="ddpz_lxdh" name="lxdh" maxlength="32" required>
			                        <div class="invalid-tooltip">请输入联系电话</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters">
			                    <label for="ddpz_lxdz" class="col-3 col-form-label required">联系地址</label>
			                    <div class="col-9">
			                        <input type="text" class="form-control" id="ddpz_lxdz" name="lxdz" maxlength="100" required>
			                        <div class="invalid-tooltip">请输入联系地址</div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters">
			                    <label for="ddpz_hyzt_0" class="col-3 col-form-label">会员</label>
			                    <div class="col-9">
			                        <div class="p-sim-ctrl">
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="hyzt" id="ddpz_hyzt_1" value="1">
											<label class="custom-control-label" for="ddpz_hyzt_1">是</label>
										</div>
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="hyzt" id="ddpz_hyzt_0" value="0" checked>
											<label class="custom-control-label" for="ddpz_hyzt_0">不是</label>
										</div>
				                    </div>
			                    </div>
			                </div>
			                <div class="form-group row no-gutters mb-0">
			                    <label for="ddpz_ddsm" class="col-3 col-form-label">备注</label>
			                    <div class="col-9">
			                        <textarea class="form-control" id="ddpz_ddsm" name="ddsm" maxlength="480" rows="10"></textarea>
			                        <div class="invalid-tooltip">请输入不超过480个字符的备注</div>
			                    </div>
			                </div>
	            		</div>
	            		<div class="col-6">
	            			<div class="prd-list-cntr">
	            				<div class="cx-tab prd-available">
									<div class="container-fluid prd-list-content">
								        <div class="row flat-row">
								        	<div class="col-3 prd-type-list">
												<div id="ddpzPrdTypeList" class="list-group"></div>
								        	</div>
								        	<div class="col-9 prd-list">
												<div id="ddpzPrdList"></div>
								        	</div>
								        </div>
								    </div>
							    </div>
							    
							    <div class="cx-tab prd-selected">
									<div class="container-fluid">
										<div class="prd-header">
											<span><i class="fas fa-list-ul mr-1"></i>已选商品</span>
											<span><button type="button" class="btn btn-outline-secondary btn-sm" data-cmd="clearCart"><i class="far fa-trash-alt mr-1"></i>清空</button></span>
										</div>
										<div class="prd-items"></div>
										
										<div class="row flat-row cx-sub-action-bar d-flex align-items-center border-top">
											<div class="col-6">合计<span class="cx-remark ml-2"></span></div>
											<div class="col-6 text-right"><span class="price no-badge"></span></div>
										</div>
										<div class="row flat-row d-flex align-items-center spzyh" style="height: 2em;">
											<div class="col-6">优惠减</div>
											<div class="col-6 text-right"><span class="text-danger"><i class="fas fa-minus" style="transform: scale(0.5);"></i></span><span class="price no-badge"></span></div>
										</div>
										<div class="row flat-row d-flex align-items-center spzcjje" style="height: 2em;">
											<div class="col-6">成交金额</div>
											<div class="col-6 text-right"><span class="price no-badge"></span></div>
										</div>
									</div>
								</div>
							    
							    <div class="cx-action-bar border-top">
									<div class="container-fluid">
										<div class="row no-gutters flat-row">
											<div class="col-6 cx-action">
												<button type="button" class="active" data-cmd="home"><i class="fas fa-home"></i><span>商品</span></button>
											</div>
											<div class="col-6 cx-action">
												<button type="button" class="cx-shopping-cart" data-cmd="cart"><i class="fas fa-shopping-cart"></i><span>购物车</span></button>
											</div>
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
	
	<div class="modal fade" id="ddpzModalViewDtls" tabindex="-1" role="dialog" aria-labelledby="ddpzModalViewDtlsLabel" aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<div class="modal-header">
	                <h5 class="modal-title" id="ddpzModalViewDtlsLabel">查看订单</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	            	<div class="row no-gutters">
	            		<div class="col-6 pr-2">
	            			<div class="prd-dtls">
		            			<div class="row no-gutters prd-prop prd-ddbh">
				                	<div class="col-3 name">订单编号</div>
				                	<div class="col-9 value"></div>
			                    </div>
			                    <div class="row no-gutters prd-prop prd-ddzt">
				                	<div class="col-3 name">订单状态</div>
				                	<div class="col-9 value"></div>
			                    </div>
			                    <div class="row no-gutters prd-prop prd-hydm">
				                	<div class="col-3 name">会员代码</div>
				                	<div class="col-9 value"></div>
			                    </div>
		            			<div class="row no-gutters prd-prop prd-lxr">
				                	<div class="col-3 name">联系人</div>
				                	<div class="col-9 value"></div>
			                    </div>
				                <div class="row no-gutters prd-prop prd-lxdh">
				                    <div class="col-3 name">联系电话</div>
				                    <div class="col-9 value"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-lxdz">
				                    <div class="col-3 name">联系地址</div>
				                    <div class="col-9 value"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-xdsj">
				                    <div class="col-3 name">下单时间</div>
				                    <div class="col-9 value"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-slsj">
				                    <div class="col-3 name">受理时间</div>
				                    <div class="col-9 value"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-wcsj">
				                    <div class="col-3 name">完成时间</div>
				                    <div class="col-9 value"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-zfjl">
				                    <div class="col-3 name">支付记录</div>
				                    <div class="col-9 value" style="min-height:80px;"></div>
				                </div>
				                <div class="row no-gutters prd-prop prd-ddsm">
				                    <div class="col-3 name">备注</div>
				                    <div class="col-9 value" style="min-height:80px;white-space:pre-line;"></div>
				                </div>
			                </div>
	            		</div>
	            		<div class="col-6">
	            			<div class="prd-list-cntr">
								<div class="smry-info">
									<div class="prd-header">
										<span class="c-pointer text-black-50"><i class="fas fa-list-ul fa-fw mr-1"></i>已选商品</span>
									</div>
									<div class="prd-items"></div>
							    </div>
							    <div class="cx-sub-action-bar">
									<div class="container-fluid">
										<div class="row flat-row cx-prompt">
											<div class="col-6">合计<span class="cx-remark ml-2"></span></div>
											<div class="col-6 text-right"><span class="price no-badge"></span></div>
										</div>
										<div class="row flat-row d-flex align-items-center spzyh">
											<div class="col-6">优惠减</div>
											<div class="col-6 text-right"><span class="text-danger"><i class="fas fa-minus" style="transform: scale(0.5);"></i></span><span class="price no-badge"></span></div>
										</div>
										<div class="row flat-row d-flex align-items-center spzcjje">
											<div class="col-6">成交金额</div>
											<div class="col-6 text-right"><span class="price no-badge"></span></div>
										</div>
									</div>
								</div>
	            			</div>
	            		</div>
	            	</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fas fa-times mr-1"></i><span>关闭</span></button>
	            </div>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="ddpzModalMisc" tabindex="-1" role="dialog" aria-labelledby="ddpzModalMiscLabel" aria-hidden="true">
	    <div class="modal-dialog modal-dialog-centered" role="document">
	        <div class="modal-content">
	        	<form id="ddpzMiscFrm" action="<s:url value='/ddpz/updateDdpz' />" role="form" method="POST" data-auto-validate="true" novalidate>
	            <input type="hidden" name="cmd" value="remark">
	            <input type="hidden" name="ddid" value="">
	            <div class="modal-header">
	                <h5 class="modal-title" id="ddpzModalMiscLabel">修改订单信息</h5>
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
	                </button>
	            </div>
	            <div class="modal-body">
	                <div class="row no-gutters">
	                    <div class="col-12">
		                    <div class="form-group row no-gutters">
			                	<label for="ddpz_m_zfbj" class="col-2 col-form-label">支付标记</label>
			                    <div class="col-10">
			                        <div class="p-sim-ctrl">
										<div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="zfbj" id="ddpz_m_zfbj_1" value="1" checked>
											<label class="custom-control-label" for="ddpz_m_zfbj_1">客户支付</label>
										</div>
				                        <div class="custom-control custom-radio custom-control-inline">
											<input class="custom-control-input" type="radio" name="zfbj" id="ddpz_m_zfbj_2" value="2">
											<label class="custom-control-label" for="ddpz_m_zfbj_2">退款给客户</label>
										</div>
				                    </div>
			                    </div>
		                    </div>
		                    <div class="row no-gutters prd-prop prd-zfje mb-3">
			                	<div class="col-2 name">应付金额</div>
			                	<div class="col-10 value price"></div>
		                    </div>
		                    <div class="form-group row no-gutters">
			                	<label for="ddpz_m_zffsdm" class="col-2 col-form-label">支付方式</label>
			                    <div class="col-10">
			                        <select class="custom-select" id="ddpz_m_zffsdm" name="zffsdm">
			                        	<option value="">请选择</option>
									</select>
			                    </div>
		                    </div>
		                    <div class="form-group row no-gutters mb-0">
			                	<label for="ddpz_m_ddztdm" class="col-2 col-form-label">订单状态</label>
			                    <div class="col-10">
			                        <select class="custom-select" id="ddpz_m_ddztdm" name="ddztdm">
			                        	<option value="">请选择</option>
									</select>
			                    </div>
		                    </div>
		                    <div class="form-group row no-gutters my-1">
			                	<label for="ddpz_m_ddsm" class="col-2 col-form-label required">备注</label>
			                	<div class="col-10">
			                        <textarea class="form-control" id="ddpz_m_ddsm" name="ddsm" maxlength="480" rows="10" required></textarea>
			                        <div class="invalid-tooltip">请输入备注</div>
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
	        </div>
	    </div>
	</div>
	
	
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/yygl/scxt/ddpz.js') }" />"></script>
</body>
</html>