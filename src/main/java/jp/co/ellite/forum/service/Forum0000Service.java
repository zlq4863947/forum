package jp.co.ellite.forum.service;

import javax.servlet.http.HttpServletRequest;

import jp.co.ellite.forum.exception.BusinessLogicException;

public interface Forum0000Service {

    /**
     * ログインチェックを行う
     * @param userAlias
     * @param request
     * @return
     * @throws BusinessLogicException
     */
    boolean loginCheck(String userAlias, HttpServletRequest request) throws BusinessLogicException;
}
