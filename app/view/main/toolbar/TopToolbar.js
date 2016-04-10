Ext.define("svgxml.view.main.toolbar.TopToolbar", {
    extend: "Ext.toolbar.Toolbar",
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    requires: [
        "svgxml.view.main.toolbar.TopToolbarController",
        "svgxml.view.main.toolbar.TopToolbarModel"
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
                            console.log(saveGridpanelsConfigs())
                        }
                    },
                        {
                            text: 'Open •••',
                            listeners: {
                                click: "openXmlClick"
                            }
                        }, {
                            text: 'Save •••',
                            listeners: {
                                click: "saveXmlClick"
                            }
                        }, {
                            text: "Save as •••",
                            handler: function () {
                                console.log(getCurrentDrawPanel().datas.plants)

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

function saveGridpanelsConfigs() {
    var drawpanel = getCurrentDrawPanel();
    var gridpanels = getCurrentDrawPanelGirdPanels();
    var aGridPanels = [];
    for (var i = 0; i < gridpanels.length; i++) {
        var typeGridConfig = getGridPanelConfig(gridpanels[i]);
        var storeConfig = getStoreConfig(gridpanels[i].getStore());
        var datas = gridpanels[i].datas;

        aGridPanels.push({typegrid: typeGridConfig, store: storeConfig, datas: datas});
    }
    console.log(datasArray)
    localStorage.setItem("datasArray",Ext.encode(datasArray));
    console.log(localStorage.getItem("datasArray"))
    localStorage.setItem("plants", Ext.encode(drawpanel.datas.plants));
    localStorage.setItem("gridpanelConfigs", Ext.encode(aGridPanels));
}

function getGridPanelRowsIds(gridpanel) {
    var trs = gridpanel.el.dom.querySelectorAll(".x-grid-row");
    var ids = [];
    for (var i = 0; i < trs.length; i++) {
        /*if (trs[i].length < 3) {
         currentDrawPanelGridPanelsTrSetId()
         }*/
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
    //console.log(store)
    var datas = store.data.items;
    //var datas = store.config.data;
    var data = [];
    for (var i = 0; i < datas.length; i++) {
        var ojson = {"name": datas[i].data.name, "value": +datas[i].data.value}
        console.log(ojson)
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

var a = [{
    "typegrid": {"icon": "resources/img/SVG/add.svg", "title": "add", "x": 292, "y": 71, "trsIds": "[]"},
    "store": {
        "data": [{"name": "Out", "value": 0}, {"name": "In", "value": 2}, {"name": "In", "value": 2}],
        "fields": ["name", "value"]
    },
    "datas": {"isAddSlot": true, "plantId": "p65871478524059", "type": "51"}
}, {
    "typegrid": {
        "icon": "resources/img/SVG/aodo.svg",
        "title": "aodo",
        "x": 475,
        "y": 42,
        "trsIds": "[\"t2222894716\",\"t7274237156\"]"
    },
    "store": {"data": [{"name": "Out", "value": 0}, {"name": "In", "value": 2}], "fields": ["name", "value"]},
    "datas": {"isAddSlot": false, "plantId": "p27513997862115", "type": "58"}
}, {
    "typegrid": {
        "icon": "resources/img/SVG/aodo.svg",
        "title": "aodo",
        "x": 304,
        "y": 293,
        "trsIds": "[\"t3895129633\",\"t854103176\"]"
    },
    "store": {"data": [{"name": "Out", "value": 0}, {"name": "In", "value": 2}], "fields": ["name", "value"]},
    "datas": {"isAddSlot": false, "plantId": "p27513997862115", "type": "58"}
}, {
    "typegrid": {
        "icon": "resources/img/SVG/aver.svg",
        "title": "aver",
        "x": 521,
        "y": 235,
        "trsIds": "[\"t9312353765\",\"t758218895\",\"t3074402061\"]"
    },
    "store": {
        "data": [{"name": "Out", "value": 0}, {"name": "In", "value": 2}, {"name": "In", "value": 2}],
        "fields": ["name", "value"]
    },
    "datas": {"isAddSlot": true, "plantId": "p27513997862115", "type": "55"}
}, {
    "typegrid": {
        "icon": "resources/img/SVG/add.svg",
        "title": "add",
        "x": 346,
        "y": 156,
        "trsIds": "[\"t573671751\",\"t2455006972\",\"t3565675395\"]"
    },
    "store": {
        "data": [{"name": "Out", "value": 0}, {"name": "In", "value": 2}, {"name": "In", "value": 2}],
        "fields": ["name", "value"]
    },
    "datas": {"isAddSlot": true, "plantId": "p27513997862115", "type": "51"}
}]