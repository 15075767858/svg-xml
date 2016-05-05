Ext.define('svgxml.view.tree.DevTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.imgtree',
    render: function (th) {
        var store = Ext.create("Ext.data.TreeStore")
        var url = "192.168.253.253";
        var oJson = getTreeJsonByUrl(url)
        store.setRoot(oJson);
        th.setStore(store);
    },
    itemcontextmenu: function (th, record, item, index, e, eOpts) {
        e.stopEvent();

        if (record.data.depth == 1) {
            Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX + 5,
                y: e.pageY + 5,
                items: [{
                    text: "DB ••• ",
                    menu: [{
                        text: "save •••"
                    },
                        {
                            text: "clean •••",
                            handler: function () {

                                Ext.Msg.show({
                                    title: 'Warning !!',
                                    message: 'Click Ok will <i style="color:red;">clear the database</i> !!',
                                    buttons: Ext.Msg.YESNOCANCEL,
                                    icon: Ext.Msg.WARNING,
                                    fn: function (btn) {
                                        if (btn === 'yes') {
                                            Ext.Ajax.request({
                                                url: "resources/test1.php",
                                                method: "GET",
                                                async: false,
                                                params: {
                                                    par: "clear"
                                                },
                                                success: function (response) {
                                                    var text = response.responseText;
                                                    Ext.Msg.alert('Status', 'OK , Clear ' + text + ' successfully .');
                                                    setTimeout(function () {
                                                        location.reload();
                                                    }, 3000);

                                                }
                                            });

                                        } else if (btn === 'no') {

                                        } else {

                                        }
                                    }
                                });


                            }
                        }]
                },
                    {
                        text: "Addpoint •••",
                        disabled: true
                    }, {
                        text: "Schedule •••",
                        disabled: true
                    }, {
                        text: "NetNumber •••",
                        handler: function () {

                            var aDevNames = getDevNamesAllDataStore();
                            var win = Ext.create('Ext.window.Window', {
                                title: 'NetNumber •••',
                                frame: true,
                                width: 310,
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
                                     editable: true,
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

                                        var initData = [
                                            //{type: "Object_Name", value: "1"},
                                            //{type: "Present_Value", value: "1"},
                                            //{type: "Description", value: "Description 1"},
                                            //{type: "Priority_For_Writing", value: "8"},
                                            {type: "Position", value: '2'},
                                            {type: "Object_Type", value: "17"},
                                            {
                                                type: "List_Of_Object_Property_References",
                                                value: '{"List_Of_Object_Property_References":[]}'
                                            },
                                            {type: "Object_Identifier", value: "17,9902601"},
                                            {type: "Exception_Schedule", value: '{"Exception_Schedule":[]}'},
                                            {type: "Schedule_Default", value: "Off"},
                                            {type: "Lock_Enable", value: "0"},
                                            {type: "Weekly_Schedule", value: '{"Weekly_Schedule":{}}'},
                                            {type: "Update_Time", value: Ext.Date.format(new Date(), "Y-m-d H:i:s")}
                                        ];

                                        /*var store = Ext.create("Ext.data.Store", {
                                         fields: ["type", "value"],
                                         data: initData
                                         });*/

                                        var win1 = Ext.create('Ext.window.Window', {
                                            title: text + " Schedule Config",
                                            constrainHeader: true,//禁止移出父窗口
                                            height: 400,
                                            width: 450,
                                            resizeable: false,
                                            layout: 'auto',
                                            items: {
                                                xtype: "form",
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'Input Value',
                                                        defaultType: 'textfield',
                                                        margin: 10,
                                                        defaults: {
                                                            anchor: '100%'
                                                        },
                                                        items: [
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Object_Name',
                                                                name: 'Object_Name',
                                                                emptyText: 'object name'
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Present_Value',
                                                                name: 'Present_Value',
                                                                emptyText: 'present value'
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Description',
                                                                name: 'Description',
                                                                emptyText: 'description'
                                                                //inputType: 'password'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'Select Value',
                                                        defaultType: 'textfield',
                                                        margin: 10,
                                                        defaults: {
                                                            anchor: '100%'
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: 'Priority_For_Writing',
                                                                xtype: 'combobox',
                                                                labelPad: 30,
                                                                name: 'Priority_For_Writing',
                                                                store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                                                                //valueField: 'abbr',
                                                                value: "8",
                                                                //displayField: 'abbr',
                                                                //typeAhead: true,
                                                                autoSelect: false,
                                                                queryMode: 'local'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'indate',
                                                        margin: 10,
                                                        layout: {
                                                            type: "table",
                                                            columns: 5,
                                                            tableAttrs: {
                                                                style: {
                                                                    //width:"100%"
                                                                }
                                                            }
                                                        },
                                                        defaults: {
                                                            //anchor: '100%'
                                                            format: "d-m-Y",
                                                            labelWidth: 45
                                                        },
                                                        items: [
                                                            {
                                                                xtype: "displayfield",
                                                                fieldLabel: "Effective_Period",
                                                                name: "Effective_Period",
                                                                labelWidth: 110,
                                                                rowspan: 3,
                                                                colspan: 1
                                                            },
                                                            {
                                                                xtype: "fieldcontainer",
                                                                rowspan: 3,
                                                                colspan: 1,
                                                                width: 20,
                                                                layout: {
                                                                    type: "table",
                                                                    columns: 1
                                                                },
                                                                defaults: {
                                                                    width: 20,
                                                                    name: "dataradios"
                                                                },
                                                                items: [{
                                                                    xtype: "radio",
                                                                    checked: true,
                                                                    handler: function (th, bl) {
                                                                        if (!bl)
                                                                            return;
                                                                        Ext.getCmp("ScheduleConfig_after").setDisabled(false);
                                                                        Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                                    }
                                                                },
                                                                    {
                                                                        xtype: "radio",
                                                                        handler: function (th, bl) {
                                                                            if (!bl)
                                                                                return;
                                                                            Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_front").setDisabled(false);
                                                                            Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: "radio",
                                                                        handler: function (th, bl) {
                                                                            if (!bl)
                                                                                return;
                                                                            Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_fromstart").setDisabled(false);
                                                                            Ext.getCmp("ScheduleConfig_fromend").setDisabled(false);
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: "after",
                                                                xtype: "datefield",
                                                                id: "ScheduleConfig_after",
                                                                name: "after",
                                                                width: 260,
                                                                rowspan: 1,
                                                                colspan: 3
                                                            },

                                                            {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                xtype: "datefield",
                                                                fieldLabel: "front",
                                                                id: "ScheduleConfig_front",
                                                                name: "front",
                                                                width: 260,
                                                                rowspan: 1,
                                                                colspan: 3
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                xtype: "datefield",
                                                                fieldLabel: "from",
                                                                id: "ScheduleConfig_fromstart",
                                                                name: "fromstart",
                                                                width: 150,
                                                                listeners: {
                                                                    change: function (th, newValue, oldValue, eOpts) {
                                                                        var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                                        var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setMaxValue(maxValue);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setMinValue(minValue);
                                                                    }
                                                                }
                                                            }, {
                                                                xtype: "displayfield",
                                                                value: "-",
                                                                width: 5
                                                            }, {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                id: "ScheduleConfig_fromend",
                                                                xtype: "datefield",
                                                                name: "fromend",
                                                                maxValue: "",
                                                                width: 103,
                                                                listeners: {
                                                                    change: function (th, newValue, oldValue, eOpts) {
                                                                        var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                                        var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setMaxValue(maxValue);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setMinValue(minValue);
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            buttons: [
                                                {
                                                    text: "OK", handler: function () {
                                                    var devName = getNullSchedule(text)
                                                    if (devName == "null") {
                                                        Ext.Msg.alert('Error', "Cannot create Schedule , There can be at most ten .");
                                                        win1.close()
                                                        return;
                                                    }
                                                    win1.down("form").submit({
                                                        url: "resources/test1.php?par=ScheduleConfig&nodename=" + devName,
                                                        async: true,
                                                        method: "GET"
                                                    })

                                                    for (var i = 0; i < initData.length; i++) {
                                                        changeDevValue(devName, initData[i].type, initData[i].value)
                                                    }
                                                    delayToast("Status", 'Create Schedule successfully. New Schedule name is ' + devName + " .", 1000);

                                                    setTimeout(function () {
                                                        win1.close();
                                                    }, 1000)

                                                }
                                                }, {
                                                    text: "Close", handler: function () {
                                                        Ext.Msg.show({
                                                            title: 'Save Changes?',
                                                            message: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
                                                            buttons: Ext.Msg.YESNOCANCEL,
                                                            icon: Ext.Msg.QUESTION,
                                                            fn: function (btn) {
                                                                if (btn === 'yes') {

                                                                    win1.close();
                                                                } else if (btn === 'no') {

                                                                    win1.close();
                                                                } else {

                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            ]
                                        }).show();

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


                        }
                    }, "-", {
                        text: "Property",
                        disabled: true
                    }
                ]
            })
        }
        if (record.data.depth == 2) {
            Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX,
                y: e.pageY,
                items: [
                    {
                        text: "Schedule...",
                        disabled: true
                    }, {
                        text: "BACnetNO.",
                        handler: function () {

                            var win = Ext.create('Ext.window.Window', {
                                title: 'BACnetNO •••',
                                frame: true,
                                width: 310,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        margin: 10,
                                        xtype: "numberfield",
                                        allowBlank: false,
                                        fieldLabel: 'select file name',
                                        value: 1000,
                                        maxValue: 9900,
                                        minValue: 1000,
                                        step: 100,
                                        validator: function (value) {
                                            if (value % 100 == 0) {
                                                return true;
                                            } else {
                                                return "This value is invalid,Plase input 1000-9000 A number between.Interval of 100";
                                            }
                                        }
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("numberfield").getValue();
                                        if (text == null) {
                                            Ext.Msg.alert('Info', 'Plase select file name.');
                                            return;
                                        }
                                        win.close();
                                        var devName = record.data.text;
                                        devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n" + text);
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
                    }, {
                        text: "Save...", handler: function () {
                            var devName = record.data.text;
                            devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n1");
                        }
                    }, {
                        text: "RestorFactory", handler: function () {
                            var devName = record.data.text;
                            devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n2");
                        }
                    }
                ]
            })
        }
        if (record.data.depth == 3) {
            Ext.create("Ext.menu.Menu", {
                    //floating: true,
                    autoShow: true,
                    x: e.pageX,
                    y: e.pageY,
                    items: [
                        {
                            text: "new..."
                            //disabled: true
                        }
                    ]
                }
            )
        }
        //{text: "Shedule Config"}, {text: "event"}, {text: "week"},
        if (record.data.depth == 4) {


            var sDevNodeName = record.data.value;
            var sNodeType = record.data.type;
            var sDevName = sDevNodeName.substr(0, 4);

            if (record.parentNode.data.text == "Schedule") {

                Ext.create("Ext.menu.Menu", {
                    //floating: true,
                    autoShow: true,
                    x: e.pageX,
                    y: e.pageY,
                    items: [
                        {
                            text: "Schedule Config"
                        }, {text: "References"}, {
                            text: "week",
                            handler: function () {

                                Ext.create('Ext.window.Window', {
                                        id: "drawWindow",
                                        title: record.data.value + " Property",
                                        constrainHeader: true,//禁止移出父窗口
                                        height: 768,
                                        width: 1024,
                                        autoShow: true,
                                        layout: 'fit',
                                        /* viewModel: {
                                         stores: {
                                         priceData: {
                                         fields: ['month', 'price'],
                                         data: [
                                         {month: 'Sun', price: 16400000},
                                         {month: 'Mon', price: 26400000},
                                         {month: 'Tue', price: 36400000},
                                         {month: 'Wed', price: 46400000},
                                         {month: 'Thu', price: 56400000},
                                         {month: 'Fri', price: 66400000},
                                         {month: 'Sat', price: 76400000}
                                         ]
                                         }
                                         }
                                         },*/
                                        items: [
                                            Ext.create({
                                                xtype: 'cartesian',
                                                width: 600,
                                                height: 400,
                                                insetPadding: 40,
                                                store: {
                                                    fields: ['time', 'open', 'high', 'low', 'close'],
                                                    data: [{
                                                        'time': new Date('Jan 1 2010').getTime(),
                                                        'open': 600,
                                                        'high': 614,
                                                        'low': 578,
                                                        'close': 590
                                                    }, {
                                                        'time': new Date('Jan 2 2010').getTime(),
                                                        'open': 590,
                                                        'high': 609,
                                                        'low': 580,
                                                        'close': 580
                                                    }, {
                                                        'time': new Date('Jan 3 2010').getTime(),
                                                        'open': 580,
                                                        'high': 602,
                                                        'low': 578,
                                                        'close': 602
                                                    }, {
                                                        'time': new Date('Jan 4 2010').getTime(),
                                                        'open': 602,
                                                        'high': 614,
                                                        'low': 586,
                                                        'close': 586
                                                    }, {
                                                        'time': new Date('Jan 5 2010').getTime(),
                                                        'open': 586,
                                                        'high': 602,
                                                        'low': 565,
                                                        'close': 565
                                                    }]
                                                },
                                                axes: [{
                                                    type: 'numeric',
                                                    position: 'bottom',

                                                    fields: ['open', 'high', 'low', 'close'],
                                                    title: {
                                                        text: 'Sample Values',
                                                        fontSize: 15
                                                    },
                                                    grid: true,
                                                    minimum: 0,
                                                    maximum: 640
                                                }, {
                                                    type: 'time3d',
                                                    position: 'left',

                                                    fields: ['time'],
                                                    toDate: 1262707200000,
                                                    fromDate: 1262793599000,
                                                    renderer: function (label, layout, lastLabel) {
                                                        console.log(arguments)
                                                        var time = new Date(label)
                                                        var hours = time.getHours();
                                                        var min = time.getMinutes();

                                                        return hours + " : " + min;
                                                    },
                                                    title: {
                                                        text: 'Sample Values',
                                                        fontSize: 15
                                                    },
                                                    style: {
                                                        axisLine: false
                                                    }
                                                }],
                                                series: [
                                                    {
                                                        type: 'candlestick',
                                                        xField: 'time',
                                                        openField: 'open',
                                                        highField: 'high',
                                                        lowField: 'low',
                                                        closeField: 'close',
                                                        style: {
                                                            dropStyle: {
                                                                fill: 'rgb(222, 87, 87)',
                                                                stroke: 'rgb(222, 87, 87)',
                                                                lineWidth: 13
                                                            },
                                                            raiseStyle: {
                                                                fill: 'rgb(48, 189, 167)',
                                                                stroke: 'rgb(48, 189, 167)',
                                                                lineWidth: 13
                                                            }
                                                        }
                                                    }
                                                ]
                                            })
                                        ]
                                    }
                                );
                            }
                        }, {text: "exception"}
                    ]
                })

                return false;
            }


            Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX,
                y: e.pageY,
                items: [
                    {
                        text: "Property", handler: function () {

                        if (Ext.getCmp("devNodeWindow")) {
                            Ext.getCmp("devNodeWindow").setTitle(record.data.value + " Property")
                            var store = Ext.data.StoreManager.lookup('devNodeStore');
                            store.getProxy().setUrl('resources/test1.php?par=node&nodename=' + record.data.value)
                            store.load()
                            return;
                        }
                        var store = Ext.create("Ext.data.Store", {
                            id: "devNodeStore",
                            fields: ["type", "value"],
                            //data: serversData,
                            proxy: {
                                type: 'ajax',
                                url: 'resources/test1.php?par=node&nodename=' + record.data.value
                            }
                        })
                        store.load()
                        console.log(store.data.items.sort(function (a, b) {
                            console.log(a + b)
                            return a.value - b.value
                        }))
                        Ext.create('Ext.window.Window', {
                            id: "devNodeWindow",
                            title: record.data.value + " Property",
                            constrainHeader: true,//禁止移出父窗口
                            height: 768,
                            width: 1024,
                            layout: 'fit',
                            items: [
                                {  // Let's put an empty grid in just to illustrate fit layout
                                    xtype: 'grid',
                                    border: false,
                                    plugins: {
                                        ptype: "rowediting",
                                        clicksToEdit: 1,
                                        listeners: {
                                            edit: function (editor, context) {
                                                console.log(arguments)
                                                if (context.value == context.newValues.value) {
                                                    return false
                                                }
                                                var rowRecord = context.record;
                                                Ext.Ajax.request({
                                                    url: "resources/test1.php",
                                                    method: "GET",
                                                    params: {
                                                        par: "changevalue",
                                                        nodename: record.data.value,
                                                        type: rowRecord.data.type,
                                                        value: rowRecord.data.value
                                                    },
                                                    success: function (response) {
                                                        var text = response.responseText;
                                                            delayToast('Status', 'Changes saved successfully,' + "New value is " + rowRecord.data.value + " .")
                                                        /*if (text == "0") {
                                                        } else {
                                                            delayToast('Error', ' Servers Change the failure.')
                                                        }*/
                                                    }
                                                });

                                            },
                                            beforeedit: function (editor, context, eOpts) {

                                                if (context.field == "type") {
                                                    return false;
                                                }

                                                var aWriteArr = ["Object_Name", "Hide", "Offset", "Description", "Device_Type",
                                                    "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
                                                    "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable"];

                                               /* {
                                                    fieldLabel: 'Priority_For_Writing',
                                                        xtype: 'combobox',
                                                    labelPad: 30,
                                                    name: 'Priority_For_Writing',
                                                    store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                                                    //valueField: 'abbr',
                                                    value: "8",
                                                    //displayField: 'abbr',
                                                    //typeAhead: true,
                                                    autoSelect: false,
                                                    queryMode: 'local'
                                                }*/


                                                var rowRecord = context.record;
                                                for (var i = 0; i < aWriteArr.length; i++) {
                                                    if (rowRecord.data.type == aWriteArr[i]) {
                                                        if ((sNodeType == "0" || sNodeType == "3") & rowRecord.data.type == "Present_Value") {
                                                            return false;
                                                        }
                                                        if (sNodeType != "0" & rowRecord.data.type == "Offset") {
                                                            return false;
                                                        }
                                                        if (rowRecord.data.type == "Device_Type") {

                                                            var combostore = Ext.create('Ext.data.Store', {

                                                                autoLoad: false,
                                                                fields: ['name'],
                                                                data: [
                                                                    {"name": "0-10=0-100"},
                                                                    {"name": "NTC10K"},
                                                                    {"name": "NTC20K"},
                                                                    {"name": "BI"}
                                                                ]
                                                            })
                                                            context.column.setEditor({
                                                                xtype: "combobox",
                                                                store: combostore,
                                                                validator: function (val) {
                                                                    if (val == "NTC10K" || val == "NTC20K" || val=="BI") {
                                                                        return true
                                                                    }
                                                                    var arr = val.split("=");
                                                                    if (arr.length != 2) {
                                                                        return false;
                                                                    }
                                                                    for (var i = 0; i < arr.length; i++) {
                                                                        var arr_ = arr[i].split("-");
                                                                        if (arr_.length < 2 || arr_.length > 3) {
                                                                            return false;
                                                                        }
                                                                        isNaN(arr_[0])
                                                                        isNaN(arr_[1])
                                                                    }
                                                                    return true;
                                                                },
                                                                displayField: 'name',
                                                                valueField: 'name'
                                                            })

                                                        } else {

                                                            context.column.setEditor({xtype: "textfield"})
                                                        }
                                                        return arguments;
                                                    }
                                                }
                                                console.log(arguments)
                                                return false
                                            }
                                        }
                                    }
                                    ,
                                    columns: [{header: 'Type', flex: 1, dataIndex: "type", sortable: false},
                                        {
                                            header: "Value", flex: 1, dataIndex: "value", sortable: false, editor: {
                                            xtype: 'textfield',
                                            allowBlank: false//允许空白
                                        }
                                        }
                                    ],
                                    /* listeners:{
                                     rowclick:function(){
                                     console.log(arguments)

                                     }
                                     },*/
                                    store: store
                                }
                            ],
                            buttons: [
                                {
                                    text: "Close", handler: function () {
                                    this.up("window").close();
                                }
                                }
                            ]
                        }).show();
                        console.log(arguments)
                    }
                    }, {
                        text: "delete"
                        // disable:true
                    }
                ]
            })
        }

    }
})
;

function getNameByType(type) {
    if (type == 0) {
        return "AI"
    }
    if (type == 1) {
        return "AO"
    }
    if (type == 2) {
        return "AV"
    }
    if (type == 3) {
        return "BI"
    }
    if (type == 4) {
        return "BO"
    }
    if (type == 5) {
        return "BV"
    }
    return null;
}


function getTreeJsonByUrl(url) {
    return {
        expanded: true,
        "children": [{
            expanded: false,
            text: url,
            children: getDevAll(url)
        }
        ]
    };
}

function getNullSchedule(text) {
    var devName = "";
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        async: false,
        params: {
            par: "getnullschedule",
            nodename: text
        },
        success: function (response) {
            var text = response.responseText;
            devName = text;
        }
    });
    return devName;
}
function changeDevValue(nodename, type, value) {
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        params: {
            par: "changevalue",
            nodename: nodename,
            type: type,
            value: value
        }
    });
}
function getDevAll() {
    var aNames = getDevNamesAll();
    aNames = getArrayBeforeFour(aNames);
    aNames.sort(function (a, b) {
        return a - b//parseInt(a) - parseInt(b);
    });
    aNames = aNames.unique1();
    var childrenArr = [];
    for (var i = 0; i < aNames.length; i++) {
        childrenArr.push({
            text: aNames[i], allowDrop: false, allowDrag: false, expanded: false, children: getTypeByDev(aNames[i])
        })
    }

    return childrenArr;
}

function getTypeByDev(devName) {
    var type = [0, 1, 2, 3, 4, 5];
    var nodes = getNodesAll();
    var childrenArr = [];
    for (var i = 0; i < type.length; i++) {
        var childrenArr1 = [];
        var devAndType = devName + type[i];
        for (var j = 0; j < nodes.length; j++) {
            //console.log(nodes[j]["value"])
            if (nodes[j]["value"].substr(0, 5) == devAndType) {
                nodes[j]['allowDrop'] = false;
                nodes[j]['allowDrag'] = true;
                nodes[j]['type'] = i;
                childrenArr1.push(nodes[j]);
            }
        }

        var typeJson = {
            text: getNameByType(i),
            expanded: false,
            allowDrop: false,
            allowDrag: false,
            children: childrenArr1
        };
        childrenArr.push(typeJson);
    }
    childrenArr.push({
        text: "Schedule",
        expanded: false,
        allowDrop: false,
        allowDrag: false,
        children: getScheduleByDev(devName)
    })
    return childrenArr;
}
function getScheduleByDev(devName) {
    var devjson = null;
    Ext.Ajax.request({
        url: 'resources/test1.php',
        async: false,
        method: "GET",
        params: {
            par: "schedule",
            nodename: devName
        },
        success: function (response) {
            var text = response.responseText;
            devjson = eval(text);
        }
    });
    return devjson;
}
function getDevInfoFileNames() {
    var aNames = null;
    Ext.Ajax.request({
        url: 'resources/test3.php?par=0',
        async: false,
        params: {
            // url: url,
        },
        success: function (response) {
            var text = response.responseText;
            aNames = eval(text);
            aNames.splice(0, 2);
        }
    });
    return aNames;
}
function getDevNamesAllDataStore(isLocal) {
    var aDevs = getDevNamesAll()
    var tempArr = [];
    for (var i = 0; i < aDevs.length; i++) {
        var devName = aDevs[i] + "";
        if (devName.length == 6) {
            devName = "0" + devName;
        }
        if (devName.length == 5) {
            devName = "00" + devName
        }
        if (devName.length == 4) {
            devName = "000" + devName
        }
        if (devName.length <= 3) {
            continue;
        }
        tempArr.push(devName.substr(0, 4))
    }
    tempArr.sort(function (a, b) {
        return a - b;
    })
    tempArr = tempArr.unique1();
    var aDevsStore = [];
    if (isLocal) {
        aDevsStore.push({"name": "local"})
    }
    for (var i = 0; i < tempArr.length; i++) {
        aDevsStore.push({"name": tempArr[i]})
    }

    var states = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: aDevsStore
    });
    return states;
}
function getDevNamesAll() {
    var aNames = null;
    Ext.Ajax.request({
        url: 'resources/test1.php?par=dev',
        async: false,
        params: {
            // url: url,
        },
        success: function (response) {

            var text = response.responseText;
            aNames = eval(text);
        }
    });
    return aNames;
}

function getNodesAll(url) {
    var aNames = null;
    Ext.Ajax.request({
        url: 'resources/test1.php?par=nodes',
        async: false,
        params: {
            //url: url,
        },
        success: function (response) {
            var text = response.responseText;
            //document.write(text)
            var ojson = Ext.decode(text);
            aNames = ojson
        }
    });
    return aNames;
}


function getTypeAllByDev() {
    var nodes = getNodesAll();
    var aText = text.split(" ");
    aText = getArrayBeforeFour(aText);
    aText.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
    aText = aText.unique1();
    aNames = aText;

}


function getArrayBeforeFour(aArr) {
    var aArray = [];
    for (var i = 0; i < aArr.length - 1; i++) {
        var devName = aArr[i] + "";
        if (devName.length == 6) {
            devName = "0" + devName;
        }
        if (devName.length == 5) {
            devName = "00" + devName
        }
        if (devName.length == 4) {
            devName = "000" + devName
        }
        if (devName.length <= 3) {
            continue;
        }
        var str = devName.trim().substr(0, 4);
        aArray.push(str);
    }
    return aArray;
}
Array.prototype.unique1 = function () {
    var n = []; //一个新的临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}
