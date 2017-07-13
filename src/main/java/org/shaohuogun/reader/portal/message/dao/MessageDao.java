package org.shaohuogun.reader.portal.message.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Model;
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

	public int countByChannelId(String channelId) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.countByChannelId", channelId);
	}

	public List<Model> selectByChannelId(String channelId, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByChannelId", channelId,
				rowBounds);
	}

	public void update(Message message) {
		sqlSession.update("org.shaohuogun.reader.portal.message.dao.MessageMapper.update", message);
	}

	public Message selectByPickingStatus(String pickingStatus) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByPickingStatus", pickingStatus);
	}

	public Message selectByPickingBatchNo(String pickingBatchNo) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.message.dao.MessageMapper.selectByPickingBatchNo", pickingBatchNo);
	}
}