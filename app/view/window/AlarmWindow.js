Ext.define("svgxml.view.window.AlarmWindow", {
    extend: "Ext.window.Window",

    requires: [
        "svgxml.view.window.AlarmWindowController",
        "svgxml.view.window.AlarmWindowModel"
    ],

    controller: "window-alarmwindow",
    viewModel: {
        type: "window-alarmwindow"
    },
    autoShow: true,
    width: 800,
    height: 600,
    layout: 'auto',
    resizable: false,
    initComponent: function () {
        var me = this;
        me.title = me.sDevNodeName + " Alarm Property";

        var meForm = Ext.create('Ext.form.Panel', {


            items: {
                xtype: "container",
                height: 600,
                defaults: {
                    anchor: '100%',
                    margin: "20 10 10 10",
                },
                layout: 'hbox',
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Input Value',
                                defaultType: 'textfield',
                                defaults: {
                                    margin: "73 0 73 0",
                                    allowBlank: false,
                                },
                                items: [{
                                    xtype: "textfield",
                                    name: "height_limit",
                                    fieldLabel: "Height Limit",
                                    bind: "{high_limit}"
                                }, {
                                    xtype: "textfield",
                                    name: "low_limit",
                                    fieldLabel: "Low Limit",
                                    bind: "{low_limit}"
                                }, {
                                    xtype: "textfield",
                                    name: "delay_time",
                                    fieldLabel: "Delay Time",
                                    bind: "{delay_time}"
                                }, {
                                    xtype: "textfield",
                                    name: "deadband",
                                    fieldLabel: "Deadband",
                                    bind: "{deadband}"
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        flex: 1,

                        items: [
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                title: 'select value',
                                defaultType: 'checkbox', // each item will be a checkbox
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    hideEmptyLabel: false
                                },
                                items: [
                                    {
                                        xtype: "combobox",
                                        margin: "15 0 15 0",
                                        fieldLabel: 'Notification Class',
                                        name: 'notification_class',
                                        displayField: 'name',
                                        valueField: 'value',
                                        allowBlank: false,
                                        editable: false,
                                        bind: "{notification_class}",
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ["name", "value"],
                                            data: [
                                                {"name": "URGENT", "value": "1"},
                                                {"name": "HIGH", "value": "2"},
                                                {"name": "LOW", "value": "3"}
                                            ]
                                        })


                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                title: 'checked value',
                                defaultType: 'checkbox', // each item will be a checkbox
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    margin: "40 0 40 0",
                                    viewModel: me.getViewModel(),

                                },

                                items: [
                                    {
                                        //reference:"checked1",
                                        fieldLabel: 'Enable Limit',
                                        boxLabel: 'Enable Height Limit',
                                        bind: "{ck1}",
                                        handler: function () {
                                            console.log(me.getViewModel());
                                            console.log(this.getViewModel())
                                        }
                                    }, {
                                        //reference:"checked2",
                                        boxLabel: 'Enable Low Limit',
                                        bind: "{ck2}",
                                    },
                                    {
                                        xtype: "hiddenfield",
                                        name: "limit",
                                        bind: '{limit}'
                                    },
                                    {
                                        //reference:"checked3",
                                        fieldLabel: 'Event Enable',
                                        boxLabel: 'ENABLE_TO_NORMAL',
                                        bind:'{ck3}',
                                    }, {
                                        //reference:"checked4",
                                        boxLabel: 'ENABLE_TO_OFFNORMAL',
                                        bind:'{ck4}',
                                    }, {
                                        //reference:"checked5",
                                        boxLabel: 'ENABLE_TO_FAULT',
                                        bind:'{ck5}',
                                    }, {
                                        xtype: "hiddenfield",
                                        name: "event_enable",
                                        bind:'{event_enable}',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        me.items = meForm;
        me.buttons = [
            {
                text: "Ok", handler: function () {
                meForm.submit({
                    url: "aaa.php",
                    method:"post"
                });
            }
            }, {
                text: "Cancel", handler: function () {

                }
            }
        ];
        me.callParent();
    }
});

