Ext.define("svgxml.view.window.RenameWindow", {
    extend: "Ext.window.Window",

    requires: [
        "svgxml.view.window.RenameWindowController",
        "svgxml.view.window.RenameWindowModel",
        "svgxml.store.RenameStore"
    ],

    controller: "window-renamewindow",
    viewModel: {
        type: "window-renamewindow"
    },
    constrainHeader: true,
    autoShow: true,
    //maxHeight:Ext.getBody().getHeight(),
    layout: 'accordion',
    scrollable: true,
    listeners:{
        boxready:"boxready"
    },
    xmlSources: function () {

        var me = this;

        var sDevName = me.text.substring(0, me.text.indexOf('.'));
        me.title = sDevName;
        me.sDevName = sDevName;
        //       var items = []
        me.items = []


        Ext.Ajax.request({
            async: false,
            url: "resources/devxml/" + me.text,

            success: function (response, opts) {
                var xml = response.responseXML;
                if (!xml) {
                    Ext.Msg.alert("Error", "invalid data !");
                }

                var domKeys = xml.querySelectorAll("key");
                //getvalue
                var keys = [];
                for (var i = 0; i < domKeys.length; i++) {
                    keys[i] = domKeys[i];
                }

                keys.sort(function (a, b) {
                    var akey = a.getAttribute("number")
                    var bkey = b.getAttribute("number")
                    return akey - bkey;
                })

                for (var i = 0; i < keys.length; i++) {
                    var Object_Name = keys[i].querySelector("Object_Name").innerHTML;
                    //var Object_Name=keys[i].getAttribute("number")
                    var keyType = keys[i].getAttribute("number").substr(4, 1)
                    var fieldsItems = [];
                    var types = me["type" + keyType];
                    console.log(types)
                    if (!types) {
                        continue;
                    }
                    for (var j = 0; j < types.length; j++) {
                        var typeTag = keys[i].getElementsByTagName(types[j])[0];

                        var fieldName = types[j];
                        //var value = typeTag.innerHTML;
                        var value;
                        if (typeTag) {
                            value = typeTag.innerHTML;
                        } else {
                            value = ""
                        }
                        var textfield = {
                            fieldLabel: fieldName,
                            name: fieldName,
                            value: value
                        };
                        fieldsItems.push(textfield);
                    }


                    var formPanel = Ext.create("Ext.form.Panel", {
                        title: Object_Name,
                        key: keys[i].getAttribute("number"),
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        minHeight: 300,
                        scrollable: true,
                        url: "resources/test1.php?par=setRenameValue&devname=" + sDevName,
                        bodyPadding: 10,
                        items: fieldsItems
                    })
//                    items.push(formPanel)
                    me.items.push(formPanel)
                }


            },
            failure: function (response, opts) {
                Ext.Msg.alert("Error", 'server-side failure with status code ' + response.status);
            }
        });


//        me.items = items;

    },
    databaseSources: function () {
        var me = this;
        me.title = me.sDevName + " rename";
        var sDevName = me.sDevName;
        me.items = []

        myAjax("resources/test1.php?par=getKeys&devname=" + sDevName, function (response) {
            var datas = Ext.decode(response.responseText)
            console.log(datas)
            //var fields = me.fields;
            datas.sort(function (a, b) {
                var akey = a['key']
                var bkey = b['key']
                return akey - bkey;
            })

            var store = Ext.create("Ext.data.JsonStore", {
                fields: me.fields,
                storeId: "testStore",
                data: datas
            })

            store.setData(datas)



            for (var i = 0; i < datas.length; i++) {

                /*var fieldsItems = [];

                 var keyType = datas[i].key.substr(4, 1);

                 var fields = me["type" + keyType];
                 if (!fields) {
                 //Ext.Msg.alert("Error","invalid fields")
                 console.log("fields=" + fields)
                 continue;
                 }

                 for (var j = 0; j < fields.length; j++) {
                 console.log(fields[j])
                 var fieldName = fields[j]
                 var textfield = {
                 fieldLabel: fieldName,
                 name: fieldName
                 };

                 fieldsItems.push(textfield);
                 }

                 var gridpanel = Ext.create("Ext.form.Panel", {
                 title: datas[i]['Object_Name'],
                 key: datas[i]['key'],
                 defaultType: 'textfield',
                 defaults: {
                 anchor: '100%'
                 },
                 minHeight: 300,
                 scrollable: true,
                 url: "resources/test1.php?par=setRenameValue&devname=" + me.sDevName,
                 scrollable: true,
                 bodyPadding: 10,
                 items: fieldsItems
                 })*/

                var gridpanel = me.createDevForm(datas[i]);
                me.items.push(gridpanel);
                gridpanel.getForm().loadRecord(store.getAt(i));

            }

        })
    },

    getChartStoreData:function () {
        var me = this;
        var items = me.items.items;
        return devsSplitType(items);
    },
    createDevForm: function (data) {
        var me = this;
        var keyType = data.key.substr(4, 1);
        var fields = me["type" + keyType];
        var fieldsItems = [];


        if (!fields) {
            console.log("fields=" + fields)
            return;
        }

        for (var i = 0; i < fields.length; i++) {
            //console.log(fields[i])
            var fieldName = fields[i]
            var textfield = {
                fieldLabel: fieldName,
                name: fieldName,
                listeners: {
                    change: function (field, newValue) {
                        if (field.name == "Object_Name") {
                            var form = field.up("form")
                            if (form) {
                                form.setTitle(newValue)
                            }
                        }
                    }
                }
            };
            fieldsItems.push(textfield);
        }

        var panel = Ext.create("Ext.form.Panel", {
            //title: data.Object_name,
            title: data['Object_Name'],
            key: data.key,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            minHeight: 300,
            url: "resources/test1.php?par=setRenameValue&devname=" + me.sDevName,
            scrollable: true,
            bodyPadding: 10,
            items: fieldsItems
        })

        return panel;
    },

    insrtDevForm: function (key) {
        var me = this;
        var inertIndex = 0;
        me.items.items.find(function (v, index) {
            if (v.key == key) {
                inertIndex = index + 1;
            }
        })

        var form = me.createDevForm({key: parseInt(key) + 1 + ""});
        me.insert(inertIndex, form)


    },
    deleteDevForm: function (key) {

        console.log(key)
        var me = this;
        var form = me.query('[key=' + key + ']')[0];
        me.remove(form);


    },

    initComponent: function () {
        var me = this;
        me.setHeight(680);
        me.setWidth(512);
        me.setMaxHeight(Ext.getBody().getHeight())

        var fields = ["Object_Name", "Offset", "Description", "Device_Type",
            "Inactive_Text", "Active_Text",
            "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
            "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Present_Value",
            "Offset", "Set_Alarm", "AV_count", "BV_count", "SCHEDULE_count",
        ];

        me.type0 = ["Object_Name", "Offset", "Description", "Device_Type", "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type1 = ["Object_Name", "Offset", "Description", "Device_Type", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type2 = ["Object_Name", "Description", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type3 = ["Object_Name", "Description", "Device_Type", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type4 = ["Object_Name", "Description", "Device_Type", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type5 = ["Object_Name", "Description", "Device_Type", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type6 = ["Object_Name", "Description", "Priority_For_Writing"];
        me.type8 = ['Object_Name'];

        var fields = ["AV_count", "BV_count", "SCHEDULE_count"].concat(me.type0).concat(me.type1).concat(me.type2).concat(me.type3).concat(me.type4).concat(me.type5).concat(me.type6);
        me.fields = fields;
        if (me.text) {
            me.xmlSources()
        } else if (me.sDevName) {
            me.databaseSources();
        }

        me.callParent()

    },
    getXmlStr: function () {
        var me = this;
        var items = me.items.items;
        var root = document.createElement("root");
        var av = document.createElement("AV_count");
        var bv = document.createElement("BV_count");
        var schedule = document.createElement("SCHEDULE_count");
        var avcount = 0;
        var bvcount = 0;
        var schedulecount = 0;


        root.appendChild(av);
        root.appendChild(bv);
        root.appendChild(schedule);


        for (var i = 1; i < items.length; i++) {
            //console.log(items[i]);

            var form = items[i].getForm();

            var res = form.getFieldValues();
            var key = document.createElement("key");
            var keytype = items[i].key.substr(4, 1);
            if (keytype == "2") {
                avcount++
            }
            if (keytype == "5") {
                bvcount++
            }
            if (keytype == "6") {
                schedulecount++
            }
            key.setAttribute("number", items[i].key);
            for (var type in res) {
                var tag = document.createElement(type)
                tag.innerHTML = res[type];
                key.appendChild(tag);
            }
            root.appendChild(key);
            myAjax("resources/test1.php?par=getAlarm&nodename=" + items[i].key, function (response) {
                try {

                    var alermJson = Ext.decode(response.responseText);
                    if (alermJson['Set_Alarm']) {
                        //var setAlarm = document.createElement("Set_Alarm");
                        var aPars = alermJson['Set_Alarm'][0]
                        for (var type in aPars) {
                            var tag = document.createElement(type)
                            tag.innerHTML = aPars[type];
                            //setAlarm.appendChild(tag);
                            key.appendChild(tag);
                        }
                    }

                } catch (e) {
                    console.log(e)
                }
            })
        }
        av.innerHTML = avcount;
        bv.innerHTML = bvcount;
        schedule.innerHTML = schedulecount;
        //var root = me.saveXml();
        var div = document.createElement("div");
        div.appendChild(root)
        var xmlstr = div.innerHTML
        for (var i = 0; i < me.fields.length; i++) {
            var field = me.fields[i]
            console.log(me.fields[i])
            xmlstr = xmlstr.replaceAll(field.toLocaleLowerCase(), me.fields[i]);
        }
        return xmlstr;
    },
    buttons: [
        {
            text: "Save ...",
            handler: function () {

            }
        },
        "->",
        {
            text: "Ok", handler: function () {

            var me = this.up("window");

            var xmlstr = me.getXmlStr()
            console.log(xmlstr)

            xmlstr = formatXml(xmlstr);
            var datas = {
                rw: "w",
                fileName: "devxml/" + me.sDevName + ".xml",
                content: '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n' + xmlstr
            }
            $.ajax({
                type: "POST",
                url: "resources/xmlRW.php",
                data: datas,
                success: function () {
                    delayToast("Status", "Saved file " + datas.fileName + " successfully.", 0);
                }
            });

            setTimeout(function () {
                me.close()
            }, 1000)
            //console.log(decoder.encodeXml(key))

        }
        },
        {
            text: "Close", handler: function () {
            var me = this;
            me.close();
        }
        }
    ]
});

/*var items = me.items.items;
 var root = document.createElement("root");
 for (var i = 0; i < items.length; i++) {
 console.log(items[i]);
 /!*items[i].submit({
 method: "POST"
 })*!/
 var form = items[i].getForm();
 var res = form.getFieldValues();
 var key = document.createElement("key");
 key.setAttribute("number", items[i].key);
 for (var type in res) {
 var tag = document.createElement(type)
 tag.innerHTML = res[type];
 key.appendChild(tag);
 }
 root.appendChild(key);
 myAjax("resources/test1.php?par=getAlarm&nodename=" + items[i].key, function (response) {
 try {
 var alermJson = Ext.decode(response.responseText);
 if (alermJson['Set_Alarm']) {
 var setAlarm = document.createElement("Set_Alarm");
 var aPars = alermJson['Set_Alarm'][0]
 for (var type in aPars) {
 var tag = document.createElement(type)
 tag.innerHTML = aPars[type];
 setAlarm.appendChild(tag);
 }
 key.appendChild(setAlarm);
 }
 } catch (e) {
 console.log(e)
 }
 })
 }*/