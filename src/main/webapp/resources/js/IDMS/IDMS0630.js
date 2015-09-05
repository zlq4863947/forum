var mstArray = [
		{
			code : "mst_organization",
			name : "組織",
			editorWindow : {
				width : 770,
				height : 620
			},
			url : "/IDMS0631/IDMS0631.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.organizationCd + "')\">編集</a>";
						}
					},/*
						 * { field : 'organizationCd', title : '組織コード ', width :
						 * 100, halign : 'center' },
						 */{
						field : 'organizationName',
						title : '組織名称',
						width : 150,
						align : 'left',
						halign : 'center'
					}, {
						field : 'parentOrganizationCd',
						title : '親組織コード',
						width : 150,
						halign : 'center'
					}, {
						field : 'effectiveDate',
						title : '適用開始日',
						width : 80,
						formatter : dateFormatter
					}, {
						field : 'expireDate',
						title : '適用終了日',
						width : 80,
						formatter : dateFormatter
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_office",
			name : "役職",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0632/IDMS0632.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.officeCd + "')\">編集</a>";
						}
					}, {
						field : 'officeCd',
						title : '役職コード',
						width : 100,
						align : 'center'
					}, {
						field : 'officeName',
						title : '役職名称',
						width : 150,
						align : 'left',
						halign : 'center'
					},/*
						 * { field : 'generalFlag', title : '一般フラグ', width :
						 * 100, align : 'center', formatter : booleanFormatter },
						 */{
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						align : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_contract",
			name : "契約形態",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0633/IDMS0633.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.contractCd + "')\">編集</a>";
						}
					}, {
						field : 'contractCd',
						title : '契約形態コード',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'contractName',
						title : '契約形態名称',
						width : 150,
						align : 'left',
						halign : 'center'
					}, {
						field : 'personalFolderFlag',
						title : '個人フォルダフラグ',
						width : 120,
						formatter : booleanFormatter,
						align : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_approval_role",
			name : "承認役割",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0634/IDMS0634.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.approvalRoleCd + "')\">編集</a>";
						}
					}, {
						field : 'approvalRoleCd',
						title : '承認役割コード',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'approvalRoleName',
						title : '承認役割名称',
						width : 150,
						align : 'left',
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_register_role",
			name : "登録役割",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0635/IDMS0635.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.registerRoleCd + "')\">編集</a>";
						}
					}, {
						field : 'registerRoleCd',
						title : '登録役割コード',
						width : 100,
						halign : 'center'
					}, {
						field : 'registerRoleName',
						title : '登録役割名称',
						width : 150,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "user_mail_address",
			name : "ユーザメールアドレス",
			editorWindow : {
				width : 770,
				height : 370
			},
			url : "/IDMS0636/IDMS0636.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.mailaddressId + "')\">編集</a>";
						}
					}, {
						field : 'mailaddressId',
						title : 'メールアドレスID',
						width : 110
					}, {
						field : 'userId',
						title : 'ユーザID',
						width : 90,
						halign : 'center'
					}, {
						field : 'mailAddress',
						title : 'メールアドレス',
						width : 180,
						halign : 'center'
					}, {
						field : 'primaryFlag',
						title : 'メインアドレスフラグ',
						formatter : booleanFormatter,
						width : 130,
						align : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_drive",
			name : "ドライブ",
			editorWindow : {
				width : 770,
				height : 440
			},
			url : "/IDMS0637/IDMS0637.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.driveCd + "')\">編集</a>";
						}
					}, {
						field : 'driveCd',
						title : 'ドライブコード',
						width : 100,
						halign : 'center'
					}, {
						field : 'drive',
						title : 'ドライブ',
						width : 100,
						halign : 'center'
					}, {
						field : 'path',
						title : 'パス',
						width : 300,
						halign : 'center'
					}, {
						field : 'fileServer',
						title : 'ファイルサーバー',
						width : 110,
						halign : 'center'
					}, {
						field : 'folderType',
						title : 'フォルダタイプ',
						width : 100,
						halign : 'center'
					}, {
						field : 'nasFlag',
						title : 'NASフラグ',
						width : 80,
						halign : 'center',
						formatter : booleanFormatter
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_code",
			name : "コード",
			showExportCsv : true,
			editorWindow : {
				width : 770,
				height : 440
			},
			url : "/IDMS0638/IDMS0638.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('code="
									+ row.code
									+ "&codeGroup="
									+ row.codeGroup
									+ "')\">編集</a>";
						}
					}, {
						field : 'codeGroup',
						title : 'コードグループ',
						width : 190,
						halign : 'center'
					}, {
						field : 'code',
						title : 'コード',
						width : 140,
						halign : 'center'
					}, {
						field : 'codeValue',
						title : 'コード値',
						width : 350,
						halign : 'center'
					}, {
						field : 'codeName',
						title : 'コード名称',
						width : 150,
						halign : 'center'
					}, {
						field : 'description',
						title : '説明',
						width : 550,
						halign : 'center'
					}, {
						field : 'displayOrder',
						title : '表示順',
						width : 60,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter

					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_system",
			name : "システム",
			editorWindow : {
				width : 770,
				height : 520
			},
			url : "/IDMS0639/IDMS0639.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('systemCd="
									+ row.systemCd
									+ "&effectiveDate="
									+ row.effectiveDate
									+ "&flowPatternCd="
									+ row.flowPatternCd + "')\">編集</a>";
						}
					}, {
						field : 'systemCd',
						title : 'システムコード',
						width : 95,
						halign : 'center'
					}, {
						field : 'effectiveDate',
						title : '適用開始日',
						width : 80,
						formatter : dateFormatter,
						halign : 'center'
					}, {
						field : 'expireDate',
						title : '適用終了日',
						width : 80,
						formatter : dateFormatter,
						halign : 'center'
					}, {
						field : 'systemName',
						title : 'システム名称',
						width : 210,
						halign : 'center'
					}, {
						field : 'systemGroup',
						title : 'システム分類',
						width : 100,
						halign : 'center'
					}, {
						field : 'note',
						title : '注釈',
						width : 150,
						halign : 'center'
					}, {
						field : 'flowPatternCd',
						title : 'フローパターンコード',
						width : 140,
						halign : 'center'
					}, {
						field : 'displayOrder',
						title : '表示順',
						width : 60,
						halign : 'center'
					}, {
						field : 'registerDetailInputFlag',
						title : '登録時詳細入力フラグ',
						width : 130,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter

					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_system_authority",
			name : "システム権限グループメニュー",
			editorWindow : {
				width : 770,
				height : 400
			},
			url : "/IDMS0640/IDMS0640.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('systemCd="
									+ row.systemCd
									+ "&authorityGroupMenuCd="
									+ row.authorityGroupMenuCd + "')\">編集</a>";
						}
					}, {
						field : 'systemCd',
						title : 'システムコード',
						width : 100,
						halign : 'center'
					}, {
						field : 'authorityGroupMenuCd',
						title : '権限グループメニューコード',
						width : 170,
						halign : 'center'
					}, {
						field : 'authorityGroupMenuName',
						title : '権限グループメニュー名称',
						width : 160,
						halign : 'center'
					}, {
						field : 'displayOrder',
						title : '表示順',
						width : 60,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter

					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "register_completion_notice",
			name : "登録完了通知テーブル",
			editorWindow : {
				width : 770,
				height : 370
			},
			url : "/IDMS0641/IDMS0641.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('systemCd="
									+ row.systemCd
									+ "&mailaddressId="
									+ row.mailaddressId + "')\">編集</a>";
						}
					}, {
						field : 'systemCd',
						title : 'システムコード',
						width : 100,
						halign : 'center'
					}, {
						field : 'mailaddressId',
						title : 'メールアドレスID',
						width : 100,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter

					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_system_category",
			name : "システムカテゴリ",
			editorWindow : {
				width : 770,
				height : 530
			},
			url : "/IDMS0642/IDMS0642.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('systemCd="
									+ row.systemCd
									+ "&categoryCd="
									+ row.categoryCd + "')\">編集</a>";
						}
					}, {
						field : 'systemCd',
						title : 'システムコード',
						width : 100,
						halign : 'center'
					}, {
						field : 'categoryCd',
						title : 'カテゴリコード',
						width : 100,
						halign : 'center'
					}, {
						field : 'categoryName',
						title : 'カテゴリ名称',
						width : 100,
						halign : 'center'
					}, {
						field : 'applciation_common_form_pattern',
						title : '申請共通画面パターン',
						width : 110,
						halign : 'center'
					}, {
						field : 'application_detail_form_type',
						title : '申請詳細画面種類',
						width : 110,
						halign : 'center'
					}, {
						field : 'application_detail_form_pattern',
						title : '申請詳細画面パターン',
						width : 110,
						halign : 'center'
					}, {
						field : 'application_show_type',
						title : '申請時表示区分',
						width : 90,
						halign : 'center'
					}, {
						field : 'category_process_type',
						title : 'カテゴリ処理区分',
						width : 110,
						halign : 'center'
					}, {
						field : 'authority_ledger_operate_type',
						title : '権限台帳処理区分',
						width : 110,
						halign : 'center'
					}, {
						field : 'displayOrder',
						title : '表示順',
						width : 60,
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter

					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_menu",
			name : "メニュー",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0648/IDMS0648.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.menuId + "')\">編集</a>";
						}
					}, {
						field : 'menuId',
						title : 'メニューID',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'menuName',
						title : 'メニュー名称',
						width : 150,
						align : 'left',
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						align : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_tab",
			name : "タブ",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0647/IDMS0647.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('id="
									+ row.tabCd + "')\">編集</a>";
						}
					}, {
						field : 'tabCd',
						title : 'タブコード',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'tabName',
						title : 'タブ名称',
						width : 150,
						align : 'left',
						halign : 'center'
					}, {
						field : 'allFlag',
						title : '全員付与フラグ',
						width : 120,
						formatter : booleanFormatter,
						align : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100,
						halign : 'center'
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_star_division",
			name : "STAR部店",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0643/IDMS0643.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('divisionName="
									+ row.divisionName + "')\">編集</a>";
						}
					}, {
						field : 'divisionName',
						title : '部署名',
						width : 300,
						align : 'left',
						halign : 'center'
					}, {
						field : 'divisionCd',
						title : '部店コード',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_star_business_rank",
			name : "STAR業務ランク",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0644/IDMS0644.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('divisionName="
									+ row.divisionName + "')\">編集</a>";
						}
					}, {
						field : 'divisionName',
						title : '部署名',
						width : 300,
						align : 'left',
						halign : 'center'
					}, {
						field : 'branchRankCd',
						title : '営業店ランク',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'headofficeRankCd',
						title : '本社ランク',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'commonInputCd',
						title : '共有入力区分',
						width : 100
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_star_handling",
			name : "STAR扱者コード",
			editorWindow : {
				width : 770,
				height : 330
			},
			url : "/IDMS0645/IDMS0645.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('divisionName="
									+ row.divisionName + "')\">編集</a>";
						}
					}, {
						field : 'divisionName',
						title : '部署名',
						width : 300,
						align : 'left',
						halign : 'center'
					}, {
						field : 'handlingCd',
						title : '扱者コード',
						width : 100,
						align : 'left',
						halign : 'center'
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		},
		{
			code : "mst_flow_pattern",
			name : "業務フローパターン",
			editorWindow : {
				width : 770,
				height : 660
			},
			url : "/IDMS0646/IDMS0646.htm",
			columns : [ [
					{
						field : 'checkbox',
						title : '',
						checkbox : true
					},
					{
						field : 'editor',
						title : '&nbsp;',
						formatter : function(value, row, index) {
							return "<a href='javascript:void(0)' style='color:blue;text-decoration:underline' onclick=\"showEditor('flowPatternCd="
									+ row.flowPatternCd + "')\">編集</a>";
						}
					}, {
						field : 'flowPatternCd',
						title : 'フローパターンコード',
						width : 100
					}, {
						field : 'completionMailType',
						title : '完了メール種類',
						width : 100
					}, {
						field : 'approverType1',
						title : '承認者区分1',
						width : 100
					}, {
						field : 'approvalRoleCd1',
						title : '承認役割コード1',
						width : 100
					}, {
						field : 'allApprovalFlag1',
						title : '全員承認フラグ１',
						width : 100
					}, {
						field : 'approverType2',
						title : '承認者区分2',
						width : 100
					}, {
						field : 'approvalRoleCd2',
						title : '承認役割コード2',
						width : 100
					}, {
						field : 'allApprovalFlag2',
						title : '全員承認フラグ2',
						width : 100
					}, {
						field : 'approverType3',
						title : '承認者区分3',
						width : 100
					}, {
						field : 'approvalRoleCd3',
						title : '承認役割コード3',
						width : 100
					}, {
						field : 'allApprovalFlag3',
						title : '全員承認フラグ3',
						width : 100
					}, {
						field : 'approverType4',
						title : '承認者区分4',
						width : 100
					}, {
						field : 'approvalRoleCd4',
						title : '承認役割コード4',
						width : 100
					}, {
						field : 'allApprovalFlag4',
						title : '全員承認フラグ4',
						width : 100
					}, {
						field : 'approverType5',
						title : '承認者区分5',
						width : 100
					}, {
						field : 'approvalRoleCd5',
						title : '承認役割コード5',
						width : 100
					}, {
						field : 'allApprovalFlag5',
						title : '全員承認フラグ5',
						width : 100
					}, {
						field : 'approverType6',
						title : '承認者区分1',
						width : 100
					}, {
						field : 'approvalRoleCd6',
						title : '承認役割コード6',
						width : 100
					}, {
						field : 'allApprovalFlag6',
						title : '全員承認フラグ6',
						width : 100
					}, {
						field : 'approverType7',
						title : '承認者区分7',
						width : 100
					}, {
						field : 'approvalRoleCd7',
						title : '承認役割コード7',
						width : 100
					}, {
						field : 'allApprovalFlag7',
						title : '全員承認フラグ7',
						width : 100
					}, {
						field : 'approverType8',
						title : '承認者区分8',
						width : 100
					}, {
						field : 'approvalRoleCd8',
						title : '承認役割コード8',
						width : 100
					}, {
						field : 'allApprovalFlag8',
						title : '全員承認フラグ8',
						width : 100
					}, {
						field : 'approverType9',
						title : '承認者区分9',
						width : 100
					}, {
						field : 'approvalRoleCd9',
						title : '承認役割コード9',
						width : 100
					}, {
						field : 'allApprovalFlag9',
						title : '全員承認フラグ9',
						width : 100
					}, {
						field : 'approverType10',
						title : '承認者区分10',
						width : 100
					}, {
						field : 'approvalRoleCd10',
						title : '承認役割コード10',
						width : 100
					}, {
						field : 'allApprovalFlag10',
						title : '全員承認フラグ10',
						width : 100
					}, {
						field : 'registrantType1',
						title : '登録者区分1',
						width : 100
					}, {
						field : 'registerRoleCd1',
						title : '登録役割コード1',
						width : 100
					}, {
						field : 'registrantType2',
						title : '登録者区分2',
						width : 100
					}, {
						field : 'registerRoleCd2',
						title : '登録役割コード2',
						width : 100
					}, {
						field : 'registrantType3',
						title : '登録者区分3',
						width : 100
					}, {
						field : 'registerRoleCd3',
						title : '登録役割コード3',
						width : 100
					}, {
						field : 'createBy',
						title : '登録ユーザ',
						width : 100
					}, {
						field : 'createOn',
						title : '登録日時',
						width : 100,
						formatter : dateFormatter
					}, {
						field : 'updateBy',
						title : '更新ユーザ',
						width : 100
					}, {
						field : 'updateOn',
						title : '更新日時',
						width : 100,
						formatter : dateFormatter
					} ] ]
		} ];

var winWidth = 0;
var winHeight = 0;

$(function() {
	Form_DoInit();
});
function Form_DoInit() {
	top.window.onresize = onresize;
	$('#drpMstList').combobox({
		data : mstArray,
		valueField : 'code',
		textField : 'name'
	});
	if (mstArray.length > 0) {
		$('#drpMstList').combobox('setValue', mstArray[0].code);
		btnSelectMst_Click();
	}
}

function btnSelectMst_Click() {
	var currentMst = $("#drpMstList").combobox("getValue");
	$("#iptCurrentMst").val(currentMst);
	initMst(currentMst);
}
function initMst(mstType) {
	var dgConfig = getArrayByCode(mstType);
	$("#dgWarpper").html("<table id='dg'></table>");
	if (dgConfig.showExportCsv) {
		var turl = $('#spanExportCsv')
				.html(
						"<a href='javascript:void(0)' required style='width: 100px;'>CSV出力</a>")
				.attr("url");
		$('#spanExportCsv>a').linkbutton({
			iconCls : 'icon-save'
		}).bind('click', function() {
			dodownload(turl + "?" + new Date());
		});
	} else {
		$('#spanExportCsv').html("");
	}
	var setting = {
		url : "/IDMS0630/getMstData.htm",
		hasLoading : true,
		data : {
			type : mstType
		},
		hasLoading : true,
		hasContentType : false,
		success : function(res, status) {
			if (res) {
				// var dgConfig = getArrayByCode(mstType);
				// $('#dg').datagrid();
				onresize({
					data : res.data,
					columns : dgConfig.columns
				});
			}
		}
	};
	postAjax(setting);
}

function getArrayByCode(code) {
	for (var i = 0; i < mstArray.length; i++) {
		if (mstArray[i].code == code)
			return mstArray[i];
	}
}

function dateFormatter(timmer) {
	if (timmer == null)
		return "";
	var d = new Date();
	d.setTime(timmer);
	var h = d.getHours(), mi = d.getMinutes(), se = d.getSeconds(), y = d
			.getFullYear(), m = d.getMonth() + 1, d = d.getDate();
	var s = y + "/" + (m > 9 ? m : "0" + m) + "/" + (d > 9 ? d : "0" + d);
	if (this.field == "createOn" || this.field == "updateOn") {
		s += " " + (h > 9 ? h : "0" + h) + ":" + (mi > 9 ? mi : "0" + mi);
	}
	return s;
}
function booleanFormatter(value) {
	if (value != undefined && value != null && value == "1")
		return "○";
	return "";
}
// 選択のデータを修正画面を呼び出し
function showEditor(pkQuery) {
	/*
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {// IE
		event.cancelBubble = true;
	}
	*/

	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	parent.getDialogObject().callback = function(data) {
		btnSelectMst_Click();
	}
	var dgConfig = getArrayByCode($("#iptCurrentMst").val());
	var title = dgConfig.name + "メンテナンス";
	var url = dgConfig.url
			+ ((pkQuery == undefined || pkQuery == null) ? "" : "?" + pkQuery);
	var width = dgConfig.editorWindow.width;
	var height = dgConfig.editorWindow.height;
	parent.openMainDialog(title, url, width, height);
}
// 新規画面を呼び出し
function btnRegister_Click() {
	showEditor();
}
function btnDelete_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	// 削除時、チェックを行う。
	var checkedRows = $('#dg').datagrid("getChecked");
	if (checkedRows.length > 0) {
		parent.confirmComponent.callback = function() {
			var setting = {
				url : "/IDMS0630/deleteMasterData.htm",
				data : JSON.stringify({
					data : checkedRows,
					type : $("#iptCurrentMst").val()
				}),
				hasLoading : true,
				hasContentType : true,
				success : function(res) {
					if (res.errorResultDto) {
						errors = res.errorResultDto.errorList;
						var messages = "";
						$.each(errors, function(i, err) {
							messages += err.errorMessage + "<br>";
						});
						$("#p_errorMessage")[0].innerHTML = messages;
					} else {
						parent.alertShow('削除完了処理', goMessages.I1004);
						btnSelectMst_Click();
					}
				}
			};
			postAjax(setting);
		};
		var title = '削除確認';
		parent.confirmShow(title, getMessage("W1004"));

	} else {
		$("#p_errorMessage")[0].innerHTML = getMessage('E1009', [ '削除対象' ]);
		location = location.href + "#" + (new Date());
	}
}

// サイズを取得する
function onresize(dgCfg) {

	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}

	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}

	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	if (dgCfg == null || dgCfg == undefined) {
		dgCfg = {};
	}
	dgCfg.height = winHeight - 280;
	dgCfg.width = '100%';
	dgCfg.onDblClickRow = function(rowIndex, rowData) {
		var trs = $("#dg").parent().children("div").find(
				"table.datagrid-btable").find("tr");
		if (trs.length > 0) {
			var editorLink = $(trs[rowIndex]).find("td[field=editor]>div>a");
			// showEditor("");
			editorLink.click();
		}
	};
	$('#dg').datagrid(dgCfg);
}

function dodownload(u) {
	$("div.divdownload").html("");
	var url = u + new Date().getTime();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	url += Math.random() + new Date().getTime();
	$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
			"src", url);
}
