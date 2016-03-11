Ext.define('svgxml.view.grid.menu.gridmenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-menu-gridmenu',

    init: function (el) {
        if (hideCom)
            console.log(el.getComponent('paste').setDisabled(false))
        //alert("controller init")
    },
    cupclick: function (menu, item, e, eOpts) {
        hideCom = menu.up().up();
        menu.up().up().hide();
        //console.log(menu.up().getComponent('paste').setDisabled(true))
    },
    copyclick: function (menu, item, e, eOpts) {
        hideCom = menu.up().up();
    },
    pasteclick: function (menu, item, e, eOpts) {
        //var sourcePanel = menu.up().up();
        var oTypeGrid =Ext.create("svgxml.view.grid.TypeGrid", {
            title: hideCom.getTitle(),
            icon: hideCom.getIcon(),
            x: hideCom.x,
            y: hideCom.y,
            store: hideCom.getStore()
        })
        menu.up().up().up().add(oTypeGrid)
        oTypeGrid.setPagePosition(hideCom.x+hideCom.up().getX()+hideCom.width+50,hideCom.y+hideCom.up().getY(),true)
    },
    deleteclick: function (menu, item, e, eOpts) {
        if(menu.up().up()==hideCom){
            menu.up().getComponent('paste').setDisabled(true);
            hideCom=false;
        }
        menu.up().up().close()
    },
    deplicateclick: function (menu, item, e, eOpts) {
        hideCom = menu.up().up();
        var oTypeGrid =Ext.create("svgxml.view.grid.TypeGrid", {
            title: hideCom.getTitle(),
            icon: hideCom.getIcon(),
            x: hideCom.x,
            y: hideCom.y,
            store: hideCom.getStore()
        })
        menu.up().up().up().add(oTypeGrid)
        oTypeGrid.setPagePosition(hideCom.x+hideCom.up().getX()+hideCom.width+50,hideCom.y+hideCom.up().getY(),true)
        //oTypeGrid.setPagePosition(0,0,true)
        /*hideCom.x + hideCom.width + 10,
            hideCom.y,*/
        //t.setPagePosition(t.up().getX() + 10, t.up().getY() + 10, true)
    }
});
/*title: typeName,
 store: typeName + "Store",
 x: e.browserEvent.offsetX,
 y: e.browserEvent.offsetY,
 icon: "img/SVG/" + typeName + ".svg"*/
