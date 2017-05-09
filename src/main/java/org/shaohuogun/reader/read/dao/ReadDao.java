package org.shaohuogun.reader.read.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.read.model.ReadingList;
import org.shaohuogun.reader.read.model.ReadingListItem;
import org.springframework.stereotype.Component;

@Component
public class ReadDao {

	private final SqlSession sqlSession;

	public ReadDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insertList(ReadingList list) {
		sqlSession.insert("org.shaohuogun.reader.read.dao.ReadMapper.insertList", list);
	}

	public ReadingList selectListById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.selectListById", id);
	}

	public int countListByCreator(String creator) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.countListByCreator", creator);
	}

	public List<Model> selectListsByCreator(String creator, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.read.dao.ReadMapper.selectListsByCreator", creator,
				rowBounds);
	}

	public void updateList(ReadingList list) {
		sqlSession.update("org.shaohuogun.reader.read.dao.ReadMapper.updateList", list);
	}

	public void insertListItem(ReadingListItem listItem) {
		sqlSession.insert("org.shaohuogun.reader.read.dao.ReadMapper.insertListItem", listItem);
	}

	public ReadingListItem selectListItemById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.selectListItemById", id);
	}

	public int countListItemByCreator(String creator, String listId) {
		return sqlSession.selectOne("org.shaohuogun.reader.read.dao.ReadMapper.countListItemByCreator", creator);
	}

	public List<Model> selectListItemsByCreator(String creator, String listId, int offset, int limit) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put(Model.FIELD_CREATOR, creator);
		paramMap.put(ReadingListItem.FIELD_LIST_ID, listId);
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.read.dao.ReadMapper.selectListItemsByCreator", paramMap,
				rowBounds);
	}

	public void updateListItem(ReadingListItem listItem) {
		sqlSession.update("org.shaohuogun.reader.read.dao.ReadMapper.updateListItem", listItem);
	}

}
