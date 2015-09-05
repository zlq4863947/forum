package jp.co.ellite.forum.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jp.co.ellite.forum.common.ForumConstants;

import org.apache.commons.lang.StringUtils;

import com.opencsv.CSVWriter;

public class CommonUtil {

    /**
     * メールアドレスを生成する
     *
     * @param userAlias
     *            ユーザエイリアス
     * @param domainName
     *            ドメイン名
     * @return メールアドレス
     */
    public static String makeMailAddress(String userAlias, String domainName) {
        return userAlias + "@" + domainName;
    }

    /**
     * Domain 初期パスワード設定 (例:userAlias:abc password:!cba0000)
     *
     * @param userAlias
     *            ユーザエイリアス
     * @return メールアドレスのパスワード
     */
    public static String makeADServerPassword(String userAlias) {
        /*
         * if (userAlias.length() > 5) {
         * return userAlias + "0";
         * } else {
         * return StringUtils.rightPad(userAlias, 6, "0");
         * }
         */
        if (userAlias == null || userAlias.length() == 0) {
            return "!0000000";
        }

        StringBuilder strBuild = new StringBuilder("!");
        for (int i = userAlias.length() - 1; i >= 0; i--) {
            char c = userAlias.charAt(i);
            strBuild.append(c);
        }

        String password = strBuild.toString();

        if (password.length() >= 7) {

            return password + "0";
        } else {

            password = password + "00000000";
            return password.substring(0, 8);
        }
    }

    /**
     * 空文字列をチェックする
     *
     * @param value
     *            　文字列
     * @return　空文字列の場合：false
     *         でない場合：true
     */
    public static boolean isNotBlank(String value) {
        if (value == null || "".equals(value.trim()) || "null".equals(value.trim())) {
            return false;
        }
        return true;
    }

    public static String replaceNullToEmptyString(String value) {
        return isNotBlank(value) ? value : "";
    }

    /**
     * 日付けを調整する
     *
     * @param date
     *            　調整する日付け
     * @param adjustmentNum
     *            　調整数（1：一日を増加する；-2:二日を減少する）
     * @return　調整した日付け
     */
    public static Date adjustDate(Date date, int adjustmentNum) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, adjustmentNum);
        return calendar.getTime();
    }

    public static String formatterDate(Date date, String pattern) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

  /*  public static User getLoginUser(HttpServletRequest request) {
        User loginUser = new User();

        loginUser.setUserId((String) request.getSession().getAttribute("userId"));
        loginUser.setUserAlias((String) request.getSession().getAttribute("userAlias"));
        loginUser.setEmployeeNo((String) request.getSession().getAttribute("employeeNo"));
        loginUser.setUserName((String) request.getSession().getAttribute("userName"));
        loginUser.setOrganizationCd((String) request.getSession().getAttribute("organizationCd"));
        loginUser.setOrganizationName((String) request.getSession().getAttribute("organizationName"));
        loginUser.setContractCd((String) request.getSession().getAttribute("contractCd"));
        loginUser.setContractName((String) request.getSession().getAttribute("contractName"));
        loginUser.setOfficeCd((String) request.getSession().getAttribute("officeCd"));
        loginUser.setOfficeName((String) request.getSession().getAttribute("officeName"));

        return loginUser;
    }*/

    /**
     *
     * @return
     * @throws SystemException
     * @throws ParseException
     */
    /*public static Date getCurrentDate() throws SystemException {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = sdf.format(date);
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            // システムエラーとする
            throw new SystemException(ErrorCodeConstants.E9999, e);
        }

    }*/

    /**
     * 現在日付と時刻を取得する
     *
     * @return　現在日付と時刻
     * @throws ParseException
     */
    public static String getCurrentDateWithTimeToStr() throws ParseException {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }

    /**
     * 現在日付と時刻を取得する
     *
     * @return　現在日付と時刻
     * @throws SystemException
     * @throws ParseException
     */
    /*public static Date getCurrentDateWithTime() throws SystemException {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateStr = sdf.format(date);
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            // システムエラーとする
            throw new SystemException(ErrorCodeConstants.E9999, e);
        }
    }

    public static Date parseDate(String dateStr, String pattern) throws SystemException {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        try {
            return sdf.parse(dateStr);
        } catch (ParseException e) {
            // システムエラーとする
            throw new SystemException(ErrorCodeConstants.E9999, e);
        }
    }*/

    /**
     * 日付の有効性チィック
     *
     * @param date
     *            日付
     * @return
     */
    public static boolean isValidDate(String date) {
        if (date == null)
            return false;
        SimpleDateFormat dateFormat = new SimpleDateFormat(ForumConstants.DATE_FORMAT_YYYYMMDD);
        if (date.trim().length() != dateFormat.toPattern().length())
            return false;
        dateFormat.setLenient(false);
        try {
            dateFormat.parse(date.trim());
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public static void download(HttpServletRequest request, HttpServletResponse response, String filepath) throws IOException {
        String userAgent = request.getHeader("User-Agent");

        response.setCharacterEncoding("utf-8");
        response.setContentType("application/x-download;charset=UTF-8");
        String fileName = filepath.substring(filepath.lastIndexOf(File.separator) + 1);
        String fileOutName = "";

        // 针对IE或者以IE为内核的浏览器：
        if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
            fileOutName = java.net.URLEncoder.encode(fileName, "UTF-8");
        } else {
            // 非IE浏览器的处理：
            fileOutName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        }

        response.setHeader("Content-disposition", "attachment;filename=\"" + fileOutName + "\"");
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filepath));
        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
        byte[] buff = new byte[2048];
        int bytesRead;
        while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
            bos.write(buff, 0, bytesRead);
        }

        bis.close();
        bos.close();
    }

    /**
     * 例外の詳細内容を取得する
     *
     * @param e
     * @return
     */
    public static String getStackTraceFromException(Exception e) {
        try {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            return "\r\n" + sw.toString() + "\r\n";
        } catch (Exception e2) {
            return e.getMessage();
        }
    }

    /**
     * 文字列はspace(全角、半角)をtrimする<br>
     * (氏名検索時、氏名のspaceのtrim用)
     * 
     * @param src
     * @return
     */
    public static String trimSpace(String src) {
        if (StringUtils.isBlank(src)) {
            return "";
        }

        src = StringUtils.trim(src);

        if (StringUtils.isBlank(src)) {
            return "";
        }

        return src.replaceAll(" ", "").replaceAll("　", "");

    }

    /**
     * CSV出力
     * 
     * @param response
     * @param csvList
     *            CSV出力用データ
     * @param csvName
     *            　CSV名
     * @throws Exception
     */
    public static void outputCSV(HttpServletResponse response, List<String[]> csvList, String csvName) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(baos, "utf-8");
        byte bHeader[] = { (byte) 0xEF, (byte) 0xBB, (byte) 0xBF };
        osw.write(new String(bHeader));
        CSVWriter csvWriter = new CSVWriter(osw);
        csvWriter.writeAll(csvList);
        csvWriter.close();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachment; filename=" + csvName);
        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
        bos.write(baos.toByteArray());
        bos.close();
        baos.close();
    }

    /**
     * dotNet用NASフラグを設定<br>
     * NASフラグについて<br>
     * Forum側で、Window File Server:0;NAS File Server:1<br>
     * 中継サーバ側で、Window File Server:1;NAS File Server:0<br>
     * 
     * @param nasFlag
     * @return
     */
    public static String resetNasFlagForDotNet(String nasFlag) {
        if ("1".equals(nasFlag)) {
            return "0";
        } else {
            return "1";
        }
    }
    
    /**
     * 指定した文字列が半角数値のみか判断する
     *
     * @param source
     *            対象文字列
     * @return trueなら半角数値のみ 空の場合は常にtrueとなる
     */
    public static boolean isNumeric(String source) {
        if (StringUtils.isBlank(source)) {
            return true;
        }

        source = StringUtils.trimToEmpty(source);

        String regText = "^^[0-9]*$";
        Pattern pattern = Pattern.compile(regText);
        return pattern.matcher(source).matches();
    }

    /**
     * 指定した文字列が半角英数字のみか判断する
     *
     * @param source
     *            対象文字列
     * @return trueなら半角英数字のみ 空の場合は常にtrueとなる
     */
    public static boolean isAlphaNumeric(String source) {
        if (StringUtils.isBlank(source)) {
            return true;
        }

        source = StringUtils.trimToEmpty(source);

        String regText = "^[a-zA-Z0-9.-_]+$";
        Pattern pattern = Pattern.compile(regText);
        return pattern.matcher(source).matches();
    }

    /**
     * 指定した文字列が半角文字のみか判断する
     *
     * @param source
     *            対象文字列
     * @return trueなら半角文字のみ 空の場合は常にtrueとなる
     */
    public boolean isHankaku(String source) {
        if (StringUtils.isBlank(source)) {
            return true;
        }

        source = StringUtils.trimToEmpty(source);

        String regText = "[ -~｡-ﾟ]+";
        Pattern pattern = Pattern.compile(regText);
        return pattern.matcher(source).matches();
    }

    /**
     * 指定した文字列が全角文字のみか判断する
     *
     * @param source
     *            対象文字列
     * @return trueなら全角文字のみ 空の場合は常にtrueとなる
     */
    public static boolean isZenkaku(String source) {
        if (StringUtils.isBlank(source)) {
            return true;
        }

        source = StringUtils.trimToEmpty(source);

        String regText = "[^ -~｡-ﾟ]+";
        Pattern pattern = Pattern.compile(regText);
        return pattern.matcher(source).matches();
    }
}
