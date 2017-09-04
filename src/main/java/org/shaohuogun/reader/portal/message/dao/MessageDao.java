package org.shaohuogun.reader.portal.message.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Entity;
import org.shaohuogun.reader.portal.PortalConstants;
import org.shaohuogun.reader.portal.message.model.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageDao {

	private final SqlSession sqlSession;

	public MessageDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Message message) {
		sqlSession.insert("org.shaohuogun.reader.portal.message.dao.MessageMapper.insert", message);
	}

	public List<Message> selectAll() {
		return sqlSession.selectList("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectAll");
	}

	public Message selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectById", id);
	}

	public Message selectByUrl(String url) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByUrl", url);
	}

	public int countByCategory(String categoryType, String categoryId) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put(PortalConstants.KEY_CATEGORY_TYPE, categoryType);
		paramMap.put(PortalConstants.KEY_CATEGORY_ID, categoryId);
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.countByCategory", paramMap);
	}

	public List<Entity> selectByCategory(String categoryType, String categoryId, int offset, int limit) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put(PortalConstants.KEY_CATEGORY_TYPE, categoryType);
		paramMap.put(PortalConstants.KEY_CATEGORY_ID, categoryId);
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByCategory",
				paramMap, rowBounds);
	}

	public void update(Message message) {
		sqlSession.update("org.shaohuogun.reader.portal.message.dao.MessageMapper.update", message);
	}

	public Message selectByStatus(String status) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByStatus", status);
	}

	public Message selectBySerialNumber(String serialNumber) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectBySerialNumber",
				serialNumber);
	}
}