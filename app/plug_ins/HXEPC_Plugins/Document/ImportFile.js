Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.ImportFile', {
    extend: 'Ext.container.Container',
    alias: 'widget.ImportFile',
    //layout: "border",
    layout: 'fit',
    resultvalue: '', mainPanelId: '', projectKeyword: '',
    initComponent: function () {
        var me = this;

        //me.curSelectGridRecod = "";

        //定义上传附件按钮
        me.FileUploadButton = Ext.create('Ext.ux.upload.Button', {
            renderTo: Ext.getBody(),
            iconCls: "file-create",
            text: '添加行',
            // hidden: true,
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
                    uploader.multipart_params.ProjectKeyword = me.projectKeyword;//"temp";// me.grid.store.proxy.extraParams.ProjectKeyWord;
                    uploader.multipart_params.sid = localStorage.getItem("sid");

                    //var sct=me.sendCodeText.value;
                    //var sct = me.projectCodeText.value + "-" + me.sendCompanyText.value + "-" + me.recCompanyText.value + "-LET-" + me.numberText.value;
                    //var strFileName=file.replace(/^.+?\([^\]+?)(.[^.\]*?)?$/gi,"$1");

                    for (var i = 0; i < files.length ; i++) {
                        var fname = files[i].name;
                        var pos = fname.lastIndexOf(".");
                        var sct = fname.substring(0, pos);
                        var fileDesc="";

                        var splitIndex = sct.indexOf("_");
                        if (splitIndex > 0) {
                            var fullCode = sct;
                            sct = fullCode.substring(0, splitIndex);
                            fileDesc = fullCode.substring(splitIndex + 1, fullCode.length);
                        }

                        //插入行到文件grid
                        var rowlength = me.filegrid.getStore().data.length;

                        var r = Ext.create('filemodel', {
                            id:files[i].id,
                            name: files[i].name,
                            code: sct,// === undefined ? "" : (sct.length > 0 ? sct + "附件" + (rowlength + 1) : "")
                            desc: fileDesc,
                            origcode: sct
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
                    var fileDesc = "";

                    if (extIndex >= 0) {
                        fileCode = fileCode.substring(0, extIndex);

                        var splitIndex = fileCode.indexOf("_");
                        if (splitIndex > 0) {
                            var fullCode = fileCode;
                            fileCode = fullCode.substring(0, splitIndex);
                            fileDesc = fullCode.substring(splitIndex + 1, fullCode.length);
                            //fileDesc = fullCode.substring(splitIndex + 1, fullCode.length - splitIndex - 1);
                        }
                    }

                    //规范附件名称
                    //me.docUploadIndex = me.docUploadIndex + 1;
                    //fileCode = me.docCode + "附件" + me.docUploadIndex.toString();//+ " " + fileCode;

                    Ext.require('Ext.ux.Common.comm', function () {
                        //先创建文档
                        //createDoc(uploadbasic, file, me.newProjectKeyword, fileCode, "", "", function (uploadbasic, res, options, DocKeyword) {
                        createDoc(uploadbasic, file, me.newProjectKeyword, fileCode, fileDesc, "CATALOGUING", function (uploadbasic, res, options, DocKeyword) {
                            //var state = res.success;
                            if (res.success === true) {
                                //处理创建文档后的返回事件
                                me.docList = me.docList + "," + DocKeyword;

                                //me.filestore
                                for (var i = 0; i < me.filestore.getCount() ; i++) {
                                    var recored = me.filestore.getAt(i);
                                    if (recored.data.id === options.file.id)
                                    {
                                        recored.data.docKeyword = DocKeyword;
                                        break;
                                    }
                                    // jsonArray.push(record.get('ORGID'));
                                }

                                //触发服务端BeforeUploadFile事件，如果是断点续传，获取已上传的文件大小
                                sendBeforeUploadFile(uploadbasic, options.file, DocKeyword, me);
                            }
                        });
                    });
                },

                fileuploaded: function (uploader, file) {
                    for (var i = 0; i < me.filestore.getCount() ; i++) {
                        var recored = me.filestore.getAt(i);
                        if (recored.data.docKeyword != undefined && recored.data.docKeyword != "") {
                            var docAttr = [
                               { name: "CA_REFERENCE", value: recored.data.reference, attrtype: "attrData" },
                               { name: "CA_VOLUMENUMBER", value: recored.data.volumenumber, attrtype: "attrData" },
                            { name: "CA_REFERENCE", value: recored.data.reference, attrtype: "attrData" },
                            { name: "CA_FILECODE", value: recored.data.code, attrtype: "attrData" },
                            //责任人
                           { name: "CA_RESPONSIBILITY", value: recored.data.responsibility, attrtype: "attrData" },
                            { name: "CA_FILENAME", value: recored.data.desc, attrtype: "attrData" },
                             { name: "CA_PAGE", value: recored.data.page, attrtype: "attrData" },
                              { name: "CA_SHARE", value: recored.data.share, attrtype: "attrData" },
                           { name: "CA_MEDIUM", value: recored.data.medium, attrtype: "attrData" },
                           { name: "CA_LANGUAGES", value: recored.data.languages, attrtype: "attrData" },
                           { name: "CA_PRONAME", value: recored.data.proname, attrtype: "attrData" },
                           { name: "CA_PROCODE", value: recored.data.procode, attrtype: "attrData" },
                           { name: "CA_MAJOR", value: recored.data.major, attrtype: "attrData" },
                           { name: "CA_CREW", value: recored.data.crew, attrtype: "attrData" },
                           { name: "CA_FACTORYCODE", value: recored.data.factoryCode, attrtype: "attrData" },
                           { name: "CA_FACTORYNAME", value: recored.data.factoryname, attrtype: "attrData" },
                           { name: "CA_SYSTEMCODE", value: recored.data.systemcode, attrtype: "attrData" },
                           { name: "CA_SYSTEMNAME", value: recored.data.systemname, attrtype: "attrData" },
                           { name: "CA_RELATIONFILECODE", value: recored.data.relationfilecode, attrtype: "attrData" },
                           { name: "CA_RELATIONFILENAME", value: recored.data.relationfilename, attrtype: "attrData" },
                           { name: "CA_FILESPEC", value: recored.data.filespec, attrtype: "attrData" },
                           { name: "CA_FILEUNIT", value: recored.data.fileunit, attrtype: "attrData" },
                           { name: "CA_SECRETGRADE", value: recored.data.secretgrade, attrtype: "attrData" },
                           { name: "CA_KEEPINGTIME", value: recored.data.keepingtime, attrtype: "attrData" },
                           { name: "CA_FILELISTCODE", value: recored.data.filelistcode, attrtype: "attrData" },
                           { name: "CA_FILELISTTIME", value: recored.data.filelisttime, attrtype: "attrData" },
                           { name: "CA_RACKNUMBER", value: recored.data.racknumber, attrtype: "attrData" },
                           { name: "CA_NOTE", value: recored.data.note, attrtype: "attrData" }
                            ];
                           
                            updateDocAttr(recored.data.docKeyword,docAttr);
                        }
                    }
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
            }, width: 65


        });

        //定义文档列表按钮
        me.fileTbar = Ext.create('Ext.toolbar.Toolbar', {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                me.FileUploadButton,
                {
                    iconCls: "file-create", scope: me, text: '修改行', tooltip: '修改行', listeners: {
                        "click": function (btn, e, eOpts) {
                            me.editFileAttr();
                        }
                    }
                },
            ]
        });

        //定义已上传附件的model
        Ext.define("filemodel", {
            extend: "Ext.data.Model",
            fields: ["id","no", "name", "code", "origcode", "desc"
            , "reference"
      , "volumenumber"
      , "responsibility"
      , "page"
      , "share"
      , "medium"
      , "languages"
      , "proname"
      , "procode"
      , "major"
      , "crew"
      , "factorycode"
      , "factoryname"
      , "systemcode"
      , "systemname"
      , "relationfilecode"
      , "relationfilename"
      , "filespec"
      , "fileunit"
      , "secretgrade"
      , "keepingtime"
      , "filelistcode"
      , "filelisttime"
      , "racknumber"
      , "note",
      "isNewCode","fileCodeType",
      "receiveType","fNumber","edition",
      "workClass", "workSub", "department",
      "docKeyword"
            ],
            url: "_blank",
        });

        //定义已上传附件的store
        me.filestore = Ext.create("Ext.data.Store", {
            model: "filemodel"
        });
        //定义已上传附件的view
        me.filegrid = Ext.widget("grid", {
            region: "center",
            height: 438,
            //hideHeaders: true,//隐藏表头
            
            tbar: me.fileTbar,
            flex: 1,
            store: me.filestore,
            columns: [
                //{ text: '序号', dataIndex: 'index', width: 30 },
                {
                    header: '序号', xtype: 'rownumberer', dataIndex: 'no', width: 30, align: 'center', sortable: false, readOnly: true

                },
                {
                    text: '文件名称', dataIndex: 'name', width: 150, readOnly: true
                },
                {
                    text: '文件编码', dataIndex: 'code', width: 190,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '原文件编码', dataIndex: 'origcode', width: 190,
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
                    text: '档号', dataIndex: 'reference', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '卷内序号', dataIndex: 'volumenumber', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '责任人', dataIndex: 'responsibility', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '页数', dataIndex: 'page', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '份数', dataIndex: 'share', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '介质', dataIndex: 'medium', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '语种', dataIndex: 'languages', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '项目名称', dataIndex: 'proname', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '项目代码', dataIndex: 'procode', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '专业', dataIndex: 'major', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '机组', dataIndex: 'crew', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '厂房代码', dataIndex: 'factorycode', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '厂家名称', dataIndex: 'factoryname', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '系统代码', dataIndex: 'systemcode', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '系统名称', dataIndex: 'systemname', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '关联文件编码', dataIndex: 'relationfilecode', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '关联文件名称', dataIndex: 'relationfilename', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '案卷规格', dataIndex: 'filespec', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '归档单位', dataIndex: 'fileunit', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '密级', dataIndex: 'secretgrade', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '保管期限', dataIndex: 'keepingtime', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '清单编码', dataIndex: 'filelistcode', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '归档日期', dataIndex: 'filelisttime', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '排架号', dataIndex: 'racknumber', width: 60,
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: '备注', dataIndex: 'note', width: 60,
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
                            me.send_import_file();
                        }
                    }
                },
                {
                    xtype: "button",
                    text: "取消", width: 60, margins: "10 15 10 5",
                    listeners: {
                        "click": function (btn, e, eOpts) {//添加点击按钮事件

                            winImportFile.close();
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
                    {
                        layout: "hbox",
                        width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                        align: 'stretch', margin: '10 5 0 0', padding: '0 0 0 0',
                        pack: 'start',
                        items: [
                            //{
                            //    layout: "vbox",
                            //    //width: '100%',
                            //    width: 60,
                            //    baseCls: 'my-panel-no-border',//隐藏边框
                            //    align: 'stretch', margin: '5 5 0 10', padding: '0 0 0 0',
                            //    pack: 'start', items: [
                            //     me.fileEditButton,
                            //      //me.FileUploadButton,
                            //    me.fileSaveButton
                            //    ]
                            //},
                            me.filegrid
                        ]
                    }, me.bottomButtonPanel
                  ]
              }]
          })]

        me.callParent(arguments);
    },

    send_import_file: function () {
        var me = this;
          
        me.newProjectKeyword = me.projectKeyword;

        if (me.FileUploadButton.uploader.uploader.files.length <= 0) {
            Ext.Msg.alert("错误", "请添加文件！");
            return;
        }

        for (var i = 0; i < me.filestore.getCount() ; i++) {
            var recored = me.filestore.getAt(i);
            if (recored.data.page === undefined || recored.data.page === "") {
                Ext.Msg.alert("错误", "请填写文件【" + recored.data.origcode+ "】的页数！");
                return;
            }
            if (recored.data.share === undefined || recored.data.share === "") {
                Ext.Msg.alert("错误", "请填写文件【" + recored.data.origcode + "】的份数！");
                return;
            }
        }

        if (me.FileUploadButton.uploader.uploader.files.length > 0) {
            ////当有附件时，创建DOC文档成功后，上传附件
            me.FileUploadButton.uploader.start();

            Ext.MessageBox.wait("正在上传文件，请稍候...", "等待");

            var int = window.setInterval(function () {
                //上传附件完毕
                if (me.uploadCompleteState === true) {
                    Ext.MessageBox.close();//关闭等待对话框
                    //处理返回事件
                    me.send_import_file_callback();//response, options, "");//, me.projectKeyword, closeWin);
                    //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
                    //停止线程
                    window.clearInterval(int);
                }
            }, 500);
        } else {
            //当没有附件时，处理返回事件
            me.send_import_file_callback(response, options, "");//, me.projectKeyword, closeWin);
            //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
        }
    },

    send_import_file_callback: function (response, options) {
        var me = this;
        Ext.MessageBox.close();//关闭等待对话框
        me.refreshWin(me.projectKeyword,true);
    },

    //修改文件属性
    editFileAttr: function () {
        var me = this;
        //Ext.Msg.alert("错误", "修改文件属性");

        var grid = me.filegrid;
        var rs = grid.getSelectionModel().getSelection();//获取选择的文档
        if (rs !== null && rs.length > 0) {
            var rec = rs[0];//第一个文档
            var Keyword = rec.data.Keyword;
            //me.curSelectGridRecod = rec;

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

            //文件编码
            //_fmEditFileProperties.originalCodeText.setValue(rec.data.code);
            //文件题名
            //_fmEditFileProperties.fileDescText.setValue(rec.data.desc);
            _fmEditFileProperties.setFilePropertiesDefault(rec.data);

            window.parent.resultarray = undefined;

            winImportFile.hide();
            winEditFileProperties.show();
            //监听子窗口关闭事件
            winEditFileProperties.on('close', function () {
                winImportFile.show();
                
                if (window.parent.resultarray === undefined) { return;}
                var res = window.parent.resultarray[0];
                //var Keyword = rec.data.name;
                //文件编码
                rec.set('code', res.code);
                //文件题名
                rec.set('desc', res.desc);
                //档号
                rec.set('reference', res.reference);
                //卷内序号
                rec.set('volumenumber', res.volumenumber);
                //责任人
                rec.set('responsibility', res.responsibility);
                //页数
                rec.set('page', res.page);
                //份数
                rec.set('share', res.share);
                //介质
                rec.set('medium', res.medium);
                //语种
                rec.set('languages', res.languages);
                //项目名称
                rec.set('proname', res.proname);
                //项目代码
                rec.set('procode', res.procode);
                //专业
                rec.set('major', res.major);
                //机组
                rec.set('crew', res.crew);
                //厂房代码
                rec.set('factorycode', res.factorycode);
                //厂房名称
                rec.set('factoryname', res.factoryname);
                //系统代码
                rec.set('systemcode', res.systemcode);
                //系统名称
                rec.set('systemname', res.systemname);
                //关联文件编码
                rec.set('relationfilecode', res.relationfilecode);
                //关联文件题名
                rec.set('relationfilename', res.relationfilename);
                //案卷规格
                rec.set('filespec', res.filespec);
                //归档单位
                rec.set('fileunit', res.fileunit);
                //密级
                rec.set('secretgrade', res.secretgrade);
                //保管时间
                rec.set('keepingtime', res.keepingtime);
                //归档文件清单编码
                rec.set('filelistcode', res.filelistcode);
                //归档日期
                rec.set('filelisttime', res.filelisttime);
                //排架号
                rec.set('racknumber', res.racknumber);
                //备注
                rec.set('note', res.note);

                //是否新建文件编码
                rec.set('isNewCode', res.isNewCode);
                //文件编码类型
                rec.set('fileCodeType', res.fileCodeType);

                //文件类型
                rec.set('receiveType', res.receiveType);
                //流水号
                rec.set('fNumber', res.fNumber);
                //版本
                rec.set('edition', res.edition);

                //工作分类代码
                rec.set('workClass', res.workClass);
                //工作分项代码
                rec.set('workSub', res.workSub);
                //部门代码
                rec.set('department', res.department);

                rec.commit();

                //Ext.Msg.alert("错误", Keyword + "," + resArry[0].page);
                //var grid = me.filegrid;
                //var rs = grid.getSelectionModel().getSelection();//获取选择的文档
                //if (rs !== null && rs.length > 0) {
                //    var rec = rs[0];//第一个文档
                //    var Keyword = rec.data.Keyword;

                //    Ext.Msg.alert("错误", Keyword);
                //}

            });

            //_fmEditFileProperties.mainPanelId = viewTree.id;
            //var projectKeyword = nodes[0].data.Keyword;
            //_fmEditFileProperties.projectKeyword = projectKeyword;
        } else {
            Ext.Msg.alert("错误", "请选择要修改著录属性的文件！");
        }
    },

    updateDocAttr: function (Keyword, AttrObject) {
        var me = this;
        AttrJson = Ext.JSON.encode(AttrObject);

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.WebApi.DocController", A: "UpdateDocAttr",
                sid: localStorage.getItem("sid"), docKeyword: Keyword,
                docAttrJson: AttrJson
            },
            success: function (response, options) {
                var obj = Ext.decode(response.responseText);
                if (obj.success == true) {
                }
            }
        });
    },
           //     );

    //刷新表单，参数:parentKeyword:新建的联系单目录
    refreshWin: function (parentKeyword, closeWin) {
        var me = this;
        //var tree = Ext.getCmp(me.mainPanelId).down('treepanel');
        var tree = Ext.getCmp(me.mainPanelId).up('_mainSourceView').down('_mainProjectTree').down('treepanel');
        var viewTreeStore = tree.store;

        viewTreeStore.load({
            callback: function (records, options, success) {//添加回调，获取子目录的文件数量
                if (closeWin)
                    winImportFile.close();

                //展开目录
                Ext.require('Ext.ux.Common.comm', function () {
                    Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(parentKeyword);
                });

                //回复函件，如果是点下了回复按钮，就把回复函件的流程提交到下一状态
                //me.replyCallbackFun();
            }
        });
    }
});