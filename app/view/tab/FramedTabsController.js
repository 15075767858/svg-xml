Ext.define('svgxml.view.tab.FramedTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.framedtabs',

    render: function (th) {
        th.add(Ext.create("svgxml.view.tab.DrawPanel", {
            title: "1000"
        }))
    }
});
