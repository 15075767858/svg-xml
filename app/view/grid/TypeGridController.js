var hideCom;

Ext.define('svgxml.view.grid.TypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-typegrid',
    girdviewready: function (th, eO) {
        var oHead = th.getHeader().el.dom;
        oHead.onmousedown = function (e) {
            console.log(e)
            th.data = {x: ( e.x - e.layerX), y: (e.y - e.layerY)}
        }
        oHead.oncontextmenu = function (e) {
            th.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY
                })
            )
            return false;
            //console.log(arguments)
        };


    },

    girdmove: function (t, x, y, eOpts) {

        drawlines(t.up("drawpanel"))
        //console.log(t.data.x)
        //console.log(t.data.y)
        if ((x < 0 || y < 0) & !t.getActiveAnimation()) {
            console.log(x + " " + y)
            //t.setPagePosition(t.up().getX() + 10, t.up().getY() + 10, true)
            t.setPagePosition(t.data.x, t.data.y, true)
        }

    },
    girditemdblclick: function (me, record, item, index, e, eopts) {
        console.log(arguments)
        var win = Ext.create("Ext.window.Window", {
            title: "ChangeValue",
            width: 260,
            height: 150,
            layout: "fit",
            autoShow: true,
            listeners: {
                /*activate:function(){
                 win.down("form").loadRecord(record);
                 },
                 render:function(){
                 win.down("form").loadRecord(record);
                 }*/
            },
            items: {
                xtype: "form",
                margin: 5,
                border: false,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 60
                },
                items: [
                    {xtype: "textfield", name: "name", fieldLabel: "type"},
                    /*{ xtype: "numberfield", name: "age", fieldLabel: "年龄" ,maxValue: 3,  minValue: 0 },*/
                    {xtype: "textfield", name: "value", fieldLabel: "value"}
                ]
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
        console.log(arguments)
    },
    griditemclick: function (th) {

    },
    griditemmousedown: function (th, record, item, index, el, e, eOpts) {
        // console.log(arguments);

        console.log("鼠标按下")
    },
    griditemmouseleave: function () {
        console.log("鼠标移出")
    },
    griditemmouseenter: function () {
        console.log("鼠标移入")
    },
    griditemmouseup: function (th, record, item, index, e, eOpts) {
        th.el.dom.oncontextmenu = function (eve) {
            return false;
        }
        if (e.button == 2) {
            th.up().add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY
                })
            )
        }
        console.log("鼠标抬起")
    }
    ,
    griditemcontextmenu: function (th, td, cellIndex, tr, rowIndex, e, eOpts) {
        alert("aa")

    }
});

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
var STROKE_COLOR="blue";
//带 data-targetid 的是td  data-targetid 标注的是目标的id
function initDrawLine(thi, th, record, item, index, e, eOpts) {
    sStartItemTrId = item.querySelector("tr").id;
    var oDrawPanel = d3.select(thi.el.dom).select(".x-autocontainer-innerCt");
    var oSvg = oDrawPanel.select(".tempSVG");
    iDrawPanelLeft = thi.el.getLeft();
    iDrawPanelTop = thi.el.getTop();
    var eItem = Ext.get(item);
    var eItemWidth = eItem.getLeft() - iDrawPanelLeft + eItem.getWidth();
    var eItemHeight = eItem.getTop() - iDrawPanelTop + eItem.getHeight() / 2;
    var aRowsAll = thi.el.dom.querySelectorAll(".x-grid-row");
    d3.select("#tempLineStart").remove()
    var tempLineStart = oSvg.append("rect").attr("x", eItemWidth).attr("y", eItemHeight).attr("id", "tempLineStart");
    //var tempLineEnd = oSvg.append("rect").attr("width", "10").attr("height", "10").attr("fill", "green").attr("x",eItemWidth).attr("y",eItemHeight).attr("fill", "red").attr("id","tempLineEnd");
    //var columnid=d3.select(item).attr("data-columnid")
    var sStartItemTrId;
    var tempLineEnd = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "blue").attr("cx", eItemWidth + 10).attr("cy", eItemHeight).attr("id", "tempLineEnd");
    tempLineEnd[0][0].onmousedown = function () {
        //sStartItemTrId = item.querySelector("tr").id;
        var _this = d3.select(this);

        for (var i = 0; i < aRowsAll.length; i++) {
            var left = Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft - 10;
            var top = Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);
            var columnid = d3.select(aRowsAll[i]).attr("id");

            var tempLineEnd = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "green").attr("cx", left).attr("cy", top).attr("class", "tempCircle").attr("columnid", columnid);
            tempLineEnd.on("mouseover", function () {
                d3.select(this).attr("r", CIRCLE_MAX_R);
            });
            tempLineEnd.on("mouseout", function () {
                d3.select(this).attr("fill", "green").attr("r", CIRCLE_MIN_R);
            });

        }

        document.onmousemove = function (e) {
            _this.attr("cx", e.clientX - iDrawPanelLeft - parseInt(tempLineEnd.attr("width") / 2));
            _this.attr("cy", e.clientY - iDrawPanelTop - parseInt(tempLineEnd.attr("height") / 2));
            drawTempline();
        };
        document.onmouseup = function (e) {
            removeTemp();
            document.onmousemove = null;
            document.onmouseup = null;
            console.log(e.target.tagName+"   "+ sStartItemTrId)
            if (e.target.tagName == "circle") {
                sEndItemTrId=d3.select(e.target).attr("columnid");
                var str='{ "'+sEndItemTrId+'": "'+sStartItemTrId+'" }'
                var jTempJson=JSON.parse(str);
                for(o in jTempJson){
                    if(o != ""&o!=null & jTempJson[o]!=""&jTempJson[o]!=null){
                        if(jTempJson.null){
                            return;
                        }
                    datasArray.push(jTempJson)
                    }
                }
                //console.log(datasArray)
                d3.select(item).attr("data-targetid", d3.select(e.target).attr("columnid"));
                drawlines(thi);
            } else {
                //console.log(datasArray.pop())
                return ;
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
        //x += parseInt(CIRCLE_MIN_R);
        //y += parseInt(CIRCLE_MIN_R);
        //console.log(x + " " + y);
        //x=parseInt(end.attr("cx"))+parseInt(x);
        //y=parseInt(end.attr("cy"))+parseInt(y);
        svg.append("line").attr("id", "tempLine").attr('stroke', "blue").attr("stroke-width", "1").attr("x1", parseInt(endcx) + x).attr("y1", parseInt(endcy) + y).attr("x2", start.attr("x")).attr("y2", start.attr("y"));


    }

    /*  var tempLineStart=oDrawPanel.append("div").attr("position","absolute").style("width","15px").style("height","15px").style("background","green").style("left","100px").attr("id","tempLineStart");
     var tempLineEnd=oDrawPanel.append("div").attr("position","absolute").style("width","15px").style("height","15px").style("background","yellow").attr("id","tempLineEnd").style("left","300px").style("top","100px");

     var disX = 0;
     var disY = 0;
     var oDiv = tempLineEnd[0][0];
     oDiv.onmousedown = function (e) {
     disX = e.clientX - oDiv.offsetLeft;
     disY = e.clientY - oDiv.offsetTop;
     document.onmousemove = function (e) {
     oDiv.style.left = e.clientX - disX + "px";
     oDiv.style.top = e.clientY - disY + "px";
     drawline()
     };
     document.onmouseup = function (e) {

     document.onmousemove = null;
     document.onmousedown = null;
     };
     return false;
     };*/
}


