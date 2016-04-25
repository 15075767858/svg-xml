Ext.define('svgxml.view.tree.DevTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.imgtree',
    render: function (th) {
        var store = Ext.create("Ext.data.TreeStore")
        var url = "127.0.0.1";
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
                x: e.pageX,
                y: e.pageY,
                items: [
                    {
                        text: "Addpoint..."
                    }, {
                        text: "Schedule..."
                    }, {
                        text: "BACnetNO."
                    }, "-", {
                        text: "Property"
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
                        text: "Schedule..."
                    }, {
                        text: "BACnetNO."
                    }, {
                        text: "Save..."
                    }, {
                        text: "RestorFactory"
                    }
                ]
            })
        }
        if (record.data.depth == 4) {

            var serversData = Ext.decode("[{type:'Object_Identifier',value:'0'},{type:'Object_Name',value:'ANALOG INPUT 1'},{type:'Object_Type',value:'0'},{type:'Present_Value',value:'-50.000'},{type:'Description',value:'ANALOG INPUT 1'},{type:'Device_Type',value:'NTC20K'},{type:'Status_Flags',value:'0000'},{type:'Event_State',value:'0'},{type:'Reliability',value:'0'},{type:'Out_Of_Service',value:'0'},{type:'Update_Interval',value:'0'},{type:'Units',value:'98'},{type:'Min_Pres_Value',value:'0.000'},{type:'Max_Pres_Value',value:'100.000'},{type:'Resolution',value:'0.000'},{type:'COV_Increment',value:'1.000'},{type:'Time_Delay',value:'0'},{type:'Notification_Class',value:'4194303'},{type:'High_Limit',value:'100.000'},{type:'Low_Limit',value:'0.000'},{type:'Deadband',value:'0.000'},{type:'Limit_Enable',value:'0'},{type:'Event_Enable',value:'0'},{type:'Acked_Transitions',value:'7'},{type:'Notify_Type',value:'0'},{type:'Update_Time',value:'2000-01-01 04:25:18 123'},{type:'Offset',value:'0.000'},{type:'Lock_Enable',value:'0'},{type:'Hide',value:'0'}]");
            console.log(serversData)
            var store = Ext.create("Ext.data.Store", {
                fields: ["type", "value"],
                //data: serversData,
                proxy: {

                    type: 'ajax',
                    url: 'resources/test1.php?par=node&nodename=' + record.data.value
                }
            })
            store.load()
            Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX,
                y: e.pageY,
                items: [
                    {
                        text: "Property", handler: function () {
                        console.log(Ext.getCmp("devNodeWindow"))
                        Ext.create('Ext.window.Window', {
                            id: "devNodeWindow",
                            title: record.data.value + " Property",
                            height: 768,
                            width: 1024,
                            layout: 'fit',
                            items: {  // Let's put an empty grid in just to illustrate fit layout
                                xtype: 'grid',
                                border: false,
                                plugins: [
                                    Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1,
                                        listeners: {
                                            edit: function () {
                                                console.log(arguments)
                                            }
                                        }
                                    })
                                ],
                                columns: [{header: 'Type', flex: 1, dataIndex: "type", sortable: false},
                                    {
                                        header: "Value", flex: 1, dataIndex: "value", sortable: false, editor: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }

                                    }
                                ],
                                store: store
                            },
                            buttons: [
                                {
                                    text: "OK", handler: function () {

                                    this.up("window").close();
                                }
                                }, {
                                    text: "Cancel", handler: function () {
                                        this.up("window").close();
                                    }
                                }
                            ]
                        }).show();
                        console.log(arguments)
                    }
                    }
                ]
            })
        }

        console.log(arguments)
        console.log(record)
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
    return childrenArr;
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
            var ojson = eval(text);
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