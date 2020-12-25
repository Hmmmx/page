package com.ctp.core.utils;
public class RefUtils {
	public RefUtils() {
	}

	public static String getDataType(Class cls) {
		String type = cls.getName();

		int pos = type.lastIndexOf(".");
		if (pos >= 0) {
			type = type.substring(pos + 1);
		}

		return type;

	}

	public static String getDataType(Object obj) {
		if (obj == null) {
			return null;
		}

		return getDataType(obj.getClass());

	}

}
