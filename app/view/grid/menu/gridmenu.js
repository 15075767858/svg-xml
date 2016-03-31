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
        itemId: 'cut',
        disabled: true,
        listeners: {
            click: "cupclick"
        }
    }, {
        text: 'copy',
        itemId: 'copy',
        disabled: true,
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
        itemId: 'deplicate',
        disabled: true,
        listeners: {
            click: "deplicateclick"
        }
    }, {
        text: 'delete',
        itemId: 'delete',
        disabled: true,
        //plain:true //平的
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        },
        listeners: {
            click: "deleteclick"
        }
    }, {
        text: 'Link ',
        itemId: 'Link',
        disabled: true,
    }, {
        text: 'Link form',
        itemId: 'Linkform',
        disabled: true,
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        }
    }, {
        text: 'addSlot',
        disabled: true,
        itemId: "addSlot"

    }, {
        text: 'delSlot',
        disabled: true,
        border: "0 0 1 0",
        itemId: 'delSlot',

        style: {
            borderColor: "#111"
        }, disabled: true
    }, {
        text: 'Rename',
        disabled: true,
    }, {
        text: 'New plant',
        disabled: true,
    }, {
        text: 'Reorder',//排序
        disabled: true
    }, {
        text: 'Property',
        disabled: true,
        itemId: 'Property',
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        }
    }, {
        text: 'PinSlots',
        itemId: 'PinSlots',
        disabled: true,
    }, {
        text: 'Backup',
        itemId: 'Backup',
        disabled: true,
    }, {
        text: 'Restor',
        itemId: 'Restor',
        disabled: true
    }
    ]/*,
     listeners:{
     click:function(){
     console.log(arguments)
     }
     }*/
});
