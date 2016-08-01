Ext.define("svgxml.view.tree.DevTree", {
    extend: "Ext.tree.Panel",
    xtype: 'devtree',
    requires: [
        "svgxml.view.tree.DevTreeController",
        "svgxml.view.tree.DevTreeModel"
    ],
    expanded: true,
    controller: "imgtree",
    //viewModel:"devtreemodel",
    viewModel: {
        type: 'devtreemodel'
    },
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
    id: "leftDevTree",
    singleExpand: false,
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
        },
        checkchange: function (treeModel, check) {
            console.log(arguments)
            var me = this;
            var treePanle=this;
            if (check) {
                treeModel.set("qtip", "On line")
            } else {
                treeModel.set("qtip", "Off line")
            }
            treePanle.viewModel.set("linkDataBase",check);

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
    }],
    /* header: {
     items: [
     {
     xtype: "checkbox",
     handler:function(checkbox,bol){
     console.log(arguments)
     var tree=this.up("devtree")
     console.log(tree)
     tree.setConfig("singleExpand",true)
     tree.setConfig("title","aaaa")
     },
     listeners: {
     el: {
     mouseenter: function (checkbox) {
     var me=this.component;
     Ext.tip.QuickTipManager.register({
     target: me.id,
     title: 'single Expand',
     //text: 'singleExpand',
     width: 100,
     dismissDelay: 10000 // Hide after 10 seconds hover
     });
     }
     }
     }
     }
     ]
     },*/
    initComponent: function () {
        var me = this;
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: "DevTreeDragDropGroup"
            },
        }

        me.tools = [{
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