var hideCom;


Ext.define('svgxml.view.grid.TypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-typegrid',

    render1: function(th){
        var plant = getCurrentPlant();
        if (!plant) {

            Ext.Msg.alert("Exception", "please choose one plant.")
            //th.close()
            th.destroy()

            return;
        }
        
        th.getHeader().on({
            click: function () {
                console.log(this.getWidth() == 140)
                if (this.getWidth() == 140) {
                    th.animate({
                        to: {
                            width: (th.title.length * 13 < 140 ) ? 140 : th.title.length * 13
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                } else {
                    th.animate({
                        to: {
                            width: 140
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                }
            }
        })

    },
    girdviewready: function (th, eO) {

        if(th.datas.type==67){
            Ext.create('Ext.data.Store', {
                storeId:"store"+th.getId(),
                fields: ['name', 'value'],
                data: [
                    {'name': 'P', 'value': "10.0"},
                    {'name': 'I', 'value': "2.0"},
                    {'name': 'D', 'value': "0.0"},
                    {'name': 'Max', 'value': "100"},
                    {'name': 'Min', 'value': "0"}
                ]
            });
        };
        if(th.datas.type==56){
            //var typeGirdName = this.getTitle();
            var store = th.store//Ext.data.StoreManager.lookup("store" + _this.id);
           var win= Ext.create('Ext.window.Window', {
                title: 'logic Property',
                id: "win" + th.id,
                width: 420,
                height: 300,
                layout: 'border',
                listeners: {
                    beforeclose: function (th) {
                        win.hide()
                        return false
                    }
                },
                buttons: [
                    {
                        text: "Ok", handler: function (menu) {
                        //Ext.data.StoreManager.lookup("store" + _this.id).commitChanges();
                        store.commitChanges();
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.hide();
                    }
                    }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'right',
                    margin:0,
                    items: [
                        {
                            xtype: "component",
                            html: "Add solts"
                        }, {
                            xtype:"button",
                            text: "+", handler: function () {
                                if (store.data.length > 9) {
                                    Ext.Msg.alert('Info', 'Cannot add slot.');
                                    return
                                }
                                store.add({
                                    name: "In",
                                    delay: "0",
                                    time: "0",
                                    value: "0",
                                    time1: "0",
                                    time2: "0",
                                    time3: "0",
                                    time4: "0",
                                    time5: "0",
                                    time6: "0",
                                    time7: "0",
                                    time8: "0",
                                    time9: "0"
                                });
                                //_this.setStore(store)
                                //_this.store.commitChanges()
                                store.commitChanges()
                            }
                        }, {
                            xtype:"button",
                            text: "-", handler: function () {
                                if (store.data.length <= 3) {
                                    Ext.Msg.alert('Info', 'Cannot delete slot.');
                                    return
                                }
                                store.removeAt(store.data.length - 1)
                                store.commitChanges()
                            }
                        }, {xtype: "component", html: "Add list"}, {
                            xtype:"button",
                            text: "+", handler: function () {
                                var grid = win.down("grid");
                                var columns = grid.getColumns();

                                for (var i = 0; i < columns.length; i++) {
                                    if (columns[i].hidden) {
                                        console.log(columns[i])
                                        columns[i].show()
                                        joinRow0(grid)
                                        return;
                                    }
                                }
                                Ext.Msg.alert('Exception', 'Cannot add list.');
                                //console.log(grid.getViewModel())

                            }
                        }, {
                            xtype:"button",
                            text: "-", handler: function () {
                                var grid = win.down("grid");
                                var columns = grid.getColumns();
                                for (var i = columns.length - 1; i >= 5; i--) {
                                    if (!columns[i].hidden) {
                                        columns[i].hide()
                                        joinRow0(grid)
                                        return
                                    }
                                }
                                Ext.Msg.alert('Exception', 'Cannot delete list.');
                            }
                        }
                    ]
                }],
                items: {  // Let's put an empty grid in just to illustrate fit layout
                    region: "center",
                    xtype: 'logicgridpanel',
                    store: store
                }
            });
        }

        /*if(th.datas.type==56){
            Ext.create('Ext.data.Store', {
                storeId:"store"+th.getId(),
                fields: ['name', "delay","time",'value'],
                data: [
                    {delay:"0",time:"0",'name': 'Out', 'value': "0"},
                    {delay:"0",time:"0",'name': 'In', 'value': "0"},
                    {delay:"0",time:"0",'name': 'In', 'value': "0"}
                ]
            });
        }*/

        if(th.datas.plantId.length<2){
        var plant = getCurrentPlant()
        th.datas.plantId = plant.id
        }
        currentDrawPanelGridPanelsTrSetId();
        var oHead = th.getHeader().el.dom;
        oHead.onmousedown = function (e) {

            //console.log(e)
            th.data = {x: ( e.x - e.layerX), y: (e.y - e.layerY)}
        }
        oHead.oncontextmenu = function (e) {
            th.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY,
                    listeners: {
                        show: function (thi, eOpts) {
                            var title;
                            try {
                                title = getNameByType(thi.datas.type)
                            } catch (e) {
                                title = th.title;
                            }
                            //var title = th.title;
                            console.log(th.datas)
                            var isAddSlot = th.datas.isAddSlot;

                            if (isAddSlot) {
                                var addSlot = thi.getComponent("addSlot").on("click", thi.getController().addSlotclick, th);
                                addSlot.setDisabled(false);
                            }
                            thi.getComponent("LinkMark").setDisabled(false);
                            if (getCurrentDrawPanel().datas.LinkMarkTypeGrid) {
                                var linkform = thi.getComponent("LinkForm");
                                linkform.setDisabled(false);
                                linkform.setText("Link Form \"" + getCurrentDrawPanel().datas.LinkMarkTypeGrid.getTitle() + "\"")
                            }
                            isPidMenu(th, thi);
                            isLogicMenu(th,thi);
                            thi.getComponent("cut").setDisabled(false);
                            thi.getComponent("copy").setDisabled(false);
                            thi.getComponent("deplicate").setDisabled(false);
                            thi.getComponent("delete").setDisabled(false);
                        }
                    }
                })
            )
            return false;
            //console.log(arguments)
        };
    },

    girdmove: function (t, x, y, eOpts) {
        console.log(t.datas)
        drawlines(t.up("drawpanel"))
        //console.log(t.data.x)
        //console.log(t.data.y)
        if ((x < 0 || y < 0) & !t.getActiveAnimation()) {
            //console.log(x + " " + y)
            //t.setPagePosition(t.up().getX() + 10, t.up().getY() + 10, true)
            t.setPagePosition(t.data.x, t.data.y, true)
        }
    }
    ,
    render: function (th) {
        alert("render")

    }
    ,
    girditemdblclick: function (me, record, item, index, e, eopts) {
        console.log(arguments)
        if(record.data.name=="Out"){
            return ;
        }
        var win = Ext.create("Ext.window.Window", {
            title: "ChangeValue",
            width: 260,
            height: 150,
            layout: "fit",
            autoShow: true,
            listeners: {
                activate: function () {
                    // win.down("form").loadRecord(record);
                },
                render: function () {
                    //   win.down("form").loadRecord(record);
                },
                show: function (th) {
                    th.down("form").add({xtype: "textfield", name: "name", fieldLabel: "name"});
                    if(record.data.select){
                        var store = Ext.create('Ext.data.Store', {
                            fields: ['name'],
                            data: record.data.select
                        });
                        th.down("form").add({
                            xtype: "combobox",
                            name: "value",
                            fieldLabel: "type",
                            forceSelection: true,
                            store: store,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name'
                        });
                    }else{
                        th.down("form").add({xtype: "textfield", name: "value", fieldLabel: "type"});
                    }
                }
            },
            items: {
                xtype: "form",
                margin: 5,
                border: false,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 60
                }/*,
                 items: [
                 {xtype: "textfield", name: "name", fieldLabel: "type"},
                 /!*{ xtype: "numberfield", name: "age", fieldLabel: "年龄" ,maxValue: 3,  minValue: 0 },*!/
                 {xtype: "textfield", name: "value", fieldLabel: "value"}
                 ]*/
            },
            buttons: [
                {
                    text: "确认", handler: function () {
                    win.down("form").updateRecord();
                    record.commit();
                    win.close();
                }
                }
            ]
        });
        win.show();
        win.down("form").loadRecord(record);
        // console.log(arguments)
    }
    ,
    griditemclick: function (th) {

    }
    ,
    griditemmousedown: function (th, record, item, index, el, e, eOpts) {
        // console.log(arguments);
        console.log(th.up())
        console.log(arguments)
        console.log("鼠标按下")
    }
    ,
    griditemmouseleave: function () {
        console.log("鼠标移出")
    }
    ,
    griditemmouseenter: function (th, record, item, index, e, eOpts) {
        d3.select("#tempLineEnd").remove();
        initDrawLine(th.up("drawpanel"), th, record, item, index, e, eOpts)
    }
    ,
    griditemmouseup: function (th, record, item, index, e, eOpts) {

        th.datas = {"index": index}

        th.el.dom.oncontextmenu = function (eve) {
            return false;
        }
        if (e.button == 2) {
            th.up("typegrid").add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY,
                    listeners: {
                        show: function (thi, eOpts) {
                            d3.select(thi.el.dom).attr("data-targetid", d3.select(item).attr("data-targetid"));
                            if (record.data.name == "In") {
                                var delSlot = thi.getComponent("delSlot").on("click", thi.getController().delSlotclick, th);
                                delSlot.setDisabled(false);
                            }
                            var title = th.up("typegrid").title;
                            if (slotsJson[title].isAddSlot) {
                                var addSlot = thi.getComponent("addSlot").on("click", thi.getController().addSlotclick, th);
                                addSlot.setDisabled(false);
                            }
                            isPidMenu(th.up("typegrid"), thi)
                            isLogicMenu(th.up("typegrid"),thi);

                            thi.getComponent("cut").setDisabled(false);
                            thi.getComponent("copy").setDisabled(false);
                            thi.getComponent("deplicate").setDisabled(false);
                            thi.getComponent("delete").setDisabled(false);

                        }
                    }
                })
            )
        }
        console.log("鼠标抬起")
    }
    ,
    griditemcontextmenu: function (th, td, cellIndex, tr, rowIndex, e, eOpts) {
        alert("griditemcontextmenu")
    }
});
function isPidMenu(girdpanel, menu) {
    console.log(arguments)
    if (girdpanel.title == "pid") {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, girdpanel)
    }
}

function isLogicMenu(gridpanel,menu){
    if(gridpanel.datas.type==56){
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().logicPropertyClick, gridpanel)
    }
}


function currentDrawPanelGridPanelsTrSetId() {
    var aGridPanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < aGridPanels.length; i++) {
        var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");
        for (var j = 0; j < aRowsAll.length; j++) {
            //console.log("1"+aRowsAll[j].id+"1")
            //console.log(aRowsAll[j].length)
            if ($.trim(aRowsAll[j].id).length == 0) {
                //console.log(aRowsAll[j].id)
                //console.log(aRowsAll[j].id.length)
                //alert(aRowsAll[j].id)
                aRowsAll[j].id = "t" + Math.floor(Math.random() * 10000000000);
            }
        }
    }
}

function removeTemp() {
    d3.select("#tempCircle").remove()
    d3.select("#tempLineEnd").remove()
    d3.select("#tempLineStart").remove()
    d3.selectAll(".tempCircle").remove()
    d3.select("#tempLine").remove()

}
var CIRCLE_MIN_R = 8;
var CIRCLE_MAX_R = 15;
var JIANGE = 10;
var STROKEWIDTH_MAX = 10;
var STROKEWIDTH_MIN = 3;
var iDrawPanelLeft;
var iDrawPanelTop;
var STROKE_COLOR = "blue";
//带 data-targetid 的是td  data-targetid 标注的是目标的id
var sStartItemTrId;//鼠标按下后得到item下的tr的id


function initDrawLine(thi, th, record, item, index, e, eOpts) {
    //console.log(item.querySelector("div").innerHTML )
    var justDrawTempLine=thi.datas.justDrawTempLine;
    if(justDrawTempLine==true){
        return ;
    }
    if (item.querySelector("div").innerHTML == "mode") {
        return;
    }
    if (item.querySelector("div").innerHTML == "Instance") {
        return;
    }

    sStartItemTrId = item.querySelector("tr").id;
    console.log(arguments)
    var oDrawPanel = d3.select(thi.el.dom).select(".x-autocontainer-innerCt");
    var oSvg = oDrawPanel.select(".tempSVG");
    iDrawPanelLeft = thi.el.getLeft();
    iDrawPanelTop = thi.el.getTop();
    var eItem = Ext.get(item);
    var eItemWidth = eItem.getLeft() - iDrawPanelLeft + eItem.getWidth();
    var eItemHeight = eItem.getTop() - iDrawPanelTop + eItem.getHeight() / 2;

    //var aRowsAll = thi.el.dom.querySelectorAll(".x-grid-row");

   var  aRowsAll = getCanLinesRowsAll(th.up())
    function getCanLinesRowsAll(gridpanel){
        var typegrids = getCurrentDrawPanelGirdPanels()
        var sId = gridpanel.getId();
        var aRowsAll=[];
        console.log(typegrids.length)
        for(var i=0;i<typegrids.length;i++){
            if(typegrids[i].getId()==sId){
                typegrids.splice(i,1)
                break;
            }
        }

        console.log(typegrids.length)
        for(var i=0;i<typegrids.length;i++){
            var rows= typegrids[i].el.dom.querySelectorAll(".x-grid-row")
            for(var j=0;j<rows.length;j++){
                aRowsAll.push(rows[j])
            }
        }
        return aRowsAll;
    }

    console.log(aRowsAll)
    d3.select("#tempLineStart").remove();

    var tempLineStart = oSvg.append("rect").attr("x", eItemWidth).attr("y", eItemHeight).attr("id", "tempLineStart");
    var tempLineEnd = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "blue").attr("cx", eItemWidth + 10).attr("cy", eItemHeight).attr("id", "tempLineEnd");

    tempLineEnd[0][0].onmousedown = function () {
        thi.datas.justDrawTempLine=true;
        var _this = d3.select(this);

        for (var i = 0; i < aRowsAll.length; i++) {
            var left = Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft - 10;
            var top = Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);

            var columnid = d3.select(aRowsAll[i]).attr("id");
            var tempLineEnd;

            if (aRowsAll[i].querySelector("div").innerHTML != "Out" && aRowsAll[i].querySelector("div").innerHTML != "mode" && aRowsAll[i].querySelector("div").innerHTML != "Instance") {

                tempLineEnd = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "green").attr("cx", left).attr("cy", top).attr("class", "tempCircle").attr("columnid", columnid);

                tempLineEnd.on("mouseover", function () {
                    d3.select(this).attr("r", CIRCLE_MAX_R);
                });
                tempLineEnd.on("mouseout", function () {
                    d3.select(this).attr("fill", "green").attr("r", CIRCLE_MIN_R);
                });
                sStartItemTrId = item.querySelector("tr").id;
            }

        }

        document.onmousemove = function (e) {
            _this.attr("cx", e.clientX - iDrawPanelLeft - parseInt(tempLineEnd.attr("width") / 2));
            _this.attr("cy", e.clientY - iDrawPanelTop - parseInt(tempLineEnd.attr("height") / 2));
            console.log(document.onmousemove)
            drawTempline();
        };
        document.onmouseup = function (e) {
            removeTemp();
            thi.datas.justDrawTempLine=false;
            document.onmousemove = null;
            document.onmouseup = null;
            console.log(document.onmousemove)
            console.log(e.target.tagName + "   " + sStartItemTrId)
            if (e.target.tagName == "circle") {
                sEndItemTrId = d3.select(e.target).attr("columnid");
                console.log(thi)
                thi.datas.datasArray.push(generateJson(sEndItemTrId, sStartItemTrId))
                console.log(thi.datas.datasArray);
                d3.select(item).attr("data-targetid", d3.select(e.target).attr("columnid"));
                drawlines(thi);
            } else {
                //console.log(datasArray.pop())
                return;
            }
        };
    };

    function drawTempline() {
        d3.select("#tempLine").remove();
        var svg = d3.select(".tempSVG");
        var start = d3.select("#tempLineStart");
        var end = d3.select("#tempLineEnd");
        var endcx = end.attr("cx");
        var endcy = end.attr("cy");
        var y1 = parseInt(start.attr("x")) + iDrawPanelLeft;
        var x1 = parseInt(start.attr("y")) + iDrawPanelTop;
        var x2 = parseInt(end.attr("cx")) + iDrawPanelLeft;
        var y2 = parseInt(end.attr("cy")) + iDrawPanelTop;

        //console.log(x1 + " " + y1 + " " + x2 + " " + y2)
        var a = (x1 + CIRCLE_MIN_R) - (x2 + CIRCLE_MIN_R);
        var b = (y1 + CIRCLE_MIN_R) - (y2 + CIRCLE_MIN_R);
        //var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        var cA = Math.atan2(a, b);
        var x = Math.sin(cA) * CIRCLE_MIN_R;
        var y = Math.cos(cA) * CIRCLE_MIN_R;

        svg.append("line").attr("id", "tempLine").attr('stroke', "blue").attr("stroke-width", "1").attr("x1", parseInt(endcx) + x).attr("y1", parseInt(endcy) + y).attr("x2", start.attr("x")).attr("y2", start.attr("y"));


    }

}


