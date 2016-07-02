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
        drawlines(getCurrentDrawPanel())
    },
    deplicateclick: function (menu, e, eOpts) {
        var typegrid = menu.up("typegrid");
        hideCom = cloneTypegrid(typegrid, e);
        //hideCom.datas.plantId=getCurrentPlant().id;
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
        if (typeGirdName == "logic") {
            store.add({
                'name': 'In',
                delay: "0",
                'value': "0",
                time: "0",
                time1: "0",
                time2: "0",
                time3: "0",
                time4: "0",
                time5: "0",
                time6: "0",
                time7: "0",
                time8: "0",
                time9: "0"
            })
        } else {
            store.add({
                name: "In",
                value: "0"
            })
        }
        store.commitChanges()
        console.log(this.setStore(store))

    },
    delSlotclick: function (menu, item, e, eOpts) { //删除连线 并去除数组中的 对应元素
        console.log(arguments)
        var index = this.datas.index;
        var store = this.getStore();
        console.log(store)
        store.removeAt(index);
        this.setStore(store);
        var datasArray = getCurrentDrawPanel().datas.datasArray;
        var targetid = d3.select(menu.up().el.dom).attr("data-targetid");
        console.log(datasArray)
        d3.selectAll("polyline").each(function () {
            console.log(d3.select(this).attr("data-end") + " " + targetid)
            for (var i = 0; i < datasArray.length; i++) {
                console.log(datasArray[i][targetid])
                if (datasArray[i][targetid]) {
                    getCurrentDrawPanel().datas.datasArray.splice(i, 1)
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
    pidPropertyClick: function (menu, item, e, eOpts) {
        var _this = this
        var win = Ext.create('Ext.window.Window', {
            title: 'pid Property',
            width: 213,
            height: 262,
            layout: 'border',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                region: "center",
                xtype: 'grid',
                height: "100%",
                width: "100%",
                border: false,
                bbar: [
                    {
                        text: "Ok", handler: function (menu) {
                        Ext.data.StoreManager.lookup("store" + _this.id).commitChanges();
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.close();
                    }
                    }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],
                columns: [{header: 'name', dataIndex: "name"},
                    {
                        header: "value", dataIndex: "value", editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                    }

                ],                 // 仅仅用来显示一个头部。没有数据，
                store: Ext.data.StoreManager.lookup("store" + _this.id)
            }
        }).show();
    },

    logicPropertyClick: function (menu, item, e, eOpts) {
        var _this = this;
        console.log(_this.config.store)
        var typeGirdName = this.getTitle();
        var store = _this.store//Ext.data.StoreManager.lookup("store" + _this.id);
        if (store.data.length > slotsJson[typeGirdName].maxSlot) {
            Ext.Msg.alert('Info', 'This slot max length is ' + slotsJson[typeGirdName].maxSlot + '.');
            return;
        }

        var win;
        win = Ext.getCmp("win" + _this.id);
        console.log(win)

        if (win) {
            win.show()
            return
        }
    },

    SCFMPropertyClick: function () {
        var _this = this;
        var store = Ext.data.StoreManager.lookup("store" + _this.id);
        var win = Ext.create('Ext.window.Window', {
            title: 'SCFM Property',
            width: 375,
            height: 190,
            layout: 'border',
            /*items: {  // Let's put an empty grid in just to illustrate fit layout
             region: "center",
             xtype: 'grid',
             height: "100%",
             width: "100%",
             border: false,
             bbar: [
             {
             text: "Ok", handler: function (menu) {
             Ext.data.StoreManager.lookup("store" + _this.id).commitChanges();
             Ext.Msg.alert('Status', 'Changes saved successfully.');
             win.close();
             }
             }
             ],
             plugins: [
             Ext.create('Ext.grid.plugin.CellEditing', {
             clicksToEdit: 1
             })
             ],
             columns: [{header: 'name', dataIndex: "name"},
             {
             header: "value", dataIndex: "value", editor: {
             xtype: 'textfield',
             allowBlank: false
             }
             },
             {
             xtype: 'checkcolumn', text: 'Active', dataIndex: 'active'
             }

             ],                 // 仅仅用来显示一个头部。没有数据，
             store: Ext.data.StoreManager.lookup("store" + _this.id)
             }*/
            listeners: {
                resize: function () {
                    console.log(arguments)
                }
            },
            items: {
                xtype: "form",
                controller: "grid-menu-gridmenu",
                region: "center",
                height: "100%",
                width: "100%",
                defaultType: 'textfield',
                defaults: {
                    labelWidth: 150,
                    margin: 10
                },
                buttons: [
                    {
                        text: "Ok", handler: function (button) {

                        console.log(arguments)
                        var form = button.up("form").getForm();
                        var resJson = form.getFieldValues();
                        console.log(resJson)
                        store.getAt(0).set("value", resJson[store.getAt(0).data.name])
                        store.getAt(1).set("value", form.getFields().items[2].value);
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.close();
                    }
                    }
                ],
                //layout:"auto",
                items: [{
                    fieldLabel: store.getAt(0).data.name,
                    name: store.getAt(0).data.name,
                    value: store.getAt(0).data.value
                },

                    {
                        xtype: 'fieldcontainer',

                        layout: 'hbox',
                        //margin: '0 0 5 0',
                        items: [
                            {
                                xtype: "radiofield",
                                name: "diameter(D)",
                                margin: "0 5 0 0",
                                reference: "check1"
                            },
                            {
                                fieldLabel: 'diameter(D)',
                                labelWidth: 130,
                                name: store.getAt(1).data.name,
                                xtype: "numberfield",
                                value: store.getAt(1).data.value,
                                bind: {
                                    disabled: "{!check1.checked}",
                                    value: "{diameter}"
                                }
                            },
                            {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true
                            },
                        ]
                    },
                    {
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        defaults: {},
                        items: [
                            {
                                xtype: "radiofield",
                                margin: "0 5 0 0",
                                reference: "check2",
                                name: "diameter(D)"
                            },
                            {
                                xtype: "textfield",
                                value: "H",
                                width: 30,
                                disabled: true
                            },
                            {
                                xtype: "numberfield",
                                width: 110,
                                value: 20,
                                bind: {
                                    disabled: "{!check2.checked}",
                                    value: "{input1}"
                                },

                            }, {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true
                            },
                            {
                                xtype: "textfield",
                                value: "W",
                                width: 30,
                                disabled: true
                            }, {
                                xtype: "numberfield",
                                width: 110,
                                value: 40,
                                bind: {
                                    disabled: "{!check2.checked}",
                                    value: "{input2}"
                                }
                            }, {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true
                            }
                        ]
                    }

                ],
                listeners: {
                    boxready: function () {
                        //var form = this;
                        //var model=store.getAt(0);
                        //console.log(model)
                        //form.getForm().loadRecord(model)
                    }
                },

            }
        }).show();


    },

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
                type: 'hbox'
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
                        var startId = getTypeGridRowIdByIndex(SourceTypeGrid, win.datas.sourceIndex).id;
                        var endId = getTypeGridRowIdByIndex(TargetTypeGrid, win.datas.targetIndex).id;
                        getCurrentDrawPanel().datas.datasArray.push(generateJson(endId, startId));
                        drawlines(getCurrentDrawPanel())
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

function getTypeGridRowIdByIndex(typegrid, index) {
    return typegrid.el.dom.querySelectorAll(".x-grid-row")[index];
}

function cloneTypegrid(typegrid, e) {

    console.log(arguments)

    var typeName = typegrid.getTitle();
    var dataitems = typegrid.getStore().data.items;
    var data = [];
    for (var i = 0; i < dataitems.length; i++) {
        var otempjson = {};
        otempjson['name'] = dataitems[i].data['name']
        otempjson['value'] = dataitems[i].data['value']
        data[i] = otempjson
    }
    var store = Ext.create("Ext.data.Store", {
        fields: ["name", "value"],
        data: data,
        listeners: {
            add: function () {
                setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
            }
        }
    });

    var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
        title: typegrid.config.title,
        store: store,
        icon: typegrid.config.icon,
        listeners: {
            render: function (thi) {
                thi.datas = typegrid.datas
            }
        }
    });
    return oTypeGrid;
}
