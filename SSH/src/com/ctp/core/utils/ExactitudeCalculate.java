package com.ctp.core.utils;
import java.math.BigDecimal;


public final class ExactitudeCalculate {

    /**
     * 计算的精度，即保留小数点后几位
     */
    private final static int DotNum = 10;

    /**
     * 对传入的参数进行四舍五入
     * @param value
     * @param dotNum 保留几位小数
     * @return 经试验，value为0时，将返回0.0
     */
    public static double round(double value, int dotNum) {
        if (Double.isNaN(value)) { // 不是数的数
            return 0;
        }
        BigDecimal bigValue = new BigDecimal(Double.toString(value));
        BigDecimal bigTemp = new BigDecimal("1");
        return bigValue.divide(bigTemp, dotNum, BigDecimal.ROUND_HALF_UP)
                .doubleValue();
    }

    /**
     * 对传入的参数进行四舍五入，保留两位小数
     * @param value
     * @return 经试验，value为0时，将返回0.0
     */
    public static double round(double value) {
        if (Double.isNaN(value)) { // 不是数的数
            return 0;
        }
        BigDecimal bigValue = new BigDecimal(Double.toString(value));
        BigDecimal bigTemp = new BigDecimal("1");
        return bigValue.divide(bigTemp, 2, BigDecimal.ROUND_HALF_UP)
                .doubleValue();
    }

    /**
     * 多个数相加减的精确计算方法<br>
     * 当多个数相加减时，则把这些数作为doble数组的一个个元素 如：<br>
     * 加数为a，减数为b时，则减数前的负号应该保留，如a-b+c-d，则应写成new double[]{a,-b,c,-d}
     * @param num doble数组
     * @return 返回精确计算的结果
     * @version 1.0
     */
    public static double addMany(double[] num) {
        BigDecimal retBig = new BigDecimal("0");
        BigDecimal addBig = null;
        for (int i = 0; i < num.length; i++) {
            addBig = new BigDecimal(Double.toString(num[i]));
            retBig = retBig.add(addBig);
        }
        return retBig.doubleValue();
    }

    /**
     * 两数相乘的精确计算方法<br>
     * @param v1 乘数
     * @param v2 被乘数
     * @param dotNum 计算精度，保留几位小数；当结果到百万时，为了精确到“分”，那么精度就必须要八位小数
     * @return 返回的结果
     * @version 1.0
     */
    public static double mul(double v1, double v2, int dotNum) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        BigDecimal b3 = b1.multiply(b2);
        BigDecimal temp = new BigDecimal("1");
        return b3.divide(temp, dotNum, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    /**
     * 两数相乘的精确计算方法<br>
     * 保留10位小数一般情况下满足要求，这里提供此方法方便使用
     * @param v1 乘数
     * @param v2 被乘数
     * @return 返回的结果
     * @version 1.0
     */
    public static double mul(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        BigDecimal b3 = b1.multiply(b2);
        BigDecimal temp = new BigDecimal("1");
        // 保留10位小数，这里曾经出现过精度不够的错误
        // 当相乘的一个数上百万时，为了精确到“分”，那么精度就必须要八位小数
        return b3.divide(temp, DotNum, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    /**
     * 两数相除的精确计算方法<br>
     * @param v1 被除数
     * @param v2 除数
     * @param v3 计算精度，保留几位小数；当结果到百万时，为了精确到“分”，那么精度就必须要八位小数
     * @return 返回的结果
     * @version 1.0
     */
    public static double divide(double v1, double v2, int v3) {
        BigDecimal a1 = new BigDecimal(Double.toString(v1));
        BigDecimal a2 = new BigDecimal(Double.toString(v2));
        return a1.divide(a2, v3, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    /**
     * 两数相除的精确计算方法，保留10位小数<br>
     * 保留10位小数一般情况下满足要求，这里提供此方法方便使用
     * @param v1 被除数
     * @param v2 除数
     * @return 返回的结果
     * @version 1.0
     */
    public static double divide(double v1, double v2) {
        BigDecimal a1 = new BigDecimal(Double.toString(v1));
        BigDecimal a2 = new BigDecimal(Double.toString(v2));
        return a1.divide(a2, DotNum, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
 
}