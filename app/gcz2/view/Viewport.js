//类名中最后一个小数点之前的内容为目录，之后的是文件名,
//因为CDMSWap指向的目录是scripts / app，因而文件所在目录是scripts / app / view,
//CDMSWap的路径在主页的Loader中定义
Ext.define('CDMSWap.view.Viewport', {
    //定义一个从Ext.container.Viewport派生的类，用来搭建应用程序的整体界面
    extend: 'Ext.container.Viewport',
    //加入布局,因为是垂直划分的三部分，因而不需要使用到Border布局了，使用VBox就可以了
    //这里一定要加align，以便布局可以填满宽度
    layout: { type: 'vbox', align: 'stretch' },
    //自动加载MainPanel
    requires: ['CDMSWap.view.MainPanel'],
    _Storage_DocName:"123456aaaaaaaa",
    initComponent: function () {
        var me = this;


        me.items = [
            //顶部因为还要添加按钮，因而使用一个工具栏比较方便
            { xtype: "component", height: 3, id: "North" },//顶部只是占位，用Component就行了
            { xtype: "mainpanel", id: "mainPanel" },//中部是标签页,加了一个id，是为了方便以后使用选择器查找组件
            {
                xtype: "panel",
                height: 2,//height: 50,
                id: "South", collapsible: false, bodyStyle: 'background:#6C86AE;',
                items: [
                  {
                      xtype: "toolbar",
                      //layout: "hbox",
                      width: '100%', baseCls: 'my-panel-no-border',//隐藏边框
                      align: 'stretch', margin: '3 0 3 0', padding: '0 0 0 0',
                      pack: 'start',
                      items: [
                      ]
                  }]
            },
            //用隐藏控件保存全局值，方便WebBorwser交互
            {
                xtype: 'textfield',
                fieldLabel: 'Sid',
                hidden: true,
                id: "_Storage_Sid",
                name: 'sid_name',
                alias: 'widget._Storage_Sid', // 此类的xtype类型为buttontransparent  
                anchor: '95%',
                value: ""

            },
            {
                xtype: 'textfield',
                fieldLabel: 'DocKeyword',
                hidden: true,
                id: "_Storage_DocKeyword",
                name: 'name',
                alias: 'widget._Storage_DocKeyword', // 此类的xtype类型为buttontransparent  
                anchor: '95%',
                value: ""

            }
            //顶部的高度是53，底部是13。主体部分设置flex为1，表示它会占据剩余的空间

        ];

        me.callParent(arguments);
    },

  

});