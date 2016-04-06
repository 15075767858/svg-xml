/**
 * Created by Administrator on 2016/2/25.
 */
Ext.define('svgxml.view.tab.FramedTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    BaseCls: "FramedTabs",
    requires: [
        "svgxml.view.tab.FramedTabsController"
    ],
    controller: 'framedtabs',
    //frame: true,
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    listeners : {
      //  viewready: "viewready",
        render:"render"
    }
});

//new Ext.dd.DDTarget("ssss", "IconDragDropGroup");