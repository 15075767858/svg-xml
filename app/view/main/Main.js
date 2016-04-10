/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('svgxml.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'svgxml.view.main.MainController',
        'svgxml.view.main.MainModel',
        "svgxml.view.main.toolbar.TopToolbar",
        "svgxml.view.tab.FramedTabs",
        "svgxml.view.Viewport"
    ],
    style: {
        //background: "rgb(21,127,214)"
    },
    xtype: 'app-main',
    //layout: "border",
    layout: {
        type: 'border',
        align: 'stretch'
    },
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    title: "<div style='z-index:0;top:0px;width:100%;line-height:35px;padding:0 0 0 5px;margin:0;font-size: 20px;color:white;'><img style='height:30px;' src='resources/img/PNG/SmartIO.png'/>    SmartIO</div>",
    bind: {
        //title:"<div style='z-index:0;top:0px;width:100%;line-height:50px;background:rgb(130,177,52);padding:0 0 0 5px;font-size: 20px;color:white;'><img style='height:20px;' src='{img}'/>     {name}</div>"
    },
    tbar: [
        {
            xtype: "basic-toolbar",
            padding: 0
        }
    ],
    listeners: {
        boxready: function () {
            function autoSave() {
                if(!window.localStorage){
                    return;
                }


                saveXml()
            }
            var runner = new Ext.util.TaskRunner();
            setTimeout(function () {
                var task = runner.start({
                    run: autoSave,
                    interval: 5000
                })
            }, 5000)

        }
    },
    //header:true,
    items: [
        /* {
         xtype: "header",
         region: "north",
         layout: "border",
         height: 100,
         bind: {
         title: "<div style='z-index:0;top:0px;width:100%;line-height:50px;background:rgb(130,177,52);padding:0 0 0 5px;font-size: 20px;color:white;'><img style='height:20px;' src='{img}'/>     {name}</div>"
         },
         //margin: "40 0 0 0",
         items: [
         {
         xtype: "basic-toolbar"
         }
         ],
         collapsible: false
         },*/
        {
            xtype: "basic-tabs",
            region: "west",
            width: 280,
            resizable: true,
            title: 'Projects',
            collapsible: true,
            split: true
            //padding: "0 10 0 0"
        },
        //{ region: "east", width: 90, title: 'north', collapsible: true },
        Ext.create("svgxml.view.tab.FramedTabs", {
            region: "center",
            split: true,
            collapsible: true,
            title: "Program"
        })
    ]
});


/*
 Ext.onReady(function() {


 var columnData = [
 ["Consignee", "1001"],["PO#", "1002"],["Cargo Origin", "1003"],["Cargo Origin Country", "1004"],
 ["Cargo Dest.", "1005"],["Cargo Destination Country", "1006"],["PO Status", "1007"],
 ["PO Vendor", "1008"],["Buyers", "1009"],["Bill to", "1010"],["Earliest Ship Date", "1011"],
 ["Latest Ship Date", "1012"]
 ];

 var columnStore = new Ext.data.ArrayStore({
 fields: ['fieldName','fieldOid'],
 data: columnData
 });

 var selectedColumnStore = new Ext.data.ArrayStore({
 fields: ['fieldName','fieldOid'],
 data: []
 });

 var columnsView = Ext.create('Ext.view.View', {
 store: columnStore,
 id: 'columnsViewOid',
 xtype: 'dataview',
 tpl: [
 '<tpl for=".">',
 '<div class="thumb-wrap1" id="{fieldOid}">',
 '<div style="padding-left: 3px;height:50px;">{fieldName}</div></div>',
 '</tpl>',
 '<div class="x-clear"></div>',
 ],
 trackOver: true,
 itemSelector: '.thumb-wrap1'
 });

 var selectedColumnsView = Ext.create('Ext.view.View', {
 store: selectedColumnStore,
 id: 'selectedColumnsViewOid',
 xtype: 'dataview',
 tpl: [
 '<tpl for=".">',
 '<div class="thumb-wrap1" id="{fieldOid}">',
 '<div style="padding-left: 3px;">{fieldName}  <img border="0" src="images/del.gif" onclick = "deleteViewItem({fieldOid})"/></div></div>',
 '</tpl>',
 '<div class="x-clear"></div>',
 ],
 trackOver: true,
 itemSelector: '.thumb-wrap1'
 });

 Ext.create('Ext.Panel', {
 id: 'columnsDispPanelOid',
 autoScroll:true,
 width: 600,
 height:350,
 renderTo: Ext.getBody(),
 bodyPadding: 5,
 layout:'border',
 defaults: {
 split: true
 },
 items:[
 {
 xtype:'panel', region:'west', margin: '0 2 0 0', flex:1, items: columnsView,
 tbar:[
 {xtype:'displayfield', value:'<span style="color:#04408c;font-weight:bolder;height:20px;line-height:19px;margin-left:3px"> Columns </span>', margin: '0 2 0 0'}
 ]
 },
 {
 xtype:'panel', region:'center', items: selectedColumnsView,
 tbar:[
 {xtype:'displayfield', value:'<span style="color:#04408c;font-weight:bolder;height:20px;line-height:15px;margin-left:3px"> Selected Columns </span>', margin: '0 2 0 0'},
 '-',
 {
 xtype: 'button',
 icon: 'images/rpt_reset.png',
 text: 'Reset',
 id: 'selectedColumnResetID',
 textAlign: 'right',
 listeners:{
 click: function() {
 // Ext.getCmp('selectedColumnsViewOid').getStore().loadData([]);
 }
 }
 }
 ],
 }
 ]
 });


 });*/
