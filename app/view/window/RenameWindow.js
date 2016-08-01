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
    initComponent: function () {
        var me = this;
        me.setHeight(680);
        me.setWidth(512);
        me.setMaxHeight(Ext.getBody().getHeight())
        me.title = me.sDevName + " rename";
        var sDevName = me.sDevName;
        me.items = []
        myAjax("resources/test1.php?par=getKeys&devname=" + sDevName, function (response) {
            var datas = Ext.decode(response.responseText)
            console.log(datas)
            datas.sort(function (a, b) {
                var akey = a['key'].substr(4, 1);
                var bkey = b['key'].substr(4, 1);

                return akey - bkey;
            })
            console.log(datas)
            var fields = ["Object_Name", "Offset", "Description", "Device_Type", "Inactive_Text", "Active_Text",
                "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
                "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Present_Value", "Offset", "Set_Alarm"];
            me.fields = fields;
            var store = Ext.create("Ext.data.JsonStore", {
                fields: fields,
                storeId: "testStore",
                data: datas
            })
            store.setData(datas)
            for (var i = 0; i < datas.length; i++) {
                //store.setData(datas[i]);
                var fieldsItems = [];
                for (var j = 0; j < fields.length; j++) {
                    var fieldName = store.config.fields[j];
                    if (!datas[i][fieldName]) {
                        continue;
                    }

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
                    url: "resources/test1.php?par=setRenameValue&devname=" + sDevName,
                    scrollable: true,
                    bodyPadding: 10,
                    items: fieldsItems
                })
                me.items.push(gridpanel)
                gridpanel.getForm().loadRecord(store.getAt(i))

            }
        })

        me.saveXml = function () {

            var items = me.items.items;
            var root = document.createElement("root");
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);

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
            return root;
        }


        me.buttons = [
            {
                text: "Ok", handler: function () {
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
                /*var xmldecode = new Ext.data.amf.XmlDecodaser({
                 });
                 console.log(res)
                 console.log(xmldecode.readObject(res))*/
                var root =me.saveXml();
                var div = document.createElement("div");
                div.appendChild(root)
                var xmlstr = div.innerHTML
                for (var i = 0; i < me.fields.length; i++) {
                    var field = me.fields[i]
                    console.log(me.fields[i])
                    xmlstr = xmlstr.replaceAll(field.toLocaleLowerCase(), me.fields[i]);
                }

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
                me.close();
            }
            }
        ]
        me.callParent()
    }

});

