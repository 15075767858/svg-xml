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
    closable: true,
    bodyStyle: 'background:url(img/square.gif);',
    /*sprites: [{
     type: 'rect',
     path: 'M150 0 L25 100 L300 100 Z',
     strokeStyle: '#333',
     fill: '#999',
     width: 100,
     height: 100,
     lineWidth: 2
     }],*/
    layout: {
        type: "absolute"
    },

    enableDragDrop: true,
    listeners: {
        boxready: "boxready",

        render: "render",
        show: "show"
    }
});
