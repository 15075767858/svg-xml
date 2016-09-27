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
    deleteType: function (button) {
        var cartesian = this.view.down("cartesian")
        var model = cartesian.getStore().getAt(button.devType)
        console.log(model)
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
                    store: Ext.create("Ext.data.Store", {
                        fields: ['key', "Object_Name"],
                        data: model.data.keys
                    }),
                    editable: false,
                    queryMode: 'local',
                    displayField: 'Object_Name',
                    valueField: 'key',
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


                    model.set("count", model.get('count') - 1)

                    var key = model.get("key")

                    console.log(cartesian.up("window"))
                    /*model.data.keys.find(function(v,index){
                     console.log(v)
                     if(v.key==text){
                     model.data.keys.splice(index,1)
                     return ;
                     }
                     })*/
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })
        testcartesian = cartesian;

    },
    addType: function (button) {

        var cartesian = this.view.down("cartesian")
        var model = cartesian.getStore().getAt(button.devType)
        model.set("count", model.get('count') + 1)
        var keys = model.get("keys")
        testkeys = keys
        var key =keys[keys.length - 1].key
        var window = cartesian.up("window");
        window.insrtDevForm(key);


    }

});
