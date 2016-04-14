Ext.define('svgxml.view.main.toolbar.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-toolbar-toptoolbar',

    openXmlClick: function () {
        var odrawpanel = getCurrentDrawPanel();


        var form = new Ext.form.FormPanel({
            baseCls: 'x-plain',
            labelWidth: 70,
            fileUpload: true,
            defaultType: 'textfield',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'select XmlFile',
                margin: '10 30 10 10',
                id: 'xmlfile',
                inputType: 'file',
                blankText: 'File can\'t not empty.',
                anchor: '100%', // anchor width by percentage
                listeners: {
                    change: function (th, str, eOpts) {
                        var file = document.getElementById(th.getInputId()).files[0];
                        try {
                            if (file.type != "text/xml") {
                            }
                        } catch (e) {
                            Ext.get("openXmlTextArea").component.setValue();
                            return;
                        }

                        var reader = new FileReader();
                        reader.onload = function () {
                            Ext.get("openXmlTextArea").component.setValue(this.result);
                        };
                        reader.readAsText(file);
                    }
                }
            }]
        });
        var win = Ext.create('Ext.window.Window', {
            title: 'Open •••',
            width: 600,
            height: 500,
            bodyStyle: {},
            layout: 'anchor',
            items: [form, {
                xtype: 'textareafield',
                id: "openXmlTextArea",
                grow: true,
                name: 'message',
                anchor: '100%',
                growMax: "10",
                maxHeight: "377",
                height: "100%",
                autoScroll: true
            }], buttons: [{
                text: 'Ok',
                handler: function (th, e) {
                    var xmlContent = formatXml(Ext.get("openXmlTextArea").component.getValue());
                    var xmlDom;
                    try {
                        xmlDom = $.parseXML(xmlContent);
                        if (xmlContent.trim() == '') {
                            Ext.Msg.alert('Exception', 'The file content cannot be empty');
                            return;
                        }
                    } catch (e) {
                        Ext.Msg.alert('Error', 'This xml file format error!');
                        return;
                    }
                    console.log(xmlDom)
                    var masterNodes = $(xmlDom).find("master_node");
                    var drawPanel = getCurrentDrawPanel();
                    var aLineDatas = [];
                    for (var i = 0; i < masterNodes.length; i++) {
                        var type = masterNodes[i].getElementsByTagName("type")[0].innerHTML;

                        var typeName;
                        for (slot in  slotsJson) {
                            if (slotsJson[slot].type == type) {
                                typeName = slot;
                            }
                        }
                        var initData = slotsJson[typeName].initData;
                        //console.log(initData)
                        var startIndex = 1;
                        if (initData[0].name == "model") {
                            initData[0].value = masterNodes[i].getElementsByTagName("model")[0].innerHTML;
                            startIndex = 2;
                        }
                        var xmlSlots = masterNodes[i].getElementsByTagName("slots");
                        for (var j = 0; j < xmlSlots.length; j++, startIndex++) {
                            if (xmlSlots[j].getElementsByTagName("default")[0]) {
                                if (initData[startIndex]) {
                                    initData[startIndex].value = xmlSlots[j].getElementsByTagName("default")[0].innerHTML;
                                }
                                else {
                                    initData.push({
                                        name: "In",
                                        value: xmlSlots[j].getElementsByTagName("default")[0].innerHTML
                                    })
                                }
                            } else {
                                var iNode = xmlSlots[j].getElementsByTagName("node")[0].innerHTML;
                                var iSlotNumber = xmlSlots[j].getElementsByTagName("slot_number")[0].innerHTML;
                                console.log(iNode)
                                console.log(iSlotNumber)
                                aLineDatas.push([iNode, iSlotNumber])
                                console.log(aLineDatas)
                            }
                        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                        var store = Ext.create(typeName, {
                            data: initData
                        });
                        var oTypeGrid = Ext.create("svgxml.view.grid.TypeGrid", {
                            title: typeName,
                            store: store,
                            x: 0,
                            y: 0,
                            icon: "resources/img/SVG/" + typeName + ".svg"
                        })
                        drawPanel.add(oTypeGrid);
                        win.close();
                    }
                }
            }, {
                text: 'Close',
                handler: function () {
                    win.close();
                }
            }]
        }).show();
    },

    saveXmlClick: function () {

        var aDevs = getDevNamesAll()
        var aDevsStore = [];
        aDevsStore.push({"name": "local"})
        for (var i = 0; i < aDevs.length; i++) {
            aDevsStore.push({"name": (aDevs[i] + "").substr(0, 4)})
        }

        var states = Ext.create('Ext.data.Store', {
            fields: ['name'],
            data: aDevsStore
        });

// Create the combo box, attached to the states data store
        var win = Ext.create('Ext.window.Window', {
            title: 'Save as•••',
            frame: true,
            width: 280,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },

            items: [
                {
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'select file name',
                    store: states,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    autoSelect: false
                }
            ],

            buttons: [
                {
                    text: 'Ok', handler: function () {
                    var text = win.down("combobox").getValue();
                    if (text == null) {
                        Ext.Msg.alert('Info', 'Plase select file name.');
                        return;
                    }
                    saveXml(text);
                    saveGridpanelsConfigs(text);
                    win.close();
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]

        })


    }
});
function saveXml(text) {


    text = text || "1000";

    if (text.trim() == "") {
        Ext.Msg.alert('Exception', 'File name cannot null.');
        return;
    }
    // process text value and close...

    var sXmlNameSpace = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    var root = $("<root></root>");
    xmlAppendPlant(root)

    var datas = {};
    datas['fileName'] = "../" + text;
    datas['content'] = formatXml(sXmlNameSpace + root[0].outerHTML);
    datas['rw'] = "w";
    $.ajax({
        type: "POST",
        url: "resources/xmlRW.php",
        data: datas,
        success: function () {
            if (text == "1000") {
                Ext.toast({
                    html: 'Auto Save Successfully.',
                    title: 'Status',
                    //width: 200,
                    align: 'br'
                });
            } else {
                Ext.Msg.alert('Success', 'Saved file successfully.');
            }
        }
    });
}
function xmlAppendPlant(root) {
    var plants = getCurrentDrawPanelPlants();
    for (var i = 0; i < plants.length; i++) {
        var plant = $("<plant name='" + plants[i].name + "'></plant>");
        root.append(plant)
        plantAppendMasterNode(plant, i)
    }
}

function plantAppendMasterNode(plant, index) {
    var aGridpanels = getCurrentDrawPanelGirdPanels();
    var panels = getCurrentDrawPanelPlants();
    for (var i = 0; i < aGridpanels.length; i++) {
        if (aGridpanels[i].datas.plantId == panels[index].id) {
            plant.append(get_A_Master_node(aGridpanels[i], i));
        }
    }
}

function get_A_Master_node(gridpanel, index) {
    var masterNode = $(document.createElement("master_node"));
    var iType = gridpanel.datas.type;
    masterNode.attr("number", (index + 1));
    masterNode.append("<type>" + iType + "</type>");
    isPidSave(gridpanel, masterNode)
    var gridPanelItems = gridpanel.store.data.items;
    console.log(gridPanelItems)
    gridPanelItems = isModelFilter(gridPanelItems, masterNode, gridpanel);
    gridPanelItems = isKeyFilter(gridPanelItems, masterNode, gridpanel);
    var startIndex = 0;
    for (var i = 0; i < gridPanelItems.length; i++) {
        console.log(gridPanelItems[i]);
        if (gridPanelItems[i].data["name"] == "Out") {
            continue;
        }
        if (gridPanelItems[i].data["name"] == "Instance") {
            continue;
        }
        if (gridPanelItems[i].data["name"] == "model") {
            continue;
        }
        console.log(gridPanelItems[i])
        startIndex++;
        var name = gridPanelItems[i].data["name"];
        var value = gridPanelItems[i].data["value"];
        console.log(gridPanelItems[i].data.select)
        if (gridPanelItems[i].data['select']) {
            var select = gridPanelItems[i].data.select;
            for (var j = 0; j < select.length; j++) {
                if (select[j].name == value) {
                    value = select[j].value;
                }
            }
        }
        var slots = $("<slots number='" + startIndex + "'></slots>");
        var aGirdPanelIII = getStartGridPanelIndexAndItemIndex(gridpanel, i);//判断当前tr上的id是否有相应的线，有的话返回起点的坐标
        if (!aGirdPanelIII[0] && !aGirdPanelIII[1]) {
            slots.append("<default>" + value + "</default>")
        } else {
            slots.append($("<node>" + aGirdPanelIII[0] + "</node>"));
            slots.append($("<slot_number>" + aGirdPanelIII[1] + "</slot_number>"));
        }
        //masterNode.append(slots);

        if (iType == 1 || iType == 2 || iType == 4 || iType == 5) {
            console.log(slots.find("default"))
            if (slots.find("default").length != 0) {

            } else {
                masterNode.append(slots);
            }
        } else {
            masterNode.append(slots);
        }
        aGirdPanelIII = null;
    }
    return masterNode;
}


function isPidSave(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "67") {
        items = Ext.data.StoreManager.lookup("store" + gridpanel.id).data.items;
    } else {
        return;
    }
    console.log(items)
    masterNode.append("<P>" + items[0].data.value + "</P>")
    masterNode.append("<I>" + items[1].data.value + "</I>")
    masterNode.append("<D>" + items[2].data.value + "</D>")
    masterNode.append("<max_value>" + items[3].data.value + "</max_value>")
    masterNode.append("<min_value>" + items[4].data.value + "</min_value>")

}

function isKeyFilter(gridPanelItems, masterNode, gridpanel) {
    var name = gridPanelItems[1].data["name"];
    var value = gridPanelItems[1].data["value"];
    if (name == "Instance") {
        masterNode.append("<key>" + gridpanel.datas.value + "</key>")
        //gridPanelItems.shift();
        return gridPanelItems;
    }
    return gridPanelItems;
}
function isModelFilter(gridPanelItems, masterNode, gridpanel) {
    var name = gridPanelItems[0].data["name"];
    var value = gridPanelItems[0].data["value"];
    if (name == 'model') {// if (name != "Out" && name != "In") {
        var select = gridPanelItems[0].data.select;
        for (var i = 0; i < select.length; i++) {
            if (select[i].name == value) {
                value = select[i].value;
            }
        }

        masterNode.append("<model>" + value + "</model>")
        //gridPanelItems.shift()
        return gridPanelItems;
    }
    /*console.log(gridPanelItems[i].data["select"])

     if(gridPanelItems[i].data['select']){
     console.log(gridPanelItems[i])
     var select = gridPanelItems[i].data['select'];
     for(var i= 0 ;i<select.length;i++){
     console.log(select[i])
     if(select[i].name==name){
     value=select[i].value;
     }
     }
     }*/

    return gridPanelItems;
}


function getStartGridPanelIndexAndItemIndex(gridpanel, index) {
    /**
     * 一次只判断一个tr
     */
    console.log(gridpanel.el.dom.querySelectorAll(".x-grid-row")[index])
    //alert(index)
    console.log(gridpanel.el.dom.querySelectorAll(".x-grid-row"))
    var endTrId = gridpanel.el.dom.querySelectorAll(".x-grid-row")[index].id;
    var startTrId = getStartTrIdByEndTrId(endTrId);//通过结束id从所有连线信息中得到开始id
    var gridpanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < gridpanels.length; i++) {

        var trs = gridpanels[i].el.dom.querySelectorAll(".x-grid-row");
        var items = gridpanels[i].store.data.items;

        for (var j = 0; j < trs.length; j++) {
            //alert(trs[j].id+"  "+startTrId)
            if (trs[j].id == startTrId) {
                console.log(trs[j])
                var sn = j;
                console.log(items)
                if (items[0].data['name'] == "model") {
                    sn = j - 1
                }
                if (items[1].data['name'] == "Instance" & j > 0) {
                    sn = j - 1
                }
                return [i + 1, sn]
            }
        }

    }
    return [null, null]
}
function getStartTrIdByEndTrId(endTrId) {
    var datasArray = getCurrentDrawPanel().datas.datasArray;
    for (var i = 0; i < datasArray.length; i++) {
        for (o in datasArray[i]) {
            //lert(datasArray[i][o]+" "+o)
            console.log(datasArray)
            console.log(endTrId)
            if (o == endTrId) {
                return datasArray[i][o];
            }
        }
    }
}

/*
 function getStartGridPanelIndexAndItemIndex(gridpanel, index) {
 /!**
 *这个方法是拿到一个gridpanel 和 需要索引的 位置 index
 * 来找到 起点 对应的 gridpanel 和 位置 并返回
 *
 *!/
 var drawpanel = drawpanel || getCurrentDrawPanel();
 var trs = gridpanel.el.query(".x-grid-row");
 var node = null;
 var slot_number = null;
 var aPolylines = d3.select(drawpanel.el.dom).selectAll(".OkLine");
 aPolylines.each(function () {
 var trEndId = d3.select(this).attr("data-end");
 var trStartId = d3.select(this).attr("data-start");

 for (var i = index; i < trs.length; i++) {
 if (trs[i].id == trEndId) {
 var aGridpanels = getCurrentDrawPanelGirdPanels();

 for (var j = 0; j < aGridpanels.length; j++) {
 if (aGridpanels[j].el.getId(trStartId)) {
 node = j;
 var rows = aGridpanels[j].el.query(".x-grid-row");
 for (var k = 0; k < rows.length; k++) {
 if (rows[k].id == trStartId) {
 slot_number = k;
 return false;
 }
 }
 }
 }

 /!*Ext.each(aGridpanels, function (name, index, countriesItSelf) {
 if (name.el.getById(trStartId)) {
 node = index;
 Ext.each(name.el.query(".x-grid-row"), function (name, index) {
 console.log("index=" + index)
 if (name.id == trStartId) {
 slot_number = index;
 return false;
 }
 });
 }
 });*!/
 //console.log(trEndId+"   "+trStartId) //在这里查找起点的 panel
 console.log(aGridpanels[0])
 }
 }
 if (node && slot_number)
 return false;
 });
 return [node, slot_number];
 }
 */

function getCurrentDrawPanel() {
    var drawpanels = Ext.ComponentQuery.query("drawpanel");
    var drawpanel;
    for (var i = 0; i < drawpanels.length; i++) {
        if (!drawpanels[i].hidden && drawpanels[i].el) {
            //console.log(drawpanels[i])
            drawpanel = drawpanels[i];
        }
    }
    return drawpanel;
}
function getCurrentDrawPanelGirdPanels(drawpanel) {
    var drawpanel = drawpanel || getCurrentDrawPanel();
    var aGridpanels = [];
    var girdpanels = Ext.ComponentQuery.query("gridpanel", drawpanel);
    for (var i = 0; i < girdpanels.length; i++) {
        //console.log(girdpanels[i])
        //if (!girdpanels[i].hidden) {
        aGridpanels.push(girdpanels[i])
        //aGridpanels[i]=girdpanels[i]
        //}
    }
    return aGridpanels;
}


function addCurrentDrawPanelPlant(plant) {
    console.log(plant)
    var currentDrawPanel = getCurrentDrawPanel()
    var data = currentDrawPanel.datas.data;
    currentDrawPanel.datas.plants.push(plant);
    data.push({selected: plant.selected, name: plant.name});
    var store = Ext.data.StoreManager.lookup('store' + currentDrawPanel.getTitle());
    store.setData(data);
}

function delCurrentDrawPanelPlant(index) {
    getCurrentDrawPanel().datas.plants.splice(index, 1)
}
function setCurrentPlant(index) {
    //var plant = getCurrentDrawPanelPlantByIndex(index);
    //plant.selected = true;
    var plants = getCurrentDrawPanelPlants();
    for (var i = 0; i < plants.length; i++) {
        if (i == index) {
            plants[i].selected = true;
        } else {
            plants[i].selected = false;
        }
        updateCurrentDrawPanelPlant(plants[i], i)
    }

}

function getCurrentDrawPanelPlantByIndex(index) {
    return getCurrentDrawPanel().datas.plants[index]
}
function getCurrentDrawPanelPlants() {
    return getCurrentDrawPanel().datas.plants;
}
function selectPlant(plant) {
    var aTypeGrids = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < aTypeGrids.length; i++) {
        if (aTypeGrids[i].datas.plantId == plant.id) {
            console.log(aTypeGrids[i])
            aTypeGrids[i].show();
        } else {
            console.log(aTypeGrids[i])
            aTypeGrids[i].hide();
        }
    }

}
function getCurrentPlant() {
    var plants = getCurrentDrawPanelPlants();
    //console.log(plants)
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].selected) {
            //      console.log(plants[i])
            return plants[i];
        }
    }
    return false;
}
function updateCurrentDrawPanelPlant(plant, index) {
    getCurrentDrawPanel().datas.plants.splice(index, 1, plant);
}
/* var myMsg = Ext.create('Ext.window.MessageBox', {
 // set closeAction to 'destroy' if this instance is not
 // intended to be reused by the application
 closeAction: 'destroy'
 }).show({
 title: 'Custom MessageBox Instance',
 message: 'I can exist along with Ext.Msg'
 });
 */

