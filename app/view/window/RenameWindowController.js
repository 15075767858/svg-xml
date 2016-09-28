Ext.define('svgxml.view.window.RenameWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-renamewindow',
    boxready: function () {
        var me = this.view;
        var chart = Ext.create('svgxml.view.chart.RenameChart', {
            storeData: me.getChartStoreData(),
            minHeight: 300
        })
        //me.add(chart)
        me.insert(0, chart)
        chart.expand()
    }

});
