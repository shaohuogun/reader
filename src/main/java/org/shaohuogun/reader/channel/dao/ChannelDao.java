package org.shaohuogun.reader.channel.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

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

	public void update(Channel channel) {
		sqlSession.update("org.shaohuogun.reader.channel.dao.ChannelMapper.update", channel);
	}

	public Channel selectByPickingStatus(String pickingStatus) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.selectByPickingStatus", pickingStatus);
	}

	public Channel selectByPickingBatchNo(String pickingBatchNo) {
		return sqlSession.selectOne("org.shaohuogun.reader.channel.dao.ChannelMapper.selectByPickingBatchNo", pickingBatchNo);
	}

}
