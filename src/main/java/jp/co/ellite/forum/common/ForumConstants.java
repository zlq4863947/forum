package jp.co.ellite.forum.common;

public class ForumConstants {

    public static final String APPLICATION_NAME = "IDMS";
    /** ロガー： 一般用 */
    public static final String LOGGER_COMMON = "errorOutput";
    /** ロガー： 証跡用 */
    public static final String LOGGER_TRAIL = "trailOutput";
    /** ロガー： 人事同期理バッチ証跡用 */
    public static final String LOGGER_TRAIL_BATCH_PERSONNEL = "psnlTrailOutput";
    /** ロガー： フォッルダ同期処理バッチ証跡用 */
    public static final String LOGGER_TRAIL_BATCH_FOLDER = "folderTrailOutput";
    /** ロガー： 特権処理バッチ証跡用 */
    public static final String LOGGER_TRAIL_BATCH_PRIVILEGE = "privilegeTrailOutput";
    /** ロガー： エラーコード */
    public static final String LOGGER_ERROR_CD = "エラーコード：";
    /** ロガー： エラーメッセージ */
    public static final String LOGGER_ERROR_MSG = " エラーメッセージ：";

    /** 役職一般フラグ 1 YES */
    public static final String OFFICE_GENERAL_FLAG_YES = "1";

    /** 役職コード： 00 一般 */
    public static final String OFFICE_CD_COMMON = "00";

    /** 一般の役職名  */
    public static final String OFFICE_CD_COMMON_NAME = "  ";

    /** 契約形態コード： 01 役員 */
    public static final String CONTRACT_CD_YAKUIN = "01";
    /** 契約形態コード： 02 正社員 */
    public static final String CONTRACT_CD_SEISYAIN = "02";
    /** 契約形態コード： 03 出向受入 */
    public static final String CONTRACT_CD_SYUKKOUUKEIRE = "03";
    /** 契約形態コード： 04 契約社員 */
    public static final String CONTRACT_CD_KEIYAKUSYAIN = "04";
    /** 契約形態コード： 05 派遣社員(パート) */
    public static final String CONTRACT_CD_HAKENNSYAIN = "05";
    /** 契約形態コード： 06 委託業者 */
    public static final String CONTRACT_CD_ITAKUGYOUSYA = "06";
    /** 契約形態コード： 07 仲介業者 */
    public static final String CONTRACT_CD_TYUUKAIYOUSYA = "07";

    /** 組織コード： 000:SBI証券 */
    public static final String ORGANIZATION_CD_SBI = "000";

    /** 承認者区分： 1:組織内承認 */
    public static final String APPROVER_TYPE_ORGANIZATION = "1";
    /** 承認者区分： 2:役割承認 */
    public static final String APPROVER_TYPE_ROLE = "2";

    /** 登録者区分： 1:組織内登録 */
    public static final String REGISTRANT_TYPE_ORGANIZATION = "1";
    /** 登録者区分： 2:役割登録 */
    public static final String REGISTRANT_TYPE_ROLE = "2";
    /** 登録者区分： 3:自動連携 */
    public static final String REGISTRANT_TYPE_AUTO = "3";

    /** 代理フラグ：1 代理 */
    public static final String PROXY_FLAG_YES = "1";

    /** タスク完了フラグ： 1 完了 */
    public static final String TASK_COMPLETE_FLAG_YES = "1";

    /** 全員承認フラグ： 1 全員承認要 */
    public static final String ALL_APPROVAL_FLAG_YES = "1";

    /** 申請ステータス： 00:申請中 */
    public static final String APPLICATION_STATUS_APPLY_WAIT = "00";
    /** 申請ステータス： 10:組織承認待ち */
    public static final String APPLICATION_STATUS_ORG_APPROVAL_WAIT = "10";
    /** 申請ステータス： 20:役割承認待ち */
    public static final String APPLICATION_STATUS_ROLE_APPROVAL_WAIT = "20";
    /** 申請ステータス： 30:登録待ち */
    public static final String APPLICATION_STATUS_REGISTER_WAIT = "30";
    /** 申請ステータス： 40:自動連携待ち */
    public static final String APPLICATION_STATUS_AUTO_PROCESS_WAIT = "40";
    /** 申請ステータス： 50:完了 */
    public static final String APPLICATION_STATUS_COMPLETE = "50";
    /** 申請ステータス： 60:取消 */
    public static final String APPLICATION_STATUS_CANCEL = "60";
    /** 申請ステータス： 70:却下 */
    public static final String APPLICATION_STATUS_DISMISSAL = "70";
    /** 申請ステータス： 80:エラー */
    public static final String APPLICATION_STATUS_ERROR = "80";
    /** 申請ステータス： 90:中止 */
    public static final String APPLICATION_STATUS_TERMINATE = "90";

    /** 処理：01:申請 */
    public static final String OPERATION_CONTENT_APPLY = "01";
    /** 処理：02:削除 */
    public static final String OPERATION_CONTENT_DELETE = "02";
    /** 処理：03:承認 */
    public static final String OPERATION_CONTENT_APPROVAL = "03";
    /** 処理：04:却下 */
    public static final String OPERATION_CONTENT_DISMISSAL = "04";
    /** 処理：05:登録 */
    public static final String OPERATION_CONTENT_REGISTER = "05";
    /** 処理：06:差戻し */
    public static final String OPERATION_CONTENT_REMAND = "06";
    /** 処理：07:取消 */
    public static final String OPERATION_CONTENT_CANCEL = "07";
    /** 処理：08:中止 */
    public static final String OPERATION_CONTENT_TERMINATE = "08";
    
    /** システムコード： 1:Call Center System */
    public static final String SYSTEM_CD_CCS = "1";
    /** システムコード： 2:STAR-OT */
    public static final String SYSTEM_CD_STAR = "2";
    /** システムコード： 3:ECクライアント */
    public static final String SYSTEM_CD_EC = "3";
    /** システムコード： 4:ATMクライアント */
    public static final String SYSTEM_CD_ATM = "4";
    /** システムコード： 5 FLARE CNT */
    public static final String SYSTEM_CD_FLARE = "5";
    /** システムコード： 9 WAN */
    public static final String SYSTEM_CD_WAN = "9";
    /** システムコード： 11 NRIクリプト便 */
    public static final String SYSTEM_CD_NRI_CRYPTO = "11";
    /** システムコード： 12 SUN */
    public static final String SYSTEM_CD_SUN = "12";
    /** システムコード： 13 PORTAL（イントラネット） */
    public static final String SYSTEM_CD_PORTAL = "13";
    /** システムコード： 14 COMET CLIENT */
    public static final String SYSTEM_CD_COMET = "14";
    /** システムコード： 15 INDIGO */
    public static final String SYSTEM_CD_INDIGO = "15";
    /** システムコード： 16 トリトン（東証） */
    public static final String SYSTEM_CD_TRITON = "16";
    /** システムコード： 17 CRM（法人） */
    public static final String SYSTEM_CRM_CORPORATION = "17";
    /** システムコード：19 リスク数値モニタリング */
    public static final String SYSTEM_CD_RISK = "19";
    /** システムコード： 20:Web Access */
    public static final String SYSTEM_CD_WEB_ACCESS = "20";
    /** システムコード： 21:共有フォルダ */
    public static final String SYSTEM_CD_FOLDER = "21";
    /** システムコード： 22:共有メールボックス */
    public static final String SYSTEM_CD_MAILBOX = "22";
    /** システムコード： 23:メーリングリスト */
    public static final String SYSTEM_CD_MAILING_LIST = "23";
    /** システムコード： 24:ドメイン登録・削除 */
    public static final String SYSTEM_CD_DOMAIN = "24";
    /** システムコード： 50:退職 */
    public static final String SYSTEM_CD_RETIRE = "50";
    /** システム: 41 IFAポータル*/
    public static final String SYSTEM_IFA_PORTAL = "41";
    /** システム: 47 共有フォルダ(機密)*/
    public static final String SYSTEM_CD_FOLDER_SECRET = "47";
    /** システムコード： 51:個人フォルダ */
    public static final String SYSTEM_CD_PERSONAL_FOLDER = "51";

    /** システムカテゴリコード： 1 新規 */
    public static final String CATEGORY_CREATE = "1";
    /** システムカテゴリコード： 3 削除 */
    public static final String CATEGORY_DELETE = "3";

    /** 申請可否設定フラグ： 1:申請可能 */
    public static final String APPLICABLE_SET_FLAG_YES = "1";
    /** 当時の時間 */
    public static final String CURRENT_DATE_NAME = "当時の時間";

    /** 人事処理種別名称：兼任登録 */
    public static final String PERSONAL_HANDLE_MINOR_REGISTER_NAME = "兼任登録";
    /** 兼任登録日 */
    public static final String PERSONAL_HANDLE_MINOR_REGISTER_DATE_NAME = "兼任登録日";
    /** 兼任解除日 */
    public static final String PERSONAL_HANDLE_MINOR_UNREGISTER_DATE_NAME = "兼任解除日";
    /** 異動日 */
    public static final String PERSONAL_HANDLE_CHANGE_ORGANIZATION_DATE_NAME = "異動日";
    /** 契約形態変更日 */
    public static final String PERSONAL_HANDLE_CHANGE_CONTRACT_DATE_NAME = "契約形態変更日";
    /** 氏名変更日 */
    public static final String PERSONAL_HANDLE_CHANGE_USERNAME_DATE_NAME = "氏名変更日";
    /** 人事処理種別名称：兼任解除 */
    public static final String PERSONAL_HANDLE_MINOR_UNREGISTER_NAME = "兼任解除";
    /** 人事処理種別名称：退職 */
    public static final String PERSONAL_HANDLE_RESIGN_NAME = "退職";
    /** 人事処理種別名称：組織異動  */
    public static final String PERSONAL_HANDLE_CHANGE_ORGANIZATION_NAME = "組織異動";
    /** 人事処理種別名称：契約形態変更  */
    public static final String PERSONAL_HANDLE_CHANGE_CONTRACT_NAME = "契約形態変更";
    /** 人事処理種別名称：氏名変更  */
    public static final String PERSONAL_HANDLE_CHANGE_USERNAME_NAME = "氏名変更";

    /** 人事処理種別：01:入社 */
    public static final String PERSONAL_HANDLE_ENTRANCE = "01";
    /** 人事処理種別：02:組織異動 */
    public static final String PERSONAL_HANDLE_CHANGE_ORGANIZATION = "02";
    /** 人事処理種別：03:兼任登録 */
    public static final String PERSONAL_HANDLE_MINOR_REGISTER = "03";
    /** 人事処理種別：04:兼任解除 */
    public static final String PERSONAL_HANDLE_MINOR_UNREGISTER = "04";
    /** 人事処理種別：05:契約形態変更 */
    public static final String PERSONAL_HANDLE_CHANGE_CONTRACT = "05";
    /** 人事処理種別：06:氏名変更 */
    public static final String PERSONAL_HANDLE_CHANGE_USERNAME = "06";
    /** 人事処理種別：07:退職 */
    public static final String PERSONAL_HANDLE_RESIGN = "07";

    /** 特権処理種別：01:メニュー設定 */
    public static final String PRIVILEGE_HANDLE_MENU_SET = "01";
    /** 特権処理種別：02:組織内承認者設定 */
    public static final String PRIVILEGE_HANDLE_ORGANIZATION_APPROVAL = "02";
    /** 特権処理種別：03:役割承認者 */
    public static final String PRIVILEGE_HANDLE_ROLE_APPROVAL = "03";
    /** 特権処理種別：05:役割登録者 */
    public static final String PRIVILEGE_HANDLE_ROLE_REGISTER = "05";
    /** 特権処理種別：06:各画面特権設定 */
    public static final String PRIVILEGE_HANDLE_FRAME_SET = "06";

    /** 人事や特権の処理ステータス: 00 実行前 */
    public static final String HANDLE_STATUS_APPLY_WAIT = "00";
    /** 人事や特権の処理ステータス: 01 実行完了 */
    public static final String HANDLE_STATUS_APPLY_COMPLETED = "01";
    /** 人事や特権の処理ステータス: 02 実行エラー */
    public static final String HANDLE_STATUS_APPLY_ERROR = "02";

    /** 入力日→反映日の調整: 02 組織異動 */
    public static final String PERSONAL_ADJUSTMENT_APPLY_CHANGE_ORGANIZATION = "02";
    /** 入力日→反映日の調整: 03 兼務登録 */
    public static final String PERSONAL_ADJUSTMENT_APPLY_REGISTER = "03";
    /** 入力日→反映日の調整: 04 兼務解除 */
    public static final String PERSONAL_ADJUSTMENT_APPLY_UNREGISTER = "04";
    /** 入力日→反映日の調整: 05 契約形態変更 */
    public static final String PERSONAL_ADJUSTMENT_APPLY_CHANGE_CONTRACT = "05";
    /** 入力日→反映日の調整: 06 氏名変更 */
    public static final String PERSONAL_ADJUSTMENT_APPLY_CHANGE_USERNAME = "06";

    /** バッチ実行日時の調整: 01 入社 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_ENTRANCE = "01";
    /** バッチ実行日時の調整: 02 組織異動 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_CHANGE_ORGANIZATION = "02";
    /** バッチ実行日時の調整: 03 兼務登録 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_REGISTER = "03";
    /** バッチ実行日時の調整: 04 兼務解除 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_UNREGISTER = "04";
    /** バッチ実行日時の調整: 05 契約形態変更 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_CHANGE_CONTRACT = "05";
    /** バッチ実行日時の調整: 06 氏名変更 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_CHANGE_USERNAME = "06";
    /** バッチ実行日時の調整: 07 退職 */
    public static final String PERSONAL_ADJUSTMENT_BATCH_RESIGN = "07";

    /** 共通パターン: 1 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_ONE = "1";

    /** 共通パターン: 2 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWO = "2";

    /** 共通パターン: 3 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_THREE = "3";

    /** 共通パターン: 4 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_FOUR = "4";

    /** 共通パターン: 5 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_FIVE = "5";

    /** 共通パターン: 6 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_SIX = "6";

    /** 共通パターン: 7 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_SEVEN = "7";

    /** 共通パターン: 8 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_EIGHT = "8";

    /** 共通パターン: 9 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_NINE = "9";

    /** 共通パターン: 10 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TEN = "10";

    /** 共通パターン: 11 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_ELEVEN = "11";

    /** 共通パターン: 12 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWELVE = "12";

    /** 共通パターン: 13 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN = "13";

    /** 共通パターン: 14 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN = "14";

    /** 共通パターン: 15 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_FIFTEEN = "15";

    /** 共通パターン: 16 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_SIXTEEN = "16";

    /** 共通パターン: 17 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_SEVENTEEN = "17";

    /** 共通パターン: 18 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_EIGHTEEN = "18";

    /** 共通パターン: 19 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_NINETEEN = "19";

    /** 共通パターン: 20 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWENTY = "20";

    /** 共通パターン: 21 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST = "21";

    /** 共通パターン: 22 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND = "22";

    /** 共通パターン: 23 */
    public static final String APPLCIATION_COMMON_FORM_PATTERN_TWENTY_THREE = "23";

    /** 申請時表示区分: 1 全権限グループメニュー */
    public static final String APPLICATION_SHOW_TYPE_ONE = "1";

    /** 申請時表示区分: 2 一覧に所有している権限グループメニュー */
    public static final String APPLICATION_SHOW_TYPE_TWO = "2";

    /** 申請時表示区分: 3 一覧に所有していない権限グループメニュー */
    public static final String APPLICATION_SHOW_TYPE_THREE = "3";

    /** 申請時表示区分: 4 一覧に所有していない、選択に所有している */
    public static final String APPLICATION_SHOW_TYPE_FOUR = "4";

    /** 申請時表示区分: 5 一覧は空、選択に所有している */
    public static final String APPLICATION_SHOW_TYPE_FIVE = "5";

    /** 画面ID：IDMS0311　内定者入力画面ID */
    public static final String MENU_ID_IDMS0311 = "IDMS0311";
    /** 画面ID：IDMS0312　内定者一覧画面ID */
    public static final String MENU_ID_IDMS0312 = "IDMS0312";
    /** 画面ID：IDMS0421　退職画面ID */
    public static final String MENU_ID_IDMS0361 = "IDMS0361";
    /** 画面ID：IDMS0421　メニュー設定画面ID */
    public static final String MENU_ID_IDMS0411 = "IDMS0411";
    /** 画面ID：IDMS0421　承認者・登録者設定画面ID */
    public static final String MENU_ID_IDMS0421 = "IDMS0421";
    /** 画面ID：IDMS0510　業務作業状況レポート画面ID */
    public static final String MENU_ID_IDMS0510 = "IDMS0510";
    /** 画面ID：IDMS0530　権限履歴画面ID */
    public static final String MENU_ID_IDMS0530 = "IDMS0530";
    /** 画面ID：IDMS0686　特権所有者設定画面ID */
    public static final String MENU_ID_IDMS0686 = "IDMS0686";
    /** 画面ID：IDMS0101　申請共通画面ID */
    public static final String MENU_ID_IDMS0101 = "IDMS0101";
    /** 画面ID：IDMS0361　ファイルのアップロードディレクトリ */
    public static final String FILE_UPLOAD_DIR = "FILE_UPLOAD_DIR";
    public static final String File_UPLOAD_DIR_CSVFILE = "CSVFILE";
    
    /** 画面の権限コード: 01 総務担当 */
    public static final String MENU_HOLD_CODE_MANAGEMENT = "01";
    /** 画面の権限コード: 02 人事担当 */
    public static final String MENU_HOLD_CODE_PERSONNEL = "02";
    /** 画面の権限コード: 03 営業企画管理 */
    public static final String MENU_HOLD_CODE_MARKETSURVEILLANCE = "03";
    
    /** 登録一覧の権限: 01 総務管理 */
    public static final String PRIVILEGE_GENERAL = "01";

    /** 登録一覧の権限: 02 営業企画管理 */
    public static final String PRIVILEGE_SALES = "03";

    /** 登録一覧の権限: 03 売買審査管理 */
    public static final String PRIVILEGE_TRADE = "04";

    /** 全員付与フラグ： 1:全員付与 */
    public static final String ALL_USER_GRANT_FLAG = "1";


    /** 日付: 格式化*/
    public static final String DATE_FORMAT_YYYYMMDD = "yyyy/MM/dd";
    public static final String DATE_FORMAT_YMDHMSS = "yyyy/MM/dd HH:mm:ss.SSS";

    /** バッチ: 登録ユーザ名*/
    public static final String BATCH_USERNAME = "BATCH";

    /** ドメイン名 */
    public static final String MAIL_ADDRESS_DOMAIN_VALUE = "DOMAIN_VALUE";
    /** メインアドレスフラグ */
    public static final String MAIL_ADDRESS_FLAG = "1";

    /** メールのテンプレート:BATCH01：申請の削除確認 */
    public static final String MAIL_TEMPLATE_BATCH01 = "BATCH_01";
    /** メールのテンプレート:BATCH02：人事処理バッチ処理結果 */
    public static final String MAIL_TEMPLATE_BATCH02 = "BATCH_02";
    /** メールのテンプレート:BATCH02  正常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH02_COMPLETED = "正常終了";
    /** メールのテンプレート:BATCH02  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH02_ABORTED = "異常終了";
    /** メールのテンプレート:BATCH02  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH02_PORTION_ABORTED = "正常終了（一部登録エラーあり）";
    /** メールのテンプレート:BATCH02  異常終了の内容*/
    public static final String MAIL_TEMPLATE_BATCH02_ABORTED_TEXT = "システム管理者に連絡をしてください。";
    /** メールのテンプレート:BATCH02  一部登録エラーあり*/
    public static final String MAIL_TEMPLATE_BATCH02_PORTION_ABORTED_TEXT = "エラー詳細は、システム管理者に問い合わせてください。";
    /** メールのテンプレート:BATCH03：退職者の申請を削除 */
    public static final String MAIL_TEMPLATE_BATCH03 = "BATCH_03";


    /** メールのテンプレート:BATCH04：フォルダ同期バッチ処理結果 */
    public static final String MAIL_TEMPLATE_BATCH04 = "BATCH_04";
    /** メールのテンプレート:BATCH04  正常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH04_COMPLETED = "正常終了";
    /** メールのテンプレート:BATCH04  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH04_ABORTED = "異常終了";
    /** メールのテンプレート:BATCH04  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH04_PORTION_ABORTED = "正常終了（一部登録エラーあり）";
    /** メールのテンプレート:BATCH04  異常終了の内容*/
    public static final String MAIL_TEMPLATE_BATCH04_ABORTED_TEXT = "システム管理者に連絡をしてください。";
    /** メールのテンプレート:BATCH04  一部登録エラーあり*/
    public static final String MAIL_TEMPLATE_BATCH04_PORTION_ABORTED_TEXT = "エラー詳細は、システム管理者に問い合わせてください。";

    /** メールのテンプレート:BATCH05：特権処理バッチ処理結果 */
    public static final String MAIL_TEMPLATE_BATCH05 = "BATCH_05";
    /** メールのテンプレート:BATCH05  正常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH05_COMPLETED = "正常終了";
    /** メールのテンプレート:BATCH05  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH05_ABORTED = "異常終了";
    /** メールのテンプレート:BATCH05  異常終了の実行結果*/
    public static final String MAIL_TEMPLATE_BATCH05_PORTION_ABORTED = "正常終了（一部登録エラーあり）";
    /** メールのテンプレート:BATCH05  異常終了の内容*/
    public static final String MAIL_TEMPLATE_BATCH05_ABORTED_TEXT = "システム管理者に連絡をしてください。";
    /** メールのテンプレート:BATCH05  一部登録エラーあり*/
    public static final String MAIL_TEMPLATE_BATCH05_PORTION_ABORTED_TEXT = "エラー詳細は、システム管理者に問い合わせてください。";

    /** メールのテンプレート:WEB01  入社予定のキャンセル時、申請の削除確認*/
    public static final String MAIL_TEMPLATE_WEB01 = "WEB_01";


    /**  フォルダ種類: P 個人 */
    public static final String FOLDER_TYPE_INDIVIDUAL = "P";
    /**  フォルダ種類: O 組織 */
    public static final String FOLDER_TYPE_ORGANIZATION = "O";
    /**  フォルダ種類: S 共有 */
    public static final String FOLDER_TYPE_SHARE = "S";
    /**  フォルダ種類: K 機密 */
    public static final String FOLDER_TYPE_CONFIDENTIAL = "K";

    /** 権限台帳処理区分： 1 新規登録 */
    public static final String AUTHORITY_LEDGER_OPERATE_TYPE_INSERT = "1";
    /** 権限台帳処理区分： 2 更新 */
    public static final String AUTHORITY_LEDGER_OPERATE_TYPE_UPDATE = "2";
    /** 権限台帳処理区分： 3 削除 */
    public static final String AUTHORITY_LEDGER_OPERATE_TYPE_DELETE = "3";

    /** 申請完了の通知メール： 01 申請者 */
    public static final String COMPLETION_NOTICE_MAIL_APPLICANT = "01";
    /** 申請完了の通知メール： 02 利用者 */
    public static final String COMPLETION_NOTICE_MAIL_END_USR = "02";
    /** 申請完了の通知メール： 03 申請者&利用者 */
    public static final String COMPLETION_NOTICE_MAIL_APPLICANT_END_USR = "03";

    /** バッチ完了のメール通知者： 01 */
    public static final String BATCH_COMPLETION_NOTICE_USER01 = "01";

    /** 承認ルート画面：担当者列 組織内承認者の表示用 */
    public static final String APPROVAL_ROUTE_DISPLAY_NAME = "部門承認者";

    /** .NETウェブサービスの成功の場合、戻りコード＝0 */
    public static final String DOT_NET_RESPONSE_SUCCESS = "0";

    /** 項目の文字種：半角英数 */
    public static final String ITEM_TYPE_ALPHABETNUM = "alphabetNum";

    /** 項目の文字種：全角カナ */
    public static final String ITEM_TYPE_KATAKANA = "katakana";

    /** 項目の文字種：日付 */
    public static final String ITEM_TYPE_DATE = "date";
    
    /** 組織ランク： 役員管理 */
    public static final int ORGANIZATION_RANK_YAKUIN_MANAGE = 20;
    
    /** ドライブコード：　SCR 共有フォルダ(機密) */
    public static final String DRIVE_CD_SECRET = "SCR";
    
    /** アクセスモード：　FULL */
    public static final String ACCESS_MODE_FULL = "F";
    
    /** カテゴリ処理区分: 1 新規 */
    public static final String CATEGORY_PROCESS_TYPE_ADD = "1";
    /** カテゴリ処理区分: 2 更新 */
    public static final String CATEGORY_PROCESS_TYPE_UPD = "2";
    /** カテゴリ処理区分: 3 削除 */
    public static final String CATEGORY_PROCESS_TYPE_DEL = "3";
    /** カテゴリ処理区分: 4 特殊削除(共有フォルダの削除、共有メールボックスの削除、共有のメーリングリストの削除) 510_業務作業状況レポート画面用 */
    public static final String CATEGORY_PROCESS_TYPE_SPL_DEL = "4";
    /**メニューの接頭辞 */
    public static final String MENU_PREFIX = "MENU_PREFIX";
}
