
//弹出消息框，填写信函收发文单位和发文编号
//调用本函数的位置在：Ext.ux.Common.comm，里面的StartNewWorkFlow的返回处理函数
function letterCNFillInfo(mainPanelId, res) {
    var plugins = res.data[0].plugins;
    var DefWorkFlow = res.data[0].DefWorkFlow;
    var CuWorkState = res.data[0].CuWorkState;
    var FuncName = res.data[0].FuncName;
    var docKeyword = res.data[0].DocKeyword;

    if (plugins === "HXEPC_Plugins" && DefWorkFlow === "COMMUNICATIONWORKFLOW" && CuWorkState === "SECRETARILMAN" && FuncName === "letterCNFillInfo") {
        //Ext.Msg.alert("返回信息", plugins + "," + DefWorkFlow + "," + CuWorkState + "," + state);
        var fmLetterCNFillInfo = Ext.create('Ext.plug_ins.' + plugins + '.Document.' + FuncName, { title: "", mainPanelId: mainPanelId, docKeyword: docKeyword });

        winLetterCNFillInfo = Ext.widget('window', {
            title: '填写发文信息',
            closeAction: 'hide',
            width: 550,
            height: 250,
            minWidth: 550,
            minHeight: 250,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmLetterCNFillInfo,
            defaultFocus: 'firstName'
        });

        //fmLetterCNFillInfo.sendGetProductSignDefault(function () {
        //    winLetterCNFillInfo.show();
        //});

        winLetterCNFillInfo.show();

        //监听子窗口关闭事件
        winLetterCNFillInfo.on('close', function () {

        });
    }
}

//发文流程盖章 
function documenteSeal(mainPanelId, res) {
    var plugins = res.data[0].plugins;
    var DefWorkFlow = res.data[0].DefWorkFlow;
    var CuWorkState = res.data[0].CuWorkState;
    var FuncName = res.data[0].FuncName;
    var docKeyword = res.data[0].DocKeyword;
    //var FileCode = res.data[0].FileCode;
    if (plugins === "HXEPC_Plugins" && DefWorkFlow === "COMMUNICATIONWORKFLOW" && CuWorkState === "APPROV" && FuncName === "documenteSeal") {
        var fmDocumenteSeal = Ext.create('Ext.plug_ins.' + plugins + '.Document.' + FuncName, { title: "", mainPanelId: mainPanelId, docKeyword: docKeyword });

        winDocumenteSeal = Ext.widget('window', {
            title: '是否盖章',
            closeAction: 'hide',
            width: 450,
            height: 200,
            minWidth: 450,
            minHeight: 200,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmDocumenteSeal,
            defaultFocus: 'firstName'
        });

         //fmDocumenteSeal.sendCodeText.setValue(FileCode);

        winDocumenteSeal.show();

        //监听子窗口关闭事件
        winDocumenteSeal.on('close', function () {

        });
    }
};

//填写发文编号
function resetFileCode(mainPanelId, res) {
    var plugins = res.data[0].plugins;
    var DefWorkFlow = res.data[0].DefWorkFlow;
    var CuWorkState = res.data[0].CuWorkState;
    var FuncName = res.data[0].FuncName;
    var docKeyword = res.data[0].DocKeyword;
    var FileCode = res.data[0].FileCode;

    if (plugins === "HXEPC_Plugins" && DefWorkFlow === "COMMUNICATIONWORKFLOW" && CuWorkState === "SECRETARILMAN" && FuncName === "resetFileCode") {
        //Ext.Msg.alert("返回信息", plugins + "," + DefWorkFlow + "," + CuWorkState + "," + state);
        var fmResetFileCode = Ext.create('Ext.plug_ins.' + plugins + '.Document.' + FuncName, { title: "", mainPanelId: mainPanelId, docKeyword: docKeyword });

        winResetFileCode = Ext.widget('window', {
            title: '填写发文编号',
            closeAction: 'hide',
            width: 550,
            height: 250,
            minWidth: 550,
            minHeight: 250,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmResetFileCode,
            defaultFocus: 'firstName'
        });

        //fmResetFileCode.sendGetProductSignDefault(function () {
        //    winResetFileCode.show();
        //});
        fmResetFileCode.sendCodeText.setValue(FileCode);

        winResetFileCode.show();

        //监听子窗口关闭事件
        winResetFileCode.on('close', function () {

        });
    }
}

//发文流程，收文的时候选择分发部门及本专业主办人
function distriProcess(mainPanelId, res) {
    var plugins = res.data[0].plugins;
    var DefWorkFlow = res.data[0].DefWorkFlow;
    var CuWorkState = res.data[0].CuWorkState;
    var FuncName = res.data[0].FuncName;
    var docKeyword = res.data[0].DocKeyword;
    var projectKeyword = res.data[0].ProjectKeyword;
    var groupType = res.data[0].GroupType;
    var groupKeyword = res.data[0].GroupKeyword;

    if (plugins === "HXEPC_Plugins" && DefWorkFlow === "COMMUNICATIONWORKFLOW" && CuWorkState === "RECUNIT" && FuncName === "distriProcess") {

        var fmDistriProcess = Ext.create('Ext.plug_ins.' + plugins + '.Document.' + FuncName, { title: "", mainPanelId: mainPanelId, docKeyword: docKeyword });

        winDistriProcess = Ext.widget('window', {
            title: '选择办理人员',
            closeAction: 'hide',
            width: 550,
            height: 250,
            minWidth: 550,
            minHeight: 250,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmDistriProcess,
            defaultFocus: 'firstName'
        });

        //fmDistriProcess.sendGetProductSignDefault(function () {
        //    winDistriProcess.show();
        //});

        fmDistriProcess.projectKeyword = projectKeyword;
        fmDistriProcess.groupType = groupType;
        fmDistriProcess.groupKeyword = groupKeyword;
        winDistriProcess.show();

        //监听子窗口关闭事件
        winDistriProcess.on('close', function () {

        });
    }
}

//弹出消息框，回复信函
//调用本函数的位置在：Ext.ux.Common.comm，里面的StartNewWorkFlow的返回处理函数
function replyLetterCN(mainPanelId, res) {
    var plugins = res.data[0].plugins;
    var DefWorkFlow = res.data[0].DefWorkFlow;
    var CuWorkState = res.data[0].CuWorkState;
    var FuncName = res.data[0].FuncName;
    var docKeyword = res.data[0].DocKeyword;

    if (plugins === "HXEPC_Plugins" && DefWorkFlow === "RECEIVED" && FuncName === "replyLetterCN") {
        //Ext.Msg.alert("返回信息", plugins + "," + DefWorkFlow + "," + CuWorkState + "," + state);
        var fmDraftLetterCN = Ext.create('Ext.plug_ins.' + plugins + '.Document.' + 'DraftLetterCN', { title: "", mainPanelId: mainPanelId, docKeyword: docKeyword });

        winDraftLetterCN = Ext.widget('window', {
            title: '回复函件',
            closeAction: 'hide',
            width: 788,
            height: 588,
            minWidth: 788,
            minHeight: 588,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmDraftLetterCN,
            defaultFocus: 'firstName'
        });

        //获取打开表单时的默认参数
        fmDraftLetterCN.sendGetReplyLetterCNDefault(
        function () {
            //设置
            winDraftLetterCN.show();
        },
        function () {
            //设置回复完函件后的返回调用
            //Ext.Msg.alert("返回信息","触发了返回调用！@");
            //通过extjs的ajax获取操作全部名称
            Ext.Ajax.request({
                url: 'WebApi/Post',
                method: "POST",
                params: {
                    C: "AVEVA.CDMS.HXEPC_Plugins.Document", A: "RecWorflowPassReplyState",
                    sid: localStorage.getItem("sid"), DocKeyword: docKeyword
                },
                success: function (response, options) {

                }
            });
        });

        //监听子窗口关闭事件
        winDraftLetterCN.on('close', function () {

        });
    }
}

//处理拖拽文件到DocGrid控件的事件（收文）
//调用本函数的位置在：Ext.ux.YDForm._MainDocGrid 里面的 OnAfterCreateNewDocEvent 函数
//这里如果直接传递uploader,因为afterUpload事件延迟的关系，uploader里面的docKeyword会因为被新的文档覆盖而出现错误，所以不直接传送uploader了
function recDocument(mainPanelId, res, files) {
    var plugins = res.data[0].plugins;
    var FuncName = res.data[0].FuncName;
    var DocKeyword = res.data[0].DocKeyword;
    var ProjectKeyword = res.data[0].ProjectKeyword;

    if (plugins === "HXEPC_Plugins" && FuncName === "recDocument") {
        //Ext.Msg.alert("返回信息", plugins + "," + DefWorkFlow + "," + CuWorkState + "," + state);
        var fmRecDocument = Ext.create('Ext.plug_ins.' + plugins + '.RecDocument.' + FuncName, { title: "", mainPanelId: mainPanelId, docKeyword: DocKeyword, projectKeyword: ProjectKeyword });

        winRecDocument = Ext.widget('window', {
            title: '收文信息著录表',
            closeAction: 'hide',
            width: 668,
            height: 436,
            minWidth: 668,
            minHeight: 436,
            layout: 'fit',
            resizable: true,
            modal: true,
            closeAction: 'close', //close 关闭  hide  隐藏  
            items: fmRecDocument,
            defaultFocus: 'firstName'
        });

        //fmSelectUserEx.send_get_profession_list(function () {
        //    winSelectUserEx.show();
        //});

        winRecDocument.show();


        //监听子窗口关闭事件
        winRecDocument.on('close', function () {

        });
    }

}


//这一个定义必须保留在文件末尾
Ext.define('Ext.plug_ins.HXEPC_Plugins.common', {
});
