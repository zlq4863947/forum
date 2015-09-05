/**
 *
 */
var goMessages = {
		//#######################################################################################
		//#             ERROR(基本チェック)
		//#######################################################################################
		'E1001' : 'ログインIDまたパスワードが違います。',
		'E1002' : '更新対象がありません。',
		'E1003' : '出力対象がありません。',
		'E1004' : '取消対象がありません。',
		'E1005' : 'アップロードファイルのレイアウトが不正です。',
		'E1006' : 'ファイルアップロードできません。',
		'E1007' : 'バッチ処理でエラーが発生しました。',
		'E1008' : '{0}が入力されていません。',
		'E1009' : '{0}が選択されていません。',
		'E1010' : '{0}は半角数字を入力して下さい。',
		'E1011' : '{0}は半角英字または半角数値を入力して下さい。',
		'E1012' : '{0}は全角カナを入力して下さい。',
		'E1013' : '{0}は日付({1})を入力して下さい。',
		'E1014' : '{0}は{1}文字以内で入力して下さい。',
		'E1015' : '{0}は{1}桁以内で入力して下さい。',
		'E1016' : '{0}は0（ゼロ）以上の整数を入力して下さい。',
		'E1017' : '{0}を入力した場合、{1}を入力して下さい。',
		'E1018' : '{0}を入力した場合、{1}は入力できません。',
		'E1019' : '{0}の開始と終了の関係が正しく入力されていません。',
		'E1020' : '{0}に不正な値が入力されています。',
		'E1021' : '選択された{0}は存在しません。',
		'E1022' : '選択された利用者は、{0}の申請をすることはできません。',
		'E1023' : '{0}を登録する権限を保持していません。',
		'E1024' : '{0}は本日({1}）以降の日付を指定してください。',
		'E1025' : '{0}時点の利用者情報と入力された情報が同じ内容です。',
		'E1026' : '入力された情報は、{0}前後に反映予定の人事処理と同じ内容です。',
		'E1027' : '{0}が選択されたので、{1}を選択して下さい。',
		'E1028' : '{0}の予定は、既に存在しています。',
		'E1029' : '{0}の前に、退職する予定です。',
		'E1030' : '権限がないため、アクセスが拒否されました。',
		'E1041' : '{0}が{1}されていないデータが存在します。',
		'E2047' : '{0}の組織及び役職が主務の組織及び役職と重複しています。',
		'E2048' : '設定できる組織承認者または組織登録者の対象外です。',
		'E2049' : '当該社員の設定がすでに有効になっています。',
		'E2088' : '画面にエラーがありますので、修正してください。',
		'E2089' : '変更後の{0}が現在の{0}と重複しています。',
		'E2090' : '画面表示時、エラーが発生するため、処理を中止しました。',
		'E2091' : '{0}が、{1}よりも小さくなっています。',
		'E2094' : '当該システムの登録完了通知がすでに設定されています。',
		'E2095' : '当該組織システムの紐付は他のユーザが申請中なので、削除できません。',
		'E2096' : '組織システム紐付設定の適用開始日が組織または、システムの適用開始日より前になります。',
		'E2097' : '組織システム紐付設定の適用終了日が組織の適用終了日より先になります。',
		'E2098' : '当該契約形態システムの紐付は他のユーザが申請中なので、削除できません。',
		'E2099' : '当該組織が組織マスタに存在しません。',
		'E2100' : '当該契約形態が契約形態マスタに存在しません。',
		//#######################################################################################
		//#             ERROR(DB関連)
		//#######################################################################################
		'E2001' : '{0}は既に使用されています。',
		'E2002' : '{0}は利用者が所属している組織では申請を行えません。',
		'E2003' : '{0}は利用者の契約形態では申請を行えません。',
		'E2004' : '利用者が退職予定のため、申請を行えません。',
		'E2005' : '他の端末によって情報が更新されたため、再読込みして下さい。',
		'E2006' : '入力された人事処理は、既に反映済みの人事処理と同様の処理のため登録できません。',
		'E2007' : '更新中にエラーが発生したため、処理を中止しました。',
		'E2008' : '選択されたデータはすでに存在しています。',
		'E2009' : '選択されたデータが入社登録済のデータではありません。',
		//#######################################################################################
		//#             ERROR(システムエラー)
		//#######################################################################################
		'E9001' : 'データベースアクセス時にエラーが発生しました。',
		'E9002' : 'CSVファイル読込時にエラーが発生しました。',
		'E9003' : '汎用マスタ取得時にエラーが発生しました。',
		'E9004' : 'WEBアクセスログテーブルへログを書込み時にエラーが発生しました。',

		//#######################################################################################
		//#             メッセージ
		//#######################################################################################
		'I1001' : '{0}件レコードを読み込みました。',
		'I1002' : '登録が完了しました。',
		'I1003' : '更新が完了しました。',
		'I1004' : '削除が完了しました。',
		'I1005' : '申請しました。',
		'I1006' : '承認しました。',
		'I1007' : '却下しました。',
		'I1008' : '差戻しました。',
		'I1009' : '登録処理を完了済みにしました。',
		'I1010' : '検索結果は０件です。',
		'I1011' : 'キャンセルしました。',
		'I1012' : '既に同じ対象者の{0}の予定が登録されています。',
		'I1013' : 'CSVファイルのすべてまたは一部の取り込みができませんでした。',
		'I1014' : 'CSVファイルのフォーマットが不正です。',
		'I1015' : '当該ファイルが空きです。',
		'I1016' : '変更が完了しました。',
		'I1021' : '人事処理反映バッチとIDMS特権反映バッチの実行が完了しました。',

		//#######################################################################################
		//#             WARNING
		//#######################################################################################
		'W1001' : '既に同じ{0}の{1}が登録されています。<br>上書きしてもよろしいですか？',
		'W1002' : '登録してよろしいですか？',
		'W1003' : '更新してよろしいですか？',
		'W1004' : '削除してよろしいですか？',
		'W1005' : '申請してよろしいですか？',
		'W1006' : '承認してよろしいですか？',
		'W1007' : '却下してよろしいですか？',
		'W1008' : '差戻してよろしいですか？',
		'W1009' : '担当の登録処理を完了済みにしてよろしいですか？',
		'W1010' : '退職日以降に予定されている人事処理は、実際の退職処理の際にすべてキャンセルされます。\nよろしいですか？',
		'W1011' : '既に同じ対象者の{0}の予定が登録されています。\n上書きしてもよろしいですか？',
		'W1012' : '既に解除予定の人事が登録されている兼任登録を選択しています。\n選択された兼任登録に紐づく兼任解除の人事予定も同時に解除してよろしいですか？',
		'W1013' : '既に申請が行われている内定者が含まれています。\n入社予定の取消を行うと、申請のキャンセルまたは削除確認のメールが送付されます。\nよろしいですか？',
		"W1014" : "入力した適用開始日にメニューの設定がすでに登録されています。変更しますか？",
		"W1015" : "入力した適用開始日に承認者・登録者の設定がすでに登録されています。変更しますか？",
		"W1016" : "変更してよろしいですか？",
		"W1017" : "チェックの有無にかかわらず、反映予定日が本日以前の人事処理・特権処理を全て反映します。<br>よろしいですか？<br><br><strong>注：画面に表示されていない{0}も処理対象に含まれます。</strong>",
		"W1018" : "チェックされた{0}をキャンセルします。<br>よろしいですか？",
		"W1020" : "退職日以降に予定されている人事処理は、既に存在しています。",
		"W1021" : "更新処理を実行すると、ブラウザを閉じても中断せず最後まで実行されます。<br>よろしいですか？"
};

function getMessage(msgCode, objects){
	var sMessage = goMessages[msgCode];
	return formatString(sMessage, objects)
}

//メッセージのパラメータを設定する
function formatString(message, objects) {
    var result = null;
    if (message != undefined) {
        result = message;
        if (objects != undefined) {
            if (objects.length != undefined) {
                for ( var i = 0; i < objects.length; i++) {
                    if (result.indexOf('{' + (i) + '}') >= 0) {
                        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
                        result = result.replace(re, objects[i]);
                    }
                }
            }
        }
    }
    return result;
}


