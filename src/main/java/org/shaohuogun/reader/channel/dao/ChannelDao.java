package org.shaohuogun.reader.channel.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;
import org.shaohuogun.common.Model;
import org.shaohuogun.reader.channel.model.Channel;

@Component
public class ChannelDao {

	private final SqlSession sqlSession;

	public ChannelDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Channel channel) {
		sqlSession.insert("org.shaohuogun.reader.channel.dao.ChannelMapper.insert", channel);
	}

	public Channel selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.selectById", id);
	}

	public int countByCreator(String creator) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.countByCreator", creator);
	}

	public List<Model> selectByCreator(String creator, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.channel.dao.ChannelMapper.selectByCreator", creator,
				rowBounds);
	}

	public void update(Channel channel) {
		sqlSession.update("org.shaohuogun.reader.channel.dao.ChannelMapper.update", channel);
	}

	public Channel selectByPickingStatus(String pickingStatus) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.selectByPickingStatus",
				pickingStatus);
	}

	public Channel selectByPickingBatchNo(String pickingBatchNo) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.selectByPickingBatchNo",
				pickingBatchNo);
	}

}
