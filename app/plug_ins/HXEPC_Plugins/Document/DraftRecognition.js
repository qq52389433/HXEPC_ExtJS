//起草红头文 DraftRecognition

Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.DraftRecognition', {
    extend: 'Ext.container.Container',
    alias: 'widget.DraftRecognition',
    //layout: "border",
    layout: 'fit',
    resultvalue: '', mainPanelId: '', projectKeyword: '',
    initComponent: function () {
        var me = this;

        //上传文档的doc关键字列表
        me.docList = "";

        //附件文件名的前缀
        me.docCode = "";

        //附件序号
        me.docUploadIndex = 0;

        //下一流程状态用户
        me.nextStateUserList = "";

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

        //来文单类型combo初始数据
        me.rectypedata = [{ text: "联系单", value: "联系单" }, { text: "设计变更单", value: "设计变更单" }
            , { text: "委托单", value: "委托单" }];

        //物资类型combo初始数据
        me.materialtypedata = [{ text: "材料", value: "材料" }, { text: "设备", value: "设备" }];

        //添加项目号text
        me.fProjectCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "文件属性", labelWidth: 60, readOnly: true, fieldStyle: ' background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',//fieldStyle:'color:red',
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 150//flex: 1
        });

        //添加区域text
        me.areaText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, labelSeparator: '', emptyText: "机组+(厂房/系统)", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 120//flex: 1
        });

        //添加专业text
        me.professionText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "专业", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加收文类型text
        me.receiveTypeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: " - ", labelWidth: 10, readOnly: true, labelSeparator: '', emptyText: "文件类型", // 去掉laebl中的冒号
            margin: '10 0 0 10', anchor: "80%", labelAlign: "left", width: 80//flex: 1
        });

        //添加工程名称text
        me.projectNameText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "工程名称", labelWidth: 60,
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: '50%'//flex: 1
        });

        //添加合同号text
        me.contractCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "合同号", labelWidth: 60,
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: '50%'//flex: 1
        });


        //添加项目号text
        me.sendCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "编号", labelWidth: 60, 
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: '50%'//flex: 1
        });

        //添加来文单编号text
        me.recCodeText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield", fieldLabel: "根据", labelWidth: 60, emptyText: "来文单编号", labelSeparator: '', // 去掉laebl中的冒号
            margin: '10 10 0 10', anchor: "80%", labelAlign: "right", width: 250
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

        //定义下一流程状态用户Text
        me.nextStateUserText = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            fieldLabel: "施工经理", anchor: "80%", labelWidth: 60, labelAlign: "right", labelPad: 8, width: "40%",//width: 230, 
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
        
        //添加来文单类型combo
        Ext.define("rectypeModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.rectypeProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.rectypedata,
            model: "rectypeModel"
        });

        me.rectypeStore = Ext.create("Ext.data.Store", {
            model: rectypeModel,
            proxy: me.rectypeProxy
        });


        me.rectypeCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '', labelWidth: 50,
            triggerAction: "all", store: me.rectypeStore,
            valueField: 'value', editable: false,//不可输入
            displayField: 'text', margin: '10 10 0 10',// 
            anchor: "80%", labelAlign: "right", labelPad: 8, width: 100,//
            emptyText: "--请选择--", value: "联系单",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {

                }
            }
        });

        //添加物资类型combo
        Ext.define("materialtypeModel", {
            extend: 'Ext.data.Model',
            fields: ["text", "value"]
        });
        me.materialtypeProxy = Ext.create("Ext.data.proxy.Memory", {
            data: me.materialtypedata,
            model: "materialtypeModel"
        });

        me.materialtypeStore = Ext.create("Ext.data.Store", {
            model: materialtypeModel,
            proxy: me.materialtypeProxy
        });


        me.materialtypeCombo = Ext.create("Ext.form.field.ComboBox",
        {
            //xtype: "combo",
            fieldLabel: '要求，现申请总包单位对以下拟采购', labelWidth: 200,
            triggerAction: "all", store: me.materialtypeStore,
            valueField: 'value', editable: false,//不可输入
            displayField: 'text', margin: '10 10 0 0', labelSeparator: '',
            anchor: "80%", labelAlign: "right", labelPad: 8, width: 300,//
            emptyText: "--请选择--", value: "材料",
            //fieldStyle: 'border-color: red; background-image: none;',//红色边框
            listeners:
            {
                select: function (combo, records, eOpts) {

                }
            }
        });

        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });


   
        me.DescEditing = Ext.create("Ext.form.field.Text", {
            xtype: "textfield",
            //id:"inputtext",
            fieldLabel: "", anchor: "80%", labelWidth: 0, labelAlign: "left", width: 160,//flex: 1
            value: ""
        });

        //定义器具的model
        Ext.define("contentModel", {
            extend: "Ext.data.Model",
            fields: ["no", "matName", "spec",
                "meaUnit", "designNum", "brand",
                "quantity", "audit", "price",
                "costPrice", "centerPrice", "tenderPrice",
                "auditPrice", "remark"],
            url: "_blank",
        });

        me.contentStore = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            model: contentModel,
            sorters: [{
                property: 'id',
                direction: 'ASC'
            }]
        });

        me.contentGrid = Ext.create('Ext.grid.Panel', {
            //title: '输入文档的代码和描述',
            store: me.contentStore,
            margin: '0 10 0 10',
            columns: [
                { header: '序号', xtype: 'rownumberer', dataIndex: 'no', width: 30, align: 'center', sortable: false },
                {
                    header: '材料（设备）名称', dataIndex: 'matName', width: 150,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '规格型号技术参数', dataIndex: 'spec', width: 120,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '计量单位', dataIndex: 'meaUnit', width: 80,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '设计图号', dataIndex: 'designNum', width: 120,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '品牌', dataIndex: 'brand', width: 120,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '报审数量', dataIndex: 'quantity', width: 90,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '专业工程师审核意见', dataIndex: 'audit', width: 120,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '报审单价', dataIndex: 'price', width:90,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: '审核单价', columns: [
                    {
                        header: '项目造价员', dataIndex: 'costPrice', width: 90,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        header: '财务中心', dataIndex: 'centerPrice', width: 90,
                        editor: {
                            allowBlank: false
                        }
                    },
                    {
                        header: '招标部', dataIndex: 'tenderPrice', width: 90,
                        editor: {
                            allowBlank: false
                        }
                    }]
                },
                {
                    header: '审核合价', dataIndex: 'auditPrice', width: 90,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: '备注', dataIndex: 'remark', width: 120,
                    editor: {
                        allowBlank: false
                    }
                }
            ],
            stripeRows: true, //斑马线效果  
            plugins: [
                me.cellEditing
            ],
            height: 300,
            width: '100%',//400,
            renderTo: Ext.getBody(),
            selModel: {
                selType: 'cellmodel'
            },
            listeners: {
                "edit": function (editor, e) {//去除红色箭头
                    e.record.commit();
                }
            }
        });

        //器具表格添加行
        for (var i = 0; i < 10; i++) {
            var rec = new contentModel({
                name: ""
            });
            me.contentStore.insert(0, rec);
        }

        //选择专业按钮
        me.editAttrButton = Ext.create("Ext.button.Button", {
            text: "录入属性", margins: "10 0 0 10",
            listeners: {
                "click": function (btn, e, eOpts) {//添加点击按钮事件
                    me.editFileAttr();
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
                         me.fProjectCodeText,
                         //me.areaCombo,
                         me.areaText,// me.areaButton,
                         me.professionText, me.professionButton,
                         me.receiveTypeText, me.receiveTypeButton,
                         me.fNumberText, me.editionText,
                         me.editAttrButton
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
                            me.projectNameText,
                            me.contractCodeText
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
                           me.sendCodeText
                         ], flex: 1
                     }, , {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                            me.recCodeText,
                             me.rectypeCombo,
                             me.materialtypeCombo
                         ], flex: 1
                     },
			        {
			            xtype: "label",
			            margin: '10 0 10 20',
			            text:"进行认质认价工作，以便采购并施工："
			        },
                     {
                         layout: "hbox",
                         width: '100%',
                         align: 'stretch',
                         pack: 'start',
                         //height: 125,
                         margin: '0 0 0 0',
                         baseCls: 'my-panel-no-border',//隐藏边框
                         items: [
                               me.contentGrid
                         ]//, flex: 1
                     }
            ]
        });

   
        //编辑区域尾部
        me.editBottomPanel = Ext.create("Ext.panel.Panel", {
            layout: "hbox",
            width: '100%',
            align: 'stretch',
            pack: 'start', margins: "0 0 0 0",
            baseCls: 'my-panel-no-border',//隐藏边框
            items: [
             // me.approvpathCombo,//定义审批路径
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

                            winDraftRecognition.close();
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

        //获取打开表单时的默认参数
        me.sendGetDraftRecognitionDefault();

        me.callParent(arguments);

    },


    //获取起草信函表单默认参数
    sendGetDraftRecognitionDefault: function () {
        var me = this;

        //通过extjs的ajax获取操作全部名称
        Ext.Ajax.request({
            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetDraftRecognitionDefault",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword
            },
            success: function (response, options) {
                me.sendGetDraftRecognitionDefault_callback(response, options);//, funCallback);

            }
        });
    },

    //处理获取发文处理表单默认参数的返回
    sendGetDraftRecognitionDefault_callback: function (response, options) {
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

            if (strRootProjectCode === "") {
                me.fProjectCodeText.setWidth(60);
               // me.projectCodeText.setWidth(60);

                me.areaText.setFieldLabel("");
               // me.sendCompanyCombo.setFieldLabel("");
            } else {
               // me.projectCodeText.setValue(strRootProjectCode);
                me.fProjectCodeText.setValue(strRootProjectCode);
            }

            me.fNumberText.setValue(strDocNumber);

            var recobjLength = 0;
            //遍历来往单位数组，添加到来往单位combo
            for (var itemKey in me.recCompanyList) {
                //var strCompany = me.recCompanyList[itemKey];
                 //me.recCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

                recobjLength = recobjLength + 1;

            }


            var sourceUnitIndex = -1;
            var sendobjLength = 0;
            var companyDesc = "";

            //遍历来往单位数组，添加到来往单位combo
            for (var itemKey in me.sendCompanyList) {
                
            //    me.sendCompanydata.push({ text: itemKey, value: itemKey });//在数组里添加新的元素  

            //    if (sourceCompany != undefined && itemKey === sourceCompany) {
                    sourceUnitIndex = sendobjLength;
                   // companyDesc = me.sendCompanyList[itemKey];
            //    }

            //    sendobjLength = sendobjLength + 1;

            }


            if (sendobjLength > 0 && sourceUnitIndex!=-1) {
               // me.sendCompanyCombo.setRawValue(me.sendCompanydata[sourceUnitIndex].text);//设置显示值
                //me.sendCompanyCombo.setValue(me.sendCompanydata[sourceUnitIndex].value); //设置ID值
                
                //me.senderText.setValue(companyDesc);
            }
        }
    },

    //向服务器发送起草认质认价单请求
    send_draft_document: function () {
        var me = this;

        if (me.nextStateUserList === undefined || me.nextStateUserList === "") {
            Ext.Msg.alert("错误信息", "请选择施工经理！");
            return;
        }

        //项目代码
        var fProjectCode = me.fProjectCodeText.value;
        //范围
        var area = me.areaText.value;
        //专业
        var profession = me.professionText.value;
        //来文类型 
        var receiveType = me.receiveTypeText.value;
        //文件流水号
        var fNumber = me.fNumberText.value;
        //版本
        var edition = me.editionText.value;

        //获取文件编码
        var fileCode = fProjectCode + "-" + area + "-" + profession + "-" + receiveType + "-" + fNumber + "-" + edition;

        //获取工程名称
        var projectName = me.projectNameText.value;
        //合同号
        var contractCode = me.contractCodeText.value;

        //日期
        var sendDate = me.sendDateField.value;
        //编号
        var sendCode = me.sendCodeText.value;

        //来文编号
        var recCode = me.recCodeText.value;
        //来文类型
        var recType = me.rectypeCombo.value;
        //采购类型 （材料或者设备）e:\qgy2017\cdmsweb\cdmsweb\hxepc_plugins\document\draftdocumentmenu.cs
        var materialType = me.materialtypeCombo.value;

        //获取文件列表
        var contentArray = [];
        for (var i = 0; i < me.contentStore.getCount() ; i++) {
            var record = me.contentStore.getAt(i);

            var matName = record.get('matName');
            var spec = record.get('spec');
            var meaUnit = record.get('meaUnit');
            var designNum = record.get('designNum');
            var brand = record.get('brand');
            var quantity = record.get('quantity');
            var audit = record.get('audit');
            var price = record.get('price');
            var costPrice = record.get('costPrice');
            var centerPrice = record.get('centerPrice');
            var tenderPrice = record.get('tenderPrice');
            var auditPrice = record.get('auditPrice');
            var remark = record.get('remark');

            var fa = 
                {
                    matName: matName, spec: spec, meaUnit: meaUnit,
                    designNum: designNum, brand: brand, quantity: quantity,
                    audit: audit, price: price, costPrice: costPrice,
                    centerPrice: centerPrice, tenderPrice: tenderPrice, auditPrice: auditPrice,
                    remark: remark
                };
  
            contentArray.push(fa);
        }

        //获取表单数据，转换成JSON字符串
        var docAttr =
        [
            { name: 'fileCode', value: fileCode },
            { name: 'projectName', value: projectName },
            { name: 'contractCode', value: contractCode },
            { name: 'sendDate', value: sendDate },
            { name: 'sendCode', value: sendCode },
            { name: 'recCode', value: recCode },
            { name: 'recType', value: recType },
            { name: 'materialType', value: materialType }
        ];

        var docAttrJson = Ext.JSON.encode(docAttr);
        var contentJson = Ext.JSON.encode(contentArray);

        Ext.MessageBox.wait("正在生成认质认价单，请稍候...", "等待");

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "DraftRecognition",
                sid: localStorage.getItem("sid"), ProjectKeyword: me.projectKeyword,
                DocAttrJson: docAttrJson, ContentJson: contentJson
            },
            success: function (response, options) {
                //me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);

                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {

                    Ext.MessageBox.close();//关闭等待对话框

                    var recod = eval(res.data[0]);

                    //处理返回事件
                    me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);


                    me.docKeyword = recod.DocKeyword;//获取联系单文档id
                    me.docList = recod.DocList;//获取流程文档列表
                    me.newProjectKeyword = recod.ProjectKeyword;//获取新建的目录id
                    //获取附件文件名的前缀
                    //me.docCode = recod.DocCode;

                    //if (me.FileUploadButton.uploader.uploader.files.length > 0) {
                    //    ////当有附件时，创建DOC文档成功后，上传附件
                    //    me.FileUploadButton.uploader.start();

                    //    Ext.MessageBox.wait("正在上传附件，请稍候...", "等待");

                    //    var int = window.setInterval(function () {
                    //        //上传附件完毕
                    //        if (me.uploadCompleteState === true) {
                    //            Ext.MessageBox.close();//关闭等待对话框
                    //            //处理返回事件
                    //            me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);
                    //            //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
                    //            //停止线程
                    //            window.clearInterval(int);
                    //        }
                    //    }, 500);
                    //} else {
                    //    //当没有附件时，处理返回事件
                        me.draft_document_callback(response, options, "");//, me.projectKeyword, closeWin);
                    //    //me.send_create_doc_callback(projectKeyword, docKeyword, me.docList, true);
                    //}
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
        //var approvpath = me.approvpathCombo.value;

        Ext.MessageBox.wait("正在启动流程，请稍候...", "等待");

        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "RecognitionStartWorkFlow",
                sid: localStorage.getItem("sid"), docKeyword: me.docKeyword,
                docList: me.docList, //ApprovPath: approvpath,
                UserList: me.nextStateUserList
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
                    winSendDocument.close();
                }
            }

        })
    },

    //draft_document_callback: function (response, options, parentKeyword) {
    //    var me = this;
    //    var res = Ext.JSON.decode(response.responseText, true);
    //    var state = res.success;
    //    if (state === false) {
    //        var errmsg = res.msg;
    //        Ext.Msg.alert("错误信息", errmsg);
    //    }
    //    else {

    //        Ext.MessageBox.close();//关闭等待对话框

    //        Ext.require('Ext.ux.Common.comm', function () {

    //            winDraftRecognition.close();

    //            var projectKeyword = res.data[0].ProjectKeyword;

    //            me.refreshWin(projectKeyword, false);

    //            //创建流程
    //            //参数：doclist,wfKeyword,userlist,callback_fun
    //            //StartNewWorkFlow(projectKeyword, "CREATEPROJECT", "", function (res, WorkFlowKeyword, CuWorkStateCode) {
    //            //    me.refreshWin(projectKeyword, false);
    //            //})
    //        });
    //    }
    //},

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

      
            _fmEditFileProperties.fileCodeTypeCombo.setValue("项目管理类");
            _fmEditFileProperties.setIsProjectFile();

            _fmEditFileProperties.projectKeyword = me.projectKeyword;
            _fmEditFileProperties.projectDirKeyword = me.projectKeyword;


            _fmEditFileProperties.setFilePropertiesDefault(rec.data);

            window.parent.resultarray = undefined;

        // winImportFile.hide();
            winEditFileProperties.show();

            _fmEditFileProperties.projectCodeText.setValue(me.fProjectCodeText.value);

            _fmEditFileProperties.fProjectCodeText.setValue(me.fProjectCodeText.value);

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
        Ext.Ajax.request({
            //url: 'SHEPCPlugins/GetRunNum',
            url: 'WebApi/Post', 
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "GetRecognitionNumber",
                //action: me.winAction,
                ProjectCode: me.projectCodeText.value,
                SendCompany: me.sendCompanyCombo.value, RecCompany: me.recCompanyCombo.value,
                //Profession:me.professionCombo.value,DocType:me.postCategoryText.value,
                sid: localStorage.getItem("sid")
            },
            success: function (response, options) {
                //获取数据后，更新窗口
                var res = Ext.JSON.decode(response.responseText, true);
                var state = res.success;
                if (state === true) {
                    var recod = eval(res.data[0]);
                    var runNum = recod.RunNum;//获取流水号
                    me.fNumberText.setValue(runNum);
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
                    winDraftRecognition.close();

                //展开目录
                Ext.require('Ext.ux.Common.comm', function () {
                    Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(parentKeyword);
                });
            }
        });
    }
});