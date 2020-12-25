package com.ctp.core.utils;
import java.lang.reflect.Constructor;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ctp.core.model.BasePersistentObject;
import com.ctp.core.vo.BaseValueObject;




public class ValueTransform {


	private static final String SET_METHOD_START = "set";

	private static final String GET_METHOD_START = "get";



	/**
	 * VO转BO
	 * 
	 * @param swordVO
	 *            vo类名
	 * @param ctpBO
	 *            bo类名
	 */
	public static void vo2bo(BaseValueObject vo,
			BasePersistentObject bo) {
		// 获得VO、BO的方法名
		Method[] boSetMethods = bo.getClass().getMethods();
		Method[] voMethods = vo.getClass().getMethods();

		Map boSetMethodMap = new HashMap();
		for (int i = 0; i < boSetMethods.length; i++) {
			// 去掉get和set
			String boMethod = (String) boSetMethods[i].getName();
			String suboMethod = boMethod.substring(3).trim();
			suboMethod = suboMethod.substring(0, 1).toLowerCase()
					+ suboMethod.substring(1);

			Class declarClass = boSetMethods[i].getDeclaringClass();
			Constructor[] constructor = declarClass.getConstructors();

			// 过滤掉get方法和接口
			if (!boMethod.startsWith(SET_METHOD_START)
					|| constructor.length == 0 || declarClass.isInterface()
					) {
				continue;
			}
			// key：bo的set方法名，value：bo的set方法
			boSetMethodMap.put(boMethod, boSetMethods[i]);
		}
		try {
			// 循环vo方法
			for (int j = 0; j < voMethods.length; j++) {

				String voMethod = voMethods[j].getName();
				// 判断方法是否是以get开始，如果是，把方法名改成set开头

				// 过滤VO属性值为null的对象
				/*
				 * Object[] voInvoke = { voMethods[j].invoke(swordVO,new
				 * Object[] {}) }; if(voInvoke == null){ continue; }
				 */

				if (voMethod.startsWith(GET_METHOD_START)) {
					String boSetMethodName = voMethod.replaceFirst(
							GET_METHOD_START, SET_METHOD_START);
					// 判断方法名是否在map中存在
					if (boSetMethodMap.containsKey(boSetMethodName)) {
						Method boSetMethod = (Method) boSetMethodMap
								.get(boSetMethodName);
						// 方法类型
						String methodType = boSetMethod.getParameterTypes()[0]
								.getName();
						// 时间类型转换
						if (methodType.endsWith("Timestamp")) {
							/*Timestamp timeType = DateUtils
									.convUtilCalendarToSqlTimestamp((Calendar) voMethods[j]
											.invoke(vo, new Object[] {}));*/
							Timestamp timeType = (Timestamp) voMethods[j].invoke(vo, new Object[] {});
							if (null != timeType) {
								// 给bo中set的方法赋值
								boSetMethod.invoke(bo,
										new Object[] { timeType });
							}
						} else {
							// 给bo中set的方法赋值
							Object[] voInvoke = { voMethods[j].invoke(vo,
									new Object[] {}) };
							if (null == voInvoke[0] || voInvoke.length <= 0) {
								continue;
							}
							if (methodType.endsWith("String")) {
								voInvoke[0] = StringTool
										.trimNull((String) voInvoke[0]);
							}
							boSetMethod.invoke(bo, voInvoke);
						}
					}
				}
			}
		} catch (Exception e) {
					e.printStackTrace();
		}
	}

	/**
	 * bo转vo
	 * 
	 * @param ctpBO
	 *            bo类名
	 * @param swordVO
	 *            vo类名
	 */
	public static void bo2vo(BasePersistentObject bo,
			BaseValueObject vo) {

		// 获得VO、BO的方法名
		Method[] voSetMethods = vo.getClass().getMethods();
		Method[] boMethods = bo.getClass().getMethods();

		Map voSetMethodMap = new HashMap();
		for (int i = 0; i < voSetMethods.length; i++) {
			// 去掉get和set
			String voMethod = voSetMethods[i].getName();
			String subvoMethod = voMethod.substring(3).trim();
			subvoMethod = subvoMethod.substring(0, 1).toLowerCase()
					+ subvoMethod.substring(1);

			Class declarClass = voSetMethods[i].getDeclaringClass();
			Constructor[] constructor = declarClass.getConstructors();
			// 过滤掉get方法和接口
			if (!voMethod.startsWith("set") || constructor.length == 0
					|| declarClass.isInterface()) {
				continue;
			}
			// key：vo的set方法名，value：bo的set方法
			voSetMethodMap.put(voMethod, voSetMethods[i]);
		}

		try {
			// 循环vo方法
			for (int j = 0; j < boMethods.length; j++) {
				String boMethod = boMethods[j].getName();
				// 判断方法是否是以get开始，如果是，把方法名改成set开头
				if (boMethod.startsWith(GET_METHOD_START)) {
					String voSetMethodName = boMethod.replaceFirst(
							GET_METHOD_START, SET_METHOD_START);
					//modify:zhangzhanlin  modifyDate:2007-12-24. 
					String botype = boMethods[j].getReturnType().getName();	
					//modify:zhangzhanlin  end.
					// 判断方法名是否在map中存在
					if (voSetMethodMap.containsKey(voSetMethodName)) {
						Method voSetMethod = (Method) voSetMethodMap
								.get(voSetMethodName);
						// 方法类型
						String methodType = voSetMethod.getParameterTypes()[0]
								.getName();
						// 时间类型转换
						if (methodType.endsWith("Calendar")) {
							//modify:zhangzhanlin  modifyDate:2007-12-24.							
							if(botype.endsWith("Calendar")){
								continue;
							}
							//modify:zhangzhanlin  end.							
							Calendar timeType = DateUtils
									.convSqlTimestampToUtilCalendar((Timestamp) boMethods[j]
											.invoke(bo, new Object[] {}));
							// 给bo中set的方法赋值
							voSetMethod.invoke(vo,
									new Object[] { timeType });
						} else {
							// 给vo中set的方法赋值
							Object[] boInvoke = { boMethods[j].invoke(bo,
									new Object[] {}) };
							if (null == boInvoke[0] || boInvoke.length <= 0) {
								continue;
							}
							if (methodType.endsWith("String")) {
								boInvoke[0] =  StringTool
								.trimNull((String) boInvoke[0]);
							}
							voSetMethod.invoke(vo, boInvoke);
						}
					}
				}
			}
		} catch (Exception e) {
				e.printStackTrace();
		}
	}

	/**
	 * voList转boList
	 * 
	 * @param voList
	 *            相同的VO
	 * @param boClazz
	 *            要生成的bo类 例：XtYhBO.class
	 * @return
	 */

	public static List voList2boList(List voList, Class boClazz) {
		List boList = new ArrayList();
		for (int i = 0; i < voList.size(); i++) {
			BaseValueObject vo = (BaseValueObject) voList.get(i);
			try {
				BasePersistentObject bo = (BasePersistentObject) Class
						.forName(boClazz.getName()).newInstance();
				// 调用vo2bo方法
				vo2bo(vo, bo);
				boList.add(bo);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return boList;
	}
	
	/**
	 * boList转voList
	 * 
	 * @param boList
	 *            相同的bo
	 * @param voClazz
	 *            要生成的vo类 例：XtYhVO.class
	 * @return
	 */
	public static List boList2voList(List boList, Class voClazz) {
		List voList = new ArrayList();
		for (int i = 0; i < boList.size(); i++) {
			BasePersistentObject bo = (BasePersistentObject) boList.get(i);
			try {
				BaseValueObject vo = (BaseValueObject) Class
						.forName(voClazz.getName()).newInstance();
				// 调用bo2vo方法
				bo2vo(bo, vo);
				voList.add(vo);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return voList;
	}
}