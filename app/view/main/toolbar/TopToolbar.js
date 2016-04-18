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
                            saveGridpanelsConfigs()
                            saveXml()
                        }
                    },
                        {
                            text: 'Open •••',
                            listeners: {
                                click: "openXmlClick"
                            }
                        }, {
                            text: 'Save •••',
                            handler: function () {
                                saveGridpanelsConfigs()
                                saveXml()
                            }
                        }, {
                            text: "Save as •••",
                            listeners: {
                                click: "saveXmlClick"
                            },
                            handler: function () {

                                //id: "plantsPanel" + th.getTitle(),
                                //  store: "store" + th.getTitle(),

                            }
                        }
                    ]
                }]
        });
        this.callParent();
    }
});

function saveGridpanelsConfigs(fileName) {
    if (fileName) {
        fileName = fileName + ".json"
    } else {
        fileName = "1000.json";
    }
    //fileName=fileName||"1000.json";


    var drawpanel = getCurrentDrawPanel();
    var gridpanels = getCurrentDrawPanelGirdPanels();
    var aGridPanels = [];
    for (var i = 0; i < gridpanels.length; i++) {
        var typeGridConfig = getGridPanelConfig(gridpanels[i]);
        var storeConfig = getStoreConfig(gridpanels[i].getStore());
        var datas = gridpanels[i].datas;
        aGridPanels.push({typegrid: typeGridConfig, store: storeConfig, datas: datas});
    }
    //localStorage.setItem("datasArray", Ext.encode(drawpanel.datas.datasArray));
    //drawpanel.datas.datasArray = Ext.decode(localStorage.getItem("datasArray"));
    // localStorage.setItem("plants", Ext.encode(drawpanel.datas.plants));
    //localStorage.setItem("gridpanelConfigs", Ext.encode(aGridPanels));
    var oJson = {
        datasArray: Ext.encode(drawpanel.datas.datasArray),
        plants: Ext.encode(drawpanel.datas.plants),
        gridpanelConfigs: Ext.encode(aGridPanels)
    };
    console.log(oJson)
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        params: {
            fileName: "../" + fileName,
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
function getStoreConfig(store) {
    console.log(store)
    var datas = store.data.items;
    store.commitChanges()
    console.log(datas)
    //var datas = store.config.data;
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

