Ext.define("svgxml.view.grid.TypeGrid", {
    extend: "Ext.grid.Panel",
    xtype: "typegrid",
    requires: [
        "svgxml.view.grid.TypeGridController",
        "svgxml.view.grid.TypeGridModel",
        "svgxml.view.grid.LogicGridPanel"
    ],

    controller: "grid-typegrid",
    viewModel: {
        type: "grid-typegrid"
    },
    resizable: false,
    collapsible: true,//收起
    scrollable:false,
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
        render:"render1",
        viewready:"girdviewready",
        itemdblclick: "girditemdblclick",
        move: "girdmove",
        itemclick:"griditemclick",
        itemmousedown:"griditemmousedown",
        //itemmouseleave:"griditemmouseleave",
        itemmouseenter:"griditemmouseenter",
        itemmouseup:"griditemmouseup"
    },
    hideHeaders :true,
    columnLines : true,
    initComponent: function () {
        var me =this;
        me.bbar=[{
            text:"index",
            scope:me,
            handler:function(){
                console.log(arguments)
                var panels = getCurrentDrawPanelGirdPanels();
                for(var i=0;i<panels.length;i++){
                    console.log(panels[i])
                    if(panels[i].button){
                        panels[i].removeDocked(panels[i].button);
                    }
                    var button = Ext.create("Ext.button.Button",{
                        text:panels[i].index,
                        hidden:true
                    })
                    panels[i].button=button;
                    panels[i].addDocked(button)
                }
                saveXml()
                console.info(this.index)
            }
        }]
        this.width = 90;
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
