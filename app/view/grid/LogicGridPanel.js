Ext.define("svgxml.view.grid.LogicGridPanel", {
    extend: "Ext.grid.Panel",
    xtype: "logicgridpanel",
    requires: [
        "svgxml.view.grid.LogicGridPanelController",
        "svgxml.view.grid.LogicGridPanelModel"
    ],
    //height: 300,
    width: "100%",
    border: false,
    forceFit: true,
    controller: "grid-logicgridpanel",
    viewModel: {
        type: "grid-logicgridpanel"
    },
    columns: [
        {
            header: 'name', dataIndex: "name", width: 80,minWidth:80,maxWidth:80,
            sortable: false,
            menuDisabled: true
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "delay", dataIndex: "delay", width: 90,minWidth: 90, maxWidth: 90, align: "right", editor: {
            xtype: 'textfield',
            allowBlank: false
        }
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "value", dataIndex: "value", width: 73,minWidth: 73,maxWidth: 73, editor: {
            xtype: 'textfield',
            allowBlank: false
        }
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "configure",
            columns: [{
                dataIndex: "time", width: 40,minWidth: 40,  align: "right",
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                },
            },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time1", width: 40,minWidth: 40, align: "right", listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time2", width: 40,minWidth: 40, align: "right", hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time3", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time4", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time5", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time6", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time7", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time8", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time9", width: 40,minWidth: 40, align: "right",hidden:true, listeners:{
                    click:"timeClick"
                }
                }
            ]
        }
    ],

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ]

});
