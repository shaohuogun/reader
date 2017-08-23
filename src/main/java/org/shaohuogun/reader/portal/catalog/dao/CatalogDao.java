package org.shaohuogun.reader.portal.catalog.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.portal.catalog.model.Catalog;

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

	public int countByCreator(String creator) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.countByCreator", creator);
	}

	public List<Model> selectByCreator(String creator, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.selectByCreator", creator,
				rowBounds);
	}

	public void update(Catalog catalog) {
		sqlSession.update("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.update", catalog);
	}

	public Catalog selectByStatus(String status) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.selectByStatus", status);
	}

	public Catalog selectBySerialNumber(String serialNumber) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.catalog.dao.CatalogMapper.selectBySerialNumber",
				serialNumber);
	}

}
