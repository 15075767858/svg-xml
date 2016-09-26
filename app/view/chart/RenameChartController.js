Ext.define('svgxml.view.chart.RenameChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chart-renamechart',

    onAxisLabelRender: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    },

    onSeriesLabelRender: function (v) {
        return Ext.util.Format.number(v / 1000, '0,000');
    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var formatString = '0,000 (millions of USD)';

        tooltip.setHtml(record.get('country') + ': ' +
            Ext.util.Format.number(record.get('ind'), formatString));
    },

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        chart.preview();
    }
    
});
