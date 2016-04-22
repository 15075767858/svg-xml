Ext.define("svgxml.view.main.toolbar.TopToolbar", {
    extend: "Ext.toolbar.Toolbar",
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    requires: [
        "svgxml.view.main.toolbar.TopToolbarController",
        "svgxml.view.main.toolbar.TopToolbarModel",
        "Ext.window.*"
    ],

    controller: "main-toolbar-toptoolbar",
    viewModel: {
        type: "main-toolbar-toptoolbar"
    },

    initComponent: function () {
        Ext.apply(this, {
            width: "100%",
            items: [
                {
                    text: 'File',
                    glyph: 70,
                    menu: [{
                        text: 'New •••',
                        handler: function () {
                            //saveGridpanelsConfigs()
                            //saveXml()
                        },
                        listeners: {
                            click: "newClick"
                        }
                    },
                        {
                            text: 'Open •••',
                            listeners: {
                                click: "openXmlClick1"
                            }
                        }, {
                            text: 'Save •••',
                            handler: function () {
                                var title = getCurrentDrawPanel().title;
                                saveGridpanelsConfigs(title);
                                saveXml(title);
                            }
                        }, {
                            text: "Save as •••",
                            listeners: {
                                click: "saveAsClick"
                            }
                        }, {
                            text: "Download •••",
                            listeners: {
                                click: "downloadClick"
                            }
                        }
                    ]
                }]
        });
        this.callParent();
    }
});

function saveGridpanelsConfigs(fileName) {
    if (fileName != "1000") {
        fileName = "devsinfo/" + fileName
    } else {
        fileName = "../1000.json";
    }
    var drawpanel = getCurrentDrawPanel();
    var gridpanels = getCurrentDrawPanelGirdPanels();
    var aGridPanels = [];
    for (var i = 0; i < gridpanels.length; i++) {
        var typeGridConfig = getGridPanelConfig(gridpanels[i]);
        var storeConfig = getStoreConfig(gridpanels[i]);
        var datas = gridpanels[i].datas;
        if (gridpanels[i].datas.type == 56) {
            var columns = Ext.getCmp("win" + gridpanels[i].id).down("grid").getColumns();
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].hidden) {
                    datas.rows = i;
                    break;
                }
                datas.rows = 10;
            }
        }
        aGridPanels.push({typegrid: typeGridConfig, store: storeConfig, datas: datas});
    }
    var oJson = {
        datasArray: Ext.encode(drawpanel.datas.datasArray),
        plants: Ext.encode(drawpanel.datas.plants),
        gridpanelConfigs: Ext.encode(aGridPanels)
    };
    console.log(oJson)
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        params: {
            fileName: fileName,
            rw: "w",
            content: Ext.encode(oJson)
        },
        success: function (response) {
            var text = response.responseText;
        }
    });
}

function getGridPanelRowsIds(gridpanel) {
    var trs = gridpanel.el.dom.querySelectorAll(".x-grid-row");
    var ids = [];
    for (var i = 0; i < trs.length; i++) {
        /*if (trs[i].length < 3) {
         currentDrawPanelGridPanelsTrSetId()
         }*/
        console.log(trs[i])
        ids.push(trs[i].id)
    }
    return ids;
}

function getGridPanelConfig(gridpanel) {
    var config = gridpanel.getConfig()
    //console.log(gridpanel)
    var ids = getGridPanelRowsIds(gridpanel)

    return {icon: config.icon, title: config.title, x: gridpanel.x, y: gridpanel.y, trsIds: Ext.encode(ids)};
}

function getStoreConfig(gridpanel) {
    var store = gridpanel.getStore();
    var datas = store.data.items;
    console.info(gridpanel)
    store.commitChanges()
    var data = [];
    for (var i = 0; i < datas.length; i++) {
        var ojson;
        if (datas[i].data.select) {
            ojson = {"name": datas[i].data.name, "value": datas[i].data.value, select: datas[i].data.select}
        } else if (datas[i].data.time) {
            var dt = datas[i].data;
            ojson = {
                "name": dt.name,
                "value": dt.value,
                delay: dt.delay,
                time: dt.time,
                time1: dt.time1,
                time2: dt.time2,
                time3: dt.time3,
                time4: dt.time4,
                time5: dt.time5,
                time6: dt.time6,
                time7: dt.time7,
                time8: dt.time8,
                time9: dt.time9
            }
        } else {
            ojson = {"name": datas[i].data.name, "value": datas[i].data.value}
        }
        console.info(ojson)

        data.push(ojson)
    }
    var fields = getStoreFields(store);
    return {data: data, fields: fields}
}
function getStoreFields(store) {
    var fields = [];
    for (var i = 0; i < store.config.fields.length; i++) {
        fields.push(store.config.fields[i])
    }
    return fields;
}

