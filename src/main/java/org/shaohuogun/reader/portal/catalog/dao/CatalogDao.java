package org.shaohuogun.reader.portal.catalog.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.reader.portal.catalog.model.Catalog;
import org.springframework.stereotype.Component;

@Component
public class CatalogDao {

	private final SqlSession sqlSession;

	public CatalogDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Catalog catalog) {
		sqlSession.insert("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.insert", catalog);
	}

	public Catalog selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.selectById", id);
	}

	public List<Catalog> selectByCreator(String creator) {
		return sqlSession.selectList("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.selectByCreator", creator);
	}

	public void update(Catalog catalog) {
		sqlSession.update("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.update", catalog);
	}

}
