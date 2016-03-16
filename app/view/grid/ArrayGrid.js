Ext.define('svgxml.view.grid.ArrayGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action'
        //"svgxml.store.TypeInit"
    ],
    xtype: 'array-grid',
    store: "addStore",
    //stateful: true,
    collapsible: true,
    //multiSelect: true,
    //stateId: 'stateGrid',

    //height: 350,
    resizable:false,
    draggable:true,
    hideHeader:false,
    title: 'null',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    sortable : false,
    icon:"img/PNG/add.png",
    iconCls:"titleIcon",
        initComponent: function () {
        this.width = 140;
        this.columns = [
            {
                multiColumnSort:false,
                //text     :"<img height='20px' src='img/PNG/add.png'>",
                text:"type",
                flex     : 1,
                sortable : false,
                dataIndex: 'name',
                detachOnRemove:true,
                collapsible:false,
                    editor: {
                    allowBlank: false
                }
            },
            {
                text     : 'value',
                //width:113,
                flex    : 1,

                sortable : false,
                align:"right",
                //renderer : 'usMoney',
                dataIndex: 'value',
                editor: 'textfield'/*,
                editor: {
                    allowBlank: true
                }*/
            }
        ];

        this.callParent();
    }
});


