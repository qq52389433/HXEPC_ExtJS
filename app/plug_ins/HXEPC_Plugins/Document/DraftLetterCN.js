//起草红头文 DraftLetterCN

Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.DraftLetterCN', {
    extend: 'Ext.container.Container',
    alias: 'widget.DraftLetterCN',
    //layout: "border",
    layout: 'fit',
    resultvalue: '', mainPanelId: '', projectKeyword: '',
    initComponent: function () {
        var me = this;

        //所属项目目录
        me.projectDirKeyword = "";
        //文件分类
        me.docClass = "";

        //发送者分类，发送者是部门还是项目
        me.senderClass = "";
        //接收者分类，接收者是部门还是项目
        me.recverClass = "";

        //当前用户的用户组类型（org或project）
        me.curUserGroupType = "";
        //当前用户的用户组关键字 
        me.curUserGroupKeyword = "";

        //是否回复函件
        me.isReply = false;
        me.replyCallbackFun = function () { }

        //上传文档的doc关键字列表
        me.docList = "";

        //附件文件名的前缀
        me.docCode = "";

        //附件序号
        me.docUploadIndex = 0;

        //下一流程状态用户
        me.nextStateUserList = "";

        //抄送单位列表
        me.copyPartyList = "";

        //收发文单位列表初始数据
        me.recCompanyList = [];
        me.sendCompanyList = [];

        //定义区域combo初始数据
        me.areadata = [];

        //定义区域combo初始数据
        //me.professiondata = [];

        //定义发文单位combo初始数据
        me.sendCompanydata = [];

        //定义收文单位combo初始数据
        me.recCompanydata = [];

        //审批路径combo初始数据
        me.approvpathdata = [{ text: "二级-编批", value: "二级-编批" }, { text: "三级-编审批", value: "三级-编审批" },
            { text: "四级-编审定批", value: "四级-编审定批" }, { text: "五级-编校审定批", value: "五级-编校审定批" }];

        //紧急程度combo初始数据
        me.urgencydata = [{ text: "一般", value: "一般" }, { text: "紧急", value: "紧急" }];

        //保密等级combo初始数据
        me.seculeveldata = [{ text: "商业秘密", value: "商业秘密" }, { text: "受限", value: "受限" }, { text: "公开", value: "公开" }];

        //是否需要回复combo初始数据
        me.needreplydata = [{ text: "是", value: "是" }, { text: "否", value: "否" }];

        me.docSourceCheckBox = Ext.create("Ext.form.field.Checkbox", {
           // xtype: "checkbox",
            fieldLabel: "", labelWidth: 0, margin: '10 10 0 10',
            boxLabel: "发给项目",
            listeners: {
                change: function (view, newValue, oldValue, eOpts) {
                    me.projectDirKeyword = "";
                    //if (newValue === true) {
                        //
                        me.setIsProjectFile(newValue);
                   // }
                }
            }
        });

        /////////////////文件编码/////////////////
        //添加项目号text(项目管理类)
        me.fProjectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件属性", labelWidth: 60, readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',//fieldStyle:'color:red',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 60//flex: 1
        });

        //添加机组text(项目管理类)
        me.crewText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "机组", labelWidth: 60, emptyText: "机组", // 去掉laebl中的冒号labelSeparator: '',
            margin: '10 0 0 10', anchor: "80%", labelAlign: "right", width: 130//flex: 1
        });

        //添加区域text(项目管理类)
        me.areaText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "厂房/系统", labelWidth: 60, emptyText: "厂房/系统", // 去掉laebl中的冒号labelSeparator: '',
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 130//flex: 1
        });

        //添加厂房text(项目管理类)
        me.factoryText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "厂房", labelWidth: 30, emptyText: "厂房", // 去掉laebl中的冒号labelSeparator: '',
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加系统text(项目管理类)
        me.systemText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "系统", labelWidth: 30, emptyText: "系统", // 去掉laebl中的冒号labelSeparator: '',
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加专业text(项目管理类)
        me.professionText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "专业", labelWidth: 30, readOnly: true, emptyText: "专业", // 去掉laebl中的冒号 labelSeparator: '', 
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加工作分类代码text(运营管理类)
        me.workClassText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件属性", labelWidth: 60, readOnly: true, emptyText: "工作分类代码",fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });

        //添加工作分项代码text(运营管理类)
        me.workSubText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "工作分项代码", // 去掉laebl中的冒号
            margin: '10 0 0 0', anchor: "80%", labelAlign: "left", width: 100//flex: 1
        });

        //添加工作部门代码text(运营管理类)
        me.departmentText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "部门代码", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加收文类型text
        me.receiveTypeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件类型", labelWidth: 55, readOnly: true, emptyText: "文件类型", // 去掉laebl中的冒号labelSeparator: '',
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 120,value:"LET"//flex: 1
        });

        //添加函件流水号text
        me.fNumberText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 90//flex: 1
        });

        //版本号
        me.editionText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', emptyText: "版本", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 50//flex: 1
        });




        //定义函件编码Text
        me.documentCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "信函编码", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "50%", //width: 230, 
            margin: '10 30 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });

        /////////////////发文编码/////////////////
        //添加项目号text
        me.projectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "项目代码", labelWidth: 60, readOnly: true, emptyText: "项目代码", fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',//fieldStyle:'color:red',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });


        //添加发文单位代码text
        me.sendCompanyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "发文单位", labelWidth: 60, emptyText: "发文单位",
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 130//flex: 1, labelSeparator: ''
        });

        //添加收文单位代码text
        me.recCompanyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "收文单位", labelWidth: 60, emptyText: "收文单位",
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 130//flex: 1, labelSeparator: ''
        });

        //添加函件流水号text
        me.numberText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件ID", labelWidth: 50, labelSeparator: '', // 去掉laebl中的冒号
            margin: '10 10 0 0', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });


        //定义主送Text
        me.mainFeederText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", 
            fieldLabel: "主送", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, //width: "100%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: 'background-image: none;',flex: 1
        });

        //定义抄送Text
        me.copyPartyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", 
            fieldLabel: "抄送", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8,// width: "50%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;',flex: 1
        });

        //定义发送方Text
        me.senderText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "发自", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "50%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;', flex: 1
        });

        //定义发文编码Text
        me.sendCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", 
            fieldLabel: "发文编码", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad: 8, width: 150, //width: "50%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });

        //定义收文编码Text
        me.recCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "收文编码", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "50%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //定义页数Text
        me.totalPagesText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "页数", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "50%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //定义信函主题Text
        me.titleText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "信函主题", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "100%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });


        //定义主送单位Text
        me.deliveryUnitText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "主送单位", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad:8, width: "100%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });

        //添加函件正文Text
        me.contentText = Ext.create("Ext.form.field.TextArea", {
            xtype: "textarea", anchor: "80%", labelAlign: "right", labelPad:8, margin: '10 10 0 10', //margin: '0 5 5 0',
            width: "100%",//flex:1, //width: 460, //
            height: 120, fieldLabel: "函件正文", labelWidth: 60
        });

        //定义保密期限Text
        me.secrTermText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "期限", anchor: "80%", labelWidth: 30, labelAlign: "right", labelPad:8, width: '22%',// width: "50%",//width: 230, 
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //定义下一流程状态用户Text
        me.nextStateUserText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "审核人", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad: 8, width: "40%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //定义发送日期Text
        me.sendDateField = Ext.create("Ext.form.field.Date", {

            name: "date", 
            fieldLabel: ' 发送日期', fieldStyle: ' background-image: none;',
            editable: true, labelWidth: 60, margin: '10 10 0 10',
            labelAlign: "right", labelPad: 8,
            emptyText: "--请选择--",
            format: 'Y年m月d日',
            value: new Date(),
            width:'50%'//width: 230
        });

        //定义回文日期Text
        me.replyDateField = Ext.create("Ext.form.field.Date", {

            name: "date",
            fieldLabel: ' 回文日期', fieldStyle: ' background-image: none;',
            editable: true, labelWidth: 55, margin: '10 10 0 10',
            labelAlign: "right", labelPad: 8,
            emptyText: "--请选择--",
            format: 'Y年m月d日',
            value: new Date(),
            width: '30%' //width: 230
        });

        //添加区域combo
        Ext.define("areaModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.areaProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.areadata,
            model: "areaModel"
        });

        me.areaStore = Ext.create("Ext.data.Store", {
            model: areaModel,
            proxy: me.areaProxy
        });


        me.areaCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: ' - ', labelWidth: 10, labelSeparator: '', // 去掉laebl中的冒号
            triggerAction: "all", store: me.areaStore,
            valueField: 'value', editable: false,//不可输入
            displayField: 'text', margin: '10 0 0 10',// 
            anchor: "80%", labelAlign: "left", width: 150,//
            emptyText: "--请选择--",
            listeners:
            {
                select: function (combo, records, eOpts) {

                    //获取流水号
                    me.getRunNum();
                }
            }
        });


     
        //添加紧急程度combo
        Ext.define("urgencyModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.urgencyProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.urgencydata,
            model: "urgencyModel"
        });

        me.urgencyStore = Ext.create("Ext.data.Store", {
            model: urgencyModel,
            proxy: me.urgencyProxy
        });


        me.urgencyCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '紧急程度', labelWidth: 60,
            triggerAction: "all", store: me.urgencyStore, 
            valueField: 'value', editable: false,//不可输入
            displayField: 'text',margin: '10 10 0 10',// 
            anchor: "80%", labelAlign: "right", labelPad:8, width:'50%',//width: 120,//
            emptyText: "--请选择--", value: "一般",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {

                }
            }
        });

        //添加保密等级combo
        Ext.define("seculevelModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.seculevelProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.seculeveldata,
            model: "seculevelModel"
        });

        me.seculevelStore = Ext.create("Ext.data.Store", {
            model: seculevelModel,
            proxy: me.seculevelProxy
        });


        me.seculevelCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '密级', labelWidth: 60,
            triggerAction: "all", store: me.seculevelStore,
            valueField: 'value', editable: false,//不可输入
            displayField: 'text',margin: '10 5 0 10',// 
            anchor: "80%", labelAlign: "right", labelPad:8, width:'28%',//width: 120,//
            emptyText: "--请选择--", value: "商业秘密",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {
                    var seculevel = me.seculevelCombo.value;
                    if (seculevel === "公开") {
                        me.secrTermText.setDisabled(true);
                    } else {
                        me.secrTermText.setDisabled(false);
                    }
                }
            }
        });

        
        //添加是否需要回复combo
        Ext.define("needreplyModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.needreplyProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.needreplydata,
            model: "needreplyModel"
        });

        me.needreplyStore = Ext.create("Ext.data.Store", {
            model: needreplyModel,
            proxy: me.needreplyProxy
        });


        me.needreplyCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '需要回复', labelWidth: 60,
            triggerAction: "all", store: me.needreplyStore, 
            valueField: 'value', editable: false,//不可输入
            displayField: 'text',margin: '10 5 0 10',// 
            anchor: "80%", labelAlign: "right", labelPad:8, width: '20%',// width: 120,//
            emptyText: "--请选择--", value: "是",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {
                    var seculevel = me.needreplyCombo.value;
                    if (seculevel === "否") {
                        me.replyDateField.setDisabled(true);
                    } else {
                        me.replyDateField.setDisabled(false);
                    }
                }
            }
        });

        //添加审批路径combo
        Ext.define("approvpathModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.approvpathProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.approvpathdata,
            model: "approvpathModel"
        });

        me.approvpathStore = Ext.create("Ext.data.Store", {
            model: approvpathModel,
            proxy: me.approvpathProxy
        });


        me.approvpathCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '审批路径', labelWidth: 60,
            triggerAction: "all", store: me.approvpathStore,
            valueField: 'value', editable: false,//不可输入
            displayField: 'text', margin: '10 5 0 10',// 
            anchor: "80%", labelAlign: "right", labelPad: 8, width: '50%',//width: 120,//
            emptyText: "--请选择--", value: "四级-编审定批",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {
                    var approvpath = me.approvpathCombo.value;
                    if (approvpath === "二级-编批") {
                        me.nextStateUserText.setFieldLabel("批准人");
                    } else if (approvpath === "五级-编校审定批") {
                        me.nextStateUserText.setFieldLabel("校核人");
                    } else if (approvpath === "三级-编审批" || approvpath === "四级-编审定批") {
                        me.nextStateUserText.setFieldLabel("审核人");
                    }

                }
            }
        });

        //定义上传附件按钮
        me.FileUploadButton = Ext.create('Ext.ux.upload.Button', {
            renderTo: Ext.getBody(),
            text: '添加',
            hidden:true,
            //plugins: [{
            //    ptype: 'ux.upload.window',
            //    //ptype: Ext.ux.upload.plugin.Window,
            //    title: '上传文件',
            //    width: 520,
            //    height: 350
            //}
            //], //margin: '8 0 8 0',
            uploader:
            {
                url: 'WebApi/Post',
                uploadpath: '/Root/files',
                autoStart: false,//选择文件后是否自动上传
                max_file_size: '20020mb',
                multipart_params: { 'guid': '', 'ProjectKeyword': '', 'sid': '', 'C': 'AVEVA.CDMS.WebApi.FileController', 'A': 'UploadFile', 'SureReplace': 'false', 'AppendFilePath': '', 'user': '' }, //设置你的参数//{},
                drop_element: me.filegrid,//拖拽控件
                statusQueuedText: '准备上传',
                statusUploadingText: '上传中 ({0}%)',
                statusFailedText: '<span style="color: red">错误</span>',
                statusDoneText: '<span style="color: green">已完成</span>',
                statusInvalidSizeText: '文件过大',
                statusInvalidExtensionText: '错误的文件类型'
            },
            listeners:
            {
                uploadstarted: function (uploader, files) {

                },

                filesadded: function (uploader, files) {
                    uploader.multipart_params.ProjectKeyword = "temp";// me.grid.store.proxy.extraParams.ProjectKeyWord;
                    uploader.multipart_params.sid = localStorage.getItem("sid");

                    //var sct=me.sendCodeText.value;
                    //var sct = me.projectCodeText.value + "-" + me.sendCompanyText.value + "-" + me.recCompanyText.value + "-LET-" + me.numberText.value;
                    //var strFileName=file.replace(/^.+?\([^\]+?)(.[^.\]*?)?$/gi,"$1");

                    for (var i = 0; i < files.length ; i++) {
                        var fname = files[i].name;
                        var pos = fname.lastIndexOf(".");
                        var sct = fname.substring(0, pos);

                        //插入行到文件grid
                        var rowlength = me.filegrid.getStore().data.length;

                        var r = Ext.create('filemodel', {
                            name: files[i].name,
                            code: sct// === undefined ? "" : (sct.length > 0 ? sct + "附件" + (rowlength + 1) : "")
                        });

                        me.filegrid.getStore().insert(rowlength, r);
                    }
                    return true;
                },

                beforeupload: function (uploadbasic, uploader, file) {
                    //console.log('beforeupload');			
                    //上传文件而不是替换文件时，这里要把Doc关键字重置
                    uploadbasic.multipart_params.DocKeyword = "";

                    var extIndex = file.name.lastIndexOf(".");
                    var fileCode = file.name;
                    if (extIndex >= 0) {
                        fileCode = fileCode.substring(0, extIndex);
                    }

                    //规范附件名称
                    me.docUploadIndex = me.docUploadIndex + 1;
                    fileCode = me.docCode + "附件" + me.docUploadIndex.toString();//+ " " + fileCode;

                    Ext.require('Ext.ux.Common.comm', function () {
                        //先创建文档
                        createDoc(uploadbasic, file, me.newProjectKeyword, fileCode, "", "", function (uploadbasic, res, options, DocKeyword) {
                            //var state = res.success;
                            if (res.success === true) {
                                //处理创建文档后的返回事件
                                me.docList = me.docList + "," + DocKeyword;

                                //触发服务端BeforeUploadFile事件，如果是断点续传，获取已上传的文件大小
                                sendBeforeUploadFile(uploadbasic, options.file, DocKeyword, me);
                            }
                        });
                    });
                },

                fileuploaded: function (uploader, file) {
                    //console.log('fileuploaded');
                    //文件上传后的事件
                    Ext.require('Ext.ux.Common.comm', function () {
                        afterUploadFile(uploader, file, me.ServerFullFileName);
                    });
                },

                uploadcomplete: function (uploader, success, failed) {
                    //设置上传附件完毕标记
                    me.uploadCompleteState = true;
                },
                scope: this
            }, width: 55


        });

        //定义已上传附件的model
        Ext.define("filemodel", {
            extend: "Ext.data.Model",
            fields: ["no","name", "code", "desc", "page", "edition", "seculevel", "status", "remark"],
            url: "_blank",
        });

        //定义已上传附件的store
        me.filestore = Ext.create("Ext.data.Store", {
            model: "filemodel"
        });
        //定义已上传附件的view
        me.filegrid = Ext.widget("grid", {
            region: "center",
            height: 98,
            //hideHeaders: true,//隐藏表头
            flex: 1,
            store: me.filestore,
            columns: [
                //{ text: '序号', dataIndex: 'index', width: 30 },
                {
                    header: '序号', xtype: 'rownumberer', dataIndex: 'no', width: 30, align: 'center', sortable: false,readOnly:true

                },
                {
                    text: '文件名称', dataIndex: 'name', width: 150,readOnly:true
                },
                {
                    text: '文件编码', dataIndex: 'code', width: 190,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '文件题名', dataIndex: 'desc', width: 130,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '页数', dataIndex: 'page', width: 30,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '版次', dataIndex: 'edition', width: 30,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '密级', dataIndex: 'seculevel', width: 50,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '状态', dataIndex: 'status', width: 30,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '备注', dataIndex: 'remark', width: 40,
                    editor: {
                        allowBlank: true
                    }
                }
            ],
            listeners: {
                "edit": function (editor, e) {//去除红色箭头
                    e.record.commit();
                }
            },
            stripeRows: true, //斑马线效果
            selType: 'cellmodel',
            plugins: [
                     Ext.create('Ext.grid.plugin.CellEditing', {
                         clicksToEdit: 1 //设置单击单元格编辑(设置为2是双击进行修改)
                     })
            ]
            //,
            //tbar: [
            //    me.fileSaveButton,
            //    '-',
            //    //me.FileUploadButton
                  
                 
            //]
        });


        //选择专业按钮
        me.editAttrButton = Ext.create("Ext.button.Button", {
            text: "录入属性", margins: "10 0 0 10",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.editFileAttr();
                }
            }
        });

        me.projectCodeButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.selectProject();
                }
            }
        });

        //选择机组按钮
        me.crewButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;
                    }

                    var fmSelectCrew = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectCrew', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectCrew = Ext.widget('window', {
                        title: '选择机组',//（机组+厂房/系统）',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectCrew,
                        defaultFocus: 'firstName'
                    });

                    fmSelectCrew.projectKeyword = me.projectDirKeyword;

                    winSelectCrew.show();


                    //监听子窗口关闭事件
                    winSelectCrew.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var crewCode = "";
                            var crewDesc = "";
                            var crewValue = "";

                            crewCode = window.parent.resultvalue;
                            //crewDesc = window.parent.crewdesclist;
                            //crewValue = window.parent.crewvaluelist;

                            //if (crewCode.indexOf(",") > 0) {
                            // var words = crewCode.split(',')
                            //crewCode = crewCode.substring(0, crewCode.indexOf(","));
                            //crewDesc = crewDesc.substring(0, crewDesc.indexOf(";"));
                            //}

                            me.crewText.setValue(crewCode);

                        }
                    });
                }
            }
        });

        //选择厂房按钮
        me.factoryButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;
                    }

                    var fmSelectFactory = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectFactory', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectFactory = Ext.widget('window', {
                        title: '选择厂房',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectFactory,
                        defaultFocus: 'firstName'
                    });

                    fmSelectFactory.projectKeyword = me.projectDirKeyword;

                    winSelectFactory.show();


                    //监听子窗口关闭事件
                    winSelectFactory.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var factoryCode = "";
                            var factoryDesc = "";
                            var factoryValue = "";

                            factoryCode = window.parent.resultvalue;
                            //factoryDesc = window.parent.factorydesclist;
                            //factoryValue = window.parent.factoryvaluelist;

                            //if (factoryCode.indexOf(",") > 0) {
                            // var words = factoryCode.split(',')
                            //factoryCode = factoryCode.substring(0, factoryCode.indexOf(","));
                            //factoryDesc = factoryDesc.substring(0, factoryDesc.indexOf(";"));
                            //}

                            me.factoryText.setValue(factoryCode);

                        }
                    });
                }
            }
        });


        //选择系统按钮
        me.systemButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;
                    }

                    var fmSelectSystem = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectSystem', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectSystem = Ext.widget('window', {
                        title: '选择系统',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectSystem,
                        defaultFocus: 'firstName'
                    });

                    fmSelectSystem.projectKeyword = me.projectDirKeyword;

                    winSelectSystem.show();


                    //监听子窗口关闭事件
                    winSelectSystem.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var SystemCode = "";
                            var SystemDesc = "";
                            var SystemValue = "";

                            SystemCode = window.parent.resultvalue;
                            //SystemDesc = window.parent.Systemdesclist;
                            //SystemValue = window.parent.Systemvaluelist;

                            //if (SystemCode.indexOf(",") > 0) {
                            // var words = SystemCode.split(',')
                            //SystemCode = SystemCode.substring(0, SystemCode.indexOf(","));
                            //SystemDesc = SystemDesc.substring(0, SystemDesc.indexOf(";"));
                            //}

                            me.systemText.setValue(SystemCode);

                        }
                    });
                }
            }
        });

        //选择区域按钮
        me.areaButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;
                    }

                    var fmSelectArea = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectArea', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectArea = Ext.widget('window', {
                        title: '选择厂房/系统',//（机组+厂房/系统）',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectArea,
                        defaultFocus: 'firstName'
                    });

                    fmSelectArea.projectKeyword = me.projectDirKeyword;

                    winSelectArea.show();


                    //监听子窗口关闭事件
                    winSelectArea.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var areaCode = "";
                            var areaDesc = "";
                            var areaValue = "";

                            areaCode = window.parent.resultvalue;
                            //areaDesc = window.parent.areadesclist;
                            //areaValue = window.parent.areavaluelist;

                            //if (areaCode.indexOf(",") > 0) {
                                // var words = areaCode.split(',')
                                //areaCode = areaCode.substring(0, areaCode.indexOf(","));
                                //areaDesc = areaDesc.substring(0, areaDesc.indexOf(";"));
                            //}

                            me.areaText.setValue(areaCode);

                        }
                    });
                }
            }
        });

        me.workSubButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    var fmSelectWorkSub= Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectWorkSub', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

                    winSelectWorkSub= Ext.widget('window', {
                        title: '选择工作分项',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectWorkSub,
                        defaultFocus: 'firstName'
                    });

                    fmSelectWorkSub.projectKeyword = me.projectKeyword;

                    winSelectWorkSub.show();


                    //监听子窗口关闭事件
                    winSelectWorkSub.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var workSubCode = "";
                            var workSubDesc = "";
                            var workSubValue = "";

                            workSubCode = window.parent.resultvalue;
                            workSubDesc = window.parent.workSubdesclist;
                            workSubType = window.parent.resulttype;

                            if (workSubCode.indexOf(",") > 0) {
                                // var words = workSubCode.split(',')
                                workSubCode = workSubCode.substring(0, workSubCode.indexOf(","));
                                workSubDesc = workSubDesc.substring(0, workSubDesc.indexOf(";"));
                                workSubType = workSubType.substring(0, workSubType.indexOf(","));
                            }

                            me.workSubText.setValue(workSubCode);
                            me.workClassText.setValue(workSubType);

                        }
                    });
                }
            }
        });

        //文件编码里面的选择部门按钮
        me.departmentButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.selectRecDepartment();

                }
            }
        });

        //选择收文单位按钮
        me.recCompanyButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    if (me.docClass === "operation") {
                        //运营管理类，选择项目部门
                        me.selectRecDepartment();
                    }else {
                        me.selectRecUnit();
                    }

                }
            }
        });

        //选择发文单位按钮
        me.sendCompanyButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    if (me.docClass === "operation") {
                        //运营管理类，选择项目部门
                        me.selectSendDepartment();
                    } else {
                        me.selectSendUnit();
                    }

                }
            }
        });

        //选择专业按钮
        me.professionButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;

                    }
                    var fmSelectProfession = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectProfession', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectProfession = Ext.widget('window', {
                        title: '选择专业',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectProfession,
                        defaultFocus: 'firstName'
                    });

                    fmSelectProfession.projectKeyword = me.projectDirKeyword;

                    winSelectProfession.show();


                    //监听子窗口关闭事件
                    winSelectProfession.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var professionCode = "";
                            var professionDesc = "";
                            var professionValue = "";

                            professionCode = window.parent.resultvalue;
                            professionDesc = window.parent.professiondesclist;
                            //professionValue = window.parent.professionvaluelist;

                            if (professionCode.indexOf(",") > 0) {
                                // var words = professionCode.split(',')
                                professionCode = professionCode.substring(0, professionCode.indexOf(","));
                                professionDesc = professionDesc.substring(0, professionDesc.indexOf(";"));
                            }

                            me.professionText.setValue(professionCode);

                        }
                    });
                }
            }
        });

        //选择来文的文件类型按钮
        me.receiveTypeButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    if (me.docClass === "project" && me.projectDirKeyword === "") {
                        Ext.Msg.alert("错误信息", "请选择项目！");
                        return;
                    }

                    var fmSelectReceiveType = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectReceiveType', { title: "", mainPanelId: me.Id, projectKeyword: me.projectDirKeyword });

                    winSelectReceiveType = Ext.widget('window', {
                        title: '选择文件类型',
                        width: 738,
                        height: 558,
                        minWidth: 738,
                        minHeight: 558,
                        layout: 'fit',
                        resizable: true,
                        modal: true,
                        closeAction: 'close', //close 关闭  hide  隐藏  
                        items: fmSelectReceiveType,
                        defaultFocus: 'firstName'
                    });

                    fmSelectReceiveType.projectKeyword = me.projectDirKeyword;

                    winSelectReceiveType.show();


                    //监听子窗口关闭事件
                    winSelectReceiveType.on('close', function () {
                        if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                            var receiveTypeCode = "";
                            var receiveTypeDesc = "";
                            var receiveTypeValue = "";

                            receiveTypeCode = window.parent.resultvalue;
                            receiveTypeDesc = window.parent.receiveTypedesclist;
                            //receiveTypeValue = window.parent.receiveTypevaluelist;

                            if (receiveTypeCode.indexOf(",") > 0) {
                                // var words = receiveTypeCode.split(',')
                                receiveTypeCode = receiveTypeCode.substring(0, receiveTypeCode.indexOf(","));
                                receiveTypeDesc = receiveTypeDesc.substring(0, receiveTypeDesc.indexOf(";"));
                            }

                            me.receiveTypeText.setValue(receiveTypeCode);

                        }
                    });
                }
            }
        });

        //编辑区域头部
        me.editTopPanel = Ext.create("Ext.panel.Panel", {
            baseCls: 'my-panel-no-border',//隐藏边框
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            margin: '0 0 0 0',// 
            items: [
                 {

                     baseCls: 'my-panel-no-border',//隐藏边框
                     layout: {
                         type: 'hbox',
                         pack: 'start',
                         align: 'stretch'
                     },
                     items: [
                         //项目管理类
                         //me.fProjectCodeText,
                         me.crewText, me.crewButton,
                         me.factoryText, me.factoryButton,
                         me.systemText, me.systemButton,
                         me.professionText, me.professionButton,

                         //运营管理类
                         me.workClassText,
                         me.workSubText, me.workSubButton,
                         me.departmentText, me.departmentButton,

                         me.receiveTypeText, //me.receiveTypeButton//,
                         //me.fNumberText, me.editionText
                         me.editAttrButton,
                         {
                             flex: 1, baseCls: 'my-panel-no-border'//隐藏边框
                         },
                         me.docSourceCheckBox
                     ],
                     flex: 1
                 },
                    {

                        baseCls: 'my-panel-no-border',//隐藏边框
                        layout: {
                            type: 'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [
                            me.projectCodeText, me.projectCodeButton,
                            me.sendCompanyText, me.sendCompanyButton,
                            me.recCompanyText,me.recCompanyButton,
                            me.numberText
                        ],
                        flex: 1


                    },

                {
                    layout: "hbox",
                    width: '100%',
                    align: 'stretch',
                    pack: 'start',
                    baseCls: 'my-panel-no-border',//隐藏边框
                    items: [
                       me.mainFeederText,//主送
                      {
                          xtype: "button",
                          text: "选择...",  margins: "10 10 0 0",
                          listeners: {
                              "click": function (btn, e, eOpts) {//添加点击按钮事件
                                  if (me.docClass === "operation") {
                                      //运营管理类 ，选择接收部门
                                      me.selectRecDepartment();
                                      return;
                                  }
                                  else {
                                      //项目管理类，选择接收单位
                                      me.selectRecUnit();
                                  }
                              }
                          }
                      }
                        //me.sendCodeText //发文编码
                    ], flex: 1
                },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                     {
                         layout: "hbox",
                         width: '50%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.copyPartyText,//抄送
                             {
                                 xtype: "button",
                                 text: "选择...", margins: "10 10 0 0",
                                 listeners: {
                                     "click": function (btn, e, eOpts) {//添加点击按钮事件
                                         if (me.docClass === "operation") {
                                             //运营管理类 ，选择接收部门
                                             me.selectCopyDepartment();
                                             return;
                                         }
                                         else {
                                             //项目管理类，选择接收单位
                                             me.selectCopyUnit();
                                         }
                                     }
                                 }
                             }]
                     },
                            me.recCodeText  //收文编码
                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                             {
                                 layout: "hbox",
                                 width: '50%',
                                 align: 'stretch',
                                 pack: 'start',
                                 baseCls: 'my-panel-no-border',//隐藏边框
                                 items: [
                            me.senderText,//发自
                            {
                                xtype: "button",
                                text: "选择...", margins: "10 0 0 0",
                                listeners: {
                                    "click": function (btn, e, eOpts) {//添加点击按钮事件
                                        if (me.docClass === "operation") {
                                            //运营管理类 ，选择接收部门
                                            me.selectSendDepartment();
                                            return;
                                        }
                                        else {
                                            //项目管理类，选择接收单位
                                            me.selectSendUnit();
                                        }
                                    }
                                }
                            }]
                           },
                           me.totalPagesText//页数
                         ], flex: 1
                     }, {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.urgencyCombo,//紧急程度
                           me.sendDateField//发送日期
                         ], flex: 1
                     }, {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.seculevelCombo,//保密等级
                            me.secrTermText, // 保密期限
                            me.needreplyCombo,//是否需要回复
                            me.replyDateField//回文日期
                         ], flex: 1
                     }, {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.titleText//信函主题
                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         height: 125, margin: '0 0 0 0',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                              me.contentText  // 函件正文
                         ]//, flex: 1
                     }
            ]
        });

        //编辑附件按钮
        me.fileEditButton = Ext.create("Ext.button.Button", {
            //xtype: "button",
            text: "附件", width: 55, margins: "0 0 8 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    //if (me.docClass === "project" && me.projectDirKeyword === "") {
                    //    Ext.Msg.alert("错误信息", "请选择项目！");
                    //    return;
                    //}

                    me.editTopPanel.hide();
                    me.editBottomPanel.hide();
                    me.bottomButtonPanel.hide();
                    me.FileUploadButton.show();
                    me.fileSaveButton.show();
                    me.fileEditButton.hide();
                    //me.filegrid.setHeight(528);
                    me.filegrid.setHeight(me.container.lastBox.height - 40);
                    winDraftLetterCN.setTitle("起草信函 - 编辑附件");
                    winDraftLetterCN.closable = false;
                }
            }
        });

        //保存附件按钮
        me.fileSaveButton = Ext.widget('button',{
            text: "保存", width: 55, margins: "5 0 8 0",hidden:true,
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.editTopPanel.show();
                    me.editBottomPanel.show();
                    me.bottomButtonPanel.show();
                    me.FileUploadButton.hide();
                    me.fileEditButton.show();
                    me.fileSaveButton.hide();
                    me.filegrid.setHeight(98);
                    winDraftLetterCN.setTitle("起草信函");
                    winDraftLetterCN.closable = true;
                }
            }
        });

   
        //编辑区域尾部
        me.editBottomPanel = Ext.create("Ext.panel.Panel", {
            layout: "hbox",
            width: '100%',
            align: 'stretch',
            pack: 'start', margins: "0 0 0 0",
            baseCls: 'my-panel-no-border',//隐藏边框
            items: [
              me.approvpathCombo,//定义审批路径
                      me.nextStateUserText,
                      {
                          xtype: "button",
                          text: "选择...", margins: "10 0 0 5",
                          listeners: {
                              "click": function (btn, e, eOpts) {//添加点击按钮事件
                                  Ext.require('Ext.ux.Common.comm', function () {
                                      showSelectUserWin("getUser", "", "", function () {
                                          me.nextStateUserText.setValue(window.parent.usernamelist);
                                          me.nextStateUserList = window.parent.resultvalue;
                                      }, me.curUserGroupType, me.curUserGroupKeyword);
        
                                  })
                              }
                          }
                      }
            ]//, flex: 1
        });

        //底部按钮区域
        me.bottomButtonPanel = Ext.create("Ext.panel.Panel", {
            //xtype: "panel",
            layout: "hbox",
            baseCls: 'my-panel-no-border',//隐藏边框
            //align: 'right',
            //pack: 'end',//组件在容器右边
            items: [{
                flex: 1, baseCls: 'my-panel-no-border'//隐藏边框
            },
                {
                    xtype: "button",
                    text: "确定", width: 60, margins: "10 5 10 5",
                    listeners: {
                        "click": function (btn, e, eOpts) {//添加点击按钮事件
                            me.send_draft_document();
                        }
                    }
                },
                {
                    xtype: "button",
                    text: "取消", width: 60, margins: "10 15 10 5",
                    listeners: {
                        "click": function (btn, e, eOpts) {//添加点击按钮事件

                            winDraftLetterCN.close();
                        }
                    }
                }
            ]
        });

        //添加列表
        me.items = [
          Ext.widget('form', {
              baseCls: 'my-panel-no-border',//隐藏边框
              layout: {
                  type: 'vbox',
                  align: 'stretch',
                  pack: 'start'
              },
              items: [{//上部容器
                  baseCls: 'my-panel-no-border',//隐藏边框
                  layout: {
                      type: 'vbox',
                      pack: 'start',
                      align: 'stretch'
                  },
                  margin: '10 0 0 0',// 
                  items: [
                     me.editTopPanel,
                     {
                         layout: "vbox",
                         width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                         align: 'stretch', margin: '0 10 0 0', padding: '0 0 0 0',
                         pack: 'start', height: 100,
                         items: [
                             {
                                 layout: "hbox",
                                 width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                                 align: 'stretch', margin: '10 0 0 0', padding: '0 0 0 0',
                                 pack: 'start',
                                 items: [
                                     {
                                         layout: "vbox",
                                         //width: '100%',
                                         width: 60,
                                         baseCls: 'my-panel-no-border',//隐藏边框
                                         align: 'stretch', margin: '5 5 0 12', padding: '0 0 0 0',
                                         pack: 'start', items: [
                                          me.fileEditButton,
                                           me.FileUploadButton,
                                         me.fileSaveButton
                                         ]
                                     }, me.filegrid]
                             }
                         ], flex: 1
                     }, me.editBottomPanel
                   

                  ], flex: 1
              },
              me.bottomButtonPanel

              ]
          })

        ];



        me.callParent(arguments);

    },


    //获取起草信函表单默认参数
    sendGetDraftLetterCNDefault: function (funCallback) {
        var me = this;

        var draftOnProject="false";
        if (me.projectKeyword===me.projectDirKeyword){
            draftOnProject="true";
        }
        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetDraftLetterCNDefault",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                DraftOnProject : draftOnProject
                //ProjectDirKeyword: me.projectDirKeyword
            },
            success: function (response, options) {
                me.sendGetDraftLetterCNDefault_callback(response, options, funCallback);

            }
        });
    },

    //获取起草信函表单默认参数
    sendGetReplyLetterCNDefault: function (funCallback, closeWinCallBack) {
        var me = this;

        me.isReply = true;
        me.replyCallbackFun = closeWinCallBack;

        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetReplyLetterCNDefault",
                sid: localStorage.getItem("sid"), DocKeyword: me.docKeyword
            },
            success: function (response, options) {
                me.sendGetDraftLetterCNDefault_callback(response, options, funCallback);

            }
        });
    },

    //处理获取发文处理表单默认参数的返回
    sendGetDraftLetterCNDefault_callback: function (response, options, funCallback) {
        var me = this;

        //获取数据后，更新窗口
        var res = Ext.JSON.decode(response.responseText, true);
        var state = res.success;
        if (state === true) {
            var recod = eval(res.data[0]);

            var strRootProjectCode = recod.RootProjectCode;
            var strDocNumber = recod.DocNumber;
            me.recCompanyList = eval(recod.RecCompanyList);
            me.sendCompanyList = eval(recod.SendCompanyList);
            var sourceCompany = recod.SourceCompany;//项目所属公司
            //当前用户的用户组类型
            me.curUserGroupType = recod.GroupType;
            //当前用户的用户组关键字 
            me.curUserGroupKeyword = recod.GroupKeyword;

            var recUnitCode="";
            var recUnitDesc="";

            if (me.isReply === true) {
                me.projectKeyword = recod.SendProjectKeyword;//如果是回复信函，就记录发文目录
                recUnitCode = recod.RecUnitCode;
                recUnitDesc = recod.RecUnitDesc;
                me.recCodeText.setValue(recod.RecCode);
            }

            if (strRootProjectCode === undefined || strRootProjectCode === "") {
                //运营信函
                me.docClass = "operation";
                me.senderClass = "部门";
                me.recverClass = "部门";

                me.fProjectCodeText.setVisible(false);
                me.areaText.setVisible(false);

                me.crewText.setVisible(false);
                me.crewButton.setVisible(false);
                me.systemText.setVisible(false);
                me.systemButton.setVisible(false);
                me.factoryText.setVisible(false);
                me.factoryButton.setVisible(false);

                me.professionText.setVisible(false);
                me.professionButton.setVisible(false);

                me.projectCodeText.setVisible(false);
                me.projectCodeButton.setVisible(false);
                //me.projectCodeText.setWidth(60);

                me.areaText.setFieldLabel("");
                //me.sendCompanyText.setFieldLabel("");
            } else {
                //项目（非运营）信函
                me.docClass = "project";
                me.senderClass = "项目";
                me.recverClass = "项目";

                me.workClassText.setVisible(false);
                me.workSubText.setVisible(false);
                me.departmentText.setVisible(false);
                me.workSubButton.setVisible(false);
                me.departmentButton.setVisible(false);

                me.projectCodeText.setValue(strRootProjectCode);
                me.fProjectCodeText.setValue(strRootProjectCode);
            }

            me.numberText.setValue(strDocNumber);

            var recobjLength = 0;
            //遍历来往单位数组，添加到来往单位combo
            for (var itemKey in me.recCompanyList) {
                var strCompany = me.recCompanyList[itemKey];
                //me.recCompanydata.push({ text: strCompany, value: strCompany });//在数组里添加新的元素  
                me.recCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

                recobjLength = recobjLength + 1;
                //if (CompanyList[itemKey].Pression != undefined) {
                //}
            }



            var sourceUnitIndex = -1;
            var sendobjLength = 0;
            var companyDesc = "";

            //遍历来往单位数组，添加到来往单位combo
            for (var itemKey in me.sendCompanyList) {
                
                me.sendCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

                if (sourceCompany != undefined && itemKey === sourceCompany) {
                    sourceUnitIndex = sendobjLength;
                    companyDesc = me.sendCompanyList[itemKey];
                }

                sendobjLength = sendobjLength + 1;

            }


            if (sendobjLength > 0 && sourceUnitIndex!=-1) {

                me.sendCompanyText.setValue(me.sendCompanydata[sourceUnitIndex].value); //设置ID值

                me.senderText.setValue(companyDesc);
            }

            
            if (me.isReply === true) {
                //如果是回复信函

                me.mainFeederText.setValue(recUnitDesc);

                me.recCompanyText.setValue(recUnitCode);

                me.departmentText.setValue(recUnitCode);

                me.getRunNum();
            }

            funCallback();
        }
    },


    setIsProjectFile: function (isProjectFile) {
        var me = this;
        if (!isProjectFile) {
            //运营信函
            me.docClass = "operation";

            me.fProjectCodeText.setVisible(false);
            me.areaText.setVisible(false);

            me.crewText.setVisible(false);
            me.crewButton.setVisible(false);
            me.systemText.setVisible(false);
            me.systemButton.setVisible(false);
            me.factoryText.setVisible(false);
            me.factoryButton.setVisible(false);

            me.professionText.setVisible(false);
            me.professionButton.setVisible(false);

            me.projectCodeText.setVisible(false);
            me.projectCodeButton.setVisible(false);
            //me.projectCodeText.setWidth(60);

            me.areaText.setFieldLabel("");
            //me.sendCompanyText.setFieldLabel("");

            ///////////////////////////////////////////////

            me.workClassText.setVisible(true);
            me.workSubText.setVisible(true);
            me.departmentText.setVisible(true);
            me.workSubButton.setVisible(true);
            me.departmentButton.setVisible(true);
        } else {
            //项目（非运营）信函
            me.docClass = "project";

            me.workClassText.setVisible(false);
            me.workSubText.setVisible(false);
            me.departmentText.setVisible(false);
            me.workSubButton.setVisible(false);
            me.departmentButton.setVisible(false);

            //////////////////////////////////////////////

            me.fProjectCodeText.setVisible(true);
            me.areaText.setVisible(true);

            me.crewText.setVisible(true);
            me.crewButton.setVisible(true);
            me.systemText.setVisible(true);
            me.systemButton.setVisible(true);
            me.factoryText.setVisible(true);
            me.factoryButton.setVisible(true);

            me.professionText.setVisible(true);
            me.professionButton.setVisible(true);

            me.projectCodeText.setVisible(true);
            me.projectCodeButton.setVisible(true);
            //me.projectCodeText.setWidth(150);

            me.areaText.setFieldLabel("");
        }
    },

    selectProject: function () {
        var me = this;

        var fmSelectProject = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectProject', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

        winSelectProject = Ext.widget('window', {
            title: '选择项目',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectProject,
            defaultFocus: 'firstName'
        });

        fmSelectProject.projectKeyword = me.projectKeyword;

        winSelectProject.show();


        //监听子窗口关闭事件
        winSelectProject.on('close', function () {
            //if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var projectCode = "";
                var projectDesc = "";
                var projectValue = "";

                projectCode = window.parent.resultvalue;
                projectDesc = window.parent.projectdesclist;
                projectValue = window.parent.projectvaluelist;

                if (projectCode.indexOf(",") > 0) {
                    // var words = projectCode.split(',')
                    projectCode = projectCode.substring(0, projectCode.indexOf(","));
                    projectDesc = projectDesc.substring(0, projectDesc.indexOf(";"));
                    projectValue = projectValue.substring(0, projectValue.indexOf(","));
                }



                me.projectCodeText.setValue(projectCode);

                me.projectDirKeyword = projectValue;

        });
    },

    selectRecUnit: function () {
        var me = this;

        if (me.docClass === "project" && me.projectDirKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var prjKeyword = "";
        if (me.docClass === "project") {
            prjKeyword = me.projectDirKeyword;
        } else {
            prjKeyword = me.projectKeyword;
        }

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: prjKeyword });

        winSelectUnit = Ext.widget('window', {
            title: '选择主送',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectUnit,
            defaultFocus: 'firstName'
        });

        if (me.docClass === "project" ) {
            fmSelectUnit.projectKeyword = me.projectDirKeyword;
        } else {
            fmSelectUnit.projectKeyword = me.projectKeyword;
        }

        winSelectUnit.show();


        //监听子窗口关闭事件
        winSelectUnit.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var unitCode = "";
                var unitDesc = "";
                var unitValue = "";

                unitCode = window.parent.resultvalue;
                unitDesc = window.parent.unitdesclist;
                unitValue = window.parent.unitvaluelist;

                if (unitCode.indexOf(",") > 0) {
                    // var words = unitCode.split(',')
                    unitCode = unitCode.substring(0, unitCode.indexOf(","));
                    unitDesc = unitDesc.substring(0, unitDesc.indexOf(";"));
                }


                me.mainFeederText.setValue(unitDesc);

                me.recCompanyText.setValue(unitCode);

                me.departmentText.setValue(unitCode);

                me.getRunNum();
            }
        });
    },

    selectRecDepartment: function () {
        var me = this;

        if (me.docClass === "project" && me.projectKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var fmSelectDepartment = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectDepartment', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

        winSelectDepartment = Ext.widget('window', {
            title: '选择项目部门',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectDepartment,
            defaultFocus: 'firstName'
        });

        fmSelectDepartment.projectKeyword = me.projectKeyword;

        winSelectDepartment.show();


        //监听子窗口关闭事件
        winSelectDepartment.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var departmentCode = "";
                var departmentDesc = "";
                var departmentValue = "";

                departmentCode = window.parent.resultvalue;
                departmentDesc = window.parent.departmentdesclist;
                departmentType = window.parent.resulttype;

                if (departmentCode.indexOf(",") > 0) {
                    // var words = departmentCode.split(',')
                    departmentCode = departmentCode.substring(0, departmentCode.indexOf(","));
                    departmentDesc = departmentDesc.substring(0, departmentDesc.indexOf(";"));
                    departmentType = departmentType.substring(0, departmentType.indexOf(","));
                }

                me.mainFeederText.setValue(departmentDesc);

                me.recCompanyText.setValue(departmentCode);

                me.departmentText.setValue(departmentCode);
                //me.workClassText.setValue(departmentType);
                me.getRunNum();
            }
        });
    },

    selectSendUnit: function () {
        var me = this;

        if (me.docClass === "project" && me.projectDirKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var prjKeyword = "";
        if (me.docClass === "project") {
            prjKeyword = me.projectDirKeyword;
        } else {
            prjKeyword = me.projectKeyword;
        }

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: prjKeyword });

        winSelectUnit = Ext.widget('window', {
            title: '选择发文单位',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectUnit,
            defaultFocus: 'firstName'
        });

        //fmSelectUnit.projectKeyword = me.projectKeyword;
        if (me.docClass === "project") {
            fmSelectUnit.projectKeyword = me.projectDirKeyword;
        } else {
            fmSelectUnit.projectKeyword = me.projectKeyword;
        }

        winSelectUnit.show();


        //监听子窗口关闭事件
        winSelectUnit.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var unitCode = "";
                var unitDesc = "";
                var unitValue = "";

                unitCode = window.parent.resultvalue;
                unitDesc = window.parent.unitdesclist;
                unitValue = window.parent.unitvaluelist;

                if (unitCode.indexOf(",") > 0) {
                    // var words = unitCode.split(',')
                    unitCode = unitCode.substring(0, unitCode.indexOf(","));
                    unitDesc = unitDesc.substring(0, unitDesc.indexOf(";"));
                }


                me.senderText.setValue(unitDesc);

                me.sendCompanyText.setValue(unitCode);

                me.getRunNum();
            }
        });
    },
    selectSendDepartment: function () {
        var me = this;

        if (me.docClass === "project" && me.projectKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var fmSelectDepartment = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectDepartment', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

        winSelectDepartment = Ext.widget('window', {
            title: '选择发文单位',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectDepartment,
            defaultFocus: 'firstName'
        });

        fmSelectDepartment.projectKeyword = me.projectKeyword;

        winSelectDepartment.show();


        //监听子窗口关闭事件
        winSelectDepartment.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var departmentCode = "";
                var departmentDesc = "";
                var departmentValue = "";

                departmentCode = window.parent.resultvalue;
                departmentDesc = window.parent.departmentdesclist;
                departmentType = window.parent.resulttype;

                if (departmentCode.indexOf(",") > 0) {
                    // var words = departmentCode.split(',')
                    departmentCode = departmentCode.substring(0, departmentCode.indexOf(","));
                    departmentDesc = departmentDesc.substring(0, departmentDesc.indexOf(";"));
                    departmentType = departmentType.substring(0, departmentType.indexOf(","));
                }

                me.senderText.setValue(departmentDesc);

                me.sendCompanyText.setValue(departmentCode);

                me.getRunNum();
            }
        });
    },

    selectCopyUnit: function () {
        var me = this;

        if (me.docClass === "project" && me.projectDirKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var prjKeyword = "";
        if (me.docClass === "project") {
            prjKeyword = me.projectDirKeyword;
        } else {
            prjKeyword = me.projectKeyword;
        }

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: prjKeyword });

        winSelectUnit = Ext.widget('window', {
            title: '选择抄送',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectUnit,
            defaultFocus: 'firstName'
        });

       // fmSelectUnit.projectKeyword = me.projectKeyword;
        if (me.docClass === "project") {
            fmSelectUnit.projectKeyword = me.projectDirKeyword;
        } else {
            fmSelectUnit.projectKeyword = me.projectKeyword;
        }

        winSelectUnit.show();


        //监听子窗口关闭事件
        winSelectUnit.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var unitCode = "";
                var unitDesc = "";
                var unitValue = "";

                unitCode = window.parent.resultvalue;
                unitDesc = window.parent.unitdesclist;
                unitValue = window.parent.unitvaluelist;

                me.copyPartyText.setValue(unitDesc);

            }
        });
    },

    selectCopyDepartment: function () {
        var me = this;

        if (me.docClass === "project" && me.projectKeyword === "") {
            Ext.Msg.alert("错误信息", "请选择项目！");
            return;
        }

        var fmSelectDepartment = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectDepartment', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

        winSelectDepartment = Ext.widget('window', {
            title: '选择发文单位',
            width: 738,
            height: 558,
            minWidth: 738,
            minHeight: 558,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmSelectDepartment,
            defaultFocus: 'firstName'
        });

        fmSelectDepartment.projectKeyword = me.projectKeyword;

        winSelectDepartment.show();


        //监听子窗口关闭事件
        winSelectDepartment.on('close', function () {
            if (window.parent.resultvalue != null && window.parent.resultvalue !== "") {

                var departmentCode = "";
                var departmentDesc = "";
                var departmentValue = "";

                departmentCode = window.parent.resultvalue;
                departmentDesc = window.parent.departmentdesclist;
                departmentType = window.parent.resulttype;

                if (departmentCode.indexOf(",") > 0) {
                    // var words = departmentCode.split(',')
                    departmentCode = departmentCode.substring(0, departmentCode.indexOf(","));
                    //departmentDesc = departmentDesc.substring(0, departmentDesc.indexOf(";"));
                    departmentType = departmentType.substring(0, departmentType.indexOf(","));
                }

                me.copyPartyList = window.parent.resultvalue;
                me.copyPartyText.setValue(departmentDesc);
            }
        });
    },
    //向服务器发送起草红头公文请求
    send_draft_document: function () {
        var me = this;

        ////获取函件编号Text
        //var sendCode = me.documentCodeText.value;

        //项目代码(项目管理类)
        var fProjectCode = me.fProjectCodeText.value=== undefined?"":me.fProjectCodeText.value;
        //范围(项目管理类)
        var area = me.areaText.value === undefined ? "" : me.areaText.value;
        var crew = me.crewText.value === undefined ? "" : me.crewText.value;
        var system = me.systemText.value === undefined ? "" : me.systemText.value;
        var factory = me.factoryText.value === undefined ? "" : me.factoryText.value;
        //专业(项目管理类)
        var profession = me.professionText.value=== undefined?"":me.professionText.value;

        //工作分类(运营管理类)
        var  workClass=me.workClassText.value=== undefined?"":me.workClassText.value;
        //工作分项(运营管理类)
        var workSub = me.workSubText.value=== undefined?"":me.workSubText.value;
        //部门(运营管理类)
        var department = me.departmentText.value === undefined?"":me.departmentText.value;


        //来文类型 
        var receiveType = me.receiveTypeText.value===undefined?"":me.receiveTypeText.value;
        //文件流水号
        var fNumber = me.fNumberText.value === undefined ? "" : me.fNumberText.value;
        //版本
        var edition = me.editionText.value === undefined ? "" : me.editionText.value;


        //获取文件编码
        var fileCode = "";


        if (me.docClass === "project"){
            //项目管理类
            fileCode = fProjectCode + "-" + area + "-" + profession + "-" + receiveType + "-" + fNumber + "-" + edition;
            //crew = me.crewText.value;
            //system = me.systemText.value;
            //factory = me.factoryText.value;
            //profession = me.professionText.value;

        } else if (me.docClass === "operation") {
            //运营管理类
            fileCode = workClass + "-" + workSub + "-" + department + "-" + receiveType + "-" + fNumber + "-" + edition;
        }
        receiveType = me.receiveTypeText.value;

        //获取发送方代码
        var senderCode = me.sendCompanyText.value === undefined ? "" : me.sendCompanyText.value;

        //获取主送方代码
        var mainFeederCode = me.recCompanyText.value === undefined ? "" : me.recCompanyText.value;

        //获取抄送方代码
        var copyCode = me.copyPartyList;

        //获取文件ID
        var fileId=me.numberText.value === undefined ? "" : me.numberText.value;

        //获取主送Text
        var mainFeeder = me.mainFeederText.value;

        //获取抄送Text
        var copyParty = me.copyPartyText.value;

        //获取发送方Text
        var sender = me.senderText.value;

        

        //获取发文编码Text
        var sendCode = "" ;
        
        if (me.docClass === "project") {
            //项目管理类
            sendCode = me.projectCodeText.value + "-" + me.sendCompanyText.value + "-" + me.recCompanyText.value + "-LET-" + me.numberText.value;


        } else if (me.docClass === "operation") {
            //运营管理类
            sendCode = me.sendCompanyText.value + "-" + me.recCompanyText.value + "-LET-" + me.numberText.value;
        }

        //获取收文编码Text
        var recCode = me.recCodeText.value;

        //获取页数Text
        var totalPages = me.totalPagesText.value === undefined ? "" : me.totalPagesText.value;
        if (totalPages === "") {
            Ext.Msg.alert("错误信息", "请输入页数！");
            return;
        }

        //获取紧急程度Combo
        var urgency = me.urgencyCombo.value;

        //获取发送日期
        var sendDate=me.sendDateField.value;

        //获取保密等级Combo
        var seculevel = me.seculevelCombo.value;

        //获取保密期限Text
        var secrTerm = me.secrTermText.value;

        //获取是否需要回复Combo
        var needreply = me.needreplyCombo.value;

        //获取回文日期
        var replyDate = me.replyDateField.value;

        //获取信函主题Text
        var title = me.titleText.value;

        //获取正文内容Text
        var content = me.contentText.value;

        //获取审批路径Combo
        var approvpath = me.approvpathCombo.value;

        //获取文件列表
        var fileArray = [];
        for (var i = 0; i < me.filestore.getCount() ; i++) {
            var record = me.filestore.getAt(i);

            var fn = record.get('name');
            var fc = record.get('code');
            var fd = record.get('desc');
            var fp = record.get('page');
            var fe = record.get('edition');
            var sl = record.get('seculevel');
            var fs = record.get('status');
            var fr = record.get('remark');

            var fa = 
                { fn: fn, fc: fc, fd: fd, fp: fp, fe: fe, sl: sl, fs: fs, fr: fr };
  
            fileArray.push(fa);
            //fileArray.push(record.get('name'));
            //fields: ["no","name", "code", "desc", "page", "edition", "seculevel", "status", "remark"],
        }

        //获取表单数据，转换成JSON字符串
        var projectAttr =
        [


        { name: 'fileCode', value: fileCode },

         { name: 'crew', value: crew },
        { name: 'system', value: system },
        { name: 'factory', value:factory },
        { name: 'profession', value: profession },
        { name: 'receiveType', value: receiveType },

                { name: 'workClass', value: workClass },
        { name: 'workSub', value: workSub },
        { name: 'department', value: department },

            { name: 'mainFeeder', value: mainFeeder },
            { name: 'copyParty', value: copyParty },
            { name: 'sender', value: sender },
            { name: 'sendCode', value: sendCode },
            { name: 'recCode', value: recCode },
            { name: 'totalPages', value: totalPages },
            { name: 'urgency', value: urgency },
            { name: 'sendDate', value: sendDate },
            { name: 'seculevel', value: seculevel },
            { name: 'secrTerm', value: secrTerm },
            { name: 'needreply', value: needreply },
            { name: 'replyDate', value: replyDate },
            { name: 'title', value: title },
            { name: 'content', value: content },
            { name: 'approvpath', value: approvpath },
            { name: 'nextStateUserList', value: me.nextStateUserList },
        { name: 'senderCode', value: senderCode },
        { name: 'mainFeederCode', value: mainFeederCode },
        { name: 'copyCode', value: copyCode },
        { name: 'fileId', value: fileId }

        ];

        var projectAttrJson = Ext.JSON.encode(projectAttr);
        var fileListJson = Ext.JSON.encode(fileArray);

        Ext.MessageBox.wait("正在生成信函，请稍候...", "等待");

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "DraftLetterCN",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                DocAttrJson: projectAttrJson, FileListJson: fileListJson
            },
            success: function (response, options) {
                //me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);

                    me.docKeyword = recod.DocKeyword;//获取联系单文档id
                    me.docList = recod.DocList;//获取流程文档列表
                    me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id
                    //获取附件文件名的前缀
                    me.docCode = recod.DocCode;

                    if (me.FileUploadButton.uploader.uploader.files.length > 0) {
                        ////当有附件时，创建DOC文档成功后，上传附件
                        me.FileUploadButton.uploader.start();

                        Ext.MessageBox.wait("正在上传附件，请稍候...", "等待");

                        var int = window.setInterval(function () {
                            //上传附件完毕
                            if (me.uploadCompleteState === true) {
                                Ext.MessageBox.close();//关闭等待对话框
                                //处理返回事件
                                me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);
                                //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
                                //停止线程
                                window.clearInterval(int);
                            }
                        }, 500);
                    } else {
                        //当没有附件时，处理返回事件
                        me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);
                        //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
                    }
                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                //////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }
        })
    },

    //处理发送起草函件后的返回事件
    draft_document_callback: function (response, options) {
        var me = this;

        //获取审批路径Combo
        var approvpath = me.approvpathCombo.value;

        var sendUnitCode = me.sendCompanyText.value;

        Ext.MessageBox.wait("正在启动流程，请稍候...", "等待");

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "LetterStartWorkFlow",
                sid: localStorage.getItem("sid"), docKeyword: me.docKeyword,
                docList: me.docList, ApprovPath: approvpath,
                UserList: me.nextStateUserList, SendUnitCode: sendUnitCode
            },
            success: function (response, options) {

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);
                    //me.refreshWin(recod.ProjectKeyword, true);
                    me.refreshWin(me.docKeyword, true);
                    

                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                    winDraftLetterCN.close();
                }
            }

        })
    },

    //修改文件属性
    editFileAttr: function () {
        var me = this;

        //弹出操作窗口
        var _fmEditFileProperties = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.EditFileProperties', {
            title: "", projectKeyword: me.projectKeyword, projectDirKeyword: me.projectDirKeyword,
            docClass: me.docClass
        });

        winEditFileProperties = Ext.widget('window', {
            title: '修改文件著录属性',
            closeAction: 'hide',
            width: 780,
            height: 466,
            minWidth: 300,
            minHeight: 300,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: _fmEditFileProperties,
            defaultFocus: 'firstName'
        });

        if (me.docClass === "project") {
            _fmEditFileProperties.fileCodeTypeCombo.setValue("项目管理类");
            _fmEditFileProperties.setIsProjectFile();
        }

        _fmEditFileProperties.projectKeyword = me.projectKeyword;
        _fmEditFileProperties.projectDirKeyword = me.projectDirKeyword;//projectKeyword;


        _fmEditFileProperties.setFilePropertiesDefault(rec.data);

        window.parent.resultarray = undefined;

        // winImportFile.hide();
        winEditFileProperties.show();

        _fmEditFileProperties.projectCodeText.setValue(me.projectCodeText.value);

        _fmEditFileProperties.fProjectCodeText.setValue(me.projectCodeText.value);

        //_fmEditFileProperties.projectDescText.setValue(projectDesc);

        //监听子窗口关闭事件
        winEditFileProperties.on('close', function () {
            //winImportFile.show();

            if (window.parent.resultarray === undefined) { return; }
            var res = window.parent.resultarray[0];

            me.areaText.setValue(res.crew + res.factorycode + res.systemcode);

            me.professionText.setValue(res.major);

            me.receiveTypeText.setValue(res.receiveType);

            me.fNumberText.setValue(res.fNumber);

            me.editionText.setValue(res.edition);
            ////文件编码
            //rec.set('code', res.code);
            ////文件题名
            //rec.set('desc', res.desc);
            ////档号
            //rec.set('reference', res.reference);
            ////卷内序号
            //rec.set('volumenumber', res.volumenumber);
            ////责任人
            //rec.set('responsibility', res.responsibility);
            ////页数
            //rec.set('page', res.page);
            ////份数
            //rec.set('share', res.share);
            ////介质
            //rec.set('medium', res.medium);
            ////语种
            //rec.set('languages', res.languages);
            ////项目名称
            //rec.set('proname', res.proname);
            ////项目代码
            //rec.set('procode', res.procode);
            ////专业
            //rec.set('major', res.major);
            ////机组
            //rec.set('crew', res.crew);
            ////厂房代码
            //rec.set('factorycode', res.factorycode);
            ////厂房名称
            //rec.set('factoryname', res.factoryname);
            ////系统代码
            //rec.set('systemcode', res.systemcode);
            ////系统名称
            //rec.set('systemname', res.systemname);
            ////关联文件编码
            //rec.set('relationfilecode', res.relationfilecode);
            ////关联文件题名
            //rec.set('relationfilename', res.relationfilename);
            ////案卷规格
            //rec.set('filespec', res.filespec);
            ////归档单位
            //rec.set('fileunit', res.fileunit);
            ////密级
            //rec.set('secretgrade', res.secretgrade);
            ////保管时间
            //rec.set('keepingtime', res.keepingtime);
            ////归档文件清单编码
            //rec.set('filelistcode', res.filelistcode);
            ////归档日期
            //rec.set('filelisttime', res.filelisttime);
            ////排架号
            //rec.set('racknumber', res.racknumber);
            ////备注
            //rec.set('note', res.note);

            ////是否新建文件编码
            //rec.set('isNewCode', res.isNewCode);
            ////文件编码类型
            //rec.set('fileCodeType', res.fileCodeType);

            ////文件类型
            //rec.set('receiveType', res.receiveType);
            ////流水号
            //rec.set('fNumber', res.fNumber);
            ////版本
            //rec.set('edition', res.edition);

            ////工作分类代码
            //rec.set('workClass', res.workClass);
            ////工作分项代码
            //rec.set('workSub', res.workSub);
            ////部门代码
            //rec.set('department', res.department);

            //rec.commit();

            //Ext.Msg.alert("错误", Keyword + "," + resArry[0].page);


        });

    },

    //获取流水号
    getRunNum: function () {
        var me = this;
        var projectCode=me.projectCodeText.value;
        if (projectCode === undefined) {
            projectCode = "";
        }

        Ext.Ajax.request({
            //url: 'SHEPCPlugins/GetRunNum',
            url: 'WebApi/Post', 
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetLetterCNNumber",
                //action: me.winAction,
                ProjectCode: projectCode,
                SendCompany: me.sendCompanyText.value, RecCompany: me.recCompanyText.value,
                sid: localStorage.getItem("sid")
            },
            success: function (response, options) {
                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {
                    var recod = eval(res.data[0]);
                    var runNum = recod.RunNum;//获取流水号
                    me.numberText.setValue(runNum);
                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                //                Ext.Msg.alert("系统提示", "连接服务器失败，请尝试重新提交！");
            }
        });
    },

    //刷新表单，参数:parentKeyword:新建的联系单目录
    refreshWin: function (parentKeyword, closeWin) {
        var me = this;
        //var tree = Ext.getCmp(me.mainPanelId).down('treepanel');
        var tree = Ext.getCmp(me.mainPanelId).up('_mainSourceView').down('_mainProjectTree').down('treepanel');
        var viewTreeStore = tree.store;

        viewTreeStore.load({
            callback: function (records, options, success) {//添加回调，获取子目录的文件数量
                if (closeWin)
                    winDraftLetterCN.close();

                //展开目录
                Ext.require('Ext.ux.Common.comm', function () {
                    Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(parentKeyword);
                });

                //回复函件，如果是点下了回复按钮，就把回复函件的流程提交到下一状态
                me.replyCallbackFun();
            }
        });
    }
});