package jp.co.ellite.forum.common.filter;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.ellite.forum.common.ForumConstants;
import jp.co.ellite.forum.exception.BusinessLogicException;
import jp.co.ellite.forum.service.Forum0000Service;
import jp.co.ellite.forum.util.CommonUtil;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class SessionTimeoutInterceptor implements HandlerInterceptor {

    Logger logger = LoggerFactory.getLogger(ForumConstants.LOGGER_COMMON);

    @Autowired
    private Forum0000Service Forum0000Service;

    private List<String> excludeUrls;

    public void setExcludeUrls(List<String> excludeUrls) {
        this.excludeUrls = excludeUrls;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestUrl = request.getRequestURI();
        for (String url : excludeUrls) {
            if (requestUrl.endsWith(url)) {
                return true;
            }
        }

        String contextPath = request.getContextPath();

        if (request.getSession().getAttribute("userAlias") == null) {

            String remoteUser = request.getRemoteUser();
            if (StringUtils.isBlank(remoteUser)) {

                if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
                    response.setHeader("sessionstatus", "timeout");
                    return false;
                } else if (request.getHeader("content-type") != null && request.getHeader("content-type").contains("multipart/form-data")) {
                    response.setHeader("sessionstatus", "timeout");
                    return false;
                } else {
                    response.sendRedirect(contextPath + "/Forum0000/timeout.htm");
                    return false;
                }

            } else {

                // ログインチェックを行う

                String userAlias = remoteUser.split("@")[0];

                try {
                    boolean result = Forum0000Service.loginCheck(userAlias, request);
                    if (result) {
                        response.sendRedirect(contextPath + "/");
                        return true;
                    } else {
                        response.sendRedirect(contextPath + "/Forum0000/logindeny.htm");
                        return false;
                    }

                } catch (BusinessLogicException e) {
                    response.sendRedirect(contextPath + "/Forum0000/logindeny.htm");
                    return false;
                } catch (Exception e) {
                    logger.error(ForumConstants.LOGGER_ERROR_MSG + CommonUtil.getStackTraceFromException(e));
                    throw e;
                }
            }

        }

        // 画面のアクセス権限チェックを行う
        // メニュー画面とinbox画面を除外
        if (contextPath.equals(requestUrl) || (contextPath + "/").equals(requestUrl) || (contextPath + "/index.htm").equals(requestUrl) || (contextPath + "/MyInbox.htm").equals(requestUrl)) {

            if ((contextPath + "/index.htm").equals(requestUrl)) {
                response.sendRedirect(contextPath + "/");
            }

            return true;
        } else {
            try {
                // ユーザID
                String userId = (String) request.getSession().getAttribute("userId");
                boolean checkResult = true;// = Forum0001Service.isAccessibleOfMenu(userId, requestUrl);

                if (!checkResult) {

                    if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
                        response.setHeader("sessionstatus", "accessdeny");
                        return false;
                    } else {
                        response.sendRedirect(contextPath + "/Forum0000/accessdeny.htm");
                        return false;
                    }

                }
            } catch (Exception e) {
                logger.error(ForumConstants.LOGGER_ERROR_MSG + CommonUtil.getStackTraceFromException(e));
                throw e;
            }

        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 何もしない

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 何もしない
    }

}
