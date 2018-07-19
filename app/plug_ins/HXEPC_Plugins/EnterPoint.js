Ext.define('Ext.plug_ins.HXEPC_Plugins.EnterPoint', {
    extend: 'Ext.menu.Item',
    addMenus_HXEPC: function (menus, mainPanelId, showRecords) {//参数：menus:菜单，mainPanelId:父控件ID,showRec:需要显示的菜单项
        var me = this;
        var hxepcMenus = menus;
			
        //定义菜单项
        // 这里的”HelloWorld”是菜单名，MenuNameA1是对应的函数名, mainPanelId用于传递发起控件的ID
        var menuCreatePrjDocument = menus.getMenuItem(showRecords, "生成立项单...", function () { me.MenuCreatePrjDocument(mainPanelId); });
        if (menuCreatePrjDocument !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuCreatePrjDocument);
        }

        var menuDraftDocument = menus.getMenuItem(showRecords, "起草红头文...", function () { me.MenuDraftDocument(mainPanelId); });
        if (menuDraftDocument !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftDocument);
        }

        var menuDraftMeetMinutes = menus.getMenuItem(showRecords, "起草会议纪要...", function () { me.MenuDraftMeetMinutes(mainPanelId); });
        if (menuDraftMeetMinutes !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftMeetMinutes);
        }

        
        var menuDraftTransmittalCN = menus.getMenuItem(showRecords, "起草文件传递单(中文)...", function () { me.MenuDraftTransmittalCN(mainPanelId); });
        if (menuDraftTransmittalCN !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftTransmittalCN);
        }

        var menuDraftLetterCN = menus.getMenuItem(showRecords, "起草信函(中文)...", function () { me.MenuDraftLetterCN(mainPanelId); });
        if (menuDraftLetterCN !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftLetterCN);
        }

        var menuDraftRecognition = menus.getMenuItem(showRecords, "起草认质认价单...", function () { me.MenuDraftRecognition(mainPanelId); });
        if (menuDraftRecognition !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftRecognition);
        }

        var menuDraftReport = menus.getMenuItem(showRecords, "起草报告、请示、通知...", function () { me.MenuDraftReport(mainPanelId); });
        if (menuDraftReport !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuDraftReport);
        }

        var menuCompany = menus.getMenuItem(showRecords, "添加参建单位...", function () { me.MenuCompany(mainPanelId); });
        if (menuCompany !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuCompany);
        }

        var menuEditCompany = menus.getMenuItem(showRecords, "编辑参建单位...", function () { me.MenuEditCompany(mainPanelId); });
        if (menuEditCompany !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuEditCompany);
        }

        var menuEditDepartment = menus.getMenuItem(showRecords, "编辑项目部门...", function () { me.MenuEditDepartment(mainPanelId); });
        if (menuEditDepartment !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuEditDepartment);
        }

        var menuEditProjectGroup = menus.getMenuItem(showRecords, "编辑项目组...", function () { me.MenuEditProjectGroup(mainPanelId); });
        if (menuEditProjectGroup !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuEditProjectGroup);
        }

        var menuEditProjectInfo = menus.getMenuItem(showRecords, "编辑项目资料...", function () { me.MenuEditProjectInfo(mainPanelId); });
        if (menuEditProjectInfo !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuEditProjectInfo);
        }
       
        var menuImportFile = menus.getMenuItem(showRecords, "导入文件...", function () { me.MenuImportFile(mainPanelId); });
        if (menuImportFile !== null) {
            hxepcMenus.add('-');
            hxepcMenus.add(menuImportFile);
        }

        return hxepcMenus;
    },



    //定义菜单项对应的函数   
    //起草红头文
    MenuDraftDocument: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes =viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            //var plugins = "HXEPC_Plugins";
            //var state = "exchangeDoc";

            var fmDraftDocument = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftDocument',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword});

            winDraftDocument = Ext.widget('window', {
                title: '起草红头文',
                closeAction: 'hide',
                width: 618,
                height: 463,
                minWidth: 618,
                minHeight: 463,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftDocument,
                defaultFocus: 'firstName'
            });

            //fmSelectProfession.send_get_profession_list(function () {
            //    //获取已创建的专业
            //    fmSelectProfession.send_get_created_profession(function () {
            //        winExchangeDoc.show();
            //    });
            //});

            winDraftDocument.show();

            //监听子窗口关闭事件
            winDraftDocument.on('close', function () {

            });
        }
    },

    //起草会议纪要
    MenuDraftMeetMinutes: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            //var plugins = "HXEPC_Plugins";
            //var state = "exchangeDoc";

            var fmDraftMeetMinutes = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftMeetMinutes',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winDraftMeetMinutesCN = Ext.widget('window', {
                title: '起草会议纪要',
                closeAction: 'hide',
                width: 788,
                height: 663,
                minWidth: 788,
                minHeight: 663,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftMeetMinutes,
                defaultFocus: 'firstName'
            });

            //fmSelectProfession.send_get_profession_list(function () {
            //    //获取已创建的专业
            //    fmSelectProfession.send_get_created_profession(function () {
            //        winExchangeDoc.show();
            //    });
            //});

            //获取打开表单时的默认参数
            fmDraftMeetMinutes.sendGetDraftMeetMinutesDefault(function () {
                winDraftMeetMinutesCN.show();
            });
            

            //监听子窗口关闭事件
            winDraftMeetMinutesCN.on('close', function () {

            });
        }
    },

    //起草文件传递单(中文)
    MenuDraftTransmittalCN: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            //var plugins = "HXEPC_Plugins";
            //var state = "exchangeDoc";

            var fmDraftTransmittalCN = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftTransmittalCN',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winDraftTransmittalCN = Ext.widget('window', {
                title: '起草文件传递单',
                closeAction: 'hide',
                width: 788,
                height: 588,
                minWidth: 788,
                minHeight: 588,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftTransmittalCN,
                defaultFocus: 'firstName'
            });

            //fmSelectProfession.send_get_profession_list(function () {
            //    //获取已创建的专业
            //    fmSelectProfession.send_get_created_profession(function () {
            //        winExchangeDoc.show();
            //    });
            //});

            winDraftTransmittalCN.show();

            //监听子窗口关闭事件
            winDraftTransmittalCN.on('close', function () {

            });
        }
    },

    //起草信函（中文）
    MenuDraftLetterCN: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmDraftLetterCN = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftLetterCN',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword, projectDirKeyword: projectKeyword });

            winDraftLetterCN = Ext.widget('window', {
                title: '起草信函',
                closeAction: 'hide',
                width: 788,
                height: 588,
                minWidth: 788,
                minHeight: 588,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftLetterCN,
                defaultFocus: 'firstName'
            });

            fmDraftLetterCN.projectDirKeyword = projectKeyword;

            //获取打开表单时的默认参数
            fmDraftLetterCN.sendGetDraftLetterCNDefault(function () {

                winDraftLetterCN.show();
            });

            //winDraftLetterCN.show();

            //监听子窗口关闭事件
            winDraftLetterCN.on('close', function () {

            });

            winDraftLetterCN.on('beforeclose', function (panel, eOpts) {
                if (panel.title != '起草信函') {
                    Ext.Msg.alert("错误", "请保存附件编辑！");
                    return false;
                }
            });
        }
    },

    //起草认质认价单
    MenuDraftRecognition: function (mainPanelId) {
        var me = this;

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmDraftRecognition = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftRecognition',
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winDraftRecognition = Ext.widget('window', {
                title: '起草认质认价单',
                closeAction: 'hide',
                width: 788,
                height: 588,
                minWidth: 788,
                minHeight: 588,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftRecognition,
                defaultFocus: 'firstName'
            });


            winDraftRecognition.show();

            //监听子窗口关闭事件
            winDraftRecognition.on('close', function () {

            });

            winDraftRecognition.on('beforeclose', function (panel, eOpts) {

            });
        }
    },

    //起草报告、请示、通知
    MenuDraftReport: function (mainPanelId) {
        var me = this;

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmDraftReport = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.DraftReport',
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winDraftReport = Ext.widget('window', {
                title: '起草报告、请示、通知',
                closeAction: 'hide',
                width: 688,
                height: 488,
                minWidth: 688,
                minHeight: 488,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmDraftReport,
                defaultFocus: 'firstName'
            });


            winDraftReport.show();

            //监听子窗口关闭事件
            winDraftReport.on('close', function () {

            });

            winDraftReport.on('beforeclose', function (panel, eOpts) {

            });
        }
    },

    //添加参建单位
    MenuCompany: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmSelectUnit = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.SelectUnit', { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winSelectUnit = Ext.widget('window', {
                title: '添加参建单位或项目部门',
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

            fmSelectUnit.projectKeyword = projectKeyword;

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
                    unitType = window.parent.unitType;

                    if (unitCode.indexOf(",") > 0) {
                        unitCode = unitCode.substring(0, unitCode.indexOf(","));
                        unitDesc = unitDesc.substring(0, unitDesc.indexOf(";"));
                    }

                    me.send_createCompanyProject(projectKeyword, unitCode, unitDesc,unitType, mainPanelId);
                }
            });

            //var fmEditCompany = Ext.create('Ext.plug_ins.HXEPC_Plugins.Company.EditCompany',// + plugins + '.' + state,
            //    { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            //winEditCompany = Ext.widget('window', {
            //    title: '添加参建单位',
            //    closeAction: 'hide',
            //    width: 788,
            //    height: 518,
            //    minWidth: 788,
            //    minHeight: 518,
            //    layout: 'fit',
            //    resizable: false,
            //    modal: true,
            //    closeAction: 'close', //close 关闭  hide  隐藏  
            //    items: fmEditCompany,
            //    defaultFocus: 'firstName'
            //});

            //winEditCompany.show();

            ////监听子窗口关闭事件
            //winEditCompany.on('close', function () {

            //});

        }
    },

    //编辑参建单位
    MenuEditCompany: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmEditCompany = Ext.create('Ext.plug_ins.HXEPC_Plugins.Company.EditCompany',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winEditCompany = Ext.widget('window', {
                title: '编辑参建单位',
                closeAction: 'hide',
                width: 788,
                height: 518,
                minWidth: 788,
                minHeight: 518,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmEditCompany,
                defaultFocus: 'firstName'
            });

            //fmSelectProfession.send_get_profession_list(function () {
            //    //获取已创建的专业
            //    fmSelectProfession.send_get_created_profession(function () {
            //        winExchangeDoc.show();
            //    });
            //});
            fmEditCompany.createProjectButton.setVisible(false);

            winEditCompany.show();

            //监听子窗口关闭事件
            winEditCompany.on('close', function () {
                //var tree = Ext.getCmp(me.mainPanelId).up('_mainSourceView').down('_mainProjectTree').down('treepanel');
                var viewTreeStore = viewTree.store;

                viewTreeStore.load({
                    callback: function (records, options, success) {//添加回调，获取子目录的文件数量

                        //展开目录
                        Ext.require('Ext.ux.Common.comm', function () {
                            Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(projectKeyword);
                        });

                    }
                });
            });

        }
    },

    
  //编辑项目部门
    MenuEditDepartment: function (mainPanelId) {
            var me = this;
            //Ext.Msg.alert("", "Hello World !");

            var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

            var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
            if (nodes !== null && nodes.length > 0) {
                var projectKeyword = nodes[0].data.Keyword;

                var fmEditDepartment = Ext.create('Ext.plug_ins.HXEPC_Plugins.Company.EditDepartment',// + plugins + '.' + state,
                    { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

                winEditDepartment = Ext.widget('window', {
                    title: '编辑项目部门',
                    closeAction: 'hide',
                    width: 788,
                    height: 518,
                    minWidth: 788,
                    minHeight: 518,
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    closeAction: 'close', //close 关闭  hide  隐藏  
                    items: fmEditDepartment,
                    defaultFocus: 'firstName'
                });

                //fmSelectProfession.send_get_profession_list(function () {
                //    //获取已创建的专业
                //    fmSelectProfession.send_get_created_profession(function () {
                //        winExchangeDoc.show();
                //    });
                //});
                fmEditDepartment.createProjectButton.setVisible(false);

                winEditDepartment.show();

                //监听子窗口关闭事件
                winEditDepartment.on('close', function () {

                });

            }
        },

    MenuEditProjectGroup: function (mainPanelId) {
        var me = this;

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmEditProjectGroup = Ext.create('Ext.plug_ins.HXEPC_Plugins.Project.EditProjectGroup',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

            winEditProjectGroup = Ext.widget('window', {
                title: '编辑用户组',
                closeAction: 'hide',
                width: 408,
                height: 518,
                minWidth: 408,
                minHeight: 518,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmEditProjectGroup,
                defaultFocus: 'firstName'
            });

            //fmSelectProfession.send_get_profession_list(function () {
            //    //获取已创建的专业
            //    fmSelectProfession.send_get_created_profession(function () {
            //        winExchangeDoc.show();
            //    });
            //});
            //fmEditProjectGroup.createProjectButton.setVisible(false);

            winEditProjectGroup.show();

            //监听子窗口关闭事件
            winEditProjectGroup.on('close', function () {

            });

        }
    },

    
    MenuEditProjectInfo: function (mainPanelId) {
            var me = this;

            var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

            var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
            if (nodes !== null && nodes.length > 0) {
                var projectKeyword = nodes[0].data.Keyword;

                var fmEditProjectInfo = Ext.create('Ext.plug_ins.HXEPC_Plugins.Project.EditProjectInfo',// + plugins + '.' + state,
                    { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword });

                winEditProjectInfo = Ext.widget('window', {
                    title: '编辑项目资料',
                    closeAction: 'hide',
                    width: 788,
                    height: 538,
                    minWidth: 788,
                    minHeight: 538,
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    closeAction: 'close', //close 关闭  hide  隐藏  
                    items: fmEditProjectInfo,
                    defaultFocus: 'firstName'
                });

                //fmSelectProfession.send_get_profession_list(function () {
                //    //获取已创建的专业
                //    fmSelectProfession.send_get_created_profession(function () {
                //        winExchangeDoc.show();
                //    });
                //});
                //fmEditProjectInfo.createProjectButton.setVisible(false);

                winEditProjectInfo.show();

                //监听子窗口关闭事件
                winEditProjectInfo.on('close', function () {

                });

            }
        },

    //导入文件
    MenuImportFile:function (mainPanelId) {
        var me = this;

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {
            var projectKeyword = nodes[0].data.Keyword;

            var fmImportFile = Ext.create('Ext.plug_ins.HXEPC_Plugins.Document.ImportFile',// + plugins + '.' + state,
                { title: "", mainPanelId: mainPanelId, projectKeyword: projectKeyword, projectDirKeyword: projectKeyword });

            winImportFile = Ext.widget('window', {
                title: '导入文件',
                closeAction: 'hide',
                width: 788,
                height: 538,
                minWidth: 788,
                minHeight: 538,
                layout: 'fit',
                resizable: false,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: fmImportFile,
                defaultFocus: 'firstName'
            });


            winImportFile.show();

            //监听子窗口关闭事件
            winImportFile.on('close', function () {

            });

        }
    },

    //生成立项单
    MenuCreatePrjDocument: function (mainPanelId) {
        var me = this;
        //Ext.Msg.alert("", "Hello World !");

        var viewTree = Ext.getCmp(mainPanelId).down('treepanel');//获取目录树控件ID
        //var viewTree = me.maindocgrid.up('_mainSourceView').down('_mainProjectTree').down('treepanel');//获取目录树控件ID

        var nodes = viewTree.getSelectionModel().getSelection();//获取已选取的节点
        if (nodes !== null && nodes.length > 0) {

            var projectKeyword = nodes[0].data.Keyword;

            //弹出操作窗口
            var _fmCreateProjectListing = Ext.create('Ext.plug_ins.HXEPC_Plugins.CreateProjectListing', { title: "", mainPanelId: viewTree.id, projectKeyword: projectKeyword });

            winCreateProjectListing = Ext.widget('window', {
                title: '生成项目立项单',
                closeAction: 'hide',
                width: 765,
                height: 571,
                minWidth: 765,
                minHeight: 571,
                layout: 'fit',
                resizable: true,
                modal: true,
                closeAction: 'close', //close 关闭  hide  隐藏  
                items: _fmCreateProjectListing,
                defaultFocus: 'firstName'
            });

            winCreateProjectListing.show();
            //监听子窗口关闭事件
            winCreateProjectListing.on('close', function () {

            });
        }
    },

    //新建公司资料目录
    send_createCompanyProject: function (projectKeyword, companyCode, companyDesc, companyType, mainPanelId) {
        var me = this;



        //获取公司编号Text
        //var companyCode = me.CompanyCodeText.value;

        //获取公司名称Text
        //var companyDesc = me.CompanyDescText.value;



        ////获取表单数据，转换成JSON字符串
        var projectAttr =
        [
           // { name: 'companyId', value: me.curCompanyId },
            { name: 'companyCode', value: companyCode },
            { name: 'companyDesc', value: companyDesc },
            { name: 'companyType', value: companyType }
        ];

        var projectAttrJson = Ext.JSON.encode(projectAttr);

        Ext.MessageBox.wait("正在创建参建单位目录，请稍候...", "等待");


        Ext.Ajax.request({

            url: 'WebApi/Post',
            method: "POST",
            params: {
                C: "AVEVA.CDMS.HXEPC_Plugins.Company", A: "CreateCompanyProject",
                sid: localStorage.getItem("sid"), ProjectKeyword: projectKeyword,
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

                    //me.refreshPanel();
                    //处理返回事件
                    //me.send_createCompanyProject_callback(recod.ProjectKeyword, options, "");//, me.projectKeyword, closeWin);

                    var tree = Ext.getCmp(mainPanelId).up('_mainSourceView').down('_mainProjectTree').down('treepanel');//;
                    var viewTreeStore = tree.store;

                    viewTreeStore.load({
                        callback: function (records, options, success) {//添加回调，获取子目录的文件数量

                            //展开目录
                            Ext.require('Ext.ux.Common.comm', function () {
                                Ext.getCmp('contentPanel').down('_mainProjectTree').ExpendProject(projectKeyword);
                            });
                        }
                    });
                } else {
                    var errmsg = res.msg;
                    Ext.Msg.alert("错误信息", errmsg);
                }
            },
            failure: function (response, options) {
                ////Ext.Msg.alert("错误", "连接服务器失败！<br>" + response.responseText);
            }

        })

    }

});
Ext.onReady;

