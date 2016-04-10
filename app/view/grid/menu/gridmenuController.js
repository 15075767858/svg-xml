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
        store.add( {
            name: "In",
            value: ""
        })
        console.log(this.setStore(store))
        store.commitChanges()

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
    PropertyClick: function (menu, item, e, eOpts) {

        var _this=this
        var win = Ext.create('Ext.window.Window', {
            title: 'pid Property',
            width: 213,
            height: 234,
            layout: 'border',


            items: {  // Let's put an empty grid in just to illustrate fit layout
                region: "center",
                xtype: 'grid',
                // height: 205,
                // width: 206,
                border: false,
                bbar: [
                    {text: "Ok",handler:function(menu){
                        Ext.data.StoreManager.lookup( "store"+_this.id).commitChanges();
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.close();
                    }}
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],
                columns: [{header: 'name', dataIndex: "name"},
                    {header: "value", dataIndex: "value",editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }}

                ],                 // 仅仅用来显示一个头部。没有数据，
                store:Ext.data.StoreManager.lookup( "store"+_this.id)
            }
        }).show();

        /*Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {'name': 'P', 'value': "10.0"},
                {'name': 'I', 'value': "2.0"},
                {'name': 'D', 'value': "0.0"},
                {'name': 'Max', 'value': "100"},
                {'name': 'Min', 'value': "0"}
            ]
        })*/
        /*Ext.create('Ext.form.Panel', {
         title: 'Simple Form',
         bodyPadding: 5,
         width: 350,

         // 将会通过 AJAX 请求提交到此URL

         // 表单域 Fields 将被竖直排列, 占满整个宽度
         layout: 'anchor',
         defaults: {
         anchor: '100%'
         },

         // The fields
         defaultType: 'textfield',
         items: [{
         fieldLabel: 'First Name',
         name: 'first',
         allowBlank: false
         },{
         fieldLabel: 'Last Name',
         name: 'last',
         allowBlank: false
         }],

         // 重置 和 保存 按钮.
         buttons: [{
         text: '重置',
         handler: function() {
         this.up('form').getForm().reset();
         }
         }, {
         text: '保存',
         formBind: true, //only enabled once the form is valid
         disabled: true,
         handler: function() {
         var form = this.up('form').getForm();
         if (form.isValid()) {
         form.submit({
         success: function(form, action) {
         Ext.Msg.alert('保存成功', action.result.msg);
         },
         failure: function(form, action) {
         Ext.Msg.alert('操作失败', action.result.msg);
         }
         });
         }
         }
         }],
         renderTo: Ext.getBody()
         });*/
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
                        console.log(startId)
                        console.log(endId)
                        console.log(generateJson(startId, endId))
                        datasArray.push(generateJson(startId, endId));
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