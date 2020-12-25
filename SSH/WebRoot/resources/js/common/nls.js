var nls = {
	lang: $.cookie("clientLocale") ? $.cookie("clientLocale") : "zh_CN",
	get: function() {
		var tmp =  nls[nls.lang][arguments[0]];
		for (var i=1; i<arguments.length; i++) {
			tmp = tmp.replace(new RegExp("\\{"+ (i-1) +"\\}", "g"), arguments[i]);
		}
		return tmp;
	},
	components:{},
	"en_US": [],
    "zh_CN": [],
    "zh_TW": []
};

nls.components.dtp = {
    en_US: {
        today: 'Go to today',
        clear: 'Clear selection',
        close: 'Close the picker',
        selectDate: 'Select date',
        selectTime: 'Select time',
        selectMonth: 'Select Month',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        selectYear: 'Select Year',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        selectDecade: 'Select Decade',
        prevDecade: 'Previous Decade',
        nextDecade: 'Next Decade',
        prevCentury: 'Previous Century',
        nextCentury: 'Next Century',
        incrementHour: 'Increment Hour',
        pickHour: 'Pick Hour',
        decrementHour:'Decrement Hour',
        incrementMinute: 'Increment Minute',
        pickMinute: 'Pick Minute',
        decrementMinute:'Decrement Minute',
        incrementSecond: 'Increment Second',
        pickSecond: 'Pick Second',
        decrementSecond:'Decrement Second'
    },
    zh_CN: {
        today: '返回到今天',
        clear: '清除选值',
        close: '关闭',
        selectDate: '选择日期',
        selectTime: '选择时间',
        selectMonth: '选择月份',
        prevMonth: '上一月',
        nextMonth: '下一月',
        selectYear: '选择年份',
        prevYear: '上一年',
        nextYear: '下一年',
        selectDecade: '选择十年',
        prevDecade: '前十年',
        nextDecade: '后十年',
        prevCentury: '上世纪',
        nextCentury: '下世纪',
        incrementHour: '增加小时',
        pickHour: '选择小时',
        decrementHour:'减少小时',
        incrementMinute: '增加分钟',
        pickMinute: '选择分钟',
        decrementMinute:'减少分钟',
        incrementSecond: '增加秒数',
        pickSecond: '选择秒数',
        decrementSecond:'减少秒数'
    },
    zh_TW: {
        today: '返回到今天',
        clear: '清除選值',
        close: '關閉',
        selectDate: '選擇日期',
        selectTime: '選擇時間',
        selectMonth: '選擇月份',
        prevMonth: '上一月',
        nextMonth: '下一月',
        selectYear: '選擇年份',
        prevYear: '上一年',
        nextYear: '下一年',
        selectDecade: '選擇十年',
        prevDecade: '前十年',
        nextDecade: '後十年',
        prevCentury: '上世紀',
        nextCentury: '下世紀',
        incrementHour: '增加小時',
        pickHour: '選擇小時',
        decrementHour:'減少小時',
        incrementMinute: '增加分鐘',
        pickMinute: '選擇分鐘',
        decrementMinute:'減少分鐘',
        incrementSecond: '增加秒數',
        pickSecond: '選擇秒數',
        decrementSecond:'減少秒數'
    }
};