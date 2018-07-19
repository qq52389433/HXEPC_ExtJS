//起草红头文 DraftMeetMinutes

Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.DraftMeetMinutes', {
    extend: 'Ext.container.Container',
    alias: 'widget.DraftMeetMinutes',
    //layout: "border",
    layout: 'fit',
    resultvalue: '', mainPanelId: '', projectKeyword: '',
    initComponent: function () {
        var me = this;

        //下一流程状态用户
        me.nextStateUserList = "";

        //审批路径combo初始数据
        me.approvpathdata = [{ text: "二级-编批", value: "二级-编批" }, { text: "三级-编审批", value: "三级-编审批" },
            { text: "四级-编审定批", value: "四级-编审定批" }, { text: "五级-编校审定批", value: "五级-编校审定批" }];

        /////////////////文件编码/////////////////
        //添加项目号text(项目管理类)
        me.fProjectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件编码", labelWidth: 70, readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',//fieldStyle:'color:red',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });

        //添加区域text(项目管理类)
        me.areaText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', emptyText: "机组+(厂房/系统)", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 150//flex: 1
        });

        //添加专业text(项目管理类)
        me.professionText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "专业", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加工作分类代码text(运营管理类)
        me.workClassText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件编码", labelWidth: 60, readOnly: true, emptyText: "工作分类代码", fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });

        //添加工作分项代码text(运营管理类)
        me.workSubText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "工作分项代码", // 去掉laebl中的冒号
            margin: '10 0 0 0', anchor: "80%", labelAlign: "left", width: 100//flex: 1
        });

        //添加工作分项代码text(运营管理类)
        me.departmentText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "部门代码", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加收文类型text
        me.receiveTypeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "文件类型", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
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

        /////////////////发文编码/////////////////
        //添加项目号text
        me.projectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "发文编码", labelWidth: 70, readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',//fieldStyle:'color:red',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });

        //添加发文单位代码text
        me.sendCompanyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', emptyText: "发文单位",
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 130//flex: 1
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

        //添加收 文单位代码text
        me.recCompanyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', emptyText: "收文单位",
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 130//flex: 1
        });

        //选择收文单位按钮
        me.recCompanyButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    if (me.docClass === "operation") {
                        //运营管理类，选择项目部门
                        me.selectRecDepartment();
                    } else {
                        me.selectRecUnit();
                    }

                }
            }
        });

        //添加函件流水号text
        me.numberText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - MOM - ", labelWidth: 45, labelSeparator: '', // 去掉laebl中的冒号
            margin: '10 10 0 0', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });


        //定义函件编码Text
        me.documentCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "函件编码", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%", 
            margin: '10 10 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });

        //定义页数Text
        me.totalPagesText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "页数", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8, width: "50%",
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //定义发送方Text
        me.senderText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "发自", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad: 8, width: "50%",
            margin: '10 5 0 10', fieldStyle: ' background-image: none;', flex: 1
        });

        //定义主送Text
        me.mainFeederText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "主送", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,// width: "100%"
            margin: '10 10 0 10', fieldStyle: ' background-image: none;', flex: 1//红色边框//
        });

        //定义抄送Text
        me.copyPartyText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", 
            fieldLabel: "抄送", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,// width: "100%",
            margin: '10 10 0 10', fieldStyle: ' background-image: none;', flex: 1//红色边框//flex: 1
        });

        //定义会议主题Text
        me.titleText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "会议主题", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8, width: "100%",
            margin: '10 10 0 10', fieldStyle: 'border-color: red; background-image: none;'//红色边框//flex: 1
        });

        //定义会议时间Text
        me.meetTimeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "会议时间", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%",
            margin: '10 10 0 10', fieldStyle: 'background-image: none;'//红色边框//flex: 1
        });

        //定义会议地点Text
        me.meetPlaceText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "会议地点", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%",
            margin: '10 10 0 10', fieldStyle: 'background-image: none;'//红色边框//flex: 1
        });

        //定义主办单位Text
        me.hostUnitText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "主办单位", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%",
            margin: '10 10 0 10', fieldStyle: 'background-image: none;'//红色边框//flex: 1
        });

        //定义主持人Text
        me.moderatorText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "主持人", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%",
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        

        //定义参会单位与人员ext
        me.participantsText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",//"参会单位与人员"
            fieldLabel: "参会单位", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8,  width: "100%",
            margin: '10 10 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });

        //添加会议内容Text
        me.contentText = Ext.create("Ext.form.field.TextArea", {
            xtype: "textarea", anchor: "80%", labelAlign: "right", labelPad: 8,  margin: '10 10 0 10', //margin: '0 5 5 0',
            width: "100%",//flex:1, //width: 460, //
            height: 105, fieldLabel: "会议内容", labelWidth: 70,
        });

        //定义下一流程状态用户Text
        me.nextStateUserText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "审核人", anchor: "80%", labelWidth: 70, labelAlign: "right", labelPad: 8, width: "39%",
            margin: '10 5 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });
        

        //定义发送日期Text
        me.sendDateField = Ext.create("Ext.form.field.Date", {

            name: "date", 
            fieldLabel: ' 发送日期', fieldStyle: ' background-image: none;',
            labelAlign: "right", labelPad: 8,
            editable: true, labelWidth: 70, margin: '10 10 0 10',
            emptyText: "--请选择--",
            format: 'Y年m月d日',
            value: new Date(),
            width: '50%'//width: 230
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
            fieldLabel: '审批路径', labelWidth: 70,
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

        //选择专业按钮
        me.professionButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    var fmSelectProfession = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectProfession', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

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

                    fmSelectProfession.projectKeyword = me.projectKeyword;

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

        //选择专业按钮
        me.areaButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                }
            }
        });

        me.workSubButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    var fmSelectWorkSub = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectWorkSub', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

                    winSelectWorkSub = Ext.widget('window', {
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


        //选择来文的文件类型按钮
        me.receiveTypeButton = Ext.create("Ext.button.Button", {
            text: "..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    var fmSelectReceiveType = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectReceiveType', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

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

                    fmSelectReceiveType.projectKeyword = me.projectKeyword;

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

        ////定义已上传附件按钮
        me.FileUploadButton = Ext.create('Ext.ux.upload.Button', {
            renderTo: Ext.getBody(),
            text: '添加',
            hidden: true,
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

                    for (var i = 0; i < files.length ; i++) {
                        var fname = files[i].name;
                        var pos = fname.lastIndexOf(".");
                        var sct = fname.substring(0, pos);


                        //插入行到文件grid
                        var r = Ext.create('filemodel', {
                            name: files[i].name,
                            code: sct
                        });

                        var rowlength = me.filegrid.getStore().data.length;
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
                    fileCode = me.docName + "_附件" + me.docUploadIndex.toString() + " " + fileCode;

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
            //fields: ["name"],
            fields: ["no", "name", "code", "desc", "page", "edition", "seculevel", "status", "remark"],
            url: "_blank",
        });

        //定义已上传附件的store
        me.filestore = Ext.create("Ext.data.Store", {
            model: "filemodel"
        });
        //定义已上传附件的view
        //定义已上传附件的view
        me.filegrid = Ext.widget("grid", {
            region: "center",
            height: 98,
            //hideHeaders: true,//隐藏表头
            flex: 1,
            store: me.filestore,
            columns: [
                //{ text: '序号', dataIndex: 'index', width: 30 },
                { header: '序号', xtype: 'rownumberer', dataIndex: 'no', width: 30, align: 'center', sortable: false },
                {
                    text: '文件名称', dataIndex: 'name', width: 150
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
                         me.fProjectCodeText,
                         me.areaText,
                         me.professionText, me.professionButton,

                         //运营管理类
                         me.workClassText,
                         me.workSubText, me.workSubButton,
                         me.departmentText, me.departmentButton,

                         me.receiveTypeText, me.receiveTypeButton,
                         me.fNumberText, me.editionText
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
                            me.projectCodeText,
                            me.sendCompanyText, me.sendCompanyButton,
                            me.recCompanyText, me.recCompanyButton,
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
                            me.sendDateField,//发送日期
                            me.totalPagesText //页数
                         ], flex: 1
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
                                  text: "选择...", margins: "10 10 0 0",
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

                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
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
                             }
                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.titleText//会议主题

                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.meetTimeText//会议时间

                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                           me.meetPlaceText//会议地点

                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                           me.hostUnitText//主办单位

                         ], flex: 1
                     },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                           me.moderatorText//主持人

                         ], flex: 1
                     },
                    {
                        layout: "hbox",
                        width: '100%',
                        align: 'stretch',
                        pack: 'start',
                        baseCls: 'my-panel-no-border',//隐藏边框
                        items: [
                          me.participantsText//定义参会单位与人员

                        ], flex: 1
                    },
                    {

                        layout: "hbox",
                        width: '100%',
                        align: 'stretch',
                        pack: 'start',
                        height: 110, margin: '0 0 0 0',
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
                    me.editTopPanel.hide();
                    me.editBottomPanel.hide();
                    me.bottomButtonPanel.hide();
                    me.FileUploadButton.show();
                    me.fileSaveButton.show();
                    me.fileEditButton.hide();
                    //me.filegrid.setHeight(528);
                    me.filegrid.setHeight(me.container.lastBox.height - 40);
                    winDraftMeetMinutesCN.setTitle("起草会议纪要 - 编辑附件");
                    winDraftMeetMinutesCN.closable = false;
                }
            }
        });

        //保存附件按钮
        me.fileSaveButton = Ext.widget('button', {
            text: "保存", width: 55, margins: "5 0 8 0", hidden: true,
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.editTopPanel.show();
                    me.editBottomPanel.show();
                    me.bottomButtonPanel.show();
                    me.FileUploadButton.hide();
                    me.fileEditButton.show();
                    me.fileSaveButton.hide();
                    me.filegrid.setHeight(98);
                    winDraftMeetMinutesCN.setTitle("起草会议纪要");
                    winDraftMeetMinutesCN.closable = true;
                }
            }
        });

        //编辑区域尾部
        me.editBottomPanel = Ext.create("Ext.panel.Panel", {
            layout: "hbox",
            width: '100%',
            align: 'stretch',
            pack: 'start', margins: "0 0 5 0",
            baseCls: 'my-panel-no-border',//隐藏边框
            items: [
              me.approvpathCombo,//定义审批路径
              //{
              //    layout: "hbox",
              //    width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
              //    align: 'stretch', margin: '0 0 0 0', padding: '0 0 0 0',
              //    pack: 'start',
              //    items: [
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
                                      });
                                  })
                              }
                          }
                      }
                  //]
              //}
            ]//, flex: 1
        });

        me.bottomButtonPanel = Ext.create("Ext.panel.Panel", {
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
                  
                            winDraftMeetMinutes.close();
                        }
                    }
                }
            ]
        }),

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
                         pack: 'start', height: 80,
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
                                         width: 70,
                                         baseCls: 'my-panel-no-border',//隐藏边框
                                         align: 'stretch', margin: '5 5 0 12', padding: '0 0 0 0',
                                         pack: 'start', items: [//{ width: 60, baseCls: 'my-panel-no-border' },
                                          me.fileEditButton,
                                           me.FileUploadButton,
                                         me.fileSaveButton
                                            ]
                                     }, me.filegrid]
                             }
                         ]//, flex: 1
                     },
                     me.editBottomPanel
                     
                    

                  ], flex: 1
              },

              me.bottomButtonPanel

              ]
          })

        ];


        me.callParent(arguments);

    },


    //获取起草信函表单默认参数
    sendGetDraftMeetMinutesDefault: function (funCallback) {
        var me = this;


        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetDraftMeetMinutesCNDefault",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword
            },
            success: function (response, options) {
                me.sendGetDraftMeetMinutesDefault_callback(response, options, funCallback);

            }
        });
    },

    //获取起草信函表单默认参数
    sendGetReplyMeetMinutesDefault: function (funCallback, closeWinCallBack) {
        var me = this;

        me.isReply = true;
        me.replyCallbackFun = closeWinCallBack;

        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetReplyMeetMinutesDefault",
                sid: localStorage.getItem("sid"), DocKeyword: me.docKeyword
            },
            success: function (response, options) {
                me.sendGetDraftMeetMinutesDefault_callback(response, options, funCallback);

            }
        });
    },

    //处理获取发文处理表单默认参数的返回
    sendGetDraftMeetMinutesDefault_callback: function (response, options, funCallback) {
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
            var recUnitCode = "";
            var recUnitDesc = "";

            if (me.isReply === true) {
                me.projectKeyword = recod.SendProjectKeyword;//如果是回复信函，就记录发文目录
                recUnitCode = recod.RecUnitCode;
                recUnitDesc = recod.RecUnitDesc;
                me.recCodeText.setValue(recod.RecCode);
            }

            if (strRootProjectCode === undefined || strRootProjectCode === "") {
                //运营信函
                me.docClass = "operation";

                me.fProjectCodeText.setVisible(false);
                me.areaText.setVisible(false);
                me.professionText.setVisible(false);
                me.professionButton.setVisible(false);

                me.projectCodeText.setWidth(60);

                me.areaText.setFieldLabel("");
                me.sendCompanyText.setFieldLabel("");
            } else {
                //项目（非运营）信函
                me.docClass = "project";

                me.workClassText.setVisible(false);
                me.workSubText.setVisible(false);
                me.departmentText.setVisible(false);
                me.workSubButton.setVisible(false);
                me.departmentButton.setVisible(false);

                me.projectCodeText.setValue(strRootProjectCode);
                me.fProjectCodeText.setValue(strRootProjectCode);
            }

            me.numberText.setValue(strDocNumber);

            //var recobjLength = 0;
            ////遍历来往单位数组，添加到来往单位combo
            //for (var itemKey in me.recCompanyList) {
            //    var strCompany = me.recCompanyList[itemKey];
            //    //me.recCompanydata.push({ text: strCompany, value: strCompany });//在数组里添加新的元素  
            //   // me.recCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

            //    recobjLength = recobjLength + 1;
            //    //if (CompanyList[itemKey].Pression != undefined) {
            //    //}
            //}



            var sourceUnitIndex = -1;
            var sendobjLength = 0;
            var companyDesc = "", companyCode = "";

            //遍历来往单位数组，添加到来往单位combo
            for (var itemKey in me.sendCompanyList) {

                //me.sendCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

                if (sourceCompany != undefined && itemKey === sourceCompany) {
                    sourceUnitIndex = sendobjLength;
                    companyCode = me.sendCompanyList[itemKey].value;
                    companyDesc = me.sendCompanyList[itemKey];
                }

                sendobjLength = sendobjLength + 1;

            }


            if (sendobjLength > 0 && sourceUnitIndex != -1) {

                me.sendCompanyText.setValue(companyCode);//me.sendCompanydata[sourceUnitIndex].value); //设置ID值

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


    selectRecUnit: function () {
        var me = this;

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

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

        fmSelectUnit.projectKeyword = me.projectKeyword;

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

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

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

        fmSelectUnit.projectKeyword = me.projectKeyword;

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

        var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: me.Id, projectKeyword: me.projectKeyword });

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

        fmSelectUnit.projectKeyword = me.projectKeyword;

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

    //向服务器发送起草红头公文请求
    send_draft_document: function () {
        var me = this;

        //获取函件编号Text
        //var documentCode = me.documentCodeText.value;


        //项目代码(项目管理类)
        var fProjectCode = me.fProjectCodeText.value;
        //范围(项目管理类)
        var area = me.areaText.value;
        //专业(项目管理类)
        var profession = me.professionText.value;

        //工作分类(运营管理类)
        var workClass = me.workClassText.value;
        //工作分项(运营管理类)
        var workSub = me.workSubText.value;
        //部门(运营管理类)
        var department = me.departmentText.value;


        //来文类型 
        var receiveType = me.receiveTypeText.value;
        //文件流水号
        var fNumber = me.fNumberText.value;
        //版本
        var edition = me.editionText.value;

        //获取文件编码
        var fileCode = "";

        if (me.docClass === "project") {
            //项目管理类
            fileCode = fProjectCode + "-" + area + "-" + profession + "-" + receiveType + "-" + fNumber + "-" + edition;
        } else if (me.docClass === "operation") {
            //运营管理类
            fileCode = workClass + "-" + workSub + "-" + department + "-" + receiveType + "-" + fNumber + "-" + edition;
        }

        //获取发文编码Text
        var sendCode = "";

        if (me.docClass === "project") {
            //项目管理类
            sendCode = me.projectCodeText.value + "-" + me.sendCompanyText.value + "-" + me.recCompanyText.value + "-MOM-" + me.numberText.value;
        } else if (me.docClass === "operation") {
            //运营管理类
            sendCode = me.sendCompanyText.value + "-" + me.recCompanyText.value + "-MOM-" + me.numberText.value;
        }

        ////获取发文日期
        var sendDate = me.sendDateField.value;

        //获取页数Text
        var totalPages = me.totalPagesText.value;

        ////获取主送Text
        var mainFeeder = me.mainFeederText.value;

        ////获取抄送Text
        var copyParty = me.copyPartyText.value;

        //获取会议主题Text
        var title = me.titleText.value;

        //获取会议时间
        var meetTime = me.meetTimeText.value;

        //获取会议地点
        var meetPlace = me.meetPlaceText.value;

        //获取主办单位
        var hostUnit = me.hostUnitText.value;

        //获取主持人
        var moderator = me.moderatorText.value;

        //获取参会单位与人员
        var participants = me.participantsText.value;

        //获取会议内容Text
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
            { name: 'sendCode', value: sendCode },
            //{ name: 'documentCode', value: documentCode },

            { name: 'sendDate', value: sendDate },
            { name: 'totalPages', value: totalPages },

            { name: 'mainFeeder', value: mainFeeder },
            { name: 'copyParty', value: copyParty },

            { name: 'title', value: title },
            { name: 'meetTime', value: meetTime },
            { name: 'meetPlace', value: meetPlace },

            { name: 'hostUnit', value: hostUnit },
            { name: 'moderator', value: moderator },

            { name: 'participants', value: participants },

            { name: 'content', value: content },

            { name: 'approvpath', value: approvpath },
            { name: 'nextStateUserList', value: me.nextStateUserList }
        ];

        var projectAttrJson = Ext.JSON.encode(projectAttr);
        var fileListJson = Ext.JSON.encode(fileArray);

        Ext.MessageBox.wait("正在生成函件，请稍候...", "等待");

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "DraftMeetMinutesCN",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                DocAttrJson: projectAttrJson, FileListJson: fileListJson
            },
            success: function (response, options) {
                me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);
            },
            failure: function (response, options) {
                ////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }
        })
    },

    //发送起草函件后的返回事件
    draft_document_callback: function (response, options, parentKeyword) {
        var me = this;
        var res = Ext.JSON.decode(response.responseText, true);
        var state = res.success;
        if (state === false) {
            var errmsg = res.msg;
            Ext.Msg.alert("错误信息", errmsg);
        }
        else {

            Ext.MessageBox.close();//关闭等待对话框

            Ext.require('Ext.ux.Common.comm', function () {

                winDraftMeetMinutes.close();

                var projectKeyword = res.data[0].ProjectKeyword;

                me.refreshWin(projectKeyword, false);

                //创建流程
                //参数：doclist,wfKeyword,userlist,callback_fun
                //StartNewWorkFlow(projectKeyword, "CREATEPROJECT", "", function (res, WorkFlowKeyword, CuWorkStateCode) {
                //    me.refreshWin(projectKeyword, false);
                //})
            });
        }
    },

    //获取流水号
    getRunNum: function () {
        var me = this;
        var projectCode = me.projectCodeText.value;
        if (projectCode === undefined) {
            projectCode = "";
        }

        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetMeetMinutesCNNumber",
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
        var tree = Ext.getCmp(me.mainPanelId).down('treepanel');
        var viewTreeStore = tree.store;

        viewTreeStore.load({
            callback: function (records, options, success) {//添加回调，获取子目录的文件数量
                if (closeWin)
                    winDraftMeetMinutes.close();

                //展开目录
                Ext.require('Ext.ux.Common.comm', function () {
                    Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(parentKeyword);
                });
            }
        });
    }
});