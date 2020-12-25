package com.ctp.core.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.orm.hibernate4.SessionFactoryUtils;
import org.springframework.stereotype.Repository;


/**
 * @author
 */
@Repository
public class BaseDao<T> {

	// protected Class<T> entityClazz;

	protected SessionFactory sessionFactory;
	private Class entityClazz;

	@SuppressWarnings("unchecked")
	public BaseDao() {
		Type type = getClass().getGenericSuperclass();
		if (type instanceof ParameterizedType) {
			this.entityClazz = (Class<T>) ((ParameterizedType) type).getActualTypeArguments()[0];
		} else {
			this.entityClazz = null;
		}
	}

	@Resource
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public Object save(Object entity) {
		return getSession().save(entity);
	}

	public void delete(Object entity) {

		getSession().delete(entity);
	}

	public void update(Object entity) {

		getSession().update(entity);
	}

	public int executeSql(String sql) {
		return getSession().createSQLQuery(sql).executeUpdate();
	}

	public int executeSql(String sql, List<Object> params) {
		Query query = getSession().createSQLQuery(sql);
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i, params.get(i));
		}
		return query.executeUpdate();
	}

	public void excuteSql(ArrayList sqlList) throws Exception {
		Connection conn =  SessionFactoryUtils.getDataSource(sessionFactory).getConnection();
		conn.setAutoCommit(false);
		Statement  st = (Statement) conn.createStatement();
		for (int i = 0; i < sqlList.size(); i++) {
			System.out.println("==========sqlList=========="+sqlList.get(i));
			st.addBatch((String) sqlList.get(i));
			if (i % 100 == 0) {
				System.out.println("==========sqlList=========="+i);
				st.executeBatch();
				//conn.commit();
				st.clearBatch();
			}
		}
		st.executeBatch();
		conn.commit();
	}



	public List findBySQL(String sql, ArrayList params, Class clazz) {
		Query query = this.getSession().createSQLQuery(sql);
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i, params.get(i));

		}
		return query.setResultTransformer(Transformers.aliasToBean(clazz)).list();
	}

	public List findBySQL(final String sql, ArrayList params, Class clazz, final Integer from, final Integer pageSize) {
		Query query = this.getSession().createSQLQuery(sql).setFirstResult(from).setMaxResults(pageSize);
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i, params.get(i));
		}
		return query.setResultTransformer(Transformers.aliasToBean(clazz)).list();
	}

	public List findBySQL(String sql, Class clazz) {
		Query query = this.getSession().createSQLQuery(sql);
		return query.setResultTransformer(Transformers.aliasToBean(clazz)).list();
	}

	public List findBySQL(String sql, ArrayList params) {
		Query query = this.getSession().createSQLQuery(sql);
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i, params.get(i));

		}
		return query.list();
	}

	public int queryCount(String sql, ArrayList params) {
		Query query = this.getSession().createSQLQuery(sql);
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i, params.get(i));

		}
		return Integer.parseInt(query.list().get(0).toString());
	}

	@SuppressWarnings("unchecked")
	public T get(Class<T> t, Serializable key) {

		T obj = (T) getSession().get(t, key);

		return obj;
	}
	
}