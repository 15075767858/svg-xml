Ext.define("svgxml.view.grid.menu.gridmenu", {
    extend: "Ext.menu.Menu",
    requires: [
        "svgxml.view.grid.menu.gridmenuController",
        "svgxml.view.grid.menu.gridmenuModel"
    ],
    controller: "grid-menu-gridmenu",
    viewModel: {
        type: "grid-menu-gridmenu"
    },
    floating: true,  // usually you want this set to True (default)
    autoShow: true,
    shadow: "drop",
    shadowOffset: 5,
    border: "0 0 0 1",
    style: {
        borderColor: "#111"
    },
    items: [{
        text: 'cut',
        listeners: {
            click: "cupclick"
        }
    }, {
        text: 'copy',
        listeners: {
            click: "copyclick"
        }
        //disabled: true
    }, {
        text: 'paste',
        itemId: 'paste',
        disabled: true,
        listeners: {
            click: "pasteclick"
        }
    }, {
        text: 'deplicate',
        listeners: {
            click: "deplicateclick"
        }
    }, {
        text: 'delete',
        //plain:true //平的
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        },
        listeners:{
          click:"deleteclick"
        }
    }, {
        text: 'Link '
    }, {
        text: 'Link form',
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        }
    }, {
        text: 'addSlot',
        itemId:"addSlot"

    }, {
        text: 'delSlot',
        border: "0 0 1 0",
        itemId: 'delSlot',

        style: {
            borderColor: "#111"
        }, disabled: true
    }, {
        text: 'Rename'
    }, {
        text: 'New plant'
    }, {
        text: 'Reorder'//排序
    }, {
        text: 'Property',
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        }
    }, {
        text: 'PinSlots'
    }, {
        text: 'Backup'
    }, {
        text: 'Restor'
    }
    ]/*,
     listeners:{
     click:function(){
     console.log(arguments)
     }
     }*/
});
