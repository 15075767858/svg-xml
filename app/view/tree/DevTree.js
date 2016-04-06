Ext.define("svgxml.view.tree.DevTree", {
    extend: "Ext.tree.Panel",
    xtype: 'devtree',
    requires: [
        "svgxml.view.tree.DevTreeController",
        "svgxml.view.tree.DevTreeModel"
    ],
    expanded: true,
    controller: "imgtree",
    /*viewModel: {
     type: "imgtree"
     },*/
    //height:200,
    minHeight: 200,
    title: "XmlFiles",
    //titleAlign:"center",//标题居中
    titleCollapse: true,
    autoScroll: true,
    animate: true,
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
        itemmouseenter: "itemmouseenter"
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
    viewConfig: {
       /* plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true,
            ddGroup: "DevTreeDragDropGroup",
            listeners: {
                drop: function () {
                    alert("sdafasdfsa")
                }
            }
        }*/
    }

});


/*
 xtype:"treepanel",
 title:"iConTree",
 //titleAlign:"center",//标题居中
 titleCollapse:true,
 autoScroll:true,
 animate:true,
 resizable: true,
 ui:"default",
 useArrows:true,
 viewType:"treeview",
 stateful : true,
 //draggable:true,
 //rootVisible:false,//隐藏root
 /!*root:{
 title:"iCon",
 expanded:true,
 children:[
 text:"aa"},
 {text:"bb"}
 ]
 }*!/
 listeners:{
 itemclick:function(){
 console.log(arguments);
 }
 },*/
