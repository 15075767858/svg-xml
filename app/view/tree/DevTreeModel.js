Ext.define('svgxml.view.tree.DevTreeModel', {
        extend:"Ext.data.Model",
        alias: 'viewmodel.devtreemodel',
    data: {
        name: 'svgxml'
    },
    fields:[
        {name:"text",type:"string"}
    ]
});
/* proxy:{
 type:"ajax",
 api:{
 create: 'get-nodes.php',
 read: 'get-nodes.php',
 update: 'get-nodes.php',
 destroy: 'get-nodes.php'
 }
 }*/