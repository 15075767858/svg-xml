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
                        text: "Addpoint...",
                        disabled: true
                    }, {
                        text: "Schedule...",
                        disabled: true
                    }, {
                        text: "BACnetNO.",
                        disabled: true
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
                        disabled: true
                    }, {
                        text: "Save...",
                        disabled: true
                    }, {
                        text: "RestorFactory",
                        disabled: true
                    }
                ]
            })
        }
        if (record.data.depth == 4) {

            var sDevNodeName = record.data.value;
            var sNodeType = record.data.type;
            var sDevName = sDevNodeName.substr(0, 4);
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
                        Ext.create('Ext.window.Window', {
                            id: "devNodeWindow",
                            title: record.data.value + " Property",
                            //enableColumnHide: false,
                            constrainHeader: true,//禁止移出父窗口
                            //hideable:false,
                            //plain: true,
                            height: 768,
                            width: 1024,
                            layout: 'fit',
                            items: [{  // Let's put an empty grid in just to illustrate fit layout
                                xtype: 'grid',
                                border: false,
                                plugins: {
                                    ptype: "rowediting",
                                    clicksToEdit: 1,
                                    listeners: {
                                        edit:function(editor, context){
                                          console.log(arguments)
                                            if(context.value==context.newValues.value){
                                                return false
                                            }
                                            var rowRecord=context.record;
                                            Ext.Ajax.request({
                                                url: "resources/test1.php",
                                                method:"GET",
                                                params: {
                                                    par:"changevalue",
                                                    nodename: record.data.value,
                                                    type: rowRecord.data.type,
                                                    value:  rowRecord.data.value
                                                },
                                                success: function(response){
                                                    var text = response.responseText;
                                                    if(text=="01"){
                                                        delayToast('Status','Changes saved successfully,'+"New value is "+rowRecord.data.value+" .")
                                                    }else{
                                                        delayToast('Error',' Servers Change the failure.')
                                                    }
                                                }
                                            });

                                        },
                                        beforeedit: function (editor, context, eOpts) {
                                            console.log(arguments)
                                            var aWriteArr = ["Object_Name", "Present_Value", "Description", "Device_Type",
                                                "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
                                                "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable"];

                                            console.log(sDevName);
                                            console.log(sNodeType);
                                            console.log(record);
                                            var rowRecord = context.record;
                                            for (var i = 0; i < aWriteArr.length; i++) {
                                                if (rowRecord.data.type == aWriteArr[i]) {
                                                    if ((sNodeType == "0" || sNodeType == "3") & rowRecord.data.type == "Present_Value") {
                                                        return false;
                                                    }
                                                    if (rowRecord.data.type == "Device_Type") {

                                                        var combostore = Ext.create('Ext.data.Store', {

                                                            autoLoad: false,
                                                            fields: ['name'],
                                                            data: [
                                                                {"name": "0-10=0-100"},
                                                                {"name": "NTC10K"},
                                                                {"name": "NTC20K"}
                                                            ]
                                                        })
                                                        context.column.setEditor({
                                                            xtype: "combobox",
                                                            store: combostore,
                                                            validator: function (val) {
                                                                if (val == "NTC10K" || val == "NTC20K") {
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
                                columns: [{header: 'Type', flex: 1, dataIndex: "type", sortable: true},
                                    {
                                        header: "Value", flex: 1, dataIndex: "value", sortable: true, editor: {
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
