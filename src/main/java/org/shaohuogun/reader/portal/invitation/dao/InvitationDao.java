package org.shaohuogun.reader.portal.invitation.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.shaohuogun.common.Entity;
import org.shaohuogun.reader.portal.invitation.model.Invitation;
import org.springframework.stereotype.Component;

@Component
public class InvitationDao {

	private final SqlSession sqlSession;

	public InvitationDao(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public void insert(Invitation invitation) {
		sqlSession.insert("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.insert", invitation);
	}

	public void update(Invitation invitation) {
		sqlSession.update("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.update", invitation);
	}

	public Invitation selectById(String id) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.selectById", id);
	}

	public List<Invitation> selectByAddressee(String addressee) {
		return sqlSession.selectList("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.selectByAddressee", addressee);
	}
	
	public int countByStatus(String status) {
		return sqlSession.selectOne("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.countByStatus", status);
	}

	public List<Entity> selectByStatus(String status, int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.selectByStatus",
				status, rowBounds);
	}

	public List<Invitation> selectForSending(int offset, int limit) {
		RowBounds rowBounds = new RowBounds(offset, limit);
		return sqlSession.selectList("org.shaohuogun.reader.portal.invitation.dao.InvitationMapper.selectForSending",
				Invitation.STATUS_INITIAL, rowBounds);
	}

}
