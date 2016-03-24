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
    autoScroll:true,
    closable: true,
    bodyStyle: 'background:url(img/square.gif);',
    bodyPadding:"0",
    layout: {
        type: "absolute"
    },

    enableDragDrop: true,
    listeners: {
        boxready: "boxready",
        add:"add",
        render: "render",
        show: "show"
    }
});
