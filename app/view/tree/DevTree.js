Ext.define("svgxml.view.tree.DevTree", {
    extend: "Ext.tree.Panel",
    xtype: 'devtree',
    requires: [
        "svgxml.view.tree.DevTreeController",
        "svgxml.view.tree.DevTreeModel"
    ],
    expanded: true,
    controller: "imgtree",


    title: "Device",
    //titleAlign:"center",//标题居中
    titleCollapse: true,
    autoScroll: true,
    animate: false,
    resizable: true,
    //ui: "default",
    useArrows: true,
    //viewType: "treeview",
    stateful: true,
    //draggable:true,
    rootVisible: false,//隐藏root
    listeners: {
        // itemclick: "itemclick",
        render: "render",
        itemcontextmenu: "itemcontextmenu",
        //itemmouseenter: "itemmouseenter",
        boxready: "boxready",
        afteritemexpand: function (node, index, e) {
            if (node.raw.depth == 3) {
                console.log(node)
            }

        }
    },


    tbar: [{
        text: 'Expand All',
        scope: this,
        handler: function (th) {
            th.up("devtree").down("toolbar").disable();
            th.up("devtree").expandAll(function () {
                th.up("devtree").down("toolbar").enable()
            });
        }
    }, {
        text: 'Collapse All',
        scope: this,
        handler: function (th) {
            th.up("devtree").down("toolbar").disable();
            th.up("devtree").collapseAll(function () {
                th.up("devtree").down("toolbar").enable()
            });
        }
    }], initComponent: function () {
        var me= this;
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: "DevTreeDragDropGroup"
            }
        }
        this.tools = [{
            type: 'refresh',
            tooltip: 'Refresh Dev Data',
            // hidden:true,
            handler: function (event, toolEl, panelHeader) {
                devTreeStoreLoad()

                me.expandAll()
            }
        }]
        this.callParent();
    }
});

