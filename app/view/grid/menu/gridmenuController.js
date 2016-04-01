Ext.define('svgxml.view.grid.menu.gridmenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-menu-gridmenu',

    init: function (el) {
        try {
            if (hideCom) {
                console.log(el.getComponent('paste').setDisabled(false))
            }
        } catch (e) {

        }
        //alert("controller init")
    },
    /*show:function(th){
     console.log(th.up("typegrid"))
     var title = th.up("typegrid").title;
     if(slotsJson[title].isAddSlot){
     el.getComponent("addSlot").setDisabled(true);
     }else{
     el.getComponent("addSlot").setDisabled(false);
     }
     },*/
    cupclick: function (menu, item, e, eOpts) {
        hideCom = menu.up("typegrid");

        menu.up("typegrid").hide();
        //console.log(menu.up().getComponent('paste').setDisabled(true))
    },
    copyclick: function (menu, item, e, eOpts) {
        hideCom = menu.up("typegrid");
        console.log(hideCom.getStore())
    },
    pasteclick: function (item, e, eOpts) {
        //var sourcePanel = menu.up().up();
        var typeName = hideCom.getTitle();
        var dataitems = hideCom.getStore().data.items;

        var data = [];
        for (var i = 0; i < dataitems.length; i++) {
            var otempjson = {};
            otempjson['name'] = dataitems[i].data['name']
            otempjson['value'] = dataitems[i].data['value']
            data[i]=otempjson
        }
        var store = Ext.create(typeName, {
            data: data
        });

        var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
            title: typeName,
            store: store,
            x: e.browserEvent.offsetX,
            y: e.browserEvent.offsetY,
            icon: "img/SVG/" + typeName + ".svg"
        })

        /*var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
         title: hideCom.getTitle(),
         icon: hideCom.getIcon(),
         x: hideCom.x,
         y: hideCom.y,
         store: hideCom.getStore()
         })*/
        getCurrentDrawPanel().add(oTypeGrid);
        oTypeGrid.setPagePosition(e.pageX, e.pageY, true)
        //oTypeGrid.setPagePosition(hideCom.x + hideCom.up().getX() + hideCom.width + 50, hideCom.y + hideCom.up().getY(), true)
    },

    deleteclick: function (menu, item, e, eOpts) {

        if (menu.up("typegrid") == hideCom) {
            menu.up().getComponent('paste').setDisabled(true);
            hideCom = false;
        }
        menu.up("typegrid").close()
    },
    deplicateclick: function (menu, item, e, eOpts) {
        hideCom = menu.up().up();
        var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
            title: hideCom.getTitle(),
            icon: hideCom.getIcon(),
            x: hideCom.x,
            y: hideCom.y,
            store: hideCom.getStore()
        })
        menu.up("drawpanel").add(oTypeGrid)
        oTypeGrid.setPagePosition(hideCom.x + hideCom.up().getX() + hideCom.width + 50, hideCom.y + hideCom.up().getY(), true)

    },
    addSlotclick: function (menu, item, e, eOpts) {
        var typeGirdName = menu.up("typegrid").title;
        var store = this.getStore();
        if (store.data.length > slotsJson[typeGirdName].maxSlot) {
            Ext.Msg.alert('Info', 'This slot max length is ' + slotsJson[typeGirdName].maxSlot + '.');
            return;
        }
        store.add(Ext.create("svgxml.view.grid.TypeGridModel", {
            name: "In",
            value: ""
        }))
        console.log(this.setStore(store))
    },
    delSlotclick: function (menu, item, e, eOpts) { //删除连线 并去除数组中的 对应元素
        console.log(arguments)
        var index = this.datas.index;
        var store = this.getStore();
        console.log(store)
        store.removeAt(index);
        this.setStore(store);


        var targetid = d3.select(menu.up().el.dom).attr("data-targetid");
        console.log(datasArray)
        d3.selectAll("polyline").each(function () {
            console.log(d3.select(this).attr("data-end") + " " + targetid)
            for (var i = 0; i < datasArray.length; i++) {
                console.log(datasArray[i][targetid])
                if (datasArray[i][targetid]) {
                    datasArray.splice(i, 1)
                }
            }
            if (d3.select(this).attr("data-end") == targetid) {
                d3.select(this).remove()
            }
        })


    }
});
