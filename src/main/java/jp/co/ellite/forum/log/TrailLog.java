package jp.co.ellite.forum.log;

import javax.servlet.http.HttpServletRequest;

import jp.co.ellite.forum.common.ForumConstants;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.MDC;
import org.apache.log4j.net.SyslogAppender;

public class TrailLog {
    private static Logger logger = Logger.getLogger(ForumConstants.LOGGER_TRAIL);
    
    private static class TrailLevel extends Level {
        private static final long serialVersionUID = 1076913470822079835L;

        private TrailLevel(int level, String name, int sysLogLevel) {
            super(level, name, sysLogLevel);
        }
    }

    private static final Level TRAIL_LOG_LEVEL = new TrailLevel(20050, "TRAIL", SyslogAppender.LOG_LOCAL0);

    public static void log(HttpServletRequest request, Object message) {

        String userAlias = (String) request.getSession().getAttribute("userAlias");
        String employeeNo = (String) request.getSession().getAttribute("employeeNo");
        String userName = (String) request.getSession().getAttribute("userName");
        String remoteAddress = (String) request.getSession().getAttribute("remoteAddress");
        String computerName = (String) request.getSession().getAttribute("computerName");
        
        String url = request.getRequestURI().substring(request.getContextPath().length()+1);

        String menuId = "";
        if (StringUtils.isNotBlank(url) && url.indexOf("/") > 0) {
            menuId = url.substring(0, url.indexOf("/"));
        }

        MDC.put("type", "00");
        MDC.put("userAlias", userAlias);
        MDC.put("employeeNo", employeeNo);
        MDC.put("userName", userName);
        MDC.put("ipAddress", remoteAddress);
        MDC.put("remoteHostName", computerName);
        MDC.put("content", message);
        MDC.put("menuId",menuId);
        logger.log(TRAIL_LOG_LEVEL, message);
    }

    public static void psnlLog(Object message) {
        //psnlLogger.log(TRAIL_LOG_LEVEL, message);
        
        MDC.put("type", "01");
        logger.log(TRAIL_LOG_LEVEL, message);
    }

    public static void folderLog(Object message) {
        //folderLogger.log(TRAIL_LOG_LEVEL, message);
        
        MDC.put("type", "02");
        logger.log(TRAIL_LOG_LEVEL, message);
    }

    public static void privilegeLog(Object message) {
        //privilegeLogger.log(TRAIL_LOG_LEVEL, message);
        
        MDC.put("type", "03");
        logger.log(TRAIL_LOG_LEVEL, message);
    }
}
