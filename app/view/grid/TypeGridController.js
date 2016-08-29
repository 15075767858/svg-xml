var hideCom;


Ext.define('svgxml.view.grid.TypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-typegrid',

    render1: function (th) {
        var plant = getCurrentPlant();
        if (!plant) {
            Ext.Msg.alert("Exception", "please choose one plant.")
            //th.close()
            th.destroy()
            return;
        }

        var gridWidth = 90;
        th.getHeader().on({
            click: function () {
                console.log(this.getWidth() == gridWidth)
                var curGridWidth = this.getWidth();
                var setWidth;
                if (th.title.length * 13 > 130) {
                    setWidth = th.title.length * 13
                } else {
                    setWidth = 130
                }
                if (this.getWidth() == gridWidth) {
                    th.animate({
                        to: {
                            //width: (th.title.length * 13 < gridWidth ) ? gridWidth : th.title.length * 13
                            width: (curGridWidth < setWidth ) ? setWidth : gridWidth
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                } else {
                    th.animate({
                        to: {
                            width: gridWidth
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                }
            }
        })

    },
    girdviewready: function (panel, eO) {


        //if (panel.datas.type < 10) {
        //console.info(th.store.data.item[1].data.value)
        //console.info(th.datas.value.substr(5,6))
        //console.info(th.store)
        //th.store.data.items[1].data.value=th.datas.value.substr(5,6)
        //th.store.commitChanges();
        //console.info(th.store.items)
        /*panel.store.addListener("beginupdate",function(){
         setTimeout(function(){
         },500)
         })*/
        //}
        if (panel.datas.type == 67) {
            console.log(panel)

            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {'name': 'P', 'value': "15"},
                    {'name': 'I', 'value': "0.1"},
                    {'name': 'D', 'value': "0.01"},
                    {'name': 'Extime', 'value': "40"},
                    {'name': 'Max', 'value': "100"},
                    {'name': 'Min', 'value': "0"}
                ], listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;


        if (panel.datas.type == 74) {
            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {name: "Empirical coefficient(K)", value: "0.7069"},
                    {name: "Pipe diameter(D)", value: "0.63"}
                ],
                listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;
        if (panel.datas.type == 75) {
            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {'name': 'In min', 'value': "0"},
                    {'name': 'In max', 'value': "100"},
                    {'name': 'out min', 'value': "20"},
                    {'name': 'out max', 'value': "400"}
                ],
                listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;

        if (panel.datas.type == "56") {
            //var typeGirdName = this.getTitle();
            var store = panel.store//Ext.data.StoreManager.lookup("store" + _this.id);

            store.addListener("beginupdate", function () {
                var gridheight = Ext.get(panel.body.dom.querySelector(".x-grid-item-container")).getHeight() + panel.header.getHeight()
                if (panel.getHeight() != gridheight) {
                    panel.setHeight(gridheight)
                }
            })
            var win = Ext.create('Ext.window.Window', {
                title: 'logic Property',
                id: "win" + panel.id,
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
                        //store.commitChanges();
                        delayToast('Status', 'Changes saved successfully.');
                        win.hide();
                    }
                    }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'right',
                    margin: 0,
                    items: [
                        {
                            xtype: "component",
                            html: "Add solts"
                        }, {
                            xtype: "button",
                            text: "+", handler: function () {
                                var store = panel.getStore();
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
                                var grid = win.down("grid");
                                joinRow0(grid)
                            }
                        }, {
                            xtype: "button",
                            text: "-", handler: function () {
                                if (store.data.length <= 2) {
                                    Ext.Msg.alert('Info', 'Cannot delete slot.');
                                    return
                                }

                                store.removeAt(store.data.length - 1)
                                var grid = win.down("grid");
                                joinRow0(grid)
                                //store.commitChanges()
                            }
                        }, {xtype: "component", html: "Add list"}, {
                            xtype: "button",
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
                            xtype: "button",
                            text: "-", handler: function () {
                                var grid = win.down("grid");
                                var columns = grid.getColumns();
                                for (var i = columns.length - 1; i >= 4; i--) {
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

        //if (!panel.datas.plantId.length < 2) {
        if (!panel.datas.plantId) {
            var plant = getCurrentPlant()
            panel.datas.plantId = plant.id
        }
        currentDrawPanelGridPanelsTrSetId();
        var oHead = panel.getHeader().el.dom;
        oHead.onmousedown = function (e) {

            //console.log(e)
            //panel.data = {x: ( e.x - e.layerX), y: (e.y - e.layerY)}
            panel.data = {x: panel.getX(), y:panel.getY()}
        }
        oHead.oncontextmenu = function (e) {

            panel.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY,
                    listeners: {
                        show: function (menu, eOpts) {
                            var isAddSlot = panel.datas.isAddSlot;
                            if (isAddSlot) {
                                var addSlot = menu.getComponent("addSlot").on("click", menu.getController().addSlotclick, panel);
                                addSlot.setDisabled(false);
                            }
                            menu.getComponent("LinkMark").setDisabled(false);
                            if (getCurrentDrawPanel().datas.LinkMarkTypeGrid) {
                                var linkform = menu.getComponent("LinkForm");
                                linkform.setDisabled(false);
                                linkform.setText("Link Form \"" + getCurrentDrawPanel().datas.LinkMarkTypeGrid.getTitle() + "\"")
                            }
                            changeTitle(panel, menu);
                            isPidMenu(panel, menu);
                            isLogicMenu(panel, menu);
                            isSCFMMenu(panel, menu);
                            isScaleMenu(panel, menu);
                            menu.getComponent("cut").setDisabled(false);
                            menu.getComponent("copy").setDisabled(false);
                            menu.getComponent("deplicate").setDisabled(false);
                            menu.getComponent("delete").setDisabled(false);
                        }
                    }
                })
            )
            return false;
            //console.log(arguments)
        };
    },

    girdmove: function (t, x, y, eOpts) {

        console.log(arguments)

        /*if (!t.isAni) {
            drawlines(t.up("drawpanel"))
        }*/
       var grids =  getCurrentPlantGridPanles(getCurrentPlant())
        for(var i=0;i<grids.length;i++){
            if(t.id==grids[i].id){
                continue
            }
            var isColls = isCollsionWithRect(t,grids[i]);
            if(isColls){
                //t.setX(t.data.x)
                //t.setY(t.data.y)
                //t.x= t.data.x
                //t.y= t.data.y
                t.setPagePosition(t.data.x+=5, t.data.y+=5, false)
            }
        }
        if ((x < 0 || y < 0) & !t.getActiveAnimation()) {
            t.setPagePosition(t.data.x+=5, t.data.y+=5, false)
            //t.setX(t.data.x)
            //t.setY(t.data.y)
           // t.x= t.data.x
           // t.y= t.data.y
        }
        drawlines();
       function isCollsionWithRect(data1,data2) {

           var x1=data1.getX();
           var y1=data1.getY();
           var w1=data1.getWidth();
           var h1=data1.getHeight();
           var x2=data2.getX();
           var y2=data2.getY();
           var w2=data2.getWidth();
           var h2=data2.getHeight();

            if (x1 >= x2 && x1 >= x2 + w2) {
                return false;
            } else if (x1 <= x2 && x1 + w1 <= x2) {
                return false;
            } else if (y1 >= y2 && y1 >= y2 + h2) {
                return false;
            } else if (y1 <= y2 && y1 + h1 <= y2) {
                return false;
            }
            return true;
        }
    }
    ,
    render: function (th) {
        alert("render")
    }
    ,
    griditemclick: function (me) {
        console.log(arguments)
        console.info(this.index);
    },
    girditemdblclick: function (me, record, item, index, e, eopts) {
        console.log(arguments)
        if (record.data.name == "Out") {
            return;
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
                    th.down("form").add({xtype: "textfield", name: "name", fieldLabel: "name", editable: false});
                    if (record.data.select) {
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
                            editable: false,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name'
                        });
                    } else {
                        th.down("form").add({xtype: "textfield", name: "value", fieldLabel: "value"});
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
                }
                /*,
                 items: [
                 {xtype: "textfield", name: "name", fieldLabel: "type"},
                 /!*{ xtype: "numberfield", name: "age", fieldLabel: "年龄" ,maxValue: 3,  minValue: 0 },*!/
                 {xtype: "textfield", name: "value", fieldLabel: "value"}
                 ]*/
            },
            buttons: [
                {
                    text: "OK", handler: function () {
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

    griditemmousedown: function (th, record, item, index, el, e, eOpts) {
        /*console.log(th.up())
         console.log(arguments)*/
        console.log("鼠标按下")
    }
    ,
    griditemmouseleave: function () {
        console.log("鼠标移出")
    }
    ,
    griditemmouseenter: function (th, record, item, index, e, eOpts) {
        //console.log(arguments)
        /*
         Ext.tip.QuickTipManager.register({
         target:th.id,
         title:th.index,
         text:th.index,
         width:100,
         height:100
         })*/

        d3.select("#tempLineEnd").remove();
        initDrawLine(th.up("drawpanel"), th, record, item, index, e, eOpts)
    }
    ,
    griditemmouseup: function (item, record, item, index, e, eOpts) {
        console.log(this)
        var me = this.view;
        console.log(arguments)
        //me.datas.index = index// = {"index": index}

        me.el.dom.oncontextmenu = function (eve) {
            return false;
        }
        if (e.button == 2) {
            me.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 10,
                    y: e.pageY + 10,
                    listeners: {
                        show: function (menu, eOpts) {
                            var gridTitle = me.datas.title || getNameByType(me.datas.type);

                            d3.select(menu.el.dom).attr("data-targetid", d3.select(item).attr("data-targetid"));
                            if (record.data.name == "In") {

                                if (me.store.data.length > slotsJson[gridTitle].initData().length) {
                                    var delSlot = menu.getComponent("delSlot").on("click", menu.getController().delSlotclick, me);
                                    delSlot.setDisabled(false);
                                }
                            }
                            if (me.datas.type > 10) {
                                var title = gridTitle;
                                if (slotsJson[title].isAddSlot) {
                                    var addSlot = menu.getComponent("addSlot").on("click", menu.getController().addSlotclick, me);
                                    addSlot.setDisabled(false);
                                }
                            }
                            isPidMenu(me, menu);
                            isLogicMenu(me, menu);
                            isSCFMMenu(me, menu);
                            isScaleMenu(me, menu);
                            menu.getComponent("cut").setDisabled(false);
                            menu.getComponent("copy").setDisabled(false);
                            menu.getComponent("deplicate").setDisabled(false);
                            menu.getComponent("delete").setDisabled(false);

                        }
                    }
                })
            )
        }
        console.log("鼠标抬起")
        e.stopEvent()
        e.stopPropagation()
    }
    ,
    griditemcontextmenu: function (th, td, cellIndex, tr, rowIndex, e, eOpts) {
        alert("griditemcontextmenu")
    }
});

function changeTitle(girdpanel, menu) {
    if (girdpanel.datas.type > 6) {
        menu.getComponent("Rename").setDisabled(false);
    }
}

function isScaleMenu(girdpanel, menu) {
    console.log(arguments)

    if (girdpanel.datas.type == 75) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, girdpanel)
    }
}
function isSCFMMenu(girdpanel, menu) {
    console.log(arguments)
    if (girdpanel.datas.type == 67) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, girdpanel)
    }
}

function isLogicMenu(gridpanel, menu) {
    if (gridpanel.datas.type == 56) {
        //var addSlot = menu.getComponent("addSlot").setDisabled(true);
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().logicPropertyClick, gridpanel)
    }
}
function isPidMenu(girdpanel, menu) {
    console.log(arguments)
    if (girdpanel.datas.type == 74) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().SCFMPropertyClick, girdpanel)
    }
}


function currentDrawPanelGridPanelsTrSetId() {
    var aGridPanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < aGridPanels.length; i++) {
        var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");

        for (var j = 0; j < aRowsAll.length; j++) {
            //console.log("1"+aRowsAll[j].id+"1")
            //console.log(aRowsAll[j].length)
            var trId = $.trim(aRowsAll[j].id);
            if (trId.length == 0 || trId == undefined || trId == "undefined" || trId.substr(0, 1) != "t") {
                //console.log(aRowsAll[j].id)
                //console.log(aRowsAll[j].id.length)
                //alert(aRowsAll[j].id)
                //aRowsAll[j].id = "t" + Math.floor(Math.random() * 10000000000);
                var id = generateTrId();
//                console.log(id)
                aRowsAll[j].id = id
            }
        }
    }
}

function generateTrId() {

    var id = "t" + Math.floor(Math.random() * 10000000000);
    var dom = document.getElementById(id);
    if (dom) {
        id = generateTrId()
    }

    return id;
}

function gridPanelsTrIdAddRandom(aGridPanels, randomnumber) {
    var drawpanel = getCurrentDrawPanel()
    var datasArray = drawpanel.datas.datasArray
    console.log(datasArray);
    var newDatasArray = []
    for (var i = 0; i < datasArray.length; i++) {
        var ojson = {};
        for (okey in datasArray[i]) {
            var skey = idAddNumber(okey, randomnumber)
            console.log(okey)
            var svalue = idAddNumber(datasArray[i][okey], randomnumber)
            ojson[skey] = svalue
            console.log(ojson)
        }
        newDatasArray.push(ojson)
        newDatasArray.push(datasArray[i])
    }
    for (var i = 0; i < aGridPanels.length; i++) {
        console.log(aGridPanels[i])
        var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");
        var aCloneRowsAll = aGridPanels[i].cloneGridpanel.el.dom.querySelectorAll("tr");
        for (var j = 0; j < aRowsAll.length; j++) {
            var sid = aCloneRowsAll[j].id;

            if (sid) {
                //console.log(sid)
                //console.log(randomnumber)
                //console.log("t"+(parseInt(sid.substr(1,sid.length))+randomnumber))
                aRowsAll[j].id = idAddNumber(sid, randomnumber)
                //aRowsAll[j].id = "t" + Math.floor(Math.random() * 10000000000);
            }
        }
    }
    drawpanel.datas.datasArray = newDatasArray;
    console.log(drawpanel.datas.datasArray);
    function idAddNumber(sid, randomnumber) {
        return "t" + (parseInt(sid.substr(1, sid.length)) + randomnumber);
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
    thi = getCurrentDrawPanel();
    var justDrawTempLine = thi.datas.justDrawTempLine;
    if (justDrawTempLine == true) {
        return;
    }
    if (item.querySelector("div").innerHTML == "mode") {
        return;
    }
    if (item.querySelector("div").innerHTML == "Instance") {
        return;
    }

    sStartItemTrId = item.querySelector("tr").id;
    //console.log(arguments)

    var drawpanelScrollTop = thi.el.dom.querySelector("div").scrollTop
    var drawpanelScrollLeft = thi.el.dom.querySelector("div").scrollLeft
    var oDrawPanel = d3.select(thi.el.dom).select(".x-autocontainer-innerCt");
    var oSvg = oDrawPanel.select(".tempSVG" + thi.id);
    iDrawPanelLeft = thi.el.getLeft();
    iDrawPanelTop = thi.el.getTop();

    var eItem = Ext.get(item);
    var eItemWidth = eItem.getLeft() - iDrawPanelLeft + eItem.getWidth() + drawpanelScrollLeft;
    var eItemHeight = eItem.getTop() - iDrawPanelTop + eItem.getHeight() / 2 + drawpanelScrollTop;

    //var aRowsAll = thi.el.dom.querySelectorAll(".x-grid-row");

    var aRowsAll = getCanLinesRowsAll(th.up())

    function getCanLinesRowsAll(gridpanel) {
        var typegrids = getCurrentDrawPanelGirdPanels()
        var sId = gridpanel.getId();
        var aRowsAll = [];
        //console.log(typegrids.length)
        for (var i = 0; i < typegrids.length; i++) {
            if (typegrids[i].getId() == sId) {
                typegrids.splice(i, 1)
                break;
            }
        }

        //console.log(typegrids.length)
        for (var i = 0; i < typegrids.length; i++) {
            var rows = typegrids[i].el.dom.querySelectorAll(".x-grid-row")
            for (var j = 0; j < rows.length; j++) {
                aRowsAll.push(rows[j])
            }
        }
        return aRowsAll;
    }

//    console.log(aRowsAll)

    d3.select("#tempLineStart").remove();

    var tempLineStart = oSvg.append("rect").attr("x", eItemWidth).attr("y", eItemHeight).attr("id", "tempLineStart");
    var tempLineEnd = oSvg.append("circle").attr("r", 4).attr("stroke-width", 1.5).attr("stroke", "rgb(137,190,229)").attr("fill", "blue").attr("cx", eItemWidth + 10).attr("cy", eItemHeight).attr("id", "tempLineEnd");

    tempLineEnd[0][0].onmousedown = function () {
        thi.datas.justDrawTempLine = true;
        var _this = d3.select(this);

        for (var i = 0; i < aRowsAll.length; i++) {
            console.log(aRowsAll[i].id)
            var left = drawpanelScrollLeft + Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft - 10;


            var top = drawpanelScrollTop + Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);

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
            console.log("wanle")

        }

        document.onmousemove = function (e) {
            _this.attr("cx", drawpanelScrollLeft + e.clientX - iDrawPanelLeft - parseInt(tempLineEnd.attr("width") / 2));
            _this.attr("cy", drawpanelScrollTop + e.clientY - iDrawPanelTop - parseInt(tempLineEnd.attr("height") / 2));
            //console.log(document.onmousemove)
            drawTempline();
        };
        document.onmouseup = function (e) {
            removeTemp();
            thi.datas.justDrawTempLine = false;
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
        var drawpanel = getCurrentDrawPanel()

        d3.select("#tempLine").remove();
        var svg = d3.select(".tempSVG" + drawpanel.id);

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


