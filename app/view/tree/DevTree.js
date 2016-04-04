
Ext.define("svgxml.view.tree.DevTree", {
    extend: "Ext.tree.Panel",

    requires: [
        "svgxml.view.tree.DevTreeController",
        "svgxml.view.tree.DevTreeModel",
        "svgxml.store.Files"
    ],
    expanded: true,
    //controller: "imgtree",
    /*viewModel: {
        type: "imgtree"
    },*/
    //height:200,
    title: "XmlFiles",
    //titleAlign:"center",//标题居中
    titleCollapse: true,
    autoScroll: true,
    animate: true,
    resizable: true,
    //ui: "default",
    useArrows: true,
    viewType: "treeview",
    stateful: true,
    //draggable:true,
    rootVisible:false,//隐藏root
    store:Ext.create("svgxml.store.Files"),

    listeners: {
        itemclick: function () {
            console.log(arguments);
        }
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
