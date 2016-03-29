Ext.define('svgxml.view.main.toolbar.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-toolbar-toptoolbar',


    saveXmlClick: function () {
        var sXmlNameSpace = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
        var root = $("<root></root>");
        var aGridpanels = getCurrentDrwPanelGirdPanels();
        for (var i = 0; i < aGridpanels.length; i++) {
            root.append(get_A_Master_node(aGridpanels[i], i));
        }
        var datas= {};
        datas['fileName']="test.xml";
        datas['content'] =sXmlNameSpace+ root[0].outerHTML;
        datas['rw']="w";
        $.ajax({
            type: "POST",
            url: "xmlRW.php",
            data: datas,
            success: function(msg){
            console.log(msg);
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
    for (var i = 0; i < gridPanelItems.length; i++) {
        var name = gridPanelItems[i].data["name"];
        var value = gridPanelItems[i].data["value"];
        var slots = $("<slots></slots>");
        var aGirdPanelIII = getStartGridPanelIndexAndItemIndex(gridpanel,i);
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

function getStartGridPanelIndexAndItemIndex(gridpanel,index) {
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
                            console.log("index="+index)
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