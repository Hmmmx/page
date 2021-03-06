<%@ page language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
    
<html>
<head>
</head>
<body data-print-page-size="10">
	<div class="print-wrapper print-page-break fs-xs" v-for="(page, index) in data.sfpzmxPages">
		<div>
			<h4 class="title" style="padding-top:1em;"><span>收据</span></h4> <!-- 不同设备可能需要调整padding-top -->
			
			<div class="wrapper">
				<div class="row">
					<div class="col-6">房产名称：{{data.sfpz.fcmc}}</div>
					<div class="col-3">房产面积：{{typeof data.sfpz.jzmj==='number'?data.sfpz.jzmj.toFixed(2):'-'}}<span style="margin-left:2px">m&sup2;</span></div>
					<div class="col-3 text-right">编号：{{data.sfpz.pjbh}}</div>
				</div>
				<div class="row">
					<div class="col-6">客户名称：{{data.sfpz.khmc}}</div>
					<div class="col-3">收款方式：{{data.sfpz.skfsmc}}</div>
					<div class="col-3 text-right">收款日期：{{data.sfpz.skrq}}</div>
				</div>
			</div>
			<div class="table-wrapper f-weight-bold border-h mt-2"> <!-- border, border-h -->
				<table class="table border-h-tbody-none" border="0" cellspacing="0"> <!-- border, border-h, border-h-tbody-none -->
				    <thead class="thead-light">
				        <tr>
				            <th class="text-left" style="width:auto;">收费项目</th>
				            <th class="text-center" style="width:13em;">计费周期</th>
				            <th class="text-right" style="width:5em;">上期读数</th>
				            <th class="text-right" style="width:5em;">本期读数</th>
				            <th class="text-right" style="width:4em;">数量</th>
				            <th class="text-right" style="width:7em;">单价</th>
				            <th class="text-left" style="width:5em;">费用分类</th>
				            <th class="text-right" style="width:6em;">金额</th>
				        </tr>
				    </thead>
					<tbody>
						<tr v-for="sfpzmx in page.sfpzmxs">
							<td>{{sfpzmx.sfxmmc}}</td>
							<td class="text-center f-family-regular">{{sfpzmx.jfzqq ? sfpzmx.jfzqq : '未填写'}} ~ {{sfpzmx.jfzqz ? sfpzmx.jfzqz : '未填写'}}</td>
							<td class="text-right f-family-regular">{{typeof sfpzmx.sqds==='number' ? sfpzmx.sqds : '-'}}</td>
							<td class="text-right f-family-regular">{{typeof sfpzmx.bqds==='number' ? sfpzmx.bqds : '-'}}</td>
							<td class="text-right f-family-regular">{{typeof sfpzmx.sl==='number' ? sfpzmx.sl : '-'}}</td>
							<td class="text-right f-family-regular">{{sfpzmx.dj ? sfpzmx.dj : '-'}}</td>
							<td>{{sfpzmx.fyfldm ? (sfpzmx.fyfldm=='1' ? '正常费用' : '违约金') : '-'}}</td>
							<td class="text-right"><span class="price f-family-regular" v-show="typeof sfpzmx.fyje==='number'">{{typeof sfpzmx.fyje==='number'?sfpzmx.fyje.toFixed(2):'-'}}</span></td>
						</tr>
						<tr v-for="count in page.pageSize-page.sfpzmxs.length"> <!-- no-border or no class -->
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr v-if="data.stat.pageCount > 1">
							<td colspan="7">本页小计</td>
							<td class="text-right"><span class="price f-family-regular">{{page.subTotal}}</span></td>
						</tr>
						<tr v-else> <!-- no-border or no class -->
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="7">合计（大写）：{{data.stat.zwdxTotal}}</td>
							<td class="text-right"><span class="price f-family-regular">{{data.stat.total}}</span></td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div class="wrapper mt-2">
				<div class="row">
					<div class="col-8">本收据一式三份：第一份为存根联，第二份为客户联，第三份为记账联；本收据手写无效</div>
					<div class="col-2 text-right" v-if="data.sfpz.jfr">缴费人：{{data.sfpz.jfr}}</div>
					<div class="col-2 text-right" v-if="data.sfpz.jfr">经办人：{{data.sfpz.skrmc}}</div>
					<div class="col-4 text-right" v-else>经办人：{{data.sfpz.skrmc}}</div>
				</div>
				<div class="row" style="align-items:flex-start">
					<div class="col-10 remark"><span v-if="data.sfpz.skbz">备注：{{data.sfpz.skbz}}</span></div>
					<div class="col-2 text-right">出据单位(盖章)</div>
				</div>
			</div>
			<div class="wrapper mt-2">
				<div class="row"><div class="col-12 text-center">{{page.page}} / {{data.stat.pageCount}}</div></div>
			</div>
		</div>
	</div>
</body>
</html>