Ext.define("svgxml.view.tab.DrawPanel", {
    extend: "Ext.draw.Container",
    xtype: "drawpanel",
    requires: [
        "svgxml.view.tab.DrawPanelController",
        "svgxml.view.tab.DrawPanelModel"
    ],
    engine: "Ext.draw.engine.Svg",
    controller: "tab-drawpanel",
    viewModel: {
        type: "tab-drawpanel"
    },
    autoScroll: true,
    closable: true,
    bodyStyle: 'background:url(img/square.gif);',
    bodyPadding: "0",
    layout: {
        type: "absolute"
    },
    enableDragDrop: true,
    listeners: {
        boxready: "boxready",
        add: "add",
        render: "render",
        show: "show",
        hide: "hide",

        el: {
            contextmenu: function (th, el, eOpts) {
                console.log(arguments)
                if (el.tagName != "svg") {
                    return;
                }
                ;

                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: th.pageX,
                    y: th.pageY,
                    listeners: {
                        show: function (thi, eOpts) {
                            try {
                                if (hideCom)
                                    thi.getComponent("addSlot").setDisabled(false);
                            } catch (e) {

                            }

                        }
                    }
                })
                th.stopEvent();
            }
        }
    }
});


/*
 var image = Ext.create('Ext.Img', {
 src: 'xrModule.do?method=view&id=' + nodeData.nodeId,
 autoEl: 'div',
 //	constrain: true,
 //	floating:true,
 nodeId: nodeData.nodeId,
 x: nodeData.x,
 y: nodeData.y,
 draggable: true,
 listeners: {
 scope: this,
 el: {
 dblclick: function (e, a) {
 e.stopEvent();
 rightPanel.setSource({
 name: nodeData.name,
 code: nodeData.code,
 width: nodeData.width,
 height: nodeData.height
 });
 rightPanel.setTitle('模块设置：' + nodeData.name);
 },
 contextmenu: function (e, a, b, c) {
 e.stopEvent();
 var contextmenu = new Ext.menu.Menu({
 items: [{
 text: '模块设置',
 iconCls: 'icon-edit',
 handler: function () {
 rightPanel.setSource({
 name: nodeData.name,
 code: nodeData.code,
 width: nodeData.width,
 height: nodeData.height
 });
 rightPanel.setTitle('模块设置：' + nodeData.name);
 },
 scope: this
 }]
 });
 contextmenu.showAt(e.getXY());
 }
 }
 }
 });*/
