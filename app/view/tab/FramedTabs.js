/**
 * Created by Administrator on 2016/2/25.
 */

Ext.define('svgxml.view.tab.FramedTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    BaseCls: "FramedTabs",
    requires: [
        "svgxml.view.tab.DrawPanel",
        "svgxml.view.tab.FramedTabsController"
    ],
    frame: true,
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    listeners: {
        viewready: "viewready"
    },
    items: [
        Ext.create("svgxml.view.tab.DrawPanel", {
            title: "1200"
        })
        ,
        Ext.create("svgxml.view.tab.DrawPanel", {
            title: "1201"
        })
    ]
});


new Ext.dd.DDTarget("ssss", "IconDragDropGroup");