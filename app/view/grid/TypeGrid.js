Ext.define("svgxml.view.grid.TypeGrid", {
    extend: "Ext.grid.Panel",
    xtype: "typegrid",
    requires: [
        "svgxml.view.grid.TypeGridController",
        "svgxml.view.grid.TypeGridModel"
        //'Ext.grid.column.Action'
        // "svgxml.store.TypeInit"
    ],

    controller: "grid-typegrid",
    viewModel: {
        type: "grid-typegrid"
    },

    resizable: false,
    collapsible: true,//收起

    draggable: {
        autoStart:true,
        tolerance:1000
    },
    //closable: true,
    // title: 'null',
    sortable: false,//禁用标题排序
    enableColumnMove: false,//禁止移动列
    enableColumnHide: false,
    constrainHeader: false,
    hideable:false,
    //plain: true,
    //icon:"img/PNG/add.png",
    iconCls: "titleIcon",
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    listeners: {
        render:"render",
        viewready:"girdviewready",
        itemdblclick: "girditemdblclick",
        move: "girdmove",
        itemclick:"griditemclick",
        //itemmousedown:"griditemmousedown",
        //itemmouseleave:"griditemmouseleave",
        //itemmouseenter:"griditemmouseenter",
        itemmouseup:"griditemmouseup"
    },
    hideHeaders :true,
    columnLines : true,
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
