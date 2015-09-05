package jp.co.ellite.forum.service.impl;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import jp.co.ellite.forum.exception.BusinessLogicException;
import jp.co.ellite.forum.log.TrailLog;
import jp.co.ellite.forum.service.Forum0000Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Forum0000ServiceImpl implements Forum0000Service {

//    @Autowired
//    private IdmsMessageSourceAccessor msgAccessor;
//
//    @Autowired
//    private ExtMstUserMapper extMstUserMapper;

    @Override
    public boolean loginCheck(String userAlias, HttpServletRequest request) throws BusinessLogicException {
//
//        User loginUser = extMstUserMapper.getUserInfoByAliasForLogin(userAlias);
//
//        if (loginUser == null) {
//            throw new BusinessLogicException(ErrorCodeConstants.E1001, msgAccessor.getMessage(ErrorCodeConstants.E1001));
//        }
//
//        request.getSession().setAttribute("userId", loginUser.getUserId());
//        request.getSession().setAttribute("userAlias", loginUser.getUserAlias());
//        request.getSession().setAttribute("employeeNo", loginUser.getEmployeeNo());
//        request.getSession().setAttribute("userName", loginUser.getUserName());
//        request.getSession().setAttribute("organizationCd", loginUser.getOrganizationCd());
//        request.getSession().setAttribute("organizationName", loginUser.getOrganizationName());
//        request.getSession().setAttribute("contractCd", loginUser.getContractCd());
//        request.getSession().setAttribute("contractName", loginUser.getContractName());
//        request.getSession().setAttribute("officeCd", loginUser.getOfficeCd());
//        request.getSession().setAttribute("officeName", loginUser.getOfficeName());
//
//        // IPアドレス
//        // String remoteAddress = request.getRemoteAddr();
//        String remoteAddress = getClientIPAddress(request);
//
//        request.getSession().setAttribute("remoteAddress", remoteAddress);
//
//        try {
//            InetAddress inetAddress = InetAddress.getByName(remoteAddress);
//            // パソコン名
//            String computerName = inetAddress.getHostName();
//            if (computerName.equalsIgnoreCase("localhost")) {
//                computerName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
//            }
//
//            request.getSession().setAttribute("computerName", computerName);
//
//        } catch (UnknownHostException e) {
//
//        }
//
//        TrailLog.log(request, "ログイン");

        return true;

    }

    private String getClientIPAddress(HttpServletRequest request) {

        // Due Apache redirection, the real client ip-address will be in this
        // header value
        String ipAddress = request.getHeader("X-FORWARDED-FOR");

        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        if (ipAddress.contains(",")) {
            ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
        }

        return ipAddress;
    }
}
