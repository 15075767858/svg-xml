Ext.define('svgxml.view.tab.DrawPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tab-drawpanel',
    boxready: function (th, width, height, eOpts) {
        var svg = d3.select(th.el.dom).select(".x-autocontainer-innerCt").append("svg").attr("class", "tempSVG")
            .attr("width", "100%").attr("height", "100%")
            //.style("border","1px solid red")
            .style("position", "absolute")
            .style("left", "0").style("top", "0");
    },
    hide: function (th) {
        Ext.get("plants" + th.getTitle()).hide();

    },

    add: function (thi, com, index, eOpts) {

        var plant = getCurrentPlant();
        console.log(plant)
        if (!plant) {
            Ext.Msg.alert("Exception", "please choose one plant.")
            thi.remove(com)
        }
        com.datas = {plantId: plant.id}
        com.addListener("itemmouseenter", function (th, record, item, index, e, eOpts) {
            d3.select("#tempLineEnd").remove();
            //console.log(sStartItemTrId)
            initDrawLine(thi, th, record, item, index, e, eOpts)
        });

        com.addListener("itemmouseleave", function (th, record, item, index, e, eOpts) {
            /*
             d3.select("#tempLineStart").remove();*/
        });
        com.addListener("itemmousedown", function (th, record, item, index, e, eOpts) {
            //console.log(arguments)
            //console.log(d3.select(com.el.dom).select("td"));
            /*d3.select("#templine").remove()
             th.data = {oitem: item}
             var d = d3.select(thi.el.dom).select('svg');
             var edrawpanel = Ext.get(th.up("drawpanel").el.dom);
             var dpleft = edrawpanel.getLeft(false);
             var dptop = edrawpanel.getTop(false);
             var itemWidth = Ext.get(item).getWidth();
             var itemHeight = Ext.get(item).getHeight();
             var starttLeft = Ext.get(item).getLeft(false) - dpleft + thi.getScrollX();
             var startTop = Ext.get(item).getTop(false) - dptop + thi.getScrollY();
             //d.append("line").attr("id","templine").attr('stroke', "#00ff00").attr("stroke-width", "5").attr("x1", starttLeft).attr("y1", startTop).attr("x2", starttLeft).attr("y2", startTop)
             d.append("line").attr("id", "templine").attr('stroke', "#00ff00").attr("stroke-width", "5").attr("x1", starttLeft + itemWidth).attr("y1", startTop + itemHeight / 2).attr("x2", 300).attr("y2", 300)
             /!*thi.el.dom.onmousemove = function (e) {
             console.log(e)
             }*!/
             thi.el.on("mousemove", function (ev, el) {
             console.log("move")
             d3.select("#templine").attr("x2", ev.pageX - dpleft).attr("y2", ev.pageY - dptop);
             })*/
        });
        com.addListener("itemmouseup", function (th, record, item, index, e, eOpts) {

        });
    },

    render: function (th, eOpts) {

        new Ext.dd.DDTarget(th.getId(), "IconDragDropGroup");
        var dTreedd = new Ext.dd.DDTarget(th.getId(), "DevTreeDragDropGroup");

        th.datas = {
            data: [],
            plants: [],
            LinkMarkTypeGrid: null
        };

        Ext.create('Ext.data.Store', {
            storeId: 'store' + th.getTitle(),
            fields: ['active', 'name'],
            data: th.datas.data
        });
        var ogridpanle = Ext.create('Ext.grid.Panel', {
            id: "plantsPanel" + th.getTitle(),
            store: "store" + th.getTitle(),
            width: "100%",
            listeners: {
                itemclick: function (grid, record, item, index, e, eOpts) {

                    ogridpanle.datas = {index: index}
                    //currentPlantsGrid=item
                    setCurrentPlant(index)
                    selectPlant(getCurrentPlant())
                    //双击事件的操作
                    var ostore = grid.getStore();
                    var aItems = th.datas.data;
                    for (var i = 0; i < aItems.length; i++) {
                        if (i == index) {
                            aItems[i].selected = true;
                        }
                        else {
                            aItems[i].selected = false;
                        }
                    }
                    ostore.setData(aItems)
                    grid.setStore(ostore)

                },
                edit: function (grid, e) {
                    // 编辑完成后，提交更改
                    var index = ogridpanle.datas.index;
                    this.setStore(this.getStore())
                    var plant = getCurrentDrawPanelPlantByIndex(index);
                    plant.name = e.value;
                    updateCurrentDrawPanelPlant(plant, index);
                    e.record.commit();
                }
            },
            columns: [
                {
                    dataIndex: "selected",
                    xtype: 'actioncolumn',
                    //width: 40,
                    flex: 1,
                    sortable: false,
                    menuDisabled: true,
                    renderer: function (val) {
                        drawlines(getCurrentDrawPanel())

                        if (val)
                            return '<img src = "img/openFolder.png"/>'
                        return '<img src = "img/closeFolder.png"/>'
                    },
                    handler: function () {
                    }

                },
                {
                    text: 'Name', dataIndex: 'name', flex: 3,
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,

                    }
                },
                {
                    xtype: 'actioncolumn',
                    //width: 30,
                    flex: 1,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: 'img/delete.gif',
                        tooltip: 'Delete Plant',
                        scope: this,
                        handler: function (grid, rowIndex) {
                            try {
                                var plant = getCurrentDrawPanelPlantByIndex(rowIndex);
                                var aGirdPanels = getCurrentDrawPanelGirdPanels();
                                for (var i = 0; aGirdPanels; i++) {
                                    if (aGirdPanels[i].datas.plantId == plant.id) {
                                        Ext.Msg.alert('Exception', 'This plant not null,Can node delete.');
                                        return;
                                    }
                                }
                            } catch (e) {
                                delCurrentDrawPanelPlant(rowIndex);
                                var data = getCurrentDrawPanel().datas.data;
                                data.splice(rowIndex, 1);
                                grid.store.setData(data);
                            }
                        }
                    }]
                }
            ],
            tbar: [
                {
                    text: 'Add Plant',
                    handler: function (th, e) {
                        var currentDrawPanel = getCurrentDrawPanel()
                        var data = currentDrawPanel.datas.data;

                        var name = data.length + 1 + ""
                        if (name.length == 1)
                            name = "00" + name;
                        if (name.length == 2)
                            name = "0" + name;

                        //currentDrawPanel.datas.plants.push(name);
                        //console.log(currentDrawPanel.datas);

                        addCurrentDrawPanelPlant({
                            name: name,
                            selected: false,
                            id: "p" + Math.floor(Math.random() * 100000000000000)
                        });
                        
                        console.log(getCurrentDrawPanelPlants())
                        data.push({selected: false, name: name});
                        ogridpanle.store.setData(data);
                        //console.log(arguments)
                    }
                }
            ],
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            height: "100%",
            width: "100%"

        });

        Ext.create("Ext.window.Window", {
            autoShow: true,
            x: 300,
            y: 150,
            width: 200,
            height: 300,
            resizable: true,
            //resizeHandles: "s",
            maximizable: true,
            collapsible: true,//收起
            closable: false,
            renderTo: Ext.getBody(),
            title: th.getTitle() + " Plants",
            id: "plants" + th.getTitle(),
            //autoScroll: true,
            overflowX: "hidden",
            overflowY: "scroll",
            items: ogridpanle,
            listeners: {
                resize: function (th) {
                    ogridpanle.setWidth(th.getWidth()-20)
                },
                collapse:function(th,eOpts){
                    th.setPagePosition( 0, 0, true)
                    console.log(arguments)
                }
            }
        });

    },

    show: function (th, event, eOpts) {
        drawlines(th);
        Ext.get("plants" + th.getTitle()).show();
    }
});

var datasArray = [];

function drawlines(drawpanel) {
    console.log(datasArray);
    if (!datasArray) {
        return;
    }
    datasArray = datasArrayUnique();
    d3.selectAll(".OkCircle").remove();

    d3.selectAll("polyline").remove();
    var JIANGE = 10;

    var currentDrawPanel = drawpanel;
    var aRowsAll = currentDrawPanel.el.dom.querySelectorAll(".x-grid-row td");
    var iDrawPanelLeft = currentDrawPanel.el.getLeft();
    var iDrawPanelTop = currentDrawPanel.el.getTop();
    //console.log(aRowsAll)

    var pointStart = [];
    var pointEnd = [];
    for (var i = 0; i < aRowsAll.length; i++) {
        //Ext.get(aRowsAll[i]).getLeft()
        if (!i % 2) {
            pointEnd[0] = Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft;
            pointEnd[1] = Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);
            //console.log("结束点"+count++)
            //console.log(pointEnd[0]) //第一列
            //console.log(pointEnd[1]) //第一列//
            //       console.log(d3.select(aRowsAll[i]).attr("data-targetid"))
            //d3.select(currentDrawPanel.el.dom).select("svg").append("rect").attr("x", pointEnd[0]).attr("y", pointEnd[1]).attr("width", "10").attr("height", "10").attr("fill", "red");
        } else {
            pointStart[0] = Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft;
            pointStart[1] = Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);
            //console.log("开始点"+count++)
            //console.log(pointStart[0])//第二列
            //console.log(pointStart[1])//第二列
            //d3.select(currentDrawPanel.el.dom).select("svg").append("rect").attr("x", pointStart[0]).attr("y", pointStart[1]).attr("width", "10").attr("height", "10").attr("fill", "red");
        }
        //console.log(pointStart + " " + pointEnd);
    }


    for (var i = 0; i < datasArray.length; i++) {//value 是起点
        var oStartEndJson = datasArray[i];
        for (o in oStartEndJson) {
            //console.log(oStartEndJson)
            var oElStart = Ext.get(oStartEndJson[o]);
            var oElEnd = Ext.get(o)
            if (!oElEnd || !oElStart) {
                datasArray.splice(i, 1);
                drawlines(drawpanel)
                return
            }
            var iElWidth = oElStart.el.getWidth();
            var iElHeight = oElStart.el.getHeight() / 2;
            var iStartLeft = oElStart.el.getLeft() - iDrawPanelLeft + iElWidth;
            var iStartTop = oElStart.el.getTop() - iDrawPanelTop + iElHeight;
            var iEndLeft = oElEnd.el.getLeft() - iDrawPanelLeft;
            var iEndTop = oElEnd.el.getTop() - iDrawPanelTop + iElHeight;
            var oSvg = d3.select(currentDrawPanel.el.dom).select(".tempSVG")
            //oSvg.append("rect").attr("x", iStartLeft).attr("y",iStartTop).attr("width", "100").attr("height", "100").attr("fill", "red");
            var polyline = oSvg.append("polyline").attr("stroke", "blue").attr("stroke-width", STROKEWIDTH_MIN).attr("fill", "none").attr("class", "OkLine").attr("data-start", oStartEndJson[o]).attr("data-end", o).attr("data-index", i);
            var circle = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "red").attr("data-index", i).attr("class", "OkCircle");
            polyline.on("mouseover", function () {
                d3.select(this).attr("stroke-width", STROKEWIDTH_MIN)
                    .transition()
                    .attr("stroke-width", STROKEWIDTH_MAX).attr("stroke", "chartreuse");
            });
            polyline.on("mouseout", function () {
                d3.select(this).attr("stroke-width", STROKEWIDTH_MAX)
                    .transition()
                    .attr("stroke-width", "4").attr("stroke", "blue");
            });

            polyline.on("dblclick", function () {
                var index = d3.select(this).attr("data-index");
                datasArray.splice(index, 1);
                d3.select(this).remove();
            });
            /*polyline.on("contextmenu",function(){
             d3.select(this).remove();
             });*/

            circle.on("dblclick", function () {
                var index = d3.select(this).attr("data-index");
                datasArray.splice(index, 1);
                d3.select(this).remove();
            });
            if (iStartLeft < 0 || iStartTop < 0) {
                circle.attr("cx", iEndLeft - 10).attr("cy", iEndTop + 12);
                console.log("start")
                continue;
            }
            if (iEndLeft < 0 || iEndTop < 0) {
                circle.attr("cx", iStartLeft + 10).attr("cy", iStartTop)
                console.log("end")
                continue;
            }

            var pointAll = [];//折线的数组初始化
            pointAll.push([iStartLeft, iStartTop]);
            var pointStart = [iStartLeft + JIANGE, iStartTop];
            var pointEnd = [iEndLeft, iEndTop]
            pointAll.push(pointStart);
            //polyline.attr("points", [[iStartLeft, iStartTop], [iEndLeft, iEndTop]]);
            var iCount = 0;
            drawPolyline(pointStart, iCount);
            pointAll.push([pointEnd[0] - JIANGE, pointEnd[1]]);
            pointAll.push(pointEnd);
            polyline.attr("points", pointAll);
        }
    }


    function drawPolyline(pointStart, iCount) { //遇到障碍物一定会出现两条折线这个方法用来画折线

        console.log(pointStart)
        console.log(pointEnd)
        if ((pointStart[0] - pointEnd[0]) == 0 || (pointStart[1] - pointEnd[1]) == 0) //判断是否在一条线上 如果不再一条线上 进入画折线部分
        {
            //console.log("在一条线上")
            //return;
        }
        var iX1 = (pointEnd[0] - pointStart[0]) + pointStart[0];
        var iY1 = pointStart[1];
        var lineToRect1 = lineToRect(pointStart, [iX1, iY1]);
        var lineToRect2 = lineToRect([iX1, iY1], pointEnd);
        var oRect1 = isCollsion(lineToRect1);//第一条线碰撞判断
        var oRect2 = isCollsion(lineToRect2);//第二条线碰撞判断

        if (!oRect1 & !oRect2) {
            pointAll.push([iX1, iY1]);
            return;
        }

        //console.log(oRect1)
        iX1 = pointStart[0];
        iY1 = (pointEnd[1] - pointEnd[1]) + pointEnd[1]
        var lineToRect1 = lineToRect(pointStart, [iX1, iY1]);
        var lineToRect2 = lineToRect([iX1, iY1], pointEnd);
        var oRect3 = isCollsion(lineToRect1);//第一条线碰撞判断
        var oRect4 = isCollsion(lineToRect2);//第二条线碰撞判断
        if (!oRect3 & !oRect4) {
            pointAll.push([iX1, iY1])
            return;
        }
        console.log(iCount++)
        if (iCount > 10) {
            polyline.attr("stroke", "red")
            return;
        }

        if (oRect1 || oRect3) {
            console.log("oRect3碰上了")
            polyline.attr("stroke", STROKE_COLOR)
            var aPoint = lineSkirtRect(pointStart, oRect1 || oRect3);
            for (var i = 0; i < aPoint.length; i++) {
                pointAll.push(aPoint[i]);
                console.log(pointAll)
            }
            drawPolyline([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], iCount);
            return;
        }

        if (oRect2 || oRect4) {
            console.log("oRect4碰上了")
            console.log(pointEnd)
            var aPoint = lineSkirtRect([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], oRect2 || oRect4);
            for (var i = 0; i < aPoint.length; i++) {
                pointAll.push(aPoint[i]);
            }
            //console.log([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]])
            drawPolyline([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], iCount);

            return;
        }
    }


    /* pointAll.push(pointEnd);
     pointAll.push([pointEnd[0] + JIANGE, pointEnd[1]])
     polyline.attr("points", pointAll)*/

    function lineSkirtRect(pointStart, aRect) {//这个方法用来 绕过矩形 返回值是矩形上的两个点

        var sx = pointStart[0];
        var sy = pointStart[1];
        var ex = aRect.x;
        var ey = aRect.y;
        var ex1 = ex + aRect.width + JIANGE;
        ;
        var ey1 = ey + aRect.height + JIANGE;
        var point1 = [];
        var point2 = [];
        var point3 = [];
        //console.log(sx+" "+sy+" "+ex+" "+ ey+" "+(ex+aRect.width)+" "+(ey+aRect.height))
        if (sx <= ex & sy >= ey & sy <= ey + aRect.height) {
            point1 = [ex, sy];
            if (sy > (ey + aRect.height / 2)) {
                point2 = [ex, ey1];
                point3 = [ex1, ey1];
            } else {
                point2 = [ex, ey];
                point3 = [ex1, ey];
                //   console.log("左边 靠上")
            }
            return [point1, point2, point3];
        }
        if (sx >= ex & sy <= ey & sx <= ex + aRect.width) {
            point1 = [sx, ey];
            if (sx > (ex + aRect.width / 2)) {
                point2 = [ex1, ey];
                point3 = [ex1, ey1];
            } else {
                point2 = [ex, ey];
                point3 = [ex, ey1];
            }
            return [point1, point2, point3];
        }
        if (sx >= (ex + aRect.width)) {
            point1 = [ex1, sy];
            if (sy > (ey + aRect.height / 2)) {
                point2 = [ex1, ey1];
                point3 = [ex, ey1];
            } else {

                point2 = [ex1, ey];
                point3 = [ex, ey];
            }
            return [point1, point2, point3];
        }
        // & sx <= ex + aRect.width & ey >= ey + aRect.height
        if (sx >= ex & sy >= ey + aRect.height) {
            point1 = [sx, ey1];
            if (sx > (ex + aRect.width / 2)) {
                point2 = [ex1, ey1];
                point3 = [ex1, ey];
            } else {
                point2 = [ex, ey1];
                point3 = [ex, ey];
            }
            return [point1, point2, point3];
        }
        return false;
    }

    function lineToRect(lineStart, lineEnd) { //这个方法把线转换成矩形
        var width = (lineEnd[0] - lineStart[0]);//+lineStart[0];
        var height = (lineEnd[1] - lineStart[1]);//+lineStart[1];
        width == 0 ? width += JIANGE : null;
        height == 0 ? height += JIANGE : null;

        var oJson = {};

        if (width < 0) {
            oJson.x = lineStart[0] + width;
            oJson.width = Math.abs(width);
        } else {
            oJson.x = lineStart[0];
            oJson.width = width;
        }
        if (height < 0) {
            oJson.y = lineStart[1] + height;
            oJson.height = Math.abs(height);
        }
        else {
            oJson.y = lineStart[1];
            oJson.height = height;
        }
        return oJson;
    }

    function isCollsion(LineToRect) {

        var aObsDivs = currentDrawPanel.getItems().items;
        for (var i = 0; i < aObsDivs.length; i++) {
            var oDiv = d3.select(aObsDivs[i].el.dom);
            var iObsoffsetLeft = oDiv.property("offsetLeft");
            var iObsoffsetTop = oDiv.property("offsetTop");
            var iObswidth = parseInt(oDiv.style("width"));
            var iObsheight = parseInt(oDiv.style("height"));
            //console.log(x1 + "  " + y1 + " " + iLinewidth + "  " + iLineheight + "  " + iObsoffsetLeft + "  " + iObsoffsetTop + "  " + iObswidth + "  " + iObsheight)
            if (isCollsionWithRect(LineToRect.x, LineToRect.y, LineToRect.width, LineToRect.height, iObsoffsetLeft, iObsoffsetTop, iObswidth, iObsheight))
                return {
                    x: iObsoffsetLeft - JIANGE,
                    y: iObsoffsetTop - JIANGE,
                    width: iObswidth + JIANGE,
                    height: iObsheight + JIANGE
                };
        }
        return false;
    }
}
function isCollsionWithRect(x1, y1, w1, h1,
                            x2, y2, w2, h2) {
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
function datasArrayUnique() {
    var map = new Ext.util.HashMap();
    for (var i = 0; i < datasArray.length; i++) {
        var oStartEndJson = datasArray[i];
        for (o in oStartEndJson) {
            map.add(o, oStartEndJson[o]);
        }
    }
    var datasArray1 = []
    map.each(function (key, value, length) {
        datasArray1.push(generateJson(key, value));
    });
    return datasArray1;
}