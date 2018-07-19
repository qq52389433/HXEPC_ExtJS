Ext.define('Ext.plug_ins.HXEPC_Plugins.Document.FileAttrGridPanel', {
    //extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',//'Ext.tab.Panel',//
    alias: 'widget.FileAttrGridPanel', // 此类的xtype类型为buttontransparent  
    title: "文档著录属性",
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    //height: '100%',
    projectKeyword: '',
    //GroupType:'Org',Filter:'',
    baseCls: 'my-panel-no-border',//隐藏边框
    initComponent: function () {
        var me = this;
        me.renderTo = me.el;

        me.item = [
            {
                xtype: 'button',
                text: 'aa'
            }
        ];

        me.callParent(arguments);
    }
});
