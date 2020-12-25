package com.ctp.core.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import jxl.Cell;
import jxl.CellType;
import jxl.DateCell;

public class DateUtils {

	/**
	 * 定义常见的时间格式
	 */
	private static String[] dateFormat = { "yyyy-MM-dd HH:mm:ss",
			"yyyy/MM/dd HH:mm:ss", "yyyy年MM月dd日HH时mm分ss秒", "yyyy-MM-dd",
			"yyyy/MM/dd", "yy-MM-dd", "yy/MM/dd", "yyyy年MM月dd日", "HH:mm:ss",
			"yyyyMMddHHmmss", "yyyyMMdd", "yyyy.MM.dd", "yy.MM.dd" };

	/**
	 * 将日期格式从 java.util.Calendar 转到 java.sql.Timestamp 格式
	 * 
	 * @param date
	 *            java.util.Calendar 格式表示的日期
	 * @return java.sql.Timestamp 格式表示的日期
	 */
	public static Timestamp convUtilCalendarToSqlTimestamp(Calendar date) {
		if (date == null)
			return null;
		else
			return new Timestamp(date.getTimeInMillis());
	}

	/**
	 * 将日期格式从 java.util.Timestamp 转到 java.util.Calendar 格式
	 * 
	 * @param date
	 *            java.sql.Timestamp 格式表示的日期
	 * @return java.util.Calendar 格式表示的日期
	 */
	public static Calendar convSqlTimestampToUtilCalendar(Timestamp date) {
		if (date == null)
			return null;
		else {
			java.util.GregorianCalendar gc = new java.util.GregorianCalendar();
			gc.setTimeInMillis(date.getTime());
			return gc;
		}
	}

	/**
	 * 解析一个字符串，形成一个Calendar对象，适应各种不同的日期表示法
	 * 
	 * @param dateStr
	 *            期望解析的字符串，注意，不能传null进去，否则出错
	 * @return 返回解析后的Calendar对象 <br>
	 *         <br>
	 *         可输入的日期字串格式如下： <br>
	 *         "yyyy-MM-dd HH:mm:ss", <br>
	 *         "yyyy/MM/dd HH:mm:ss", <br>
	 *         "yyyy年MM月dd日HH时mm分ss秒", <br>
	 *         "yyyy-MM-dd", <br>
	 *         "yyyy/MM/dd", <br>
	 *         "yy-MM-dd", <br>
	 *         "yy/MM/dd", <br>
	 *         "yyyy年MM月dd日", <br>
	 *         "HH:mm:ss", <br>
	 *         "yyyyMMddHHmmss", <br>
	 *         "yyyyMMdd", <br>
	 *         "yyyy.MM.dd", <br>
	 *         "yy.MM.dd"
	 */
	public static Calendar parseDate(String dateStr) {
		if (dateStr == null || dateStr.trim().length() == 0)
			return null;

		Date result = parseDate(dateStr, 0);
		Calendar cal = Calendar.getInstance();
		cal.setTime(result);

		return cal;
	}

	/**
	 * 将一个日期转成日期时间格式，格式这样 2002-08-05 21:25:21
	 * 
	 * @param date
	 *            期望格式化的日期对象
	 * @return 返回格式化后的字符串 <br>
	 *         <br>
	 *         例： <br>
	 *         调用： <br>
	 *         Calendar date = new GregorianCalendar(); <br>
	 *         String ret = DateUtils.toDateTimeStr(date); <br>
	 *         返回： <br>
	 *         ret = "2002-12-04 09:13:16";
	 */
	public static String toDateTimeStr(Calendar date) {
		if (date == null)
			return null;
		return new SimpleDateFormat(dateFormat[0]).format(date.getTime());
	}

	/**
	 * 将一个日期转成日期时间格式，格式这样 2002-08-05 21:25:21
	 * 
	 * @param date
	 *            期望格式化的日期对象
	 * @return 返回格式化后的字符串 <br>
	 *         <br>
	 *         例： <br>
	 *         调用： <br>
	 *         Calendar date = new GregorianCalendar(); <br>
	 *         String ret = DateUtils.toDateTimeStr(date); <br>
	 *         返回： <br>
	 *         ret = "2002-12-04 09:13:16";
	 */
	public static String toDateTimeStr(int format, Calendar date) {
		if (date == null)
			return null;
		return new SimpleDateFormat(dateFormat[format]).format(date.getTime());
	}

	/**
	 * 将一个日期转成日期格式，格式这样 2002-08-05
	 * 
	 * @param date
	 *            期望格式化的日期对象
	 * @return 返回格式化后的字符串 <br>
	 *         <br>
	 *         例： <br>
	 *         调用： <br>
	 *         Calendar date = new GregorianCalendar(); <br>
	 *         String ret = DateUtils.toDateStr(calendar); <br>
	 *         返回： <br>
	 *         ret = "2002-12-04";
	 */
	public static String toDateStr(Calendar date) {
		if (date == null)
			return null;
		return new SimpleDateFormat(dateFormat[3]).format(date.getTime());
	}

	public static String toDateStrByFormatIndex(Calendar date, int formatIndex) {
		if (date == null)
			return null;
		return new SimpleDateFormat(dateFormat[formatIndex]).format(date
				.getTime());
	}

	public static int calendarMinus(Calendar d1, Calendar d2) {
		if (d1 == null || d2 == null) {
			return 0;
		}

		d1.set(Calendar.HOUR_OF_DAY, 0);
		d1.set(Calendar.MINUTE, 0);
		d1.set(Calendar.SECOND, 0);

		d2.set(Calendar.HOUR_OF_DAY, 0);
		d2.set(Calendar.MINUTE, 0);
		d2.set(Calendar.SECOND, 0);

		long t1 = d1.getTimeInMillis();
		long t2 = d2.getTimeInMillis();

		long daylong = 3600 * 24 * 1000;
		t1 = t1 - t1 % (daylong);
		t2 = t2 - t2 % (daylong);

		long t = t1 - t2;
		int value = (int) (t / (daylong));

		return value;
	}

	/**
	 * getCurTimestamp 取当前时间戳
	 * 
	 * @return java.sql.Timestamp
	 */
	public static java.sql.Timestamp getCurTimestamp() {
		java.util.Date today = new java.util.Date();
		java.sql.Timestamp ts = new java.sql.Timestamp(today.getTime());
		return ts;
	}
	
	/**
	 * 获取当前时间 yyyyMMddHHmmss
	 * @return String
	 */ 
	public static String getCurrTime() {
		Date now = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String s = outFormat.format(now);
		return s;
	}

	/**
	 * @param d1
	 * @param d2
	 * @return
	 */
	public static long calendarminus(Calendar d1, Calendar d2) {
		if (d1 == null || d2 == null) {
			return 0;
		}
		return (d1.getTimeInMillis() - d2.getTimeInMillis()) / (3600 * 24000);
	}

	/**
	 * 内部方法，根据某个索引中的日期格式解析日期
	 * 
	 * @param dateStr
	 *            期望解析的字符串
	 * @param index
	 *            日期格式的索引
	 * @return 返回解析结果
	 */
	public static Date parseDate(String dateStr, int index) {
		DateFormat df = null;
		try {
			df = new SimpleDateFormat(dateFormat[index]);

			return df.parse(dateStr);
		} catch (ParseException pe) {
			return parseDate(dateStr, index + 1);
		} catch (ArrayIndexOutOfBoundsException aioe) {
			return null;
		}
	}

	/**
	 * 字符转日期,字符串格式："yyyy-MM-dd"，例如2006-01-01
	 * 
	 * @param dateStr
	 * @return
	 */
	public static Date StringToDate(String dateStr) {
		if (dateStr == null || dateStr.trim().length() == 0) {
			return null;
		}
		return parseDate(dateStr, 3);
	}

	/**
	 * DATE to String，支持多种格式
	 * 
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date, int index) {
		if (date == null) {
			return null;
		}
		return new SimpleDateFormat(dateFormat[index]).format(date);
	}

	/**
	 * DATE to String，转换结果格式为："yyyy-MM-dd"，例如2006-01-01
	 * 
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date) {
		if (date == null) {
			return null;
		}
		return new SimpleDateFormat(dateFormat[3]).format(date);
	}

	/**
	 * 将日期格式从 java.util.Date 转到 java.sql.Timestamp 格式 convUtilDateToSqlTimestamp
	 * <br>
	 * 
	 * @param date
	 *            java.util.Date 格式表示的日期
	 * @return Timestamp java.sql.Timestamp 格式表示的日期
	 */
	public static Timestamp convUtilDateToSqlTimestamp(Date date) {
		if (date == null)
			return null;
		else
			return new Timestamp(date.getTime());
	}

	public static Calendar convUtilDateToUtilCalendar(Date date) {
		if (date == null)
			return null;
		else {
			java.util.GregorianCalendar gc = new java.util.GregorianCalendar();
			gc.setTimeInMillis(date.getTime());
			return gc;
		}
	}

	/**
	 * 内部方法，根据某个索引中的日期格式解析日期
	 * 
	 * @param dateStr
	 *            期望解析的字符串
	 * @param index
	 *            日期格式的索引
	 * @return 返回解析结果
	 */
	public static Timestamp parseTimestamp(String dateStr, int index) {
		DateFormat df = null;
		try {
			df = new SimpleDateFormat(dateFormat[index]);

			return new Timestamp(df.parse(dateStr).getTime());
		} catch (ParseException pe) {
			return new Timestamp(parseDate(dateStr, index + 1).getTime());
		} catch (ArrayIndexOutOfBoundsException aioe) {
			return null;
		}
	}

	/**
	 * 内部方法，根据默认的日期格式“yyyy-MM-dd”解析日期
	 * 
	 * @param dateStr
	 *            期望解析的字符串
	 * @return 返回解析结果
	 */
	public static Timestamp parseTimestamp(String dateStr) {
		DateFormat df = null;
		try {
			df = new SimpleDateFormat(dateFormat[3]);
			return new Timestamp(df.parse(dateStr).getTime());
		} catch (ParseException pe) {
			return null;
		} catch (ArrayIndexOutOfBoundsException aioe) {
			return null;
		}
	}

	public static int calcMonthDays(Calendar date) {
		Calendar t1 = (Calendar) date.clone();
		Calendar t2 = (Calendar) date.clone();
		int year = date.get(Calendar.YEAR);
		int month = date.get(Calendar.MONTH);
		t1.set(year, month, 1);
		t2.set(year, month + 1, 1);
		t2.add(Calendar.DAY_OF_YEAR, -1);
		return calendarMinus(t2, t1) + 1;
	}

	public static int getIntervalDays(Date startday, Date endday) {
		if (startday.after(endday)) {
			Date cal = startday;
			startday = endday;
			endday = cal;
		}
		long sl = startday.getTime();
		long el = endday.getTime();
		long ei = el - sl;
		return (int) (ei / (1000 * 60 * 60 * 24));
	}
	//返回字符类型的当前日期。
	public static String getStrDate() {
		Date date=new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
       return sdf.format(date);
	}
	//返回日期型的当前日期。
	public static Date getDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = sdf.parse(getStrDate());
		} catch (Exception e) {
			// TODO: handle exception
		}
	return date;
	}
	
	public static String getOneMinuteAgo() {
	
		String before="";
		try {
			
			Calendar beforeTime = Calendar.getInstance();
			beforeTime.add(Calendar.MINUTE, -1);// 1分钟之前的时间
			Date beforeD = beforeTime.getTime();
			before = new SimpleDateFormat("yyyyMMddHHmmss").format(beforeD);  
			
		} catch (Exception e) {
			// TODO: handle exception
		}
	return before;
	}
	
	public static Date CellToDate(Cell dateCell) {
		if (dateCell == null ) {
			return null;
		}
		if(dateCell.getType()==CellType.DATE){
			DateCell dc=(DateCell)dateCell;
			return dc.getDate();
		
		}else{
			return DateUtils.parseDate(dateCell.getContents().trim(),3);
		}
	}
	
	public static Date getReqDateyyyyMMddHHmmss(String date){
		try {
			return new SimpleDateFormat("yyyyMMddHHmmss").parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String getTimeStamp() {
		return String.valueOf(System.currentTimeMillis() / 1000);
	}
	
	public static void main(String[] arg){
		  
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  

	        String ysrqStr="2019-01-01".substring(0,7)+'-'+"02";
	        Date ysrq=null;
			try {
				ysrq = sdf.parse(ysrqStr);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		System.out.println(dateToString(ysrq));
		
	}
	
}
