<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="com.ctp.core.utils.StaticRsrcUtil" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
    
<html>
<head>
    <title>社区运营管理统一工作平台</title>
    <%@ include file="../common/meta.jspf" %>
</head>
<body data-root-url="<s:url value="/" />">
	<%@ include file="../common/header.jspf" %>

	<section class="main">
		<div class="container-fluid">
			<div class="row">
				<div class="col-8 col-md-2 flat-col menu-column col-limited">
					<div class="sys-list-hanlder">
						<span class="sys-list-tooltip"></span>
						<a class="sys-list-title" href="javascript:;" data-cx-toggle=".menu-column .sys-list-hanlder .sys-list">
							<span class="text-ellipsis">
								<span class="current-sys-name">当前系统</span>
							</span>
							<span><i class="fas fa-angle-right"></i></span>
						</a>
						<div class="sys-list">
							<div class="list-group">
								<a href="#" class="list-group-item list-group-item-action">系统 </a>
							</div>
						</div>
					</div>
					
					<div class="accordion" id="accordionMenu"></div>
				</div>
				<div class="col-12 col-md-10 flat-col content-column col-extended">
					<div class="content">
						<div class="nav-tabs-wrapper">
							<ul class="nav nav-tabs nav-tabs-ex" id="menuTab" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" id="tabHome" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><span class="text-ellipsis">首页</span></a>
								</li>
							</ul>
						</div>
						<div class="tab-content" id="menuTabContent">
							<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="tabHome">
								<div class="ptlx-default" style="min-height: calc(100vh - 176px);display:flex;align-items:center;justify-content:center;height:100%">
									<img src="<s:url value="/resources/img/welcome.png" />">
								</div>
								<div class="ptlx-wygl d-none">
									<div class="toolbar">
										<div>
											<label class="col-form-label tbr-label ml-1">社区</label>
											<select class="custom-select tbr-form-ctrl cx-f-1" name="sqdm"></select>
										</div>
					                </div>
                					
                					<div>
										<div class="row no-gutters">
											<div class="col-9 col-extended-lg cx-gutter-r p-relative">
												<div class="d-flex-ceneter" style="height:100%;">
													<div class="card" style="width: 100%;height:100%">
														<div class="card-header p-2">
															<span><i class="fas fa-chart-bar text-info mr-1"></i></span><span>应收费用概览</span>
														</div>
														<div class="card-body p-2">
															<div class="d-flex-center ysfy-chart" style="width:100%;height:100%;">暂无数据</div>
														</div>
													</div>
												</div>
												<%-- <div class="d-flex-between" style="flex-direction:column;height:100%;">
													<div class="card" style="width: 100%;height:49%">
														<div class="card-header px-2 py-1">
															<span>应收费用统计</span>
														</div>
														<div class="card-body px-2 py-1">
															<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
														</div>
													</div>
												
													<div class="card" style="width: 100%;height:49%">
														<div class="card-header px-2 py-1">
															<span>应收费用统计</span>
														</div>
														<div class="card-body px-2 py-1">
															<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
														</div>
													</div>
												</div> --%>
											</div>
											<div class="col-3 col-limited-lg border rounded home-misc">
												<div class="">
													<div class="card border-bottom-0 sq-info">
														<div class="card-header p-2">
															<span><i class="fas fa-home text-info mr-1"></i></span><span class="sq-name">房产资源概览</span>
														</div>
														<div class="card-body p-2">
															<div class="sq-attr-list">
																<div class="sq-attr">
																	<span>房产总数</span><span class="fc-sum">-</span>
																</div>
																
																<div class="sq-attr mt-4">
																	<span>有效房产</span><span class="fc-yx-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>已出售</span><span class="fc-cs-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>已收楼</span><span class="fc-sl-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>已入住</span><span class="fc-rz-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>装修中</span><span class="fc-zxz-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>已装修</span><span class="fc-zx-sum">-</span>
																</div>
																
																<div class="sq-attr mt-4">
																	<span>普通住宅</span><span class="fc-zz-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>商铺</span><span class="fc-sp-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>公寓</span><span class="fc-gy-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>别墅</span><span class="fc-bs-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>写字楼</span><span class="fc-xzl-sum">-</span>
																</div>
																<%-- <div class="sq-attr">
																	<span>小高层</span><span class="fc-xgc-sum">-</span>
																</div>
																<div class="sq-attr">
																	<span>高层</span><span class="fc-gc-sum">-</span>
																</div> --%>
																<div class="sq-attr">
																	<span>其他</span><span class="fc-qt-sum">-</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<%@ include file="../common/footer.jspf" %>
				</div>
			</div>
		</div>
	</section>

<%@ include file="../common/script.jspf" %>
<script src="<s:url value="/resources/components/echarts-4.7.0/echarts.min.js" />"></script>
<script src="<s:url value="/resources/components/echarts-4.7.0/macarons.js" />"></script>
<script src="<s:url value="${StaticRsrcUtil.appendVersion('/resources/js/home/home.js') }" />"></script>
</body>
</html>