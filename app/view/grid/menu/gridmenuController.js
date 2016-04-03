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


    },
    show: function (th) {

        /*var title = th.up("typegrid");
         if (slotsJson[title].isAddSlot) {
         el.getComponent("addSlot").setDisabled(true);
         } else {
         el.getComponent("addSlot").setDisabled(false);
         }*/
    },
    cupclick: function (menu, e, eOpts) {
        hideCom = cloneTypegrid(menu.up("typegrid"), e);
        menu.up("typegrid").destroy();
        //console.log(menu.up().getComponent('paste').setDisabled(true))
    },
    copyclick: function (menu, e, eOpts) {
        hideCom = cloneTypegrid(menu.up("typegrid"), e);

    },
    pasteclick: function (item, e, eOpts) {
        hideCom.datas = {plantId: getCurrentPlant().id}
        getCurrentDrawPanel().add(hideCom);
        hideCom.setPagePosition(e.pageX, e.pageY, true)
    },

    deleteclick: function (menu, item, e, eOpts) {

        if (menu.up("typegrid") == hideCom) {
            menu.up().getComponent('paste').setDisabled(true);
            hideCom = false;
        }
        menu.up("typegrid").close()
    },
    deplicateclick: function (menu, e, eOpts) {
        var typegrid = menu.up("typegrid");
        hideCom = cloneTypegrid(typegrid, e);
        hideCom.datas = {plantId: getCurrentPlant().id};
        menu.up("drawpanel").add(hideCom)
        hideCom.setPagePosition(typegrid.x + hideCom.up().getX() + hideCom.width + 50, typegrid.y + hideCom.up().getY(), true)
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
    },
    LinkMarkClick: function (menu, item, e, eOpts) {
        var curDrawPanel = getCurrentDrawPanel();
        var curTypeGrid = menu.up("typegrid");
        curDrawPanel.datas.LinkMarkTypeGrid = curTypeGrid;
        console.log(arguments)
    }
    ,
    LinkFormClick: function (menu, item, e, eOpts) {
        var SourceTypeGrid = getCurrentDrawPanel().datas.LinkMarkTypeGrid;
        var TargetTypeGrid = menu.up("typegrid");

        var win = Ext.create('Ext.window.Window', {
            title: "Link",
            autoScroll: true,
            width: 600,
            height: 600,
            renderTo: Ext.getBody(),
            autoShow: true,
            bodyPadding: 5,
            layout: {
                type: 'hbox',
                //align: 'stretch'
            },
            defaults: {
                //split: true,
                //sortable:false
                sortableColumns: false
            },
            listeners: {
                show: function (th, eOpts) {
                    th.datas = {
                        sourceIndex: 0,
                        targetIndex: 0
                    }
                }
            },
            items: [
                {
                    xtype: 'gridpanel', region: 'center', margin: '0 10 0 0', flex: 1,
                    store: SourceTypeGrid.getStore(),
                    columns: [
                        {text: 'Name', dataIndex: 'name', flex: 1},
                        {text: 'Value', dataIndex: 'value', flex: 1}
                        //{ text: 'Phone', dataIndex: 'phone' ,flex:1}
                    ],
                    tbar: [
                        {
                            xtype: 'displayfield',
                            value: '<span style="color:#04408c;font-weight:bolder;height:20px;line-height:19px;margin-left:3px"> SupplyTemp[Source] (' + SourceTypeGrid.getTitle() + ') </span>',
                            margin: '0 0 0 0'
                        }
                    ],
                    listeners: {
                        itemclick: function (thi, record, item, index, e, eOpts) {
                            win.datas.sourceIndex = index;
                        }
                    }
                },
                {
                    xtype: 'gridpanel', region: 'center', flex: 1,
                    store: TargetTypeGrid.getStore(),
                    columns: [
                        {text: 'Name', dataIndex: 'name', flex: 1},
                        {text: 'Value', dataIndex: 'value', flex: 1}
                        //{ text: 'Phone', dataIndex: 'phone' ,flex:1}
                    ],
                    tbar: [
                        {
                            xtype: 'displayfield',
                            value: '<span style="color:#04408c;font-weight:bolder;height:20px;line-height:19px;margin-left:3px"> GreaterThan[Target] (' + TargetTypeGrid.getTitle() + ') </span>',
                            margin: '0 0 0 0'
                        }
                    ],
                    listeners: {
                        itemclick: function (thi, record, item, index, e, eOpts) {
                            win.datas.targetIndex = index;
                        }
                    }
                }
            ],
            fbar: [
                {xtype: "displayfield", value: 'Link"SupplyTemp [Source]"->"GreaterThane[Target]', margin: "0 120 0 0"},
                {
                    type: 'button', text: 'Ok',
                    handler: function () {
                        console.log(win.datas.sourceIndex)
                        console.log(win.datas.targetIndex)
                        console.log(TargetTypeGrid)

                        win.close()
                    }
                },
                {
                    type: 'button', text: 'Cancel',
                    handler: function () {
                        win.close()
                    }
                }
            ]
        });

    }

});

function cloneTypegrid(typegrid, e) {

    console.log(e)
    var typeName = typegrid.getTitle();
    var dataitems = typegrid.getStore().data.items;
    var data = [];
    for (var i = 0; i < dataitems.length; i++) {
        var otempjson = {};
        otempjson['name'] = dataitems[i].data['name']
        otempjson['value'] = dataitems[i].data['value']
        data[i] = otempjson
    }
    var store = Ext.create(typeName, {
        data: data
    });
    var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
        title: typeName,
        store: store,
        x: e.x || 100,
        y: e.y || 100,
        icon: "img/SVG/" + typeName + ".svg"
    });
    return oTypeGrid;
}