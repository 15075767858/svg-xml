/**
 * Created by Administrator on 2016/2/25.
 */
var hello;
Ext.require([
    'Ext.window.Window',
    'Ext.tab.*',
    'Ext.toolbar.Spacer',
    "Ext.tree.*",
    'Ext.layout.container.Card',
    'Ext.layout.container.Absolute',
    'Ext.layout.container.Border'
]);
var drawComponent = Ext.create('Ext.draw.Component', {
    viewBox: true,
    items: [{
        type: 'circle',
        fill: '#79BB3F',
        radius: 50,
        x: 302,
        y: 302
    }]
});
var grid;
Ext.define('svgxml.view.tab.FramedTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    BaseCls: "FramedTabs",
    requires: [
        "svgxml.view.tab.FramedTabsController"
    ],
    frame: true,
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    //it:this.down().addCls("aaa"),
    listeners: {

        'tabchange': function (tab, newc, oldc) {
//获取你点击的tab页  完成你的操作   这个是4.0的
            // alert("a")
            console.log(hideCom)
            hideCom.show();
        },

        viewready: function (th, eO) {
            th.getHeader().el.dom.oncontextmenu = function (e) {
                //e.preventDefault();
                th.add(
                    Ext.create('svgxml.view.grid.menu.gridmenu', {
                        width: 100,
                        margin: '0 0 10 0',
                        //renderTo:Ext.getBody(),
                        autoShow: true,
                        floating: true,  // usually you want this set to True (default)
                        x: e.pageX,
                        y: e.pageY//,
                        /*listeners:{
                         click:function(){
                         console.log(Ext.removeNode(th))
                         }
                         }*/
                    })
                )
                console.log(arguments)

            }
        }
    },
    items: [
        {
            id: "ssss",
            xtype: "container",
            controller: "framedtabs",
            //focus:"ssss",
            title: '1201',
            closable: true,
            cls: "centerPanel",
            layout: {
                type: "absolute"
            },
            style: {
                background: "url(img/square.gif)"
            },
            enableDragDrop: true,
            items: [{
                xtype: 'grid',

                viewConfig: {
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        ddGroup: 'DragDropGroup2',
                        dragText: 'Drag and drop to reorganize',
                    }
                },
            }],
            listeners: {
                render:function(th,eOpts){

                    th.el.dom.oncontextmenu=function(e){
                //        console.log(th.el.dom)
                        e.stopPropagation();

                    }
                }
            }
        }, grid = Ext.create('Ext.grid.Panel', {
            title: '1202',
            closable: true,
            store: {
                fields: ['name'],
                data: [{
                    name: 'Scott Pilgrim'
                }]
            },
            columns: [{
                header: 'Name',
                dataIndex: 'name',
                editor: 'textfield',
                flex: 1
            }],
            selType: 'cellmodel',
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1,
                pluginId: 'myplugin'
            },
            height: 200,
            width: 400
            //html: KitchenSink.DummyText.extraLongText
        }), {
            title: '1203',
            closable: true
            //disabled: true
        }]
});
Ext.onReady(function () {
    console.log(Ext.query("leftPanelIcons table"))
})

grid.findPlugin('cellediting');  // the cellediting plugin
new Ext.dd.DDTarget("ssss", "DragDropGroup2");


/*hello=Ext.create('Ext.window.Window', {
 title: 'Hello',
 height: 200,
 width: 400,
 closable:false,
 layout: 'fit',
 items: {  // Let's put an empty grid in just to illustrate fit layout
 xtype: 'grid',
 border: false,
 columns: [{header: 'World'}],                 // One header just for show. There's no data,
 store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
 },
 constrain: true,
 constrainHeader:true,
 layout: 'fit',
 /!*items: {
 border: false,

 }*!/
 items:[
 drawComponent
 ],
 constrain: true
 })*/
/*Ext.require([
 'Ext.window.Window',
 'Ext.tab.*',
 'Ext.toolbar.Spacer',
 'Ext.layout.container.Card',
 'Ext.layout.container.Border'
 ]);*/
/*
 var drawContainer = Ext.create('Ext.draw.Container', {
 renderTo: Ext.getBody(),
 width:200,
 height:200,
 sprites: [{
 type: 'circle',
 fillStyle: '#79BB3F',
 r: 100,
 x: 100,
 y: 100
 }]
 });*/
/*
 Ext.onReady(function(){

 var constrainedWin, constrainedWin2;

 /!* Ext.util.Region.override({
 colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
 nextColor: 0,
 show: function(){
 var style = {
 display: 'block',
 position: 'absolute',
 top: this.top + 'px',
 left: this.left + 'px',
 height: ((this.bottom - this.top) + 1) + 'px',
 width: ((this.right - this.left) + 1) + 'px',
 opacity: 0.3,
 'pointer-events': 'none',
 'z-index': 9999999
 };
 if (!this.highlightEl) {
 style['background-color'] = this.colors[this.nextColor];
 Ext.util.Region.prototype.nextColor++;
 this.highlightEl = Ext.getBody().createChild({
 style: style
 });
 if (this.nextColor >= this.colors.length) {
 this.nextColor = 0;
 }
 } else {
 this.highlightEl.setStyle(style);
 }
 },
 hide: function(){
 if (this.highlightEl) {
 this.highlightEl.setStyle({
 display: 'none'
 });
 }
 }
 });*!/

 var win2 = Ext.create('widget.window', {
 height: 200,
 width: 400,
 x: 450,
 y: 450,
 autoShow:true,
 title: 'Constraining Window, plain: true',
 closable: false,
 plain: true,
 layout: 'fit',
 items: [constrainedWin = Ext.create('Ext.Window', {
 title: 'Constrained Window',
 width: 200,
 height: 100,
 x: 1000,
 y: 20,
 constrain: true,
 layout: 'fit',
 items: {
 border: false
 }
 }), constrainedWin2 = Ext.create('Ext.Window', {
 title: 'Header-Constrained Win',
 width: 200,
 height: 100,
 x: 120,
 y: 120,
 constrainHeader: true,
 layout: 'fit',
 items: {
 border: false
 }
 })]
 });

 /!*    var drawComponent = ;*!/



 Ext.create('Ext.Window', {
 width: 215,
 height: 235,
 layout: 'fit',
 items: [drawComponent]
 }).show();
 /!*
 Ext.create('Ext.Window', {
 title: 'Left Header, plain: true',
 width: 400,
 height: 200,
 x: 80,
 y: 200,
 plain: true,
 headerPosition: 'left',
 layout: 'fit',
 items: {
 border: false
 }
 }).show();
 *!/
 /!*
 Ext.create('Ext.Window', {
 title: 'Right Header, plain: true',
 width: 400,
 height: 200,
 x: 450,
 y: 200,
 headerPosition: 'right',
 layout: 'fit',
 items: {
 border: false
 }
 }).show();

 Ext.create('Ext.Window', {
 title: 'Bottom Header, plain: true',
 width: 400,
 height: 200,
 x: 80,
 y: 450,
 plain: true,
 headerPosition: 'bottom',
 layout: 'fit',
 items: {
 border: false
 }
 }).show();*!/

 /!* Ext.create('Ext.window.Window', {
 title: 'Hello',
 height: 200,
 width: 400,

 layout: 'fit',
 items: {  // Let's put an empty grid in just to illustrate fit layout
 xtype: 'grid',
 border: false,
 columns: [{header: 'World'}],                 // One header just for show. There's no data,
 store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
 },
 constrain: true,
 layout: 'fit',
 items: {
 border: false
 },
 renderTo:Ext.get("ssss")
 }).show();*!/


 });
 */
