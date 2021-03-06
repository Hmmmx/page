package com.ctp.core.utils;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.Map.Entry;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.springframework.util.StringUtils;



public class StringTool {
	private static final int BUFFER_SIZE = 1024 * 2;// 字段串压缩算法使用的缓冲区大小

	private static int PRECISION = 2;

	private static String[] chrChineseUnit = { "分", "角", "元", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿", "拾", "佰", "仟",
			"兆", "拾", "佰", "仟" };

	private static String[] chrChineseNumber = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };

	private static String chrChineseFull = "整";

	private static String chrChineseNegative = "负";
	
	public static String toHtml(String s) {
		s = s.replace("\t", "");
		s = s.replace("\r", "");
		s = s.replace("\n", "");
		
		return s;
	}
	public static List<String> StrTranStr(String FromStr) {
		String[] arr = FromStr.split(",");
		List<String> list = new ArrayList<>();
		if (!StringUtils.isEmpty(arr) && arr.length > 0) {
			for (int i = 0; i < arr.length; i++) {
				if (arr[i].trim().equals("")) {
					continue;
				}
				if (i <= arr.length - 1) {
					list.add(arr[i]);
				}
			}

		}
		return list;
	}
	
	public static StringBuilder StrSql(String FromStr) {
		String[] arr = FromStr.split(",");
		StringBuilder sb = new StringBuilder();
		if (!StringUtils.isEmpty(arr) && arr.length > 0) {
			for (int i = 0; i < arr.length; i++) {
				sb.append("'" + arr[i] + "'");
				if (i != arr.length - 1) {// 前面的元素后面全拼上",",最后一个元素后不拼
					sb.append(",");
				}
			}

		}
		return sb;
	}
	
	public static String createSignStr(SortedMap<String, String> parameters, String key){
		StringBuffer sb = new StringBuffer();
		Set<Entry<String,String>> es = parameters.entrySet();
		Iterator it = es.iterator();
		while (it.hasNext()) {
			Entry<String,String> entry = (Entry<String,String>) it.next();
			
			String k =  entry.getKey();
			String v = entry.getValue();
			if (null != v && !"".equals(v) && !"sign".equalsIgnoreCase(k)
					&& !"key".equalsIgnoreCase(k)) {
				sb.append(k + "=" + v + "&");
			}
		}
		sb.append("key=" + key);
		
		String sign = null;
		try {
			sign = MD5Encode(sb.toString()).toUpperCase();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sign;
	}
	public static String MD5Encode(String data) throws Exception {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] array = md.digest(data.getBytes("UTF-8"));
		StringBuilder sb = new StringBuilder();
		for (byte item : array) {
			sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
		}
		return sb.toString().toUpperCase();
	}
	/**
	 * Description 将数字金额转换为中文金额
	 * 
	 * @param
	 * <p>
	 * BigDecimal bigdMoneyNumber 转换前的数字金额
	 * </P>
	 * @return String 调用：myToChineseCurrency("101.89")="壹佰零壹圆捌角玖分" myToChineseCurrency("100.89")="壹佰零捌角玖分"
	 *         myToChineseCurrency("100")="壹佰圆整"
	 */
	public static String DoNumberCurrencyToChineseCurrency(BigDecimal bigdMoneyNumber) {
		// 中文金额缓存
		StringBuffer sb = new StringBuffer();
		// 获取符号
		int signum = bigdMoneyNumber.signum();
		// System.out.println("signum=" + signum);
		if (signum == 0) {
			return "零元整";
		}
		// System.out.println(bigdMoneyNumber.scale());

		// 转换金额为long,精确到分
		long number = bigdMoneyNumber.movePointRight(PRECISION).setScale(0, BigDecimal.ROUND_HALF_UP).abs().longValue();

		long scale = number % 100;

		int numUnit = 0;
		int numIndex = 0;
		// 遇零标志
		boolean getZero = false;
		// while((scale = scale % 10) == 0){
		// numIndex ++;
		// number = number / 10;
		// getZero = true;
		// }
		if (scale == 0) {
			numIndex = 2;
			number = number / 100;
			getZero = true;
		}
		if (scale != 0 && scale % 10 == 0) {
			numIndex = 1;
			number = number / 10;
			getZero = true;
		}
		int zeroSize = 0;
		while (number > 0) {
			numUnit = (int) (number % 10);
			if (numUnit > 0) {
				// 非零处理
				if (numIndex == 9 && zeroSize >= 3) {
					sb.insert(0, chrChineseUnit[6]);
				}
				if (numIndex == 13 && zeroSize >= 3) {
					sb.insert(0, chrChineseUnit[10]);
				}
				sb.insert(0, chrChineseUnit[numIndex]);
				sb.insert(0, chrChineseNumber[numUnit]);
				getZero = false;
				zeroSize = 0;
			} else {
				// 为零处理
				zeroSize++;
				if (!getZero)
					sb.insert(0, chrChineseNumber[numUnit]);

				if (numIndex == 2) {
					if (number > 0) {
						sb.insert(0, chrChineseUnit[numIndex]);
					}
				} else if ((numIndex - 2) % 4 == 0) {
					if (number % 1000 > 0) {
						sb.insert(0, chrChineseUnit[numIndex]);
					}
				}
				getZero = true;
			}

			// 自除10
			number = number / 10;
			numIndex++;

		}

		// 负数追加首字 负

		if (signum == -1) {
			sb.insert(0, chrChineseNegative);
		}
		// 整数追加尾字 整

		if (scale == 0) {
			sb.append(chrChineseFull);
		}

		return sb.toString();
	}

	/**
	 * 字符串的字符集类型转换
	 * 
	 * @param src
	 *            需要转换的字符串
	 * @param fromCharSet
	 *            字符串当前的字符集类型，如"iso-8859-1","GBK"等
	 * @param toCharSet
	 *            目标字符集类型，如"iso-8859-1","GBK"等
	 * @return 转换后的字符串,失败返回null
	 */
	public static String charSetConvert(String src, String fromCharSet, String toCharSet) {
		if (src == null) {
			return src;
		}
		try {
			return new String(src.getBytes(fromCharSet), toCharSet);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 将iso8859的字符集转换成UTF-8字符集
	 * 
	 * @param src
	 *            iso8859字符串
	 * @return 转化后的字符串,失败返回null
	 */
	public static String isoToUTF8(String src) {
		String arch = System.getProperty("os.arch");
		if ("x86".equalsIgnoreCase(arch)) {
			return src;
		}
		return charSetConvert(src, "iso-8859-1", "UTF-8");
	}

	/**
	 * 将UTF-8的字符集转换成iso8859字符集
	 * 
	 * @param src
	 *            UTF-8字符串
	 * @return 转化后的字符串,失败返回null
	 */
	public static String utf8ToISO(String src) {
		String arch = System.getProperty("os.arch");
		if ("x86".equalsIgnoreCase(arch)) {
			return src;
		}
		return charSetConvert(src, "UTF-8", "iso-8859-1");
	}

	/**
	 * 
	 * @将iso8859的字符集转换成UTF-8字符集
	 * @param src
	 *            iso8859字符串,force 强制转换标志
	 * @return 转化后的字符串,失败返回null
	 */
	public static String isoToUTF8(String src, boolean force) {
		if (force) {
			return charSetConvert(src, "iso-8859-1", "UTF-8");
		} else {
			return isoToUTF8(src);
		}
	}

	/**
	 * 将iso8859的字符集转换成GBK字符集
	 * 
	 * @param src
	 *            iso8859字符串
	 * @return 转化后的字符串,失败返回null
	 */
	public static String isoToGBK(String src) {
		return charSetConvert(src, "iso-8859-1", "GBK");
	}

	/**
	 * 将GBK的字符集转换成iso8859字符集
	 * 
	 * @param src
	 *            GBK字符串
	 * @return 转化后的字符串,失败返回null
	 */
	public static String gbkToISO(String src) {
		return charSetConvert(src, "GBK", "iso-8859-1");
	}

	/**
	 * 字符替换函数 <br>
	 * 比如 String a = "ccddaa"; replace(a,"dd","xx") 将返回 ccxxaa
	 * 
	 * @param str
	 *            需要替换的原始字符串
	 * @param pattern
	 *            需要被替换掉的字符串
	 * @param replace
	 *            希望被替换成的字符串
	 * @return 返回替换后的字符串
	 * 
	 */
	public static String replace(String str, String pattern, String replace) {
		int s = 0;
		int e = 0;
		StringBuffer result = new StringBuffer();
		while ((e = str.indexOf(pattern, s)) >= 0) {
			result.append(str.substring(s, e));
			result.append(replace);
			s = e + pattern.length();
		}
		result.append(str.substring(s));
		return result.toString();
	}

	/**
	 * 重复一个字符串 n 次，比如 abcabcabc
	 * 
	 * @param str
	 *            需要重复的字符串
	 * @param repeat
	 *            重复的次数
	 * @return 重复后生成的字符串
	 */
	public static String repeat(String str, int repeat) {
		StringBuffer buffer = new StringBuffer(repeat * str.length());
		for (int i = 0; i < repeat; i++) {
			buffer.append(str);
		}
		return buffer.toString();
	}

	/**
	 * 获得一个字符串的最左边的n个字符，如果长度len的长度大于字符串的总长度，返回字符串本身
	 * 
	 * @param str
	 *            原始的字符串
	 * @param len
	 *            左边的长度
	 * @return 最左边的字符
	 */
	public static String left(String str, int len) {
		if (len < 0) {
			throw new IllegalArgumentException("Requested String length " + len + " is less than zero");
		}
		if ((str == null) || (str.length() <= len)) {
			return str;
		} else {
			return str.substring(0, len);
		}
	}

	/**
	 * 获得一个字符串的最右边的n个字符，如果长度len的长度大于字符串的总长度，返回字符串本身
	 * 
	 * @param str
	 *            原始的字符串
	 * @param len
	 *            右边的长度
	 * @return 最右边的字符
	 */
	public static String right(String str, int len) {
		if (len < 0) {
			throw new IllegalArgumentException("Requested String length " + len + " is less than zero");
		}
		if ((str == null) || (str.length() <= len)) {
			return str;
		} else {
			return str.substring(str.length() - len);
		}
	}

	/**
	 * 将给定的字符串格式化为定长字符串, 原始字符串长度超过给定长度的,按照给定长度从左到右截取 如果原始字符串小于给定长度, 则按照给定字符在左端补足空位
	 * 
	 * @param src
	 *            原始字符串
	 * @param s2
	 *            补充用字符,
	 * @param length
	 *            格式化后长度
	 * @return 格式化后字符串
	 */
	public static String formatString(String src, char s2, int length) {
		String retValue = src;
		if (src == null || length <= 0) {
			return null;
		}

		if (src.length() > length) {
			retValue = src.substring(0, length);
		}

		for (int i = 0; i < length - src.length(); i++) {
			retValue = s2 + retValue;
		}

		return retValue;
	}

	/**
	 * 将一个浮点数转换为人民币的显示格式：￥##,###.##
	 * 
	 * @param value
	 *            浮点数
	 * @return 人民币格式显示的数字
	 */
	public static String toRMB(double value) {
		NumberFormat nf = NumberFormat.getCurrencyInstance(Locale.CHINA);
		return nf.format(value);
	}

	/**
	 * 默认保留小数点后两位，将一个浮点数转换为定长小数位的小数 ######.##
	 * 
	 * @param value
	 *            浮点数
	 * @return 定长小数位的小数
	 */
	public static String toCurrencyWithoutComma(double value) {
		String retValue = toCurrency(value);
		retValue = retValue.replaceAll(",", "");
		return retValue;
	}

	/**
	 * 默认保留小数点后两位，将一个浮点数转换为货币的显示格式：##,###.##
	 * 
	 * @param value
	 *            浮点数
	 * @return 货币格式显示的数字
	 */
	public static String toCurrency(double value) {
		return toCurrency(value, 2);
	}

	/**
	 * 根据指定的小数位数，将一个浮点数转换为货币的显示格式
	 * 
	 * @param value
	 *            浮点数
	 * @param decimalDigits
	 *            小数点后保留小数位数
	 * @return 货币格式显示的数字 <br>
	 *         <br>
	 *         例： toCurrency(123456.789,5) 将返回 "123,456.78900"
	 */
	public static String toCurrency(double value, int decimalDigits) {
		String format = "#,##0." + repeat("0", decimalDigits);
		NumberFormat nf = new DecimalFormat(format);
		return nf.format(value);

	}

	/**
	 * 将一个字符串格式化为给定的长度，过长的话按照给定的长度从字符串左边截取，反之以给定的 字符在字符串左边补足空余位 <br>
	 * 比如： <br>
	 * prefixStr("abc",'0',5) 将返回 00aaa <br>
	 * prefixStr("abc",'0',2) 将返回 ab
	 * 
	 * @param source
	 *            原始字符串
	 * @param profix
	 *            补足空余位时使用的字符串
	 * @param length
	 *            格式化后字符串长度
	 * @return 返回格式化后的字符串,异常返回null
	 */
	public static String prefixStr(String source, char profix, int length) {
		String strRet = source;
		if (source == null) {
			return strRet;
		}
		if (source.length() >= length) {
			strRet = source.substring(0, length);
		}

		if (source.length() < length) {
			for (int i = 0; i < length - source.length(); i++) {
				strRet = "" + profix + strRet;
			}
		}

		return strRet;
	}

	/**
	 * 格式化字符串,将字符串trim()后返回. 如果字符串为null,则返回长度为零的字符串("")
	 * 
	 * @param value
	 *            被格式化字符串
	 * @return 格式化后的字符串
	 */
	public static String stringTrim(String value) {
		if (value == null) {
			return "";
		}
		return value.trim();
	}
	public static Object ObjTrim(Object value) {
		if (value == null) {
			return "";
		}
		return value;
	}
	/**
	 * 将"null"和null转换为""
	 * 
	 * @param str
	 *            String
	 * @return String
	 */
	public static String trimNull(String str) {
		String result = "";
		if (!"null".equals(str)) {
			result = stringTrim(str);
		}
		return result;
	}

	/**
	 * 将一个字符串格式化为给定的长度，过长的话按照给定的长度从字符串左边截取，反之以给定的 字符在字符串右边补足空余位 <br>
	 * 比如： <br>
	 * suffixStr("abc",'0',5) 将返回 aaa00 <br>
	 * suffixStr("abc",'0',2) 将返回 ab
	 * 
	 * @param source
	 *            原始字符串
	 * @param profix
	 *            补足空余位时使用的字符串
	 * @param length
	 *            格式化后字符串长度
	 * @return 返回格式化后的字符串,异常返回null
	 */
	public static String suffixStr(String source, char suffix, int length) {
		String strRet = source;
		if (source == null) {
			return strRet;
		}
		if (source.length() >= length) {
			strRet = source.substring(0, length);
		}

		if (source.length() < length) {
			for (int i = 0; i < length - source.length(); i++) {
				strRet += suffix;
			}
		}
		return strRet;
	}

	/**
	 * 根据分割符sp，将str分割成多个字符串，并将它们放入一个ArrayList并返回，其规则是最后的 字符串最后add到ArrayList中
	 * 
	 * @param str
	 *            被分割的字符串
	 * @param sp
	 *            分割符字符串
	 * @return 封装好的ArrayList
	 * @author 高虹 ： 友情提供
	 */
	public static ArrayList convertStrToArrayList(String str, String sp) {
		ArrayList al = new ArrayList();
		if (str == null) {
			return al;
		}
		String strArr[] = str.split(sp);
		for (int i = 0; i < strArr.length; i++) {
			al.add(strArr[i]);
		}

		return al;
	}

	// public static void main(String[] args) {
	// double dd = 50000000.1*.002;
	// String s2 =dd+"";
	// System.out.println( changeToBig(dd+" "));
	// System.out.println( changeToBig("0500000.0150"));
	//    	
	// System.out.println( changeToBig("1500"));
	// System.out.println( changeToBig("5000.000000001"));
	// Double je = new Double(50000.00000340);
	// System.out.println(changeToBig(je.toString()));
	// String wq = "0005000.00";
	// System.out.println(changeToBig(isoToUTF8(wq) ));
	// double d = 30000000d;
	// System.out.println(changeToBig(String.valueOf(d)));
	// d = 0.0000000d;
	// System.out.println(changeToBig(String.valueOf(d)));
	// d=2441.545;
	// System.out.println(changeToBig(String.valueOf(d)));
	// System.out.println(changeToBig(String.valueOf(54543.35)));
	// System.out.println(changeToBig(String.valueOf(5.233)));
	// System.out.println(changeToBig(String.valueOf(79789340000.00d)));
	// System.out.println(changeToBig(String.valueOf(43434)));
	// // for (int i = 0; i < 10000000; i++) {
	// // String s = changeToBig(String.valueOf(d));
	// // d+=0.001d;
	// // if (isZero(s)) {
	// // System.out.println(" d = "+d+ " "+s);
	// // }\
	// //
	// // }
	// // String sd = changeToBig("0500000.00");
	// // System.out.println(sd);
	// // System.out.println(isZero(sd));
	//    	
	// }
	// public static boolean isZero(String s ) {
	// int k=0;
	// for (int i = 0; i < s.length()-1; i++) {
	// if (s.charAt(i)=='零'&&s.charAt(i+1)=='零') {
	// k++;
	// }
	// if (k>1) {
	// return true;
	// }
	// }
	// return false;
	// }

	public static String changeToBig(String value) {
		return isoToUTF8(stringToBig(value));
	}

	private static String stringToBig(String value) {
		String result = "零元整";
		if (null == value || "".equals(value.trim())) {
			return result;
		}

		try {
			BigDecimal b = new BigDecimal(value);
			result = DoNumberCurrencyToChineseCurrency(b);

		} catch (Exception e) {
			//
			return "零元整";
		}
		return result;

	}

	/**
	 * 将数字字符串转换为人民币大写
	 * 
	 * @param value
	 *            金额人民币数字字符串
	 * @return 转换后的人民币大写字符串
	 * @author 王德春 : 友情提供
	 */
	public static String changeToBigOld(String value) {

		if (null == value || "".equals(value.trim())) {
			return "零";
		}
		// 正、负数判断标记:如果为负，则把负号去掉进行处理。 Add by Lichuanxin
		// ****start*******============================================================================================
		String flag = value;
		if ((flag.substring(0, 1).equals("-")))
			value = value.substring(1);
		// ****end*******================================================================================================

		// add by Johnson Zhang
		int len = value.length();

		String strCheck, strArr, strFen, strDW, strNum, strBig, strNow;
		double d = 0;
		try {
			d = Double.parseDouble(value);
		} catch (Exception e) {
			return "数据" + value + "非法！";
		}

		strCheck = value + ".";
		int dot = strCheck.indexOf(".");
		if (dot > 12) {
			return "数据" + value + "过大，无法处理！";
		}

		try {
			int i = 0;
			strBig = "";
			strDW = "";
			strNum = "";

			// long intFen = (long)(d*100); //原来的处理方法

			/**
			 * 增加了对double转换为long时的精度，
			 * 
			 * 例如:(long)(208123.42 * 100) = 20812341 解决了该问题 add 庞学亮
			 * 
			 */
			BigDecimal big = new BigDecimal(d);
			big = big.multiply(new BigDecimal(100)).setScale(2, 4);
			long intFen = big.longValue();

			strFen = String.valueOf(intFen);
			int lenIntFen = strFen.length();
			while (lenIntFen != 0) {
				i++;
				switch (i) {
				case 1:
					strDW = "分";
					break;
				case 2:
					strDW = "角";
					break;
				case 3:
					strDW = "元";
					break;
				case 4:
					strDW = "拾";
					break;
				case 5:
					strDW = "佰";
					break;
				case 6:
					strDW = "仟";
					break;
				case 7:
					strDW = "万";
					break;
				case 8:
					strDW = "拾";
					break;
				case 9:
					strDW = "佰";
					break;
				case 10:
					strDW = "仟";
					break;
				case 11:
					strDW = "亿";
					break;
				case 12:
					strDW = "拾";
					break;
				case 13:
					strDW = "佰";
					break;
				case 14:
					strDW = "仟";
					break;
				}
				switch (strFen.charAt(lenIntFen - 1)) { // 选择数字

				case '1':
					strNum = "壹";
					break;
				case '2':
					strNum = "贰";
					break;
				case '3':
					strNum = "叁";
					break;
				case '4':
					strNum = "肆";
					break;
				case '5':
					strNum = "伍";
					break;
				case '6':
					strNum = "陆";
					break;
				case '7':
					strNum = "柒";
					break;
				case '8':
					strNum = "捌";
					break;
				case '9':
					strNum = "玖";
					break;
				case '0':
					strNum = "零";
					break;
				}
				// 处理特殊情况
				strNow = strBig;
				// 分为零时的情况

				if ((i == 1) && (strFen.charAt(lenIntFen - 1) == '0')) {
					strBig = "整";
					// 角为零时的情况

				} else if ((i == 2) && (strFen.charAt(lenIntFen - 1) == '0')) { // 角分同时为零时的情况
					if (!strBig.equals("整")) {
						strBig = "零" + strBig;
					}
				}
				// 元为零的情况
				else if ((i == 3) && (strFen.charAt(lenIntFen - 1) == '0')) {
					strBig = "元" + strBig;
					// 拾－仟中一位为零且其前一位（元以上）不为零的情况时补零

				} else if ((i < 7) && (i > 3) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (!("" + strNow.charAt(0)).equals("零")) && (!("" + strNow.charAt(0)).equals("元"))) {
					strBig = "零" + strBig;
					// 拾－仟中一位为零且其前一位（元以上）也为零的情况时跨过

				} else if ((i < 7) && (i > 3) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("零"))) {
				}
				// 拾－仟中一位为零且其前一位是元且为零的情况时跨过
				else if ((i < 7) && (i > 3) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("元"))) {
				}
				// 当万为零时必须补上万字

				// modified by Johnson Zhang
				else if ((i == 7) && (strFen.charAt(lenIntFen - 1) == '0')) {
					strBig = "万" + strBig;
					// 拾万－仟万中一位为零且其前一位（万以上）不为零的情况时补零

				} else if ((i < 11) && (i > 7) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (!("" + strNow.charAt(0)).equals("零")) && (!("" + strNow.charAt(0)).equals("万"))) {
					strBig = "零" + strBig;
					// 拾万－仟万中一位为零且其前一位（万以上）也为零的情况时跨过

				} else if ((i < 11) && (i > 7) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("万"))) {
				}
				// 拾万－仟万中一位为零且其前一位为万位且为零的情况时跨过

				else if ((i < 11) && (i > 7) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("零"))) {
				}
				// 万位为零且存在仟位和十万以上时，在万仟间补零
				else if ((i < 11) && (i > 8) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("万")) && (("" + strNow.charAt(2)).equals("仟"))) {
					strBig = strNum + strDW + "万零" + strBig.substring(1, strBig.length());
					// 单独处理亿位
				} else if (i == 11) {
					// 亿位为零且万全为零存在仟位时，去掉万补为零

					if ((strFen.charAt(lenIntFen - 1) == '0') && (("" + strNow.charAt(0)).equals("万"))
							&& (("" + strNow.charAt(2)).equals("仟"))) {
						strBig = "亿" + "零" + strBig.substring(1, strBig.length());
						// 亿位为零且万全为零不存在仟位时，去掉万

					} else if ((strFen.charAt(lenIntFen - 1) == '0') && (("" + strNow.charAt(0)).equals("万"))
							&& (("" + strNow.charAt(2)).equals("仟"))) {
						strBig = "亿" + strBig.substring(1, strBig.length());
						// 亿位不为零且万全为零存在仟位时，去掉万补为零
					} else if ((("" + strNow.charAt(0)).equals("万")) && (("" + strNow.charAt(2)).equals("仟"))) {
						strBig = strNum + strDW + "零" + strBig.substring(1, strBig.length());
						// 亿位不为零且万全为零不存在仟位时，去掉万
					} else if ((("" + strNow.charAt(0)).equals("万")) && (("" + strNow.charAt(2)).equals("仟"))) {
						strBig = strNum + strDW + strBig.substring(1, strBig.length());
						// 其他正常情况
					} else {
						if (("" + strBig.charAt(0)).equals("万")) {
							strBig = strNum + strDW + strBig.substring(1, strBig.length()) + " ";
						} else {
							strBig = strNum + strDW + strBig;
						}
					}

				} // 拾亿－仟亿中一位为零且其前一位（亿以上）不为零的情况时补零

				else if ((i < 15) && (i > 11) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("零")) && (!("" + strNow.charAt(0)).equals("亿"))) {
					strBig = "零" + strBig;
					// 拾亿－仟亿中一位为零且其前一位（亿以上）也为零的情况时跨过

				} else if ((i < 15) && (i > 11) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("亿"))) {
				}
				// 拾亿－仟亿中一位为零且其前一位为亿位且为零的情况时跨过

				else if ((i < 15) && (i > 11) && (strFen.charAt(lenIntFen - 1) == '0')
						&& (("" + strNow.charAt(0)).equals("零"))) {
				}
				// 亿位为零且不存在仟万位和十亿以上时去掉上次写入的零

				else if ((i < 15) && (i > 11) && (strFen.charAt(lenIntFen - 1) != '0')
						&& (("" + strNow.charAt(0)).equals("零")) && (("" + strNow.charAt(1)).equals("亿"))
						&& (!("" + strNow.charAt(3)).equals("仟"))) {
					strBig = strNum + strDW + strBig.substring(1, strBig.length());
					// 亿位为零且存在仟万位和十亿以上时，在亿仟万间补零
				} else if ((i < 15) && (i > 11) && (strFen.charAt(lenIntFen - 1) != '0')
						&& (("" + strNow.charAt(0)).equals("零")) && (("" + strNow.charAt(1)).equals("亿"))
						&& (("" + strNow.charAt(3)).equals("仟"))) {
					strBig = strNum + strDW + "亿零" + strBig.substring(2, strBig.length());
				} else {
					strBig = strNum + strDW + strBig;
				}
				strFen = strFen.substring(0, lenIntFen - 1);
				lenIntFen--;
			}
			// return strBig;
			// 正、负数判断标记:如果为负，返回的时候加上“负”字符。 by Lichuanxin
			// start ==========================================================================
			if ((flag.substring(0, 1).equals("-")))
				return isoToUTF8("负" + strBig);
			else
				return isoToUTF8(strBig);
			// end===============================================================================

		} catch (Exception e) {
			return "";
		}
	}

	// add by kfr for date
	public static String changeToBigdate(String value) {

		if (null == value || "".equals(value.trim())) {
			return " ";
		}

		String strDW, strNum, strNum1;

		strDW = "";
		strNum = "";
		strNum1 = "";

		for (int i = 0; i < value.length(); i++) {
			if (value.length() == 2) {
				if (i == 0) {
					switch (value.substring(0, 1).charAt(i)) {
					case '1':
						strNum = "十";
						break;
					case '2':
						strNum = "二十";
						break;
					case '3':
						strNum = "三十";
						break;
					case '0':
						strNum = " ";
						break;

					}
					switch (value.charAt(1)) { // 选择数字
					case '1':
						strNum1 = "一";
						break;
					case '2':
						strNum1 = "二";
						break;
					case '3':
						strNum1 = "三";
						break;
					case '4':
						strNum1 = "四";
						break;
					case '5':
						strNum1 = "五";
						break;
					case '6':
						strNum1 = "六";
						break;
					case '7':
						strNum1 = "七";
						break;
					case '8':
						strNum1 = "八";
						break;
					case '9':
						strNum1 = "九";
						break;
					case '0':
						strNum1 = " ";
						break;
					}

					strDW = strNum + strNum1;
				}
			}

			else {
				if (i == 0 && value.startsWith("0")) {
					strNum = "";
				} else {
					switch (value.charAt(i)) { // 选择数字
					case '1':
						strNum = "一";
						break;
					case '2':
						strNum = "二";
						break;
					case '3':
						strNum = "三";
						break;
					case '4':
						strNum = "四";
						break;
					case '5':
						strNum = "五";
						break;
					case '6':
						strNum = "六";
						break;
					case '7':
						strNum = "七";
						break;
					case '8':
						strNum = "八";
						break;
					case '9':
						strNum = "九";
						break;
					case '0':
						strNum = "零";
						break;
					}
				}
				strDW = strDW + strNum;
			}
		}

		return isoToUTF8(strDW);
	}

	/**
	 * 
	 * convertDbColToMapKey <br>
	 * 根据数据库的列字段名将其按BO定义格式转换为BO中属性定义
	 * 
	 * @param dbCol
	 *            数据库的字段
	 * @return String BO定义格式属性
	 */
	public static String convertDbColToMapKey(String dbCol) {
		String mapKey = "";
		String str = dbCol.toLowerCase();
		String[] ss = str.split("_");
		StringBuffer key = new StringBuffer();
		if (ss.length > 1) {
			key.append(ss[0]);
			for (int j = 1; j < ss.length; j++) {
				key.append(ss[j].substring(0, 1).toUpperCase()).append(ss[j].substring(1));
			}
		} else {
			key.append(str);
		}
		mapKey = key.toString();
		return mapKey;
	}

	/**
	 * 转换字符串 为字符串转换为Integer、Double、Long等对象去空格，如果为null或者“”转换为“0”返回 trim4Number <br>
	 * 
	 * @param str
	 * @return String
	 */
	public static String trim4Number(String str) {
		str = stringTrim(str);
		if ("".equals(str)) {
			return "0";
		}
		return str;
	}

	/**
	 * 对一个String对象进行压缩，返回结果为byte[]
	 * 
	 * @param data
	 * @return
	 * 
	 * @author 张久旭
	 */
	public static byte[] compress(String data) throws Exception {
		byte[] tempData = data.getBytes();
		ByteArrayOutputStream baos = null;
		GZIPOutputStream gzos = null;

		try {
			// 开始进行数据压缩
			baos = new ByteArrayOutputStream();
			gzos = new GZIPOutputStream(baos);
			gzos.write(tempData, 0, tempData.length);
			gzos.flush();
			gzos.finish();
			// 数据压缩已完成
			tempData = baos.toByteArray();
		} catch (Exception ex) {
			
			throw new Exception(ex.getMessage());
		} finally {
			Exception e = null;
			if (baos != null) {
				try {
					baos.close();
				} catch (Exception ex) {
					
					e = ex;
				}
				baos = null;
			}
			if (gzos != null) {
				try {
					gzos.close();
				} catch (Exception ex) {
					
					e = ex;
				}
				gzos = null;
			}
			if (e != null) {
				throw new Exception(e.getMessage());
			}
		}
		return tempData;
	}

	/**
	 * 对一个被压缩的byte[]数组对象进行解压缩，返回结果为String，要求参数byte[]为使用compress方法压缩得到的byte[]
	 * 
	 * @param data
	 * @return
	 * 
	 * @author 张久旭
	 */
	public static String deCompress(byte[] data) throws Exception {
		String value = null;
		ByteArrayInputStream bais = new ByteArrayInputStream(data);
		GZIPInputStream gzis = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buffer = new byte[BUFFER_SIZE];
		int flag = 0;
		try {
			gzis = new GZIPInputStream(bais, BUFFER_SIZE);
			while ((flag = gzis.read(buffer, 0, BUFFER_SIZE)) != -1) {
				baos.write(buffer, 0, flag);
				baos.flush();
			}
			value = new String(baos.toByteArray());
		} catch (IOException ex) {
			
			throw new Exception(ex.getMessage());
		} finally {
			IOException e = null;
			try {
				baos.close();
			} catch (IOException ex) {
				
				e = ex;
			}
			baos = null;
			try {
				gzis.close();
			} catch (IOException ex) {
				
				e = ex;
			}
			gzis = null;
			try {
				bais.close();
			} catch (IOException ex) {
				
				e = ex;
			}
			bais = null;
			buffer = null;
			if (e != null) {
				throw new Exception(e.getMessage());
			}
		}
		return value;
	}

	/**
	 * 对String[]数组进行压缩，返回结果为byte[][]
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 * 
	 * @author 张久旭
	 */
	public static byte[][] compressStrs(String[] data) throws Exception {
		byte[][] value = new byte[data.length][];
		for (int index = 0; index < data.length; index++) {
			value[index] = compress(data[index]);
		}
		return value;
	}

	/**
	 * 对byte[][]对象进行解压缩，返回结果为String[]，要求参数byte[][]为使用compressStrs方法压缩得到的byte[][]
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static String[] deCompressStrs(byte[][] data) throws Exception {
		String[] value = new String[data.length];
		for (int index = 0; index < data.length; index++) {
			value[index] = deCompress(data[index]);
		}
		return value;
	}

	/**
	 * 对List进行压缩，要求List中存放的数据为String[]才可以
	 * 
	 * @param data
	 * @return
	 * 
	 * @author 张久旭
	 */
	public static List compressList(List data) throws Exception {
		List value = new ArrayList(data.size());
		for (int index = 0; index < data.size(); index++) {
			value.add(compressStrs((String[]) data.get(index)));
		}
		return value;
	}

	/**
	 * 对List进行解压缩，要求List中存放的数据为使用compressList方法压缩得到的List才可以
	 * 
	 * @param data
	 * @return
	 * @throws IOException
	 * 
	 * @author 张久旭
	 */
	public static List deCompressList(List data) throws Exception {
		List value = new ArrayList(data.size());
		for (int index = 0; index < data.size(); index++) {
			value.add(deCompressStrs((byte[][]) data.get(index)));
		}
		return value;
	}

	/**
	 * 将输入流压缩成byte数组
	 * 
	 * @param is
	 * @return
	 * @throws IOException
	 * 
	 * @author 张久旭
	 */
	public static byte[] compressInputStream(InputStream is) throws IOException {
		byte[] value = null;
		ByteArrayOutputStream baos = null;
		GZIPOutputStream gzos = null;
		byte[] buffer = new byte[BUFFER_SIZE];
		int flag = 0;

		try {
			baos = new ByteArrayOutputStream();
			gzos = new GZIPOutputStream(baos);
			while ((flag = is.read(buffer, 0, BUFFER_SIZE)) != -1) {
				gzos.write(buffer, 0, flag);
				gzos.flush();
			}
			gzos.finish();
			value = baos.toByteArray();
		} catch (IOException ex) {
			
			throw ex;
		} finally {
			IOException e = null;
			if (baos != null) {
				try {
					baos.close();
				} catch (IOException ex) {
					
					e = ex;
				}
			}
			if (gzos != null) {
				try {
					gzos.close();
				} catch (IOException ex) {
					
					e = ex;
				}
			}
			if (e != null) {
				throw e;
			}
		}
		return value;
	}

	/**
	 * 将压缩后的byte数组还原成输入流
	 * 
	 * @param data
	 * @return
	 * @throws IOException
	 * 
	 * @author 张久旭
	 */
	public static InputStream deCompressInputStream(byte[] data) throws IOException {
		ByteArrayInputStream bais = null;
		GZIPInputStream gzipIs = null;

		try {
			bais = new ByteArrayInputStream(data);
			gzipIs = new GZIPInputStream(bais);
		} catch (IOException ex) {
			
			throw ex;
		}
		return gzipIs;
	}

	/**
	 * 将输入流转换成byte数组，不对byte数组进行压缩
	 * 
	 * @param is
	 * @return
	 * @throws IOException
	 * 
	 * @author 张久旭
	 */
	public static byte[] convertInputStreamToByteArray(InputStream is) throws IOException {
		byte[] value = null;
		ByteArrayOutputStream baos = null;
		byte[] buffer = new byte[BUFFER_SIZE];
		int flag = 0;

		try {
			baos = new ByteArrayOutputStream();
			while ((flag = is.read(buffer, 0, BUFFER_SIZE)) != -1) {
				baos.write(buffer, 0, flag);
				baos.flush();
			}
			value = baos.toByteArray();
		} catch (IOException ex) {
			
			throw ex;
		} finally {
			if (baos != null) {
				try {
					baos.close();
				} catch (IOException ex) {
					
					throw ex;
				}
			}
		}
		return value;
	}

	/**
	 * 将byte数组还原成输入流
	 * 
	 * @param data
	 * @return
	 * 
	 * @author 张久旭
	 */
	public static InputStream convertByteArrayToInputStream(byte[] data) {
		if (data == null) {
			return null;
		}
		ByteArrayInputStream bais = new ByteArrayInputStream(data);
		return bais;
	}
	
	/**
     * 拼接get请求的url请求地址
     */
    public static String getRqstUrl(String url, Map<String, String> params) {
        StringBuilder builder = new StringBuilder(url);
        boolean isFirst = true;
        for (String key : params.keySet()) {
            if (key != null && params.get(key) != null) {
                if (isFirst) {
                    isFirst = false;
                    builder.append("?");
                } else {
                    builder.append("&");
                }
                builder.append(key)
                        .append("=")
                        .append(params.get(key));
            }
        }
        return builder.toString();
    }
}
