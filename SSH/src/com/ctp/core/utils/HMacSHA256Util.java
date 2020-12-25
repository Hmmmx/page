package com.ctp.core.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class HMacSHA256Util {

	public static String HMACSHA256(String data, String key) throws Exception {
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
		sha256_HMAC.init(secret_key);
		byte[] array = sha256_HMAC.doFinal(data.getBytes("UTF-8"));
		StringBuilder sb = new StringBuilder();
		for (byte item : array) {
			sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
		}
		return sb.toString();

	}

	public static String getSign(List<String> list, Long timestamp) throws Exception {
		Collections.sort(list);
		char[] chars = String.valueOf(timestamp).toCharArray();
		String key = chars[0] + "" + chars[2] + "" + chars[4] + "" + chars[6] + "" + chars[8] + "" + chars[9];
		String sign = "";
		for (String x : list) {
			sign = sign + x;
		}
		String signature = HMacSHA256Util.HMACSHA256(sign, key);
		return signature;

	}

	public static void main(String[] args) throws Exception {
//		HMacSHA256Util.HMACSHA256("0100158815070277626025373707796579免费车粤R2E063", "181002");
		List<String> list = new ArrayList<String>();
		Long timestamp = 1588151492911L;
		list.add("26025373707796579");
		list.add("粤R2E063");
		list.add("免费车");
		list.add("0");
		list.add("100");
		list.add(timestamp.toString());
		HMacSHA256Util.getSign(list, timestamp);

	}

}
