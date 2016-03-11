/*
Ext.define("svgxml.view.view.grid.ArrayGrid",{
    extend: "Ext.grid.Panel",

    requires: [
        "svgxml.view.view.grid.ArrayGridController",
        "svgxml.view.view.grid.ArrayGridModel"
    ],
    controller: "view-grid-arraygrid",
    viewModel: {
        type: "view-grid-arraygrid"
    },

    html: "Hello, World!!"
});*/



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

/*

Ext.define('KitchenSink.view.grid.ArrayGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action'
    ],
    xtype: 'array-grid',
    store: 'Companies',
    stateful: true,
    collapsible: true,
    multiSelect: true,
    stateId: 'stateGrid',
    height: 350,
    title: 'Array Grid',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    initComponent: function () {
        this.width = 650;
        this.columns = [
            {
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'company'
            },
            {
                text     : 'Price',
                width    : 75,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Change',
                width    : 80,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '</span>';
                    }
                    return val;
                },
                dataIndex: 'change'
            },
            {
                text     : '% Change',
                width    : 100,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '%</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '%</span>';
                    }
                    return val;
                },
                dataIndex: 'pctChange'
            },
            {
                text     : 'Last Updated',
                width    : 115,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                    iconCls: 'sell-col',
                    tooltip: 'Sell stock',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
                    }
                }, {
                    getClass: function(v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'alert-col';
                        } else {
                            return 'buy-col';
                        }
                    },
                    getTip: function(v, meta, rec) {
                        if (rec.get('change') < 0) {
                            return 'Hold stock';
                        } else {
                            return 'Buy stock';
                        }
                    },
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex),
                            action = (rec.get('change') < 0 ? 'Hold' : 'Buy');

                        Ext.Msg.alert(action, action + ' ' + rec.get('company'));
                    }
                }]
            }
        ];

        this.callParent();
    }
});*/
