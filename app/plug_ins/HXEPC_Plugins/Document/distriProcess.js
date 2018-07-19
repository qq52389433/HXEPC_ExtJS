﻿//选择分发处理人员
Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.distriProcess', {
    extend: 'Ext.container.Container',
    alias: 'widget.distriProcess',
    //layout: "border",
    layout: 'fit',
    resultvalue: '', mainPanelId: '', projectDesc: '',
    projectKeyword: '', docKeyword: '', groupKeyword: '',
    groupType:'',
    //reSelect: 'false',//是否重新选择专业
    initComponent: function () {
        var me = this;

        //办理人列表
        me.operatorList = "";
        me.curUserGroupType = "";
        me.curUserGroupKeyword = "";

        //项目部门列表
        me.CoDepartmentList = "";

        //定义办理人Text
        me.operatorText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "办理人", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad: 8, width: "40%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;'//红色边框//flex: 1
        });
        
        //定义协办部门Text
        me.CoDepartmentText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "协办部门", anchor: "80%", labelWidth: 60, labelAlign: "right", readOnly:true,labelPad: 8,flex: 1,// width: "40%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;'//红色边框//
        });

        //定义协办部门Text
        me.CoordinatorText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "协办人", anchor: "80%", labelWidth: 60, labelAlign: "right", readOnly: true, labelPad: 8, flex: 1,// width: "40%",//width: 230, 
            margin: '10 5 0 10', fieldStyle: ' background-image: none;'//红色边框//
        });

        //文件编码里面的选择部门按钮
        me.CoDepartmentButton = Ext.create("Ext.button.Button", {
            text: "选择..", margins: "10 0 0 0",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.selectDepartment();

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
            margin: '0 5 0 0',// 
            items: [
                {

                    baseCls: 'my-panel-no-border',//隐藏边框
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    }, margins: "0 5 0 0",
                    items: [
                     me.operatorText,
                     {
                         xtype: "button",
                         text: "选择...", margins: "10 0 0 5",
                         listeners: {
                             "click": function (btn, e, eOpts) {//添加点击按钮事件
                                 Ext.require('Ext.ux.Common.comm', function () {
                                     showSelectUserWin("getUser", "", "", function () {
                                         me.operatorText.setValue(window.parent.usernamelist);
                                         me.operatorList = window.parent.resultvalue;
                                     }, me.groupType, me.groupKeyword);

                                 })
                             }
                         }
                     }]
                },
                 {

                     baseCls: 'my-panel-no-border',//隐藏边框
                     layout: {
                         type: 'hbox',
                         pack: 'start',
                         align: 'stretch'
                     },
                     items: [
                         me.CoDepartmentText, me.CoDepartmentButton
                     ]
                 },
                 {

                     baseCls: 'my-panel-no-border',//隐藏边框
                     layout: {
                         type: 'hbox',
                         pack: 'start',
                         align: 'stretch'
                     },
                     items: [
                         me.CoordinatorText
                     ]
                 }
            ]//, flex: 1me.CoordinatorText
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
                            me.send_distri_process();
                        }
                    }
                },
                {
                    xtype: "button",
                    text: "取消", width: 60, margins: "10 15 10 5",
                    listeners: {
                        "click": function (btn, e, eOpts) {//添加点击按钮事件

                            winDistriProcess.close();
                        }
                    }
                }
            ]
        });

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
                      margin: '10 0 0 0',
                      width:"100%",
                      items: [
                            me.editTopPanel
                      ]
                  }, me.bottomButtonPanel]
              })
        ];

        me.callParent(arguments);
    },

    selectDepartment: function () {
        var me = this;

        //if (me.docClass === "project" && me.projectKeyword === "") {
        //    Ext.Msg.alert("错误信息", "请选择项目！");
        //    return;
        //}

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

                //if (departmentCode.indexOf(",") > 0) {
                //    // var words = departmentCode.split(',')
                //    departmentCode = departmentCode.substring(0, departmentCode.indexOf(","));
                //    departmentDesc = departmentDesc.substring(0, departmentDesc.indexOf(";"));
                //    departmentType = departmentType.substring(0, departmentType.indexOf(","));
                //}

                me.CoDepartmentList = departmentCode;

                me.CoDepartmentText.setValue(departmentDesc);


                me.get_department_secuser();
            }
        });
    },

    //获取部门文控
    get_department_secuser: function () {
        var me = this;
        //me.CoDepartmentList

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetDepartmentSecUser",
                sid: localStorage.getItem("sid"), //ProjectKeyword: me.projectKeyword,
                DepartmentList: me.CoDepartmentList
            },
            success: function (response, options) {

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    //Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);
                    me.CoordinatorText.setValue( recod.userList);

                    //me.docKeyword = recod.DocKeyword;//获取联系单文档id
                    //me.docList = recod.DocList;//获取流程文档列表
                    //me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id
                    ////获取附件文件名的前缀
                    //me.docCode = recod.DocCode;

                   
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

    send_distri_process: function () {
        var me = this;

        var strOperator = me.operatorList;
        if (me.operatorList === undefined || me.operatorList == "") {
            Ext.Msg.alert("错误信息", "请选择办理人！");
        }
        var strCoordinator = me.CoordinatorText.value;
        if (strCoordinator === undefined || strCoordinator == "") {
            Ext.Msg.alert("错误信息", "请选择协办人！");
        }

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "SendDistriProcess",
                sid: localStorage.getItem("sid"), DocKeyword: me.docKeyword,
                Operator: me.operatorList, Coordinator: strCoordinator
            },
            success: function (response, options) {

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);
                    me.CoordinatorText.setValue(recod.userList);

                    //me.docKeyword = recod.DocKeyword;//获取联系单文档id
                    //me.docList = recod.DocList;//获取流程文档列表
                    //me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id
                    ////获取附件文件名的前缀
                    //me.docCode = recod.DocCode;


                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                //////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
                Ext.MessageBox.close();//关闭等待对话框
            }
        })
    }
});