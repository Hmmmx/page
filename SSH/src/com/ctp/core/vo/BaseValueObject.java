package com.ctp.core.vo;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;


public abstract class BaseValueObject implements Serializable{

  public String toString(){
    Method[] methods=this.getClass().getMethods();
    StringBuffer ret=new StringBuffer(super.toString());
    ret.append(" = {\r\n");
    try{
      for(int i=0;i<methods.length;i++){
        String methodName=methods[i].getName();
        if(methodName.startsWith("get")){ 
   
          if(methodName.equals("getClass")
             ||methods[i].getParameterTypes().length>0){
            continue;
          }

          String tmp=methodName.trim().substring(3);
          tmp=tmp.substring(0,1).toLowerCase()+tmp.substring(1);
          ret.append("\t").append(tmp).append(" = ").
              append(methods[i].invoke(this,null)).append("\r\n");
        }
      }
    } catch(Exception ex){
    }

    ret.append("}\r\n");
    return ret.toString();
  }

  public boolean equals(Object obj){
    if(obj==null){
      return false;
    }
    if(this==obj){
      return true;
    }
    if(!obj.getClass().equals(getClass())){
      return false;
    }

    Method[] methods=this.getClass().getMethods();
    Field[] fields=this.getClass().getFields();
    boolean flag=true;
    try{
      for(int i=0;flag&&i<methods.length;i++){
        String methodName=methods[i].getName();
        if(methodName.startsWith("get")){ 
          if(methodName.equals("getClass")||
             methods[i].getParameterTypes().length>0){
            continue;
          }
          String tmp=methodName.trim().substring(3);
          flag=(methods[i].invoke(this,null)).equals(methods[i].invoke(obj,null));
        }
      }
      for(int i=0;flag&&i<fields.length;i++){
        flag = fields[i].get(this).equals(fields[i].get(obj));
      }
    } catch(Exception ex){
    }
    return flag;
  }
 
  public HashMap toHashmap(){
    HashMap hashMap = new HashMap();
    Method[] methods=this.getClass().getMethods();
    Field[] fields=this.getClass().getFields();
    boolean flag=true;
    try{
      for(int i=0;flag&&i<methods.length;i++){
        String methodName=methods[i].getName();
        if(methodName.startsWith("get")){ 
          if(methodName.equals("getClass")||
             methods[i].getParameterTypes().length>0){
            continue;
          }
          String tmp=methodName.trim().substring(3).toLowerCase();
          Object obj =methods[i].invoke(this,null);
          hashMap.put(tmp,obj);
        }
      }

      for(int i=0;flag&&i<fields.length;i++){
        String tmp = fields[i].getName().toLowerCase();
        Object obj = fields[i].get(this);
        hashMap.put(tmp,obj);
      }
    } catch(Exception ex){
    }
    return hashMap;
  }

}