//新建参建单位资料目录
Ext.define('Ext.plug_ins.HXEPC_Plugins.Company.EditCompany', {
    extend: 'Ext.container.Container',
    alias: 'widget.editCompany',
    layout: 'fit',
    resultvalue: '', mainPanelId: '',
    projectKeyword: '',
    initComponent: function () {
        var me = this;

        me.newProjectKeyword = '';
        me.curCompanyId = '';

        me.IsCreate = "";

        me.secretarilmanList = "";

        //添加项目代码text
        me.ProjectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "项目代码", labelWidth: 70, margins: '15 0 0 0',
            readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
            anchor: "80%", labelAlign: "left", width: 150//flex: 1
        });

        //添加项目名称text
        me.ProjectDescText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "项目名称", labelWidth: 70, margins: '15 0 0 0',
            readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
            anchor: "80%", labelAlign: "left", width: 150//flex: 1
        });

        //添加参建单位编码text
        me.CompanyCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "公司编码", labelWidth: 70, margins: '15 0 0 0',
            anchor: "80%", labelAlign: "left", width: 150//flex: 1
        });

        //添加参建单位名称text
        me.CompanyDescText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "公司名称", labelWidth: 70, margins: '15 0 0 0',
            anchor: "80%", labelAlign: "left", width: 150//flex: 1
        });

        //文控
        me.secretarilmanText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", readOnly: true, 
            fieldLabel: "文控", anchor: "80%", labelWidth: 70, labelAlign: "left", margin: '0 0 0 0', flex: 1// width: 120//
        });

       


        //定义选择公司表格
        //定义选择公司表格的model
        Ext.define("companylistmodel", {
            extend: "Ext.data.Model",
            fields: [
                "companyId",
                "companyCode",
                "companyDesc",
                "secretarilman",
                "address",
                "province",
                "postCode",
                "eMail",
                "receiver",
                "faxNo",
                "phone"
            ],
            url: "_blank",
        });

        //定义选择公司表格的store
        me.companyliststore = Ext.create("Ext.data.Store", {
            model: "companylistmodel"
        });
        //定义选择公司表格的view
        me.companylistgrid = Ext.widget("grid", {
            region: "center",
            height: 68,
            stateful: true,
            multiSelect: true,
            //hideHeaders: true,//隐藏表头
            flex: 1,
            store: me.companyliststore,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false
                //getRowClass: function () {
                //    // 在这里添加自定样式 改变这个表格的行高
                //    return 'x-grid-row upload-file-grid-row';
                //}
            },
            columns: [
                { text: '编码', dataIndex: 'companyCode', width: 60 },
                { text: '名称', dataIndex: 'companyDesc', width: 150 }
            ],
            listeners: {
                itemmousedown: function (view, record, item, index, e, eOpts) {

                },
                select: function (view, record, index, eOpts) {

                    //设置编辑控件可编辑
                    me.set_edit_panel_disabled(false);

                    me.saveCompanyButton.setDisabled(false);

                    if (me.createCompanyButton.text === "确定")
                        me.createCompanyButton.setText("新建");

                    if (me.cancelButton.disabled === false)
                        me.cancelButton.setDisabled(true);

                    me.createProjectButton.setDisabled(false);

                    me.onCompanyGridSelect(view, record, index, eOpts);
                },
                itemdblclick: function (view, record, item, index, e, eOpts) {
                    //me.send_createCompanyProject();
                }
            }
        });

        me.createProjectButton = Ext.create("Ext.button.Button", {
            text: "创建目录", width: 60, margins: "10 5 10 5", disabled: true,
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    // me.new_company();
                    me.send_createCompanyProject();
                }
            }
        });

        me.createCompanyButton = Ext.create("Ext.button.Button", {
            text: "新建", width: 60, margins: "10 5 10 5",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.new_company();
                }
            }
        });

        me.saveCompanyButton = Ext.create("Ext.button.Button", {
            text: "保存", width: 60, margins: "10 5 10 5", disabled: true,
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.send_editCompany(false);
                }
            }
        });

        me.cancelButton = Ext.create("Ext.button.Button", {
            text: "取消", width: 60, margins: "10 5 10 5", disabled: true,
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件

                    me.cancel_select();
                }
            }
        });

        me.secretarilmanButton = Ext.create("Ext.button.Button", {
            xtype: "button",
            text: "选择...", margins: "0 0 0 10",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    Ext.require('Ext.ux.Common.comm', function () {
                        showSelectUserWin("getUser", "", "", function () {
                            me.secretarilmanText.setValue(window.parent.usernamelist);
                            me.secretarilmanList = window.parent.resultvalue;
                        });
                    })
                }
            }
        });

        //添加列表
        me.items = [
          Ext.widget('form', {
              layout: "form",
              items: [

                  {
                      xtype: "panel",
                      baseCls: 'my-panel-no-border',//隐藏边框
                      layout: {
                          type: 'vbox',
                          pack: 'start',
                          align: 'stretch'
                      },
                      items: [
                          //{
                          //    layout: "hbox",
                          //    width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                          //    items: [{ baseCls: 'my-panel-no-border', flex: 1 },
                          //    {
                          //        xtype: 'label',
                          //        cls: 'classDiv2',
                          //        itemId: 'label1',
                          //        text: '发 文 处 理 表 单', margins: '0 0 0 10'
                          //    }, { baseCls: 'my-panel-no-border', flex: 1 }]
                          //},
                          {
                              xtype: "fieldset", margin: '8 16 8 16',
                              baseCls: 'my-panel-no-border',//隐藏边框
                              layout: {
                                  type: 'hbox',
                                  pack: 'start',
                                  align: 'stretch'
                              },
                              items: [
                                  {
                                      xtype: "fieldset", margin: '0 8 0 0',
                                      //baseCls: 'my-panel-no-border',//隐藏边框
                                      title: '参建单位列表',
                                      layout: {
                                          type: 'hbox',
                                          pack: 'start',
                                          align: 'stretch'
                                      },
                                      width: 420, height: 420,
                                      items: [
                                            me.companylistgrid
                                      ]
                                  }, {
                                      xtype: "fieldset", margin: '0 0 0 0',
                                      //baseCls: 'my-panel-no-border',//隐藏边框
                                      title: '参建单位资料',
                                      layout: {
                                          type: 'vbox',
                                          pack: 'start',
                                          align: 'stretch'
                                      },
                                      flex: 1,
                                      items: [
                                          me.ProjectCodeText,
                                          me.ProjectDescText,
                                          me.CompanyCodeText,
                                          me.CompanyDescText,
                                          {
                                              layout: "hbox",
                                              width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                                              align: 'stretch', margin: '15 0 8 0', padding: '0 0 0 0',
                                              pack: 'start',
                                              items: [
                                                   me.secretarilmanText
                                                   //,
                                                   //me.secretarilmanButton
                                                  ]
                                          }
                                         
                                          //,
                                          //me.AddressText,
                                          //me.ProvinceText,
                                          //me.PostCodeText,
                                          //me.EMailText,
                                          //me.ReceiverText,
                                          //me.FaxNoText,
                                          //me.PhoneText
                                      ]
                                  }
                              ]
                          },
                  {
                      xtype: "panel",
                      layout: "hbox",
                      baseCls: 'my-panel-no-border',//隐藏边框
                      //align: 'right',
                      //pack: 'end',//组件在容器右边
                      margins: "0 15 0 15",
                      items: [
                          me.createProjectButton,
                          {
                          flex: 1, baseCls: 'my-panel-no-border'//隐藏边框
                      },
                          //{
                          //    xtype: "button",
                          //    text: "新建", width: 60, margins: "5 5 10 5",
                          //    listeners: {
                          //        "click": function (btn, e, eOpts) {//添加点击按钮事件
                          //            me.send_createCompany();

                          //        }
                          //    }
                          //},
                          me.createCompanyButton,
                          me.saveCompanyButton,
                          me.cancelButton
                          //{
                          //    xtype: "button",
                          //    text: "保存", width: 60, margins: "5 5 10 5",
                          //    listeners: {
                          //        "click": function (btn, e, eOpts) {//添加点击按钮事件
                          //            me.send_editCompany(false);

                          //        }
                          //    }
                          //},
                          //{
                          //    xtype: "button",
                          //    text: "取消", width: 60, margins: "5 15 10 5",
                          //    listeners: {
                          //        "click": function (btn, e, eOpts) {//添加点击按钮事件
                          //            //Ext.Msg.alert("您展开了目录树节点！！！", "您展开了目录树节点！节点ID:" + me.tempDefnId);
                          //            winEditCompany.close();
                          //        }
                          //    }
                          //}
                      ]
                  }
                      ]
                  }
              ]
          })];

        //获取打开表单时的默认参数
        me.sendEditCompanyDefault();

        me.set_edit_panel_disabled(true);

        me.callParent(arguments);
    },

    //获取新建参建单位资料目录表单默认参数
    sendEditCompanyDefault: function () {
        var me = this;

        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Company", A: "GetEditCompanyDefault",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword
            },
            success: function (response, options) {
                me.sendGetEditCompanyDefault_callback(response, options);//, funCallback);
            },
            failure: function (response, options) {
                ////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }
        });
    },

    //处置获取新建参建单位资料目录表单默认参数的返回
    sendGetEditCompanyDefault_callback: function (response, options) {
        var me = this;



        //获取数据后，更新窗口
        var res = Ext.JSON.decode(response.responseText, true);
        var state = res.success;
        if (state === true) {
            var recod = eval(res.data[0]);

            var projCode = recod.projectCode;
            var projDesc = recod.projectDesc;

            me.ProjectCodeText.setValue(projCode);
            me.ProjectDescText.setValue(projDesc);

            var companyList = eval(recod.CompanyList);

            //var companyList = eval(res.data);
            me.companylistgrid.store.removeAll();

            for (var itemKey in companyList) {
                //me.projectKeyword = companyList[itemKey].companyCode;
                if (companyList[itemKey].companyCode != undefined) {
                    //str = str + companyList[itemKey].projectName;
                    //插入行到文件selectUserGrid
                    var r = Ext.create('companylistmodel', {
                        //name: files[i].name
                        companyId: companyList[itemKey].companyId,
                        companyCode: companyList[itemKey].companyCode,
                        companyDesc: companyList[itemKey].companyDesc,
                        secretarilman: companyList[itemKey].secretarilman
                        //,
                        //address: companyList[itemKey].address,
                        //province: companyList[itemKey].province,
                        //postCode: companyList[itemKey].postCode,
                        //eMail: companyList[itemKey].eMail,
                        //receiver: companyList[itemKey].receiver,
                        //faxNo: companyList[itemKey].faxNo,
                        //phone: companyList[itemKey].phone
                    });

                    var rowlength = me.companylistgrid.getStore().data.length;
                    me.companylistgrid.getStore().insert(rowlength, r);
                }
            }
        }
    },

    //响应选择公司列表表格的事件
    onCompanyGridSelect: function (view, record, index, eOpts) {
        var me = this;

        me.CompanyCodeText.setValue(record.data.companyCode);
        me.CompanyDescText.setValue(record.data.companyDesc);
        me.secretarilmanText.setValue(record.data.secretarilman);
        
        me.curCompanyId = record.data.companyId;

    },

    //新建公司资料目录
    send_editCompany: function (isCreate) {
        var me = this;

        me.IsCreate = isCreate;


        //获取公司编号Text
        var companyCode = me.CompanyCodeText.value;

        //获取公司名称Text
        var companyDesc = me.CompanyDescText.value;

        var secretarilman = me.secretarilmanText.value;// me.secretarilmanList;


        ////获取表单数据，转换成JSON字符串
        var projectAttr =
        [
            { name: 'companyId', value: me.curCompanyId },
            { name: 'companyCode', value: companyCode },
            { name: 'companyDesc', value: companyDesc },
            { name: 'secretarilman', value: secretarilman }


        ];

        var projectAttrJson = Ext.JSON.encode(projectAttr);

        Ext.MessageBox.wait("正在创建参建单位，请稍候...", "等待");

        var A = isCreate ? "CreateCompany" : "EditCompany";

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Company", A: A,
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                projectAttrJson: projectAttrJson
            },
            success: function (response, options) {

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);

                    //me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id


                    //Ext.Msg.alert("提示", "保存成功!");

                    me.refreshPanel();
                    //处理返回事件
                    //me.send_editCompany_callback(me.newProjectKeyword, options, "");//, me.projectKeyword, closeWin);

                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                ////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }

        })

    },

    //处理新建公司资料目录的返回事件
    send_createCompanyProject_callback: function (projectKeyword, options) {
        var me = this;



        me.refreshWin(me.newProjectKeyword, true);
    },

    //新建公司资料目录
    send_createCompanyProject: function () {
        var me = this;



        //获取公司编号Text
        var companyCode = me.CompanyCodeText.value;

        //获取公司名称Text
        var companyDesc = me.CompanyDescText.value;

        var secretarilman = me.secretarilmanText.value;

        ////获取表单数据，转换成JSON字符串
        var projectAttr =
        [
            { name: 'companyId', value: me.curCompanyId },
            { name: 'companyCode', value: companyCode },
            { name: 'companyDesc', value: companyDesc },
            { name: 'secretarilman', value: secretarilman }
        ];

        var projectAttrJson = Ext.JSON.encode(projectAttr);

        Ext.MessageBox.wait("正在创建参建单位目录，请稍候...", "等待");


        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Company", A: "CreateCompanyProject",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                projectAttrJson: projectAttrJson
            },
            success: function (response, options) {

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);

                    me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id


                    //Ext.Msg.alert("提示", "保存成功!");

                    //me.refreshPanel();
                    //处理返回事件
                    me.send_createCompanyProject_callback(me.newProjectKeyword, options, "");//, me.projectKeyword, closeWin);

                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                ////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }

        })

    },

    new_company: function () {
        var me = this;

        ///响应新建用户按钮
        if (me.createCompanyButton.getText() === "新建") {

            var userTypeIndex = 0;
            var userStateIndex = 0;

            me.CompanyCodeText.setValue("");
            me.CompanyDescText.setValue("");
            me.secretarilmanText.setValue("");
            me.secretarilmanList = "";

            //设置编辑控件可以编辑
            me.set_edit_panel_disabled(false);

            me.createCompanyButton.setText("确定");
            //me.delUserButton.setDisabled(true);
            me.saveCompanyButton.setDisabled(true);
            me.cancelButton.setDisabled(false);

            me.createProjectButton.setDisabled(true);
           // me.getSignPic();
        } else {
            //向服务器发送新建用户请求
            me.send_editCompany(true);
        }
    },

    cancel_select: function () {
        var me = this;

        me.curCompanyId = "";
        //设置编辑控件不可编辑
        me.set_edit_panel_disabled(true);

        me.createCompanyButton.setText("新建");
        //me.delUserButton.setDisabled(true);
        me.saveCompanyButton.setDisabled(true);
        me.cancelButton.setDisabled(true);

        me.createProjectButton.setDisabled(true);

        me.companylistgrid.getSelectionModel().clearSelections();
        me.companylistgrid.getView().refresh();

        
    },

    set_edit_panel_disabled: function (flag) {
        var me = this;

        if (me.CompanyCodeText.disabled != flag)
            me.CompanyCodeText.setDisabled(flag);

        if (me.CompanyDescText.disabled != flag)
            me.CompanyDescText.setDisabled(flag);

        if (me.secretarilmanText.disabled != flag)
            me.secretarilmanText.setDisabled(flag);

        if (me.secretarilmanButton.disabled != flag)
            me.secretarilmanButton.setDisabled(flag);

    },

    refreshPanel: function () {
        var me = this;

        if (me.IsCreate) {

            me.cancel_select();
            me.sendEditCompanyDefault();
            //me.companylistgrid.store.loadPage(1);
        } else {
            var grid = me.companylistgrid;
            var rs = grid.getSelectionModel().getSelection();//获取选择的文档

            if (!(rs !== null && rs.length > 0)) {
                return;
            }

            var strCompanyCode = me.CompanyCodeText.value.trim();
            var strCompanyDesc = me.CompanyDescText.value.trim();
            var strSecretarilman = me.secretarilmanText.value.trim();
            if (rs[0].data.companyCode != strCompanyCode) {
                rs[0].data.companyCode = strCompanyCode;//获取文档关键字

            }
            if (rs[0].data.companyDesc != strCompanyDesc) {
                rs[0].data.companyDesc = strCompanyDesc;//获取文档关键字
                
            }
            if (rs[0].data.secretarilman != strCompanyDesc) {
                rs[0].data.secretarilman = strSecretarilman;//获取文档关键字
            }
            me.companylistgrid.getView().refresh();
        }
    },

    //刷新表单，参数:parentKeyword:新建的联系单目录
    refreshWin: function (projKeyword, closeWin) {
        var me = this;
        var tree = Ext.getCmp(me.mainPanelId).up('_mainSourceView').down('_mainProjectTree').down('treepanel');//;
        var viewTreeStore = tree.store;

        viewTreeStore.load({
            callback: function (records, options, success) {//添加回调，获取子目录的文件数量
                if (closeWin)
                    winEditCompany.close();

                //展开目录
                Ext.require('Ext.ux.Common.comm', function () {
                    Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(projKeyword);
                });
            }
        });
    }

});