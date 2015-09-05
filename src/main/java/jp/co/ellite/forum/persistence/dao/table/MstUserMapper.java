package jp.co.ellite.forum.persistence.dao.table;

import jp.co.ellite.forum.persistence.dto.table.MstUser;

public interface MstUserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(MstUser record);

    int insertSelective(MstUser record);

    MstUser selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(MstUser record);

    int updateByPrimaryKey(MstUser record);
}