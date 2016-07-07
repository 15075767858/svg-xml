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
    height: 768,
    width: 1024,
    autoShow: true,
    //maxHeight: Ext.getBody().getHeight(),
    layout: 'accordion',
    initComponent: function () {
        var me = this;
        me.setHeight(768);
        me.title=me.sDevName+" rename";
        var sDevName = me.sDevName;
        me.items = []
        myAjax("resources/test1.php?par=getKeys&devname=" + sDevName, function (response) {
            var datas = Ext.decode(response.responseText)
            var fields = ["Object_Name", "Hide", "Offset", "Description", "Device_Type",
                "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
                "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Present_Value", "Offset"];
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
                    }
                    fieldsItems.push(textfield);
                }

                var gridpanel = Ext.create("Ext.form.Panel", {
                    title: datas[i]['key'],
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

        me.buttons = [
            {
                text: "Ok", handler: function () {
                var items = me.items.items;
                var root = document.createElement("root");
                for (var i = 0; i < items.length; i++) {
                    console.log(items[i]);
                    items[i].submit({
                        method: "POST"
                    })
                    var form = items[i].getForm();
                    var res = form.getFieldValues();
                    var key = document.createElement("key");
                    key.setAttribute("number",items[i].key);
                    for (var type in res) {
                        var tag=document.createElement(type)
                        tag.innerHTML = res[type];
                        key.appendChild(tag);
                    }
                    root.appendChild(key);
                    /*var xmldecode = new Ext.data.amf.XmlDecoder({
                     });
                     console.log(res)
                     console.log(xmldecode.readObject(res))*/
                }
                var xmlstr = formatXml(document.createElement("div").appendChild(root).innerHTML);
                var datas={
                    rw:"w",
                    fileName:"devxml/"+me.sDevName,
                    content:xmlstr
                }
                $.ajax({
                    type: "POST",
                    url: "resources/xmlRW.php",
                    data: datas,
                    success: function () {
                        delayToast("Status", "Saved file " + fName + " successfully.", 0);

                    }
                });
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

