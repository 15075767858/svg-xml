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

    "itemmouseenter": function (th, record, item, index, e, eOpts) {
        if (!record.data.allowDrag) {
            return;
        }


        if (record.isDrog) {
            return;
        }
        var dd = new Ext.dd.DragSource(item.id, {
            ddGroup: "DevTreeDragDropGroup",
            isTarget: false,
            id: "dd" + item.id
        })
        console.log(record.data)
        var aData;
            if(record.data.type!=0&record.data.type!=3){
            aData=[
                {'name': 'Out', 'value': "0"},
                {'name': 'Instance', 'value': (record.data.value+"").substr(5,6)},
                {'name': 'In', 'value': "2"}
            ];
            }else{
                aData=[
                    {'name': 'Out', 'value': "0"},
                    {'name': 'Instance', 'value': (record.data.value+"").substr(5,6)}
                ];
            }
        var ostore = Ext.create(getNameByType(record.data.type), {
            data: aData,
            listeners: {
                add: function (th) {
                    setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                }
            }
        })
        dd.afterDragDrop = function (target, e, id) {

            var typeName = getNameByType(record.data.type);
            Ext.getCmp(id).add(Ext.create("svgxml.view.grid.TypeGrid", {
                    title: record.data.text,
                    store: ostore,
                    x: e.browserEvent.offsetX,
                    y: e.browserEvent.offsetY,
                    icon: "img/SVG/" + typeName + ".svg",
                    listeners: {
                        render: function (thi) {
                            thi.datas.type = record.data.type;
                            thi.datas.value = record.data.value;
                            console.log(thi.getStore().data);

                        }
                    }
                })
            )
            ;
        }
        record.isDrog = true
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
        return "DI"
    }
    if (type == 4) {
        return "DO"
    }
    if (type == 5) {
        return "DV"
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
        return parseInt(a) - parseInt(b);
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
        var typeJson = {text: i, expanded: false, allowDrop: false, allowDrag: false, children: childrenArr1};
        childrenArr.push(typeJson);
    }
    return childrenArr;
}

function getDevNamesAll() {
    var aNames = null;
    Ext.Ajax.request({
        url: 'test1.php?par=dev',
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
        url: 'test1.php?par=nodes',
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
        var str = (aArr[i] + "").trim().substr(0, 4);
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