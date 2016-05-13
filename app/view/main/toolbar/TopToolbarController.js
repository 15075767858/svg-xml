Ext.define('svgxml.view.main.toolbar.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-toolbar-toptoolbar',
    newClick: function () {

        var tabpanel = Ext.getCmp("frametab_drawpanel");
        var drawpanels = Ext.ComponentQuery.query("drawpanel");
        for (var i = 0; i < drawpanels.length; i++) {
            if (drawpanels[i].title == "1000") {
                drawpanels[i].close();
            }
            drawpanels[i].close()
        }
        removeFile("../1000");
        removeFile("../1000.json");
        tabpanel.add(Ext.create("svgxml.view.tab.DrawPanel", {
            title: "1000"
        }));
        delayToast("Status", 'New file successfully..', 1000);
    },

    openXmlClick1: function () {

        var aDevNames = getDevInfoFileNames();
        var win = Ext.create('Ext.window.Window', {
            title: 'Open •••',
            frame: true,
            width: 310,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'select file name',
                    store: aDevNames,
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
                    win.close();
                    Ext.Ajax.request({
                        url: "resources/xmlRW.php",
                        async: false,
                        params: {
                            fileName: "devsinfo/" + text,
                            rw: "r"
                        },
                        success: function (response) {
                            //var ojsonstr = response.responseText

                            var tabpanel = Ext.getCmp("frametab_drawpanel");
                            var drawpanels = Ext.ComponentQuery.query("drawpanel");
                            for (var i = 0; i < drawpanels.length; i++) {
                                if (drawpanels[i].title == text) {
                                    tabpanel.setActiveTab(drawpanels[i].id);
                                    return;
                                }
                                drawpanels[i].close()
                            }

                            var drawpanel = Ext.create("svgxml.view.tab.DrawPanel", {
                                title: text
                            })
                            //console.log(tabpanel.items)
                            tabpanel.add(drawpanel)
                            tabpanel.setActiveTab(drawpanel.id);
                        }
                    })
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
    },
    saveAsClick: function () {
        var states = getDevNamesAllDataStore(true)
// Create the combo box, attached to the states data store
        var win = Ext.create('Ext.window.Window', {
            title: 'Save as•••',
            frame: true,
            width: 310,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },

            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'devic Instance',
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
    },
    downloadClick: function () {

        var data;
        Ext.Ajax.request({
            url: "resources/test3.php",
            async: false,
            params: {},
            success: function (response) {
                var text = response.responseText;
                data = Ext.decode(text)
            }
        })

        var win = Ext.create('Ext.window.Window', {
            title: 'Download •••',
            frame: true,
            width: 310,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'devic name',
                    store: data,
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
                    win.close();
                    filePublish("9999.8.*", "9999998\r\nSend_File\r\n" + text);
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })

    },
    uploadClick: function () {

        var store = getDevNamesAllDataStore();
        var win = Ext.create('Ext.window.Window', {
            title: 'Upload •••',
            frame: true,
            width: 310,
            bodyPadding: 10,
            autoShow: true,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    margin: 10,
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'select file name',
                    store: store,
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
                    win.close();
                    filePublish("9999.8.*", "9999998\r\nRead_File\r\n" + text);
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })
    },
    backupClick: function () {
        var fileNames = getDevInfoFileNames()
        var namesJsonArr = [];
        for (var i = 0; i < fileNames.length; i++) {
            namesJsonArr.push({name: fileNames[i]})
        }
        var win = Ext.create("Ext.window.Window", {
            title: "Backup •••",
            frame: true,
            width: 310,
            bodyPadding: 10,
            autoShow: true,
            items: {
                xtype: "grid",
                selModel: {
                    mode: "SIMPLE",
                    selType: 'checkboxmodel'
                },
                store: Ext.create("Ext.data.Store", {
                    fields: [
                        "name"
                    ],
                    data: namesJsonArr
                }),
                columns: [
                    {text: "File Name", dataIndex: "name", flex: 1}
                ],
                listeners: {
                    select: function () {
                        console.log(arguments)
                    },
                    selectionchange: function () {
                        console.log(arguments)
                    }
                }
            },
            buttons: [{
                text: 'Select Path',
                handler: function () {

                    var grid = this.up("window").down("grid")
                    var records = grid.getSelection();
                    console.log(records);
                    var fileNames = "";
                    if (records.length == 0) {
                        Ext.Msg.alert('Status', 'Select a file please.');
                        return;
                    }
                    Ext.MessageBox.progress('please wait', {msg: 'Server Ready ...'});
                    for (var i = 0; i < records.length; i++) {
                        Ext.MessageBox.updateProgress(i + 1 / records.length + 1, 'The server is preparing for the ' + (i + 1));
                        fileNames += records[i].data.name + ",";
                    }

                    setTimeout(function () {
                        Ext.MessageBox.updateProgress(1 / 1, 'The server is preparing for the ' + (records.length ));
                        setTimeout(function () {
                            location.href = "resources/FileUD.php?par=downfile&filenames=" + fileNames.substr(0, fileNames.length - 1);
                            Ext.MessageBox.close();
                            win.close();
                        }, 500)
                    }, 1000)

                }
            }]
        })
    },
    restorClick: function () {
        /*     var win= Ext.create("Ext.window.Window", {
         title: "Restor •••",
         frame: true,
         width: 310,
         bodyPadding: 10,
         autoShow: true,
         items:{
         xtype: 'filefield',
         name: 'photo',
         fieldLabel: 'Photo',
         labelWidth: 50,
         msgTarget: 'side',
         allowBlank: false,
         anchor: '100%',
         buttonText: 'Select Photo...'

         }  ,
         buttons: [{
         text: 'Select Path',
         handler: function () {



         var grid = this.up("window").down("grid")
         var records = grid.getSelection();


         }
         }]
         })*/
    }
});

function filePublish(key, value) {
    Ext.Ajax.request({
        url: "resources/test2.php",
        method: "GET",
        async: false,
        params: {
            par: "filePublish",
            key: key,
            value: value
        },
        success: function (response) {
            var text = response.responseText;
            if (text == 1) {
                delayToast('Success', 'Publish Ok.', 0)
            } else if (text == 2 || text == 3) {
                Ext.Msg.alert('Info', 'Please download later.');
            }
        }
    })
}
function devPublish(key, value, success) {

    Ext.Ajax.request({
        url: "resources/test2.php",
        method: "GET",
        async: false,
        params: {
            par: "devPublish",
            key: key,
            value: value
        },
        success: success || function (response) {
            var text = response.responseText;
            if (text == 1) {
                delayToast('Success', 'Publish Ok.', 0)
            } else {
                //  Ext.Msg.alert('Info', 'Please download later.');
            }
        }
    })

}
function saveXml(text) {
    text = text || "1000";
    var fName = text;
    if (text == "local") {
        text = "local.xml"
    }
    if (text != "1000") {
        text = "../../../" + text;
    }
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
    datas['content'] = replacePID(formatXml(sXmlNameSpace + root[0].outerHTML));
    //console.log($.parseXML(formatXml(sXmlNameSpace + root[0].outerHTML)).toXMLString())
    function replacePID(text) {
        text = text.replaceAll("<p>", "<P>");
        text = text.replaceAll("</p>", "</P>");
        text = text.replaceAll("<i>", "<I>");
        text = text.replaceAll("</i>", "</I>");
        text = text.replaceAll("<d>", "<D>");
        text = text.replaceAll("</d>", "</D>");
        return text;
    }

    datas['rw'] = "w";
    $.ajax({
        type: "POST",
        url: "resources/xmlRW.php",
        data: datas,
        success: function () {
            delayToast("Status", "Saved file " + fName + " successfully.", 0);

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
    isPidSave(gridpanel, masterNode);

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
        if (gridPanelItems[i].data["name"] == "mode") {
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
        masterNode.append(slots);

        /*if (iType == 1 || iType == 2 || iType == 4 || iType == 5) {
            console.log(slots.find("default"))
            if (slots.find("default").length != 0) {

            } else {
                masterNode.append(slots);
            }
        } else {
            masterNode.append(slots);
        }*/
        aGirdPanelIII = null;
    }
    isLogic(gridpanel, masterNode)
    return masterNode;
}
function isLogic(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "56") {
        console.log(gridpanel)
        items = gridpanel.store.data.items;
    } else {
        return;
    }
    var times = ["delay", "time", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"];
    var columns = Ext.getCmp("win" + gridpanel.id).down("grid").getColumns()
    var index;
    for (var i = 0; i < columns.length; i++) {
        console.log(columns[i])
    }
    for (var i = 3; i < columns.length; i++) {
        if (columns[i].hidden) {
            index = i - 2;
            break;
        }
        index = 10;
    }

    for (var i = 0; i < index; i++) {
        var list = $("<list number=" + i + "></list>")
        masterNode.append(list)
        for (var j = 1; j < items.length; j++) {
            var data = items[j].data;
            var ivalue = data[times[i]];
            if (ivalue == "-") {
                ivalue = 2;
            }
            list.append("<default number=" + (j - 1) + ">" + ivalue + "</default>")
        }
    }
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
    masterNode.append("<extime>" + items[3].data.value + "</extime>")
    masterNode.append("<max_value>" + items[4].data.value + "</max_value>")
    masterNode.append("<min_value>" + items[5].data.value + "</min_value>")

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
    if (name == 'mode') {// if (name != "Out" && name != "In") {
        var select = gridPanelItems[0].data.select;
        for (var i = 0; i < select.length; i++) {
            if (select[i].name == value) {
                value = select[i].value;
            }
        }
        masterNode.append("<mode>" + value + "</mode>")
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
                if (items[0].data['name'] == "mode") {
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

function getCurrentPlantGridPanles(plant) {
    var curPlantGridPanelArr = [];
    var gridPanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < gridPanels.length; i++) {
        if (plant.id == gridPanels[i].datas.plantId) {
            curPlantGridPanelArr.push(gridPanels[i])
        }
    }
    return curPlantGridPanelArr;
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
function removeFile(fileName) {
    Ext.Ajax.request({
        url: "resources/delFile.php?fileName=" + fileName,
        async: false,
        /*params: {
         fileName:fileName
         },*/
        success: function (response) {
            var text = response.responseText;
            if (text) {
                delayToast("Status", 'Server delete file successfully..', 0)
            }
        }
    });
}