<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>社区福利商城</title>
	<%@ include file="meta.jspf" %>
	<%@ include file="scripts.jspf" %>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/template.js')}" />"></script>
	<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/wxgzh/home.js')}" />"></script>
</head>
<body data-root-url="<s:url value="/" />">
<section class="cx-page cx-main" id="mainPage">
	<div class="cx-home">
		<div class="cx-header">
			<div class="header-img">
				<img src="<s:url value="${StaticRsrcUtil.getLatestSubFile('/resources/img/gz/sqfl/')}" />" alt="" />
			</div>
			<div class="tel"><a href="tel:07636852345"><i class="fas fa-phone fa-rotate-90 mr-1"></i>0763-6852345</a></div>
		</div>
	
		<div class="container-fluid cx-content">
	        <div class="row cx-flat-row">
	        	<div class="col-3 cx-service-type">
					<div id="prdTypeList" class="list-group"></div>
	        	</div>
	        	<div class="col-9 cx-service-list">
					<div id="prdList"></div>
	        	</div>
	        </div>
	    </div>
    </div>

	<div class="cx-tab cx-item-selected">
		<div class="container-fluid">
			<div class="cx-title">
				<span><i class="fas fa-list-ul mr-1"></i>已选服务</span>
				<span><button class="btn btn-outline-secondary btn-sm" data-cmd="clearCart"><i class="far fa-trash-alt mr-1"></i>清空</button></span>
			</div>
			<div class="cx-items"></div>
			<div class="row no-gutters cx-flat-row cx-sub-action-bar">
				<div class="col-8 cx-prompt">
					<span>
						<span class="sum">
							<span class="ml-3" style="width: 4em;">合计：</span>
							<span class="cx-price cx-no-badge"></span>
						</span>
						<span class="promotion">
							<span class="ml-3" style="width: 4em;">优惠减：</span>
							<span class="cx-price cx-no-badge"></span>
						</span>
					</span>
					<span class="cx-remark"></span>
				</div>
				<div class="col-4 cx-action">
					<button class="btn btn-success btn-block rounded-0" data-cmd="submit">立即预约</button>
				</div>
			</div>
		</div>
	</div>
		 
	<div class="cx-tab cx-ddpz-wrapper">
		<div class="cx-dl">
			<div class="cx-dl-header-light">
           		<span class="cx-dl-header-title">订单列表</span>
           	</div>
			<div class="cx-dl-body">
				<div class="text-muted text-center py-3">
					<span style="background-color: #f5f5f5;border-radius: 1rem;padding: .25rem .5rem;font-size:.75rem;">-- 没有数据 --</span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="cx-action-bar border-top">
		<div class="container-fluid">
			<div class="row no-gutters cx-flat-row">
				<div class="col-4 cx-action">
					<button class="active" data-cmd="home"><i class="fas fa-home"></i><span>首页</span></button>
				</div>
				<div class="col-4 cx-action">
					<button class="cx-shopping-cart" data-cmd="cart"><i class="fas fa-shopping-cart"></i><span>购物车</span></button>
				</div>
				<div class="col-4 cx-action">
					<button class="" data-cmd="order"><i class="fas fa-bars"></i><span>订单</span></button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="cx-footer" style="display:none;">
		<%@ include file="../common/footer.jspf" %>
	</div>
</section>

<section class="cx-page cx-summary" id="summaryPage">
	<form action="#" role="form" method="POST" data-auto-validate="true" novalidate>
	<input type="hidden" name="cmd" value="create">
	<div class="container-fluid cx-page-content">
        <div class="row no-gutters cx-flat-row">
        	<div class="col-12">	
				<%-- <div class="cx-paragraph cx-d-flex-b">
					<div class="cx-d-flex-s">
						<span class="mr-1"><i class="fas fa-map-marked-alt fa-fw text-info cx-f-15"></i></span>
						<span>
							<h5 class="cx-f-125">名字<span class="text-muted ml-2 cx-f-1">138****9999</span></h5>
							<span class="cx-f-0875">广东省清远市清城区某路某小区某橦1203</span>
						</span>
					</div>
					<div class="ml-2"><i class="fas fa-chevron-right fa-fw"></i></div>
				</div> --%>
				<div class="cx-paragraph">
					<div>
		                <div class="form-group mb-0">
		                	<label for="ddpz_lxr" class="col-form-label"><i class="far fa-user fa-fw mr-1"></i>联系人</label>
		                	<div class="p-relative">
		                        <input type="text" class="form-control" id="ddpz_lxr" name="lxr" maxlength="30" required>
		                        <div class="invalid-tooltip">请输入联系人</div>
		                    </div>
	                    </div>
		                <div class="form-group mb-0">
		                    <label for="ddpz_lxdh" class="col-form-label"><i class="fas fa-mobile-alt fa-fw mr-1"></i>联系电话</label>
		                    <div class="p-relative">
		                        <input type="text" class="form-control" id="ddpz_lxdh" name="lxdh" maxlength="32" required>
		                        <div class="invalid-tooltip">请输入联系电话</div>
		                    </div>
		                </div>
		                <div class="form-group mb-0">
		                    <label for="ddpz_lxdz" class="col-form-label"><i class="fas fa-map-marked-alt fa-fw mr-1"></i>联系地址</label>
		                    <div class="p-relative">
		                        <input type="text" class="form-control" id="ddpz_lxdz" name="lxdz" maxlength="100" required>
		                        <div class="invalid-tooltip">请输入联系地址</div>
		                    </div>
		                </div>
					</div>
				</div>
				
				<div class="cx-paragraph">
					<div class="form-group mb-0">
	                    <label for="ddpz_ddsm" class="col-form-label pt-0"><span class="text-black-50"><i class="far fa-sticky-note fa-fw mr-1"></i>备注</span></label>
	                    <div class="">
	                        <textarea class="form-control" id="ddpz_ddsm" name="ddsm" maxlength="500" rows="3"></textarea>
	                    </div>
	                </div>
				</div>
				<div class="cx-paragraph">
					<div class="cx-title">
						<span class="c-pointer text-black-50"><i class="fas fa-list-ul fa-fw mr-1"></i>已选服务</span>
					</div>
					<div class="cx-items"></div>
				</div>
				<div class="cx-paragraph">
					<div class="container-fluid">
						<div class="row no-gutters flat-row my-2 spzyj">
							<div class="col-3 text-black-50">商品金额</div>
							<div class="col-9 text-right"><span class="cx-price cx-no-badge text-dark"></span></div>
						</div>
						<div class="row no-gutters flat-row my-2 spzyh">
							<div class="col-3 text-black-50">优惠金额</div>
							<div class="col-9 text-right"><span class="text-danger"><i class="fas fa-minus" style="transform: scale(0.5);"></i></span><span class="cx-price cx-no-badge"></span></div>
						</div>
					</div>
				</div>
        	</div>
        </div>
    </div>
    <div class="cx-sub-action-bar">
	   	<div class="container-fluid">
	   		<div class="row no-gutters cx-flat-row">
				<div class="col-8 cx-prompt">
					<span class="cx-back">
						<i class="fas fa-arrow-left cx-scale-1"></i>返回
					</span>
					<span class="cx-price cx-no-badge"></span>
					<span class="cx-remark"></span>
				</div>
				<div class="col-4 cx-action">
					<button type="button" class="btn btn-success btn-block rounded-0" data-cmd="submit"><i class="fas fa-check"></i>提交预约</button>
				</div>
			</div>
		</div>
	</div>
	</form>
</section>

<section class="cx-page cx-ack" id="ackPage">
	<div class="container-fluid cx-page-content">
		<div class="row no-gutters cx-flat-row">
        	<div class="col-12 text-center py-3 my-3">
        		<p class="text-center py-3 mt-3"><i class="fas fa-check-circle cx-f-15 cx-scale-3 text-success"></i></p>
        		<p class="text-center mt-3">预约成功，工作人员稍后会与你联系，请留意</p>
        	</div>
        	<div class="col-12 text-center">
        		<button type="button" class="btn btn-success" data-cmd="back"><i class="fas fa-arrow-left mr-1"></i>返回首页</button>
        		<button type="button" class="btn btn-success" data-cmd="order"><i class="fas fa-bars mr-1"></i>查看订单</button>
        	</div>
        </div>
	</div>
	
	<div class="cx-sub-action-bar">
	   	<div class="container-fluid">
	   		<div class="row no-gutters cx-flat-row">
				<div class="col-12 cx-prompt">
					<span class="ml-3">
						<i class="fas fa-arrow-left cx-scale-1"></i>返回首页
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="cx-page cx-ddpz-dtls" id="ddpzDtlsPage">
	<div class="cx-page-content">
		<div class="cx-paragraph prd-props">
			<div class="container-fluid">
				<div class="row no-gutters flat-row prd-prop prd-ddbh">
					<div class="col-3 name">订单编号</div>
					<div class="col-9 value">20190101111111000000</div>
				</div>
			</div>
		</div>
		
		<div class="cx-paragraph prd-props">
			<div class="container-fluid">
				<div class="row no-gutters flat-row prd-prop prd-hydm">
					<div class="col-3 name">会员代码</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-ddzt">
					<div class="col-3 name">订单状态</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-lxr">
					<div class="col-3 name">联系人</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-lxdh">
					<div class="col-3 name">联系电话</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-lxdz">
					<div class="col-3 name">联系地址</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-xdsj">
					<div class="col-3 name">下单时间</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-slsj">
					<div class="col-3 name">受理时间</div>
					<div class="col-9 value"></div>
				</div>
				<div class="row no-gutters flat-row prd-prop prd-wcsj">
					<div class="col-3 name">完成时间</div>
					<div class="col-9 value"></div>
				</div>
			</div>
		</div>
		
		<div class="cx-paragraph prd-prop prd-zfjl">
			<div class="">支付记录</div>
			<div class="value" style="min-height:80px;"></div>
		</div>
		
		<div class="cx-paragraph prd-prop prd-ddsm">
			<div class="">备注</div>
			<div class="value" style="min-height:80px;white-space:pre-line;"></div>
		</div>
		
		<div class="cx-paragraph prd-list-wrapper">
			<div class="prd-list-cntr">
				<div class="smry-info">
					<div class="prd-header">
						<span><i class="fas fa-list-ul fa-fw mr-1"></i>已选商品</span>
					</div>
					<div class="prd-items"></div>
			    </div>
				<div class="cx-prompt">
					<span class="ml-3">合计：</span>
					<span class="cx-price cx-no-badge">0</span>
					<span class="cx-remark"></span>
				</div>
			</div>
		</div>
		
		<div class="cx-paragraph">
			<div class="container-fluid">
				<div class="row no-gutters flat-row my-2 spzyj">
					<div class="col-3">商品金额</div>
					<div class="col-9 text-right"><span class="cx-price cx-no-badge text-dark"></span></div>
				</div>
				<div class="row no-gutters flat-row my-2 spzyh">
					<div class="col-3">优惠金额</div>
					<div class="col-9 text-right"><span class="text-danger"><i class="fas fa-minus" style="transform: scale(0.5);"></i></span><span class="cx-price cx-no-badge"></span></div>
				</div>
				<div class="row no-gutters flat-row my-2 spzcjje">
					<div class="col-3">成交金额</div>
					<div class="col-9 text-right"><span class="cx-price cx-no-badge"></span></div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="cx-sub-action-bar">
	   	<div class="container-fluid">
	   		<div class="row no-gutters cx-flat-row">
				<div class="col-12 cx-prompt">
					<span class="ml-3">
						<i class="fas fa-arrow-left cx-scale-1"></i>返回列表
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
</body>
</html>