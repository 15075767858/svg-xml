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
            title: 'Open Xml',
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
                    for (var i = 0; i < masterNodes.length; i++) {
                        var type = masterNodes[i].getElementsByTagName("type")[0].innerHTML;

                        var typeName;
                        for (slot in  slotsJson) {
                            if (slotsJson[slot].type == type) {
                                typeName = slot;
                            }
                        }
                        var store = Ext.create(typeName, {
                            data: slotsJson[typeName].initData
                        });
                        drawPanel.add(Ext.create("svgxml.view.grid.TypeGrid", {
                            title: typeName,
                            store: store,
                            x: 0,
                            y: 0,
                            icon: "img/SVG/" + typeName + ".svg"
                        }));
                        win.close();

                    }
                    /*Ext.MessageBox.show({
                     title : '请等待',
                     msg : '文件正在上传...',
                     progressText : '',
                     width : 300,
                     progress : true,
                     closable : false,
                     animEl : 'loding'
                     });
                     form.getForm().submit({
                     url : 'Action/UpdateLoad',
                     method : 'POST',
                     success : function(form, action) {
                     Ext.Msg.alert('Message',
                     action.result.success);
                     win.close();
                     },
                     failure : function() {
                     Ext.Msg.alert('Error',
                     'File upload failure.');
                     }
                     })*/


                }
            }, {
                text: 'Close',
                handler: function () {
                    win.close();
                }
            }]
        }).show();


        /*if (form.form.isValid()) {
         if(Ext.getCmp('userfile').getValue() == ''){
         Ext.Msg.alert('错误','请选择你要上传的文件');
         return;
         }
         Ext.MessageBox.show({
         title : '请等待',
         msg : '文件正在上传...',
         progressText : '',
         width : 300,
         progress : true,
         closable : false,
         animEl : 'loding'
         });
         form.getForm().submit({
         url : 'Action/UpdateLoad',
         method : 'POST',
         success : function(form, action) {
         Ext.Msg.alert('Message',
         action.result.success);
         win.close();
         },
         failure : function() {
         Ext.Msg.alert('Error',
         'File upload failure.');
         }
         })
         }*/


    },

    saveXmlClick: function () {

        Ext.Msg.prompt('Save Xml', 'Please input file name:', function (btn, text) {
            if (btn == 'ok') {
                if (text.trim() == "") {
                    Ext.Msg.alert('Exception', 'File name cannot null.');
                    return;
                }
                // process text value and close...
                var sXmlNameSpace = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
                var root = $("<root></root>");
                var aGridpanels = getCurrentDrwPanelGirdPanels();
                for (var i = 0; i < aGridpanels.length; i++) {
                    root.append(get_A_Master_node(aGridpanels[i], i));
                }
                var datas = {};
                datas['fileName'] = text + ".xml";
                datas['content'] = formatXml(sXmlNameSpace + root[0].outerHTML);
                datas['rw'] = "w";
                $.ajax({
                    type: "POST",
                    url: "xmlRW.php",
                    data: datas,
                    success: function () {
                        Ext.Msg.alert('Success', 'Saved file successfully.');

                    }
                });

            }
        });


    }
});


function get_A_Master_node(gridpanel, index) {

    var masterNode = $(document.createElement("master_node"));

    var iType = slotsJson[gridpanel.title].type;
    masterNode.append("<number>" + (index + 1) + "</number>");
    masterNode.append("<type>" + iType + "</type>");
    var gridPanelItems = gridpanel.getStore().getData().items;
    gridPanelItems = isModelFilter(gridPanelItems, masterNode);
    console.log(gridPanelItems)
    for (var i = 0; i < gridPanelItems.length; i++) {
        if (gridPanelItems[i].data["name"] == "Out") {
            continue;
        }
        var name = gridPanelItems[i].data["name"];
        var value = gridPanelItems[i].data["value"];
        var slots = $("<slots number='" + i + "'></slots>");
        var aGirdPanelIII = getStartGridPanelIndexAndItemIndex(gridpanel, i);
        if (!aGirdPanelIII[0] && !aGirdPanelIII[1]) {
            slots.append("<default>" + value + "</default>")
        } else {
            slots.append($("<node>" + aGirdPanelIII[0] + "</node>"));
            slots.append($("<slot_number>" + aGirdPanelIII[1] + "</slot_number>"));
        }
        masterNode.append(slots);
        aGirdPanelIII = null;
    }
    return masterNode;
}
function isModelFilter(gridPanelItems, masterNode) {
    var name = gridPanelItems[0].data["name"];
    var value = gridPanelItems[0].data["value"];
    if (name != "Out" && name != "In") {
        masterNode.append("<model>" + value + "</model>")
        gridPanelItems.shift()
        return gridPanelItems;
    }
    return gridPanelItems;
}

function getStartGridPanelIndexAndItemIndex(gridpanel, index) {
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
                var aGridpanels = getCurrentDrwPanelGirdPanels();
                Ext.each(aGridpanels, function (name, index, countriesItSelf) {
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
                });
                //console.log(trEndId+"   "+trStartId) //在这里查找起点的 panel
            }
        }
        if (node && slot_number)
            return false;
        //console.log("node="+node)
        //console.log("slot_number="+slot_number)

    });
    return [node, slot_number];
}

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
function getCurrentDrwPanelGirdPanels(drawpanel) {
    var drawpanel = drawpanel || getCurrentDrawPanel();
    var aGridpanels = [];
    var girdpanels = Ext.ComponentQuery.query("gridpanel", drawpanel);
    for (var i = 0; i < girdpanels.length; i++) {
        if (!girdpanels[i].hidden) {
            aGridpanels.push(girdpanels[i])
        }
    }
    return aGridpanels;
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


String.prototype.removeLineEnd = function () {
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
}
function formatXml(text) {
    //去掉多余的空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
            return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
        }).replace(/>\s*?</g, ">\n<");

    //把注释编码
    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        var ret = '<!--' + escape(text) + '-->';
        //alert(ret);
        return ret;
    }).replace(/\r/g, '\n');

    //调整格式
    var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    var nodeStack = [];
    var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin == '!') {
            prefix = getPrefix(nodeStack.length);
        }
        else {
            if (isBegin != '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            }
            else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }

        }
        var ret = '\n' + prefix + all;
        return ret;
    });

    var prefixSpace = -1;
    var outputText = output.substring(1);
    //alert(outputText);

    //把注释还原并解码，调格式
    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if (prefix.charAt(0) == '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
        //alert(ret);
        return ret;
    });

    return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}
function getPrefix(prefixIndex) {
    var span = '    ';
    var output = [];
    for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }

    return output.join('');
}