package com.ctp.core.utils;

import java.security.MessageDigest;

public class SessionIDGenerator {

	public synchronized static String generateSessionID(String userid) {
		return userid + ";" + System.currentTimeMillis();
	}

	public synchronized static String generateDigitalDigestSessionID(String userid) throws Exception {
		String sessionID = userid + ";" + System.currentTimeMillis();

		MessageDigest alga = MessageDigest.getInstance("SHA-1");
		alga.update(sessionID.getBytes());
		byte[] digestSessionID = alga.digest();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < digestSessionID.length; i++) {
			sb.append(Byte.toString(digestSessionID[i]));
		}
		return sb.toString();

	}

	public static void main(String[] argv) {

	}
}