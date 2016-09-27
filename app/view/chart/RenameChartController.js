Ext.define('svgxml.view.chart.RenameChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chart-renamechart',

    onAxisLabelRender: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    },

    onSeriesLabelRender: function (v) {
        console.log(arguments)
        return v
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
    },
    deleteType:function(button){
        var cartesian = this.view.down("cartesian")
        var model = cartesian.getStore().getAt(button.devType)
        var win = Ext.create('Ext.window.Window', {
            title: 'Delete •••',
            frame: true,
            width: 325,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'select file name',
                    store: aDevNames,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    autoSelect: false
                }
            ],
            buttons: [
                {
                    text: 'Ok', handler: function () {
                    var text = win.down("combobox").getValue();
                    if (text == null) {
                        Ext.Msg.alert('Info', 'Plase select file name.');
                        return;
                    }
                    win.close();
                    Ext.Ajax.request({
                        url: "resources/xmlRW.php",
                        async: false,
                        params: {
                            fileName: "devsinfo/" + text,
                            rw: "r"
                        },
                        success: function (response) {
                            //var ojsonstr = response.responseText

                            var tabpanel = Ext.getCmp("frametab_drawpanel");
                            tabpanel.addDrawPanel(text)

                            /*var drawpanels = Ext.ComponentQuery.query("drawpanel");
                             for (var i = 0; i < drawpanels.length; i++) {
                             if (drawpanels[i].title == text) {
                             tabpanel.setActiveTab(drawpanels[i].id);
                             return;
                             }
                             drawpanels[i].close()
                             }

                             var drawpanel = Ext.create("svgxml.view.tab.DrawPanel", {
                             title: text
                             })
                             //console.log(tabpanel.items)
                             tabpanel.add(drawpanel)
                             tabpanel.setActiveTab(drawpanel.id);*/

                        }
                    })
                    win.close();
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })

        model.set("count",model.get('count')-1)

        testcartesian = cartesian;
    },
    addType:function(button){

        var cartesian = this.view.down("cartesian")
        var model = cartesian.getStore().getAt(button.devType)
        model.set("count",model.get('count')+1)
    }

});
