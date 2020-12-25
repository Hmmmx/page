const StatChart = {
	charts: {},
	chartsData: {},
	
	option: {
		title : {
	        text: '应收费用收取概览',
	        x: 'center',
	        y: 'top'
	    },
        grid: {
            left: 80,
            right: 50,
            top: 100,
            bottom: 80,
        },
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: "shadow"        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params){
            	let ret = [];
            	ret.push(params[0].name);
                for(x in params){
                	ret.push(params[x].marker + params[x].seriesName + " : " + params[x].data.value + "% - " 
                			+ (params[x].seriesName == '按房产数' ? (params[x].data.fcs1 +' / '+ params[x].data.fcs0) : (params[x].data.fyje1 +' / '+ params[x].data.fyje0)));
                }
                return ret.join('<br>');
            }
        },
        toolbox: {
            show: true,
            // orient: "vertical",
            x: "right",
            y: "top",
            feature: {
            	// dataView: {show: true, readOnly: false, title:"数据视图        "},
                saveAsImage: {show: true, title:"下载图片"}
            }
        },
        legend: {
        	x:"left",
        	show: true,
            data:['按房产数', '按金额']
        },
        xAxis: {
	    	splitLine: {
	            show: false
	        },
            // axisLabel: {rotate: 30},
            type: "category"
        },
        yAxis: {type: "value", axisLabel: {formatter: '{value} %'}},
        loading: {
            text: '查询中，请稍后...',
            effect: "spin",
            effectOption: {
                backgroundColor: "#ddd"
            },
            textStyle : {
                fontSize : 20
            }
        },
        series: [
            {
    	        name: '按房产数',
    	        type: "bar",
    	        barMinHeight: "2", // 16
    	        barMaxWidth: "32",
    	        label: {
    	            show: true,
    	            position: 'top', // insideTop
    	            fontWeight: 'bold',
    	            formatter: '{c}%'
    	        },
    	        //hoverAnimation: true,
    	        /*markPoint: {
    	            data: [
    	                {type: "max", name: '最大值'},
    	                {type: "min", name: '最小值'}
    	            ]
    	        },*/
    	        /*markLine: {
    	            symbol: ["none", "none"], // "circle", "arrow"
    	            // symbolSize: [2, 4],
    	            precision: 0,
    	            data: [
    	                {type : "average", name: '平均值'}
    	            ]
    	        }, */
    	        data: ['6']
    	    },{
    	        name: '按金额',
    	        type: "bar",
    	        barMinHeight: "2", // 16
    	        barMaxWidth: "32",
    	        label: {
    	            show: true,
    	            position: 'top', // insideTop
    	            fontWeight: 'bold',
    	            formatter: '{c}%'
    	        },
    	        //hoverAnimation: true,
    	        /*markPoint: {
    	            data: [
    	                {type: "max", name: '最大值'},
    	                {type: "min", name: '最小值'}
    	            ]
    	        },*/
    	        /*markLine: {
    	            symbol: ["none", "none"], // "circle", "arrow"
    	            //symbolSize: [2, 4],
    	            precision: 0,
    	            data: [
    	                {type : "average", name: '平均值'}
    	            ]
    	        }, */
    	        data: ['6']
    	    }
        ]
	},
	
	clearCache: function(){
		StatChart.chartsData = {};
		gHome.sqInfoData = {};
	},
	
	q: function(el) {
		let sqdm = el.value, chartName = sqdm, wrapper = document.querySelector(`#home .ysfy-chart`);
		StatChart.charts[chartName] = echarts.dispose(wrapper);
		StatChart.charts[chartName] = echarts.init(wrapper, 'macarons');
		
		if (sqdm && !StatChart.chartsData[sqdm]) { // 未有数据
			CxMisc.ajax({
			    url: CxMisc.finalizeUrl('/wygl/sfxt/fycx/getFyjeTj'),
			    type: "GET",
			    data: {sqdm:sqdm},
			    beforeSend: function(xhr, cfg) {
			    	StatChart.charts[chartName].showLoading(StatChart.option.loading);
			    },
			    success: function(res, ts) {
			    	if (res.code == "0") {
			    		let data = {};
			    		for (let i=0; i<res.data.length; i++) {
			    			if (res.data[i].sfzdy) {
				    			if (!data[res.data[i].sfzdy]) {
				    				data[res.data[i].sfzdy] = {sfzdy: res.data[i].sfzdy, fyje0:0, fyje1:0, fcs0:0, fcs1:0};
				    			}
				    			if (res.data[i].ztbj == '1') {
				    				data[res.data[i].sfzdy].fyje1 += res.data[i].fyje;
				    				data[res.data[i].sfzdy].fcs1 += res.data[i].fcs;
				    			} else if (res.data[i].ztbj === null) {
				    				data[res.data[i].sfzdy].fyje0 = res.data[i].fyje;
					    			data[res.data[i].sfzdy].fcs0 = res.data[i].fcs;
				    			}
			    			}
			    		}
			    		
			    		let stat = {sfzdys: [], fyjes: [], fcss: []};
			    		for(let sfzdy in data){
			    			stat.sfzdys.push({value:sfzdy, textStyle:{fontSize: 14}});
			    			stat.fyjes.push({
			    				value: data[sfzdy].fyje0===0 ? 0 : (data[sfzdy].fyje1/data[sfzdy].fyje0*100).toFixed(0),
			    				fyje0: data[sfzdy].fyje0,
			    				fyje1: data[sfzdy].fyje1
			    			});
			    			stat.fcss.push({
			    				value: data[sfzdy].fcs0===0 ? 0 : (data[sfzdy].fcs1/data[sfzdy].fcs0*100).toFixed(0),
			    				fcs0: data[sfzdy].fcs0,
			    				fcs1: data[sfzdy].fcs1
			    			});
			    		}
			    		
			    		StatChart.chartsData[sqdm] = stat;
			    		StatChart._renderChart(sqdm);
			    	} else {
			    		CxMsg.warn('查询应收费用概览失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('查询应收费用概览失败：' + msg);
			    },
		        complete: function(xhr, ts) {
		        	StatChart.charts[chartName].hideLoading();
		        }
			});
		} else {
			StatChart._renderChart(sqdm);
		}
	},
	_renderChart: function(sqdm) {
		let data=StatChart.chartsData[sqdm]; 
		
		if (data && data.sfzdys.length>0) {
			let option = StatChart.option;
			option.xAxis.data = data.sfzdys;
			option.title.text = `应收费用最近${option.xAxis.data.length}个月收取概览`;
			option.series[0].data = data.fcss;
			option.series[1].data = data.fyjes;
			StatChart.charts[sqdm].setOption(option);
		} else {
			document.querySelector(`#home .ysfy-chart`).innerText = '暂无数据';
		}
	}
};

const gHome = {
	sqInfoData: {},
	
	bindEvents: function(){
		CxMisc.enableRefresh('#home', gHome.refresh);
		
		$('[data-cx-toggle]').click(function(e){
			e.stopPropagation();
			e.preventDefault();
			let self = $(this.getAttribute('data-cx-toggle'));
			if (self.css('display') != 'none') self.fadeOut('fast');
			else self.fadeIn('fast');
		});
	},
	
	refresh: function(){
		StatChart.clearCache();
		gHome.getSqTj();
	},
	
	getSqTj: function() {
		let sqdm = document.querySelector('#home .toolbar select[name=sqdm]');
		if (sqdm.value) {
			StatChart.q(sqdm);
			gHome.getFcxxTj(sqdm);
		}
	},
	
	getWyglStat: function() {
		$('#home .ptlx-wygl').removeClass('d-none');
		$('#home .ptlx-default').addClass('d-none');
		gHome.getSqList();
	},
	
	getSqList: function() {
		let el = document.querySelector('#home .toolbar select[name=sqdm]');
		if (el.getAttribute('data-loaded') != 'true') {
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/khgl/khxx/getKhsq'),
	            type: "GET",
	            beforeSend: function(xhr, cfg) {
	            	el.disabled = true;
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		if (res.data && res.data.length>0) {
	            			for (let i=0; i<res.data.length; i++) 
	            				el.options.add(new Option(res.data[i].sqmc, res.data[i].sqdm));
	            			gHome.getSqTj();
	            		}
	            		el.setAttribute('data-loaded', 'true');
	            	} else CxMsg.info('获取社区列表失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('获取社区列表失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	el.disabled = false;
	            }
	        });
		}
	},
	
	getFcxxTj: function(el){
		let sqdm = el.value, wrapper = document.querySelector(`#home .ysfy-chart`);
		if (sqdm && !gHome.sqInfoData[sqdm]) { // 未有数据
			CxMisc.ajax({
	            url: CxMisc.finalizeUrl('/wygl/sfxt/fccx/getFcxxTj'),
	            type: "GET",
	            data: {sqdm: sqdm},
	            beforeSend: function(xhr, cfg) {
	            	el.disabled = true;
	            	$('#home .sq-info').mask('show', {msg: '查询中，请稍候...'});
	            },
	            success: function(res, ts) {
	            	if (res.code == "0") {
	            		if (res.data && res.data.length>0) {
	            			gHome.sqInfoData[sqdm] = res.data[0];
	            			gHome._renderSqInfo(el);
	            		}
	            	} else CxMsg.info('查询房产信息失败: ' + res.message);
	            },
	            error: function(xhr, ts, err) {
	            	var msg = "[" + xhr.status + " : " + ts + "]";
	            	CxMsg.error('查询房产信息失败: ' + msg);
	            },
	            complete: function(xhr, ts) {
	            	el.disabled = false;
	            	$('#home .sq-info').mask('hide');
	            }
	        });
		} else {
			gHome._renderSqInfo(el)
		}
	},
	_renderSqInfo: function(sqdm) {
		let wrap = document.querySelector('#home .sq-info'), sq = gHome.sqInfoData[sqdm.value];
		wrap.querySelector('.fc-sum').innerText = sq.total;
		if (sq.total > 0) {
			wrap.querySelector('.fc-yx-sum').innerText = sq.yx?`${sq.yx} (${(sq.yx/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-cs-sum').innerText = sq.cs?`${sq.cs} (${(sq.cs/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-sl-sum').innerText = sq.sl?`${sq.sl} (${(sq.sl/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-zxz-sum').innerText = sq.zxz?`${sq.zxz} (${(sq.zxz/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-zx-sum').innerText = sq.zx?`${sq.zx} (${(sq.zx/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-rz-sum').innerText = sq.rz?`${sq.rz} (${(sq.rz/sq.total*100).toFixed(0)}%)`:'0';
			
			wrap.querySelector('.fc-zz-sum').innerText = sq.zz?`${sq.zz} (${(sq.zz/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-sp-sum').innerText = sq.sp?`${sq.sp} (${(sq.sp/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-gy-sum').innerText = sq.gy?`${sq.gy} (${(sq.gy/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-bs-sum').innerText = sq.bs?`${sq.bs} (${(sq.bs/sq.total*100).toFixed(0)}%)`:'0';
			wrap.querySelector('.fc-xzl-sum').innerText = sq.xzl?`${sq.xzl} (${(sq.xzl/sq.total*100).toFixed(0)}%)`:'0';
			// wrap.querySelector('.fc-xgc-sum').innerText = sq.xgc?sq.xgc:'0';
			// wrap.querySelector('.fc-gc-sum').innerText = sq.gc?sq.gc:'0';
			wrap.querySelector('.fc-qt-sum').innerText = sq.qt?`${sq.qt} (${(sq.qt/sq.total*100).toFixed(0)}%)`:'0';
		}
	},
	
	getUserInfo: function(){
		let f = document.querySelector('#hdrUserDtlsFrm');
		if (f.getAttribute('data-loaded') == 'true') {
			$('#currentYhmc').text(f.yhmc.value);
		} else {
			CxMisc.ajax({
			    url: $.cookie("current_ptlx") == '1' ? CxMisc.finalizeUrl('/jgyh/getJgYh') : CxMisc.finalizeUrl('/wgyh/getJgYh'),
			    type: "GET",
			    success: function(res, ts) {
			    	if (res.code == "0" && res.data) {
			    		let data = res.data[0];
		        		$('#currentYhmc').text(data.yhmc);
			    	} else {
			    		CxMsg.warn('获取用户信息失败：' + res.message);
			    	}
			    },
			    error: function(xhr, ts, err) {
			    	var msg = "[" + xhr.status + " : " + ts + "]";
			    	CxMsg.warn('获取用户信息失败：' + msg);
			    }
			});
		}
	},
	
	getJgxx: function(){
		CxMisc.ajax({
		    url: $.cookie("current_ptlx") == '1' ? CxMisc.finalizeUrl('/home/getJgxx') : CxMisc.finalizeUrl('/home/getJgxx'),
		    type: "GET",
		    success: function(res, ts) {
		    	if (res.code == "0" && res.data) {
	        		if (res.data.jgmc) $('#currentJgmc').html('&nbsp;-&nbsp;' + res.data.jgmc);
	        		if (res.data.jgsyqxz) {
	        			let syqxz = moment(res.data.jgsyqxz, 'YYYYMMDD'), days = Math.ceil(moment.duration(syqxz.diff(moment())).asDays())+1;
	        			if (days <= 7)
	        				CxCtrl.alert(`贵司运行环境将于<span class="text-danger mx-1">${days}天后</span>(${syqxz.add(1, 'days').format('YYYY-MM-DD')})过期<br>为了避免影响使用，请尽快联系客服进行续费`);
	        		}
		    	}
		    }
		});
	},
	
	loadMenu: function(sysId){
		CxMisc.ajax({
	        url: CxMisc.finalizeUrl('/funclist'),
	        type: "POST",
	        data: (sysId ? {cdid: sysId} : null),
	        beforeSend: function(xhr, cfg) {
	        	$('#accordionMenu').mask('show', {msg: '载入中，请稍候...'});
	        },
	        success: function(res, ts) {
	        	if (res.code == "0" && res.data) {
	        		let menuCntr = $('#accordionMenu');

	        		if (res.data.su) {
	        			$('#currentYhmc').text('超级管理员'); // hardcode sysmgr name
	        			$("#popupUpdatePwdModal, #popupUserDtlsModal").addClass('disabled');
	        		}
	        		
	        		let funcList =  res.data.funclist || [];
	        		menuCntr.empty();
	        		if (funcList && funcList.length>0) {
	        			for (let i=0; i<funcList.length; i++) {
	        				let funcNav = funcList[i], subFuncList = [];
	        				if (funcNav.children) {
	        					for (let j=0; j<funcNav.children.length; j++) {
	        						subFuncList.push(`<a href="javascript:;" data-href="${CxMisc.finalizeUrl(funcNav.children[j].url)}" class="list-group-item list-group-item-action" data-id="sn-${i}-${j}">${funcNav.children[j].cdmc}</a>`);
	        					}
	        				}
	        				menuCntr.append(`<div class="card">
	        						<div class="card-header" id="heading${i}">
	        						<h5 class="mb-0">
	        						<button class="btn btn-link w-100" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
	        						<span class="text-ellipsis">${funcNav.cdmc}</span>
	        						</button>
	        						</h5>
	        						</div>
	        						
	        						<div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionMenu">
	        						<div class="card-body">
	        						<div class="list-group list-group-flush">
	        						${subFuncList.join('')}
	        						</div>
	        						</div>
	        						</div>
	        						</div>`);
	        			}
	        			menuCntr.find('.card-body a').click(function(){
	        				gHome.openMenu(this);
	        			});
	        			// menuCntr.find('.card:first-child .card-header button').click();
	        		} else {
	        			menuCntr.append('<span class="no-data">无数据</span>');
	        		}
	        	} else {
	        		CxMsg.error('载入功能菜单失败：' + res.message);
	        	}
	        },
	        error: function(xhr, ts, err) {
	        	var msg = "[" + xhr.status + " : " + ts + "]";
	        	CxMsg.error('载入功能菜单失败：' + msg);
	        },
	        complete: function(xhr, ts) {
	        	$('#accordionMenu').mask('hide');
	        }
	    });
	},
	
	loadSysList: function() {
		CxMisc.ajax({
	        url: CxMisc.finalizeUrl('/systemlist'),
	        type: "POST",
	        beforeSend: function(xhr, cfg) {
	        	$('.main').mask('show', {msg: '载入中，请稍候...'});
	        },
	        success: function(res, ts) {
	        	if (res.code == "0") {
	        		let sysId = null; //default is super admin
	        		if (res.data && res.data.length>0) {
	        			sysId = res.data[0].cdid;
	        			
	        			let sysListHandler = $('.menu-column .sys-list-hanlder'),
	        				sysListCntr = sysListHandler.find('.sys-list>.list-group');
	        			sysListHandler.find('.current-sys-name').text(res.data[0].cdmc);
	        			sysListCntr.empty();
	        			for (let i=0; i<res.data.length; i++) {
	        				sysListCntr.append(`<a href="#" class="list-group-item list-group-item-action ${i==0? 'active' : ''}" data-sys-id="${res.data[i].cdid}" onclick="gHome.switchSystem(this)">${res.data[i].cdmc}</a>`);
	        			}

	        			sysListHandler.find('.sys-list-title').css('display', 'flex');
	        			sysListHandler.find('.sys-list-tooltip').css('display', 'none');
	        		}
	        		gHome.loadMenu(sysId);
	        		if (sysId) gHome.getUserInfo();
	        	} else {
	        		CxMsg.error('载入系统列表失败：' + res.message);
	        	}
	        },
	        error: function(xhr, ts, err) {
	        	var msg = "[" + xhr.status + " : " + ts + "]";
	        	CxMsg.error('载入系统列表失败：' + msg);
	        },
	        complete: function(xhr, ts) {
	        	$('.main').mask('hide');
	        }
		});
		$('.menu-column .sys-list-hanlder .sys-list a').click(function(){
			gHome.switchSystem(this);
		});
	},
	
	openMenu: function(el) {
		let id = el.getAttribute("data-id"), text = el.innerText, url=el.getAttribute('data-href');
			tabTarget = $('#menuTab').find(`.nav-link[id=tab${id}]`);
		if (tabTarget.length > 0) {
			tabTarget.click();
		} else {
			let tabsOpened = $('#menuTab').children(), narrowest = 100;
			for (let i=1; i<tabsOpened.length; i++) { // 第一个标签是首页，固定显示
				if (narrowest > tabsOpened[i].offsetWidth) narrowest = tabsOpened[i].offsetWidth; 
			}
			if (narrowest < 70) {
				CxMsg.info('已打开太多标签');
			} else {
				$('#menuTab').append(`<li class="nav-item" title="${text}">
						<a class="nav-link" id="tab${id}" data-toggle="tab" href="#id${id}" role="tab" aria-controls="id${id}">
							<span class="text-ellipsis">${text}</span>
							<button class="close" type="button" title="关闭标签"><i class="fas fa-times"></i></button>
						</a>
					</li>`);
				$('#menuTabContent').append(`<div class="tab-pane fade" id="id${id}" role="tabpanel" aria-labelledby="tab${id}">${text} 正在载入</div>`);
				
				$('#menuTab').children(':last-child').find('button.close').click(function(e){
					let link = $(this).closest('.nav-link'), 
						item = $(this).closest('.nav-item'), 
						nextActiveTabId = null;
					if (link.hasClass('active')) {
						if (item.next().length > 0) nextActiveTabId = item.next().find('.nav-link').attr('id');
						else nextActiveTabId = item.prev().find('.nav-link').attr('id');
					}
					$($(this).closest('.nav-link').attr('href')).remove();
					e.stopPropagation();
					e.preventDefault();
					item.remove();
					
					if (nextActiveTabId) $(`#${nextActiveTabId}`).click();
				});
				$('#menuTab').children(':last-child').find('a').click();
				
				gHome.loadUrl(url, document.querySelector(`#id${id}`));
			}
		}
	},
	
	loadUrl: function(url, el) {
		let target = $(el);
		CxMisc.ajax({
		    url: url,
		    type: "GET",
		    dataType: "html",
		    beforeSend: function(xhr, cfg) {
		    	target.mask('show', {msg: '载入中，请稍候...'});
		    },
		    success: function(data, ts) {
		    	if (data.includes('</script>')) { //异步载入返回内容中的js，优化体验
		    		let re = /<script src="(.*?)"><\/script>/g, scripts=[];
		    		while ((result = re.exec(data)) !== null) {
		    			scripts.push(result[1]);
		    		}
		    		target.html(data.replace(re, ""));
		    		gHome.sequentialLoadScripts(scripts);
		    	} else {
		    		target.html(data);
		    	}
		    },
		    error: function(xhr, ts, err) {
		    	var msg = "[" + xhr.status + " : " + ts + "]";
		    	target.html('载入失败：' + msg);
		    	CxMsg.error('载入失败：' + msg);
		    },
		    complete: function(xhr, ts) {
		    	target.mask('hide');
		    }
		});
	},
	
	sequentialLoadScripts: function(scripts) {
		function _loadScripts(i, scripts) {
			$.ajax({
				  url: scripts[i],
				  timeout: 60000,
				  dataType: "script",
				  cache: true,
				  success: function(){
					  if (++i < scripts.length) {
						  _loadScripts(i, scripts);
					  }
				  },
				  error: function(){
					  CxMsg.warn('载入脚本失败，请稍后关闭标签后尝试重新打开');
				  }
			});
		}
		if (scripts && scripts.length>0) {
			_loadScripts(0, scripts);
		}
	},
	
	switchSystem: function(el) {
		let target = $(el);
		target.parent().children('.active').removeClass('active');
		target.addClass('active');
		$('#menuTab').children().find('button.close').click(); // 关闭前一个系统打开的菜单
		target.closest('.sys-list-hanlder').find('.sys-list-title .current-sys-name').text(target.text());
		gHome.loadMenu(target.data('sys-id'));
	}
};

$(function(){
	'user strict';
	
	gHome.bindEvents();
	gHome.loadSysList();
	gHome.getJgxx();
	if ($.cookie("current_ptlx") == '2') gHome.getWyglStat();
	
	$('#home .toolbar select[name=sqdm]').change(gHome.getSqTj);
	
	CxAutoLogout.countdown(); //打开自动退出计数，优化退出体验
	CxAutoLogout.keepAlive(); //间隔地发送请求保持session有效
});