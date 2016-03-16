Ext.define("svgxml.view.grid.TypeGrid", {
    extend: "Ext.grid.Panel",
    requires: [
        "svgxml.view.grid.TypeGridController",
        "svgxml.view.grid.TypeGridModel",
        'Ext.grid.column.Action',
        "svgxml.view.tab.DrawPanel"
    ],
    controller: "grid-typegrid",
    viewModel: {
        type: "grid-typegrid"
    },
    resizable: false,
    collapsible: true,//收起
    draggable: true,
    //closable: true,
    // title: 'null',
    sortable: false,//禁用标题排序
    enableColumnMove: false,//禁止移动列
    enableColumnHide: false,
    constrainHeader: false,
    //plain: true,
    //icon:"img/PNG/add.png",
    iconCls: "titleIcon",
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    listeners: {
        viewready:"girdviewready",
        itemdblclick: "girditemdblclick",
        move: "girdmove",
        itemclick:"griditemclick",
        itemmousedown:"griditemmousedown",
        itemmouseleave:"griditemmouseleave",
        itemmouseenter:"griditemmouseenter",
        itemmouseup:"griditemmouseup"
    },

    initComponent: function () {
        this.width = 140;
        this.columns = [
            {
                multiColumnSort: false,
                //text     :"<img height='20px' src='img/PNG/add.png'>",
                text: "type",
                flex: 1,
                sortable: false,
                dataIndex: 'name',
                detachOnRemove: true,
                collapsible: false,

                editor: {
                    allowBlank: false
                }
            },
            {
                text: 'value',
                flex: 1,
                sortable: false,
                align: "right",
                //renderer : 'usMoney',
                dataIndex: 'value',
                editor:"textfield"
                //editor: 'textfield'
                /*,
             editor: {
             allowBlank: true
             }*/
            }
        ];
        this.callParent();
    }
});

var oproxy = {
    type: 'memory',
    reader: {
        type: 'json',
        rootProperty: 'items'
    }
}

Ext.create('Ext.data.Store', {
    storeId: 'addStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'aodoStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},

    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'averStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'compStore',
    fields: ['name', 'value'],
    data: [
        {"name": "mod", value: "< = >"},
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'countStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "1"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'delayStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'Time', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'enthStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'Temp', 'value': "1"},
        {'name': 'RH', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'faStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "1"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'fdStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "1"},
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'hourStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'hyStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'On', 'value': "2"},
        {'name': 'Off', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'lockStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'Unlock', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'logicStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'logieStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'maxStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'min', 'value': "max"},
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'mulStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'pidStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'PV', 'value': "1"},
        {'name': 'SP', 'value': "2"},
        {'name': 'Enable', 'value': "3"},
        {'name': 'Direction', 'value': "4"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'PulseStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'Enable', 'value': "1"},
        {'name': 'OnTime', 'value': "2"},
        {'name': 'OffTime', 'value': "3"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'subStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'switchStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"},
        {'name': 'Enable', 'value': "3"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'timerStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});
Ext.create('Ext.data.Store', {
    storeId: 'tolalazerStore',
    fields: ['name', 'value'],
    data: [
        {'name': 'Out', 'value': "0"},
        {'name': 'In', 'value': "2"},
        {'name': 'In', 'value': "2"}
    ],
    proxy: oproxy
});