Ext.define('svgxml.view.window.RenameWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-renamewindow',
    boxready: function () {
        var me = this.view;
        /*var chart = Ext.create('svgxml.view.chart.RenameChart', {
         storeData: me.getChartStoreData(),
         minHeight: 300
         })
         //me.add(chart)
         me.insert(0, chart)
         chart.expand()
         */

        var types = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE'];

        var items = [];
        for (var i = 0; i < types.length; i++) {
            var fieldcontainer = {
                xtype: "fieldcontainer",
                layout: "hbox",
                defaults: {
                    margin: "0 35"
                },
                items: [
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        fieldLabel: types[i],
                        name: types[i],
                        width: 180,
                        flex: 5
                    }, {
                        xtype: "button",
                        devType: i,
                        text: "+",
                        flex: 1,
                        handler: addType
                    }, {
                        xtype: "button",
                        text: "-",
                        devType: i,
                        flex: 1,
                        handler: deleteType
                    }
                ]
            }
            items.push(fieldcontainer);
        }


        var panel = Ext.create("Ext.form.Panel", {
            title: "devices",
            items: items,
            bodyPadding: 20,
            minHeight: 300
        });

        panel.getForm().setValues(me.getFormValues());

        me.insert(0, panel);
        panel.expand();


        function addType(button) {

            var lastText = me.sDevName + button.devType;

            var netNumbers = []
            for (var i = 0; i <= 9900; i += 100) {
                netNumbers.push(i)
            }
            var modelAddress = [];
            for (var i = 0; i <= 99; i++) {
                modelAddress.push(i);
            }
            var pointType = [];
            for (var i = 0; i < types.length; i++) {
                pointType.push({
                    name: types[i],
                    value: i
                })
            }

            var keyField = Ext.create("Ext.form.field.Text", {
                margin: 10,
                fieldLabel: "Key",
                value: "9901201"
            })
            var win = Ext.create('Ext.window.Window', {
                title: 'Add •••',
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
                        fieldLabel: 'Net Number',
                        store: netNumbers,
                        editable: false,
                        queryMode: 'local',
                        autoSelect: false,
                        value: "9900",
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var value = Ext.String.leftPad(newValue, 4, "0");
                                var values = keyField.getValue().split("");
                                values[0] = value[0]
                                values[1] = value[1]
                                console.log(values)
                                keyField.setValue(values.join(''))
                                //Ext.String.insert //补0
                            }
                        }
                    },
                    {
                        margin: 10,
                        xtype: "combobox",
                        allowBlank: false,
                        fieldLabel: 'Model Address',
                        store: modelAddress,
                        editable: false,
                        queryMode: 'local',
                        autoSelect: false,
                        value:"01",
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var value = Ext.String.leftPad(newValue, 2, "0");
                                var values = keyField.getValue().split("");
                                values[2] = value[0]
                                values[3] = value[1]
                                keyField.setValue(values.join(''))
                            }
                        }

                    },
                    {
                        margin: 10,
                        xtype: "combobox",
                        allowBlank: false,
                        fieldLabel: 'Point Type',
                        store: Ext.create("Ext.data.Store", {
                            fields: ['name', "value"],
                            data: pointType
                        }),
                        valueField: "value",
                        displayField: "name",
                        editable: false,
                        queryMode: 'local',
                        autoSelect: false,
                        listeners: {
                            afterrender: function (combo) {
                                console.log(arguments)
                                combo.setValue(combo.store.getAt(button.devType));
                            },
                            change: function (field, newValue, oldValue) {
                                var value=newValue;
                                var values = keyField.getValue().split("");
                                values[4] = value
                                keyField.setValue(values.join(''))
                            }
                        }
                    },
                    {
                        margin: 10,
                        xtype: "combobox",
                        allowBlank: false,
                        fieldLabel: 'Point Number',
                        store: modelAddress,
                        editable: false,
                        queryMode: 'local',
                        autoSelect: false,
                        value: "01",
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var value = Ext.String.leftPad(newValue, 2, "0");
                                var values = keyField.getValue().split("");
                                values[5] = value[0]
                                values[6] = value[1]
                                keyField.setValue(values.join(''))
                            }
                        }

                    },
                    keyField
                ],
                buttons: [
                    {
                        text: 'Ok', handler: function () {
                        var text = keyField.getValue();
                        /*if (text == null) {
                            Ext.Msg.alert('Info', 'Plase select file name.');
                            return;
                        }*/

                        //win.close();

                        if(isNaN(text)||text.length!=7){
                            Ext.Msg.alert("Key Exception","The key ,Does not meet the requirements")
                            return
                        }

                        if(me.query('[key='+text+']').length){
                            Ext.Msg.alert("Key Exception","has been "+text)
                            return
                        }

                        Ext.MessageBox.prompt("Input","New Name",function(ms,v){
                            if(ms!='ok'){
                                return ;
                            }
                            me.insrtDevForm(text,v);
                            Ext.Msg.alert("Massage","Ok.")
                        })

                        //panel.getForm().setValues(me.getFormValues());

                    }
                    },
                    {
                        text: 'Cancel', handler: function () {
                        win.close();
                    }
                    }
                ]
            })


            /*Ext.MessageBox.prompt('Add •••', 'Please enter your key:', function (ms, v, scope) {
             if (ms == 'ok') {
             if (v.length == 7 & v.substr(0, 5) == lastText & !isNaN(v)) {
             window.insrtDevForm(v);
             } else {
             Ext.Msg.alert('Exception', "Please enter 7 digits after two .")
             }

             }
             }, this, false, lastText);
             */


        }

        function deleteType(button) {


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
                            fields: ['key', "title"],
                            data: me.getFormValues()['type' + button.devType]
                        }),
                        editable: false,
                        queryMode: 'local',
                        displayField: 'title',
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

                        me.deleteDevForm(text);

                        panel.getForm().setValues(me.getFormValues());

                    }
                    },
                    {
                        text: 'Cancel', handler: function () {
                        win.close();
                    }
                    }
                ]
            })

        }
    }
});
