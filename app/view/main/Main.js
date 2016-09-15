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
        "svgxml.view.Viewport",
        "Ext.chart.*"
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
        render: "boxready"
    },
    //header:true,
    items: [

        {
            xtype: "basic-tabs",
            region: "west",
            width: 190,
            resizable: true,
            title: 'Projects',
            collapsible: true,
            split: true
            //padding: "0 10 0 0"
        },
        //{ region: "east", width: 90, title: 'north', collapsible: true },
        Ext.create("svgxml.view.tab.FramedTabs", {
            region: "center",
            height: "200%",
            width: "200%",
            //split: true,
            //collapsible: true,
        })
    ]
});
function isTime(val) {
    var vals = val.split(":")
    if (vals.length != 3) {
        return "This field error";
    }
    if (!(vals[0] >= 0 & vals[0] <= 23 & vals[1] >= 0 & vals[1] <= 59 & vals[2] >= 0 & vals[2] <= 59)) {
        return "This field error";
    }
    for (var i = 0; i < vals.length; i++) {
        if (isNaN(vals[i]) || (vals[i] + "") == "-0") {
            return "This field error";
        }
    }
    return true;
}


function isBarCollsion(x1, y1, x2, y2, w, h) {
    if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
        return true;
    }
    return false;
}

function myAjax(url, success,params) {
    Ext.Ajax.request({
        url: url||"resources/test1.php",
        method: "GET",
        async: false,
        params: params||{},
        success: success
    });
}


var testwin = null
var teststore = null;
Ext.onReady(function () {
    setTimeout(function () {

        /*
         teststore=Ext.create("Ext.data.XmlStore",{
         url:"resources/devxml/1100.xml",
         //autoLoad:true,
         fields:[{name:"key",mapping:"@key.number"}],
         record:"key"
         /!*proxy:{
         type:"ajax",
         url:"resources/devxml/1100.xml",
         reader:{
         record: 'key',
         type:"xml"
         }
         }*!/
         })


         var grid = Ext.create("Ext.grid.Panel", {
         store:teststore,
         columns:[{
         text:"key",
         flex:1,
         dataIndex:"key.number",
         renderer:function(){
         console.log(arguments)

         }
         }]
         })
         console.log(teststore)


         testwin = Ext.create("Ext.window.Window", {
         //title: record.data.text + 'build',
         width: 550,
         height: 530,
         bodyPadding: 10,
         frame: true,
         autoShow: true,
         layout: "auto",
         items: grid,
         buttons: [{
         text: 'OK',
         handler: function () {
         console.log(this)
         }
         }]
         })*/
        /*testwin = Ext.create('svgxml.view.window.RenameWindow', {
         sDevNodeName: "1000101",
         sDevName: "1100",
         })*/

        /*   testwin=Ext.create('svgxml.view.window.ImgSvgWindow', {
         sDevNodeName: "2000601",
         sDevName: "2000",
         sDevNodeType:"AI"
         })*/
    }, 3000)

})


var isDebug=false;