Ext.define('svgxml.view.tree.DevTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.imgtree',
    render: function (th) {
        var store = Ext.create("Ext.data.TreeStore")
        var url = window.location.host;

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
                        handler: function () {

                            //var aDevNames = getDevNamesAllDataStore()
                            var strnumbervalue = getNetNumberValue();
                            var win = Ext.create('Ext.window.Window', {
                                title: 'new schedule',
                                frame: true,
                                width: 310,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    /* {
                                     margin: 10,
                                     xtype: "combobox",
                                     allowBlank: false,
                                     fieldLabel: 'select file name',
                                     store: strnumbervalue,
                                     editable: false,
                                     queryMode: 'local',
                                     displayField: 'name',
                                     valueField: 'name',
                                     autoSelect: false
                                     },*/
                                    {
                                        margin: 10,
                                        allowBlank: false,
                                        editable: false,
                                        value: strnumbervalue,
                                        fieldLabel: 'select file name',
                                        xtype: 'textfield',
                                        name: 'name',
                                        allowBlank: false
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("textfield").getValue();
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
                                                    var devName = getNullSchedule(text).trim();
                                                    if (devName == "null") {
                                                        Ext.Msg.alert('Error', "Cannot create Schedule , There can be at most ten .");
                                                        win1.close()
                                                        return;
                                                    }
                                                    if (!win1.down("form").isValid()) {
                                                        Ext.Msg.alert('Exception', "Please enter the form fields .");
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
                    }, {
                        text: "NetNumber •••",
                        handler: function () {
                            var NetCount = 1100;
                            var storeData = []
                            for (var i = 0; i < 89; i++) {
                                storeData.push(NetCount)
                                NetCount += 100;
                            }
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
                                        id: "NetNumberCombobx",
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        fieldLabel: 'select value',
                                        store: storeData,
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'name',
                                        autoSelect: false,
                                        value: "9900"
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("combobox").getValue();
                                        if (text == null) {
                                            Ext.Msg.alert('Info', 'Plase select NetNumber ..');
                                            return;
                                        }
                                        Ext.Ajax.request({
                                            url: "resources/xmlRW.php",
                                            async: false,
                                            params: {
                                                fileName: "../../bac_config.xml",
                                                rw: "r"
                                            },
                                            success: function (response) {
                                                var xml = $($.parseXML(response.responseText));
                                                xml.find("root net").text(text);
                                                var xmlstr = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + $("<div></div>").append(xml[0].childNodes[0]).html()

                                                Ext.Ajax.request({
                                                    url: "resources/xmlRW.php",
                                                    async: false,
                                                    params: {
                                                        fileName: "../../bac_config.xml",
                                                        rw: "w",
                                                        content: xmlstr
                                                    },
                                                    success: function (response) {
                                                        delayToast("Success", "NetNumber new value is " + text, 1000)
                                                    }
                                                })

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
                                ], listeners: {
                                    show: function () {
                                        var combox = Ext.getCmp("NetNumberCombobx");

                                        combox.setValue(getNetNumberValue());


                                    }
                                }
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
                    x: e.pageX + 5,
                    y: e.pageY + 5,
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
                    x: e.pageX + 5,
                    y: e.pageY + 5,
                    items: [
                        {
                            text: "Schedule Config"
                        }, {text: "References"}, {
                            text: "week",
                            handler: function () {
                                var dwwin = Ext.getCmp("drawWindow")
                                if(dwwin){
                                    dwwin.close()
                                }
                                var ogroup = new Ext.grid.feature.Grouping({
                                    groupHeaderTpl: '{name} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                                    hideGroupedHeader: true,
                                    startCollapsed: true
                                })

//week
                                Ext.create('Ext.window.Window', {
                                        id: "drawWindow",
                                        title: record.data.value + " Property",
                                        //title: "property",
                                        constrainHeader: true,//禁止移出父窗口
                                        height: 768,
                                        //height: 900,
                                        width: 1024,
                                        autoShow: true,
                                        layout: 'card',
                                        resizable: false,
                                        buttons: [
                                            {
                                                text: "next",
                                                id: "drawWindow_next",
                                                handler: function () {
                                                    getDivData()
                                                    var store = Ext.data.StoreManager.lookup('drawWindowStore');
                                                    store.setData(dwPars.drawWindowData)
                                                    var me = this.up("window");
                                                    var l = me.getLayout();
                                                    this.hide()
                                                    $(".week").hide()
                                                    weekDivResetPosition()
                                                    Ext.getCmp("drawWindow_previous").show()
                                                    l.setActiveItem(1)
                                                }
                                            }, {
                                                text: "Previous",
                                                id: "drawWindow_previous",
                                                hidden: true,
                                                handler: function () {
                                                    var me = this.up("window");
                                                    var l = me.getLayout();
                                                    this.hide()
                                                    $(".week").show()
                                                    weekDivResetPosition()
                                                    Ext.getCmp("drawWindow_next").show()
                                                    l.setActiveItem(0)
                                                }
                                            },
                                            {
                                                text: "Ok",
                                                handler: function () {
                                                var oJson = getDivData()
                                                console.log(oJson)
                                                Ext.Ajax.request({
                                                    url: "resources/test1.php?par=changevaluenopublish&nodename="+sDevNodeName+"&type=Weekly_Schedule",
                                                    params: {
                                                        value:Ext.encode(oJson.weekly)
                                                    },
                                                    success: function(response){
                                                        var text = response.responseText;
                                                        delayToast("Status","Changes saved successfully .",1000)
                                                    }
                                                });
                                                devPublish(sDevNodeName + ".8.*", sDevNodeName + "\r\nWeekly_Schedule\r\n" + Ext.encode(oJson.pubweekly));
                                                this.up("window").close()

                                            }
                                            }

                                        ],

                                        listeners: {
                                            boxready: function (th) {
                                                setTimeout(function () {
                                                    dwParsInit()

                                                    Ext.MessageBox.progress('Message', {msg: 'Server Ready ...'});
                                                    var count = 0;
                                                    var interval_0 = setInterval(function () {
                                                        Ext.MessageBox.updateProgress(count / 9, 'Loading,please wait... ');
                                                        count++
                                                        if (count == 10) {
                                                            clearInterval(interval_0)
                                                            Ext.MessageBox.close();
                                                            myAjax("resources/test1.php?par=getvalue&nodename=1200601&type=Weekly_Schedule", function (response) {
                                                                try {
                                                                    var text = Ext.decode(response.responseText);
                                                                    if (text) {
                                                                        drawWindowAddDiv(text)
                                                                    }
                                                                } catch (e) {
                                                                    Ext.Msg.alert('Error', 'load data failure .');
                                                                }
                                                            })
                                                        }
                                                    }, 100)

                                                }, 50)
                                            },
                                            el: {
                                                contextmenu: function (win, el, eOpts) {
                                                    console.log(arguments)
                                                    //柱子间隔 27  宽100  高625
                                                    if (el.tagName != "CANVAS") {
                                                        return;
                                                    }
                                                    ;
                                                    Ext.create('Ext.menu.Menu', {
                                                        width: 100,
                                                        plain: true,
                                                        x: win.pageX + 5,
                                                        y: win.pageY + 5,
                                                        autoShow: true,
                                                        floating: true,  // usually you want this set to True (default)
                                                        items: [{
                                                            text: 'Add Time',
                                                            handler: function () {
                                                                addNewBar(win)
                                                            }
                                                        }
                                                        ]
                                                    });
                                                    //addNewBar(th)

                                                    win.stopEvent();
                                                }
                                            }
                                        },
                                        items: [
                                            Ext.create({
                                                xtype: 'chart',
                                                width: 1000,
                                                height: 800,
                                                padding: '10 0 0 0',
                                                store: {
                                                    fields: ['time', 'open', 'high', 'low', 'close'],
                                                    data: [{
                                                        'time': "Sunday",
                                                        'close': 2736000000
                                                    }, {
                                                        'time': "Monday",
                                                        'close': 2730000000
                                                    }, {
                                                        'time': "Tuesday",
                                                        'close': 2730000000
                                                    }, {
                                                        'time': "Wednesday",
                                                        'close': 2726000000
                                                    }, {
                                                        'time': "Thursday",
                                                        'close': 2730000000
                                                    }, {
                                                        'time': "Friday",
                                                        'close': 2730000000
                                                    }, {
                                                        'time': "Saturday",
                                                        'close': 2730000000
                                                    }

                                                    ]
                                                },
                                                axes: [{
                                                    type: 'category',

                                                    position: 'top',
                                                    title: {
                                                        text: 'Week',
                                                        fontSize: 15
                                                    },
                                                    fields: 'time'
                                                }, {
                                                    type: 'numeric',
                                                    position: 'left',
                                                    fields: 'open',
                                                    grid: true,
                                                    minimum: 2649600000,
                                                    maximum: 2736000000,
                                                    renderer: function (label, layout, lastLabel) {
                                                        var chaTime = (2736000000 - label) + 2649600000;

                                                        var time = new Date(chaTime)
                                                        var hours = time.getHours();
                                                        var min = time.getMinutes();
                                                        var sec = time.getSeconds();
                                                        //return new Date(label).toLocaleTimeString();
                                                        return hours + ":" + min + ":" + sec;
                                                    },
                                                    title: {
                                                        text: 'Date',
                                                        fontSize: 15
                                                    },
                                                    style: {
                                                        axisLine: false
                                                    }
                                                }],
                                                series: [
                                                    {
                                                        type: 'bar',
                                                        xField: 'time',
                                                        id: "bar_Sec",
                                                        listeners: {
                                                            itemclick: function (series, item, event, eOpts) {
                                                                console.log(arguments)
                                                            }
                                                        },


                                                        style: {
                                                            width: 100
                                                            //margin:40
                                                        },
                                                        yField: ["close"],
                                                        style: {
                                                            fill: "steelblue"
                                                        }
                                                    }

                                                ]
                                            }),
                                            {
                                                xtype: "gridpanel",
                                                store: Ext.create('Ext.data.Store', {
                                                    storeId: "drawWindowStore",
                                                    groupField: 'SortWeek',
                                                    //groupDir:"DESC",
                                                    sortOnLoad: false,
                                                    fields: ["divId", 'Week', 'StartTime', 'EndTime'],
                                                    //data: dwPars.drawWindowData
                                                }),

                                                features: [ogroup],
                                                tbar: [{
                                                    text: 'Expand All',
                                                    scope: this,
                                                    handler: function () {
                                                        ogroup.expandAll()
                                                    }
                                                }, {
                                                    text: 'Collapse All',
                                                    scope: this,
                                                    handler: function () {
                                                        ogroup.collapseAll()
                                                    }
                                                }],
                                                columnLines: true,
                                                rowLines: true,
                                                plugins: {
                                                    ptype: 'rowediting',
                                                    clicksToEdit: 1,
                                                    listeners: {
                                                        edit: function (edit, context, eOpts) {
                                                            var aStarttime = context.newValues.StartTime.split(":");
                                                            var aEndtime = context.newValues.EndTime.split(":");
                                                            var starttime = new Date(1970, 1, 1, aStarttime[0], aStarttime[1], aStarttime[2])
                                                            var endtime = new Date(1970, 1, 1, aEndtime[0], aEndtime[1], aEndtime[2])
                                                            //edit.cancelEdit()
                                                            if (starttime > endtime) {
                                                                dwPars.drawWindowData[context.rowIdx].StartTime = context.originalValues.StartTime
                                                                dwPars.drawWindowData[context.rowIdx].EndTime = context.originalValues.EndTime
                                                                context.store.store.loadData(dwPars.drawWindowData)
                                                                Ext.Msg.alert('Error', 'Start time is not greater than end time .');
                                                                return false;
                                                            }
                                                            console.log($("#" + context.originalValues.divId))
                                                            $("#" + context.originalValues.divId).attr("starttime", starttime).attr("endtime", endtime)
                                                            //return false
                                                        }
                                                    }
                                                },
                                                selModel: 'rowmodel',
                                                columns: [
                                                    {
                                                        text: 'divId', dataIndex: 'divId', hidden: true
                                                    },
                                                    {
                                                        text: 'Week',
                                                        dataIndex: 'Week',
                                                        flex: 1
                                                    },
                                                    {
                                                        text: 'Start time', dataIndex: 'StartTime', flex: 1, editor: {
                                                        xtype: 'spinnerfield',
                                                        allowBlank: false,
                                                        validator: isTime,
                                                        onSpinUp: function () {
                                                            var oldValue = this.getValue().split(":");
                                                            var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                                                            time+=10000;
                                                            var newTime = new Date(time)
                                                            var H = newTime.getHours()
                                                            var M = newTime.getMinutes()
                                                            var S = newTime.getSeconds()
                                                            //if(newTime>2649600000&newTime<2736000000)
                                                            this.setValue(H+":"+M+":"+S);
                                                        },
                                                        onSpinDown: function () {
                                                            var oldValue = this.getValue().split(":");
                                                            var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                                                            time-=10000;
                                                            var newTime = new Date(time)
                                                            var H = newTime.getHours()
                                                            var M = newTime.getMinutes()
                                                            var S = newTime.getSeconds()
                                                            this.setValue(H+":"+M+":"+S);
                                                        }
                                                    }
                                                    },
                                                    {
                                                        text: 'End time', dataIndex: 'EndTime', flex: 1
                                                        , editor: {
                                                        xtype: 'spinnerfield',
                                                        allowBlank: false,
                                                        validator: isTime,
                                                        onSpinUp: function () {
                                                            var oldValue = this.getValue().split(":");
                                                            var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                                                            time+=10000;
                                                            var newTime = new Date(time)
                                                            var H = newTime.getHours()
                                                            var M = newTime.getMinutes()
                                                            var S = newTime.getSeconds()
                                                            //if(newTime>2649600000&newTime<2736000000)
                                                            this.setValue(H+":"+M+":"+S);
                                                        },
                                                        onSpinDown: function () {
                                                            var oldValue = this.getValue().split(":");
                                                            var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                                                            time-=10000;
                                                            var newTime = new Date(time)
                                                            var H = newTime.getHours()
                                                            var M = newTime.getMinutes()
                                                            var S = newTime.getSeconds()
                                                            this.setValue(H+":"+M+":"+S);
                                                        }
                                                    }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                )


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
                            var win = Ext.getCmp("devNodeWindow")
                            win.setTitle(sDevNodeName + " Property")
                            win.datas.record = record;
                            var store = Ext.data.StoreManager.lookup('ParametersStore');
                            store.getProxy().setUrl('resources/test1.php?par=node&type=parameters&&nodename=' + sDevNodeName)
                            store.load()
                            var store1 = Ext.data.StoreManager.lookup('PropertypegridStore');
                            store1.getProxy().setUrl('resources/test1.php?par=node&type=event&nodename=' + sDevNodeName)
                            store1.load()
                            return;
                        }

                        /* var store = Ext.create("Ext.data.Store", {
                         id: "devNodeStore",
                         fields: ["type", "value"],
                         //data: serversData,
                         proxy: {
                         type: 'ajax',
                         url: 'resources/test1.php?par=node&nodename=' + sDevNodeName
                         }
                         })

                         store.load()
                         store.data.items.sort(function (a, b) {
                         console.log(a + b)
                         return a.value - b.value
                         })*/
                        Ext.create('Ext.window.Window', {
                            id: "devNodeWindow",
                            title: sDevNodeName + " Property",
                            constrainHeader: true,//禁止移出父窗口
                            style: {
                                boxShadow: "rgb(0, 0, 25) 5px 5px 10px"
                            },
                            height: 768,
                            width: 1024,
                            layout: 'accordion',
                            listeners: {
                                show: function (th) {
                                    th.datas = {'record': record};
                                }
                            },
                            items: [

                                Ext.create("propertypegrid", {
                                    title: "Parameters",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "ParametersStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=parameters&nodename=' + sDevNodeName
                                        }
                                    })
                                }),
                                Ext.create("propertypegrid", {
                                    title: "Event",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=event&nodename=' + sDevNodeName
                                        }
                                    })
                                })
                                ,
                                Ext.create("propertypegrid", {
                                    title: "Alarm",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=alarm&nodename=' + sDevNodeName
                                        }
                                    })
                                }),
                                Ext.create("propertypegrid", {
                                    title: "Other",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=other&nodename=' + sDevNodeName
                                        }
                                    })
                                })

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
                    },
                    {
                        text: "delete"
                        // disable:true
                    }
                ]
            })
        }

    }
})
;

function getNetNumberValue() {
    var str = "";
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        async: false,
        params: {
            fileName: "../../bac_config.xml",
            rw: "r"
        },
        success: function (response) {
            var text = response.responseText
            var xml = $($.parseXML(text));
            str = xml.find("root net").text()
        }
    })
    return str;
}
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


function setPresent_Value(sDevNodeName, text1, text2) {

    var sDevName = sDevNodeName.substr(0, 4)
    var strnull = "";
    var pubstr = "";
    var url = "resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=Priority_Array";
    myAjax(url, function (response) {
        var aPriority = response.responseText.split(",");
        for (var i = 0; i < 16; i++) {
            if (i + 1 == parseInt(text2)) {
                strnull += text1 + ",";
                pubstr += text1 + ",";
            } else {
                strnull += aPriority[i] + ","
                pubstr += "NULL,";
            }
        }
    })

    myAjax("resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=Priority_Array&value=" + strnull.substr(0, strnull.length - 1), function () {
        delayToast('Success', sDevNodeName + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
    })

    if (text1 == "NULL") {
        var value = sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2;
        //alert(sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2)
        devPublish(sDevName + ".8.*",
            value,
            function () {
                delayToast('Success', 'Publish Ok.', 1000)
            })

    } else {
        var value = sDevNodeName + "\r\nPriority_Array\r\n" + pubstr.substr(0, pubstr.length - 1);
        //alert(sDevNodeName + "\r\nPriority_Array\r\n" + strnull.substr(0, strnull.length - 3))
        devPublish(sDevName + ".8.*",
            value,
            function () {
                delayToast('Success', 'Publish Ok.', 1000)
            })

    }
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
    /*var scheduleArr=[];
     childrenArr.push({
     text: "Schedule",
     expanded: false,
     allowDrop: false,
     allowDrag: false,
     children: scheduleArr
     })
     var NetCount = 1100;
     for (var i = 0; i < 89; i++) {
     var netArr = getScheduleByDev(NetCount);
     if(netArr.length!=0){
     scheduleArr.push({
     text:NetCount , allowDrop: false, allowDrag: false, expanded: false, children:netArr
     })
     }
     NetCount += 100;
     }*/
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
        childrenArr1.sort(function (a, b) {
            return a.value - b.value;
        })

        var typeJson = {
            text: getNameByType(i),
            expanded: false,
            allowDrop: false,
            allowDrag: false,
            children: childrenArr1
        };
        if (childrenArr1.length != 0) {
            childrenArr.push(typeJson);
        }
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
    for (var i = 0; i < aArr.length; i++) {
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
