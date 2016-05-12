/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */

Ext.define('svgxml.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'svgxml.view.main.MainController',
        'svgxml.view.main.MainModel',
        "svgxml.view.main.toolbar.TopToolbar",
        "svgxml.view.tab.FramedTabs",
        "svgxml.view.Viewport",
        "Ext.chart.*"

    ],
    style: {
        //background: "rgb(21,127,214)"
    },
    xtype: 'app-main',
    //layout: "border",
    layout: {
        type: 'border',
        align: 'stretch'
    },
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    title: "<div style='z-index:0;top:0px;width:100%;line-height:35px;padding:0 0 0 5px;margin:0;font-size: 20px;color:white;'><img style='height:30px;' src='resources/img/PNG/SmartIO.png'/>    SmartIO</div>",
    bind: {
        //title:"<div style='z-index:0;top:0px;width:100%;line-height:50px;background:rgb(130,177,52);padding:0 0 0 5px;font-size: 20px;color:white;'><img style='height:20px;' src='{img}'/>     {name}</div>"
    },
    tbar: [
        {
            xtype: "basic-toolbar",
            padding: 0
        }
    ],
    listeners: {
        render: "boxready"
    },
    //header:true,
    items: [

        {
            xtype: "basic-tabs",
            region: "west",
            width: 190,
            resizable: true,
            title: 'Projects',
            collapsible: true,
            split: true
            //padding: "0 10 0 0"
        },
        //{ region: "east", width: 90, title: 'north', collapsible: true },
        Ext.create("svgxml.view.tab.FramedTabs", {
            region: "center",
            height: "200%",
            width: "200%",
            split: true,
            collapsible: true,
            title: "Program"
        })
    ]
});


var WeekArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

//week
Ext.create('Ext.window.Window', {
        id: "drawWindow",
        //title: record.data.value + " Property",
        title: "property",
        constrainHeader: true,//禁止移出父窗口
        height: 768,
        //height: 900,
        width: 1024,
        autoShow: true,
        layout: 'card',
        resizable: false,
        buttons: [
            {
                text: "Ok", handler: function () {


                var weekly = {
                    "Weekly_Schedule": {}
                }
                for (var i = 0; i < WeekArr.length; i++) {
                    //console.log(this.up("window").el.dom.getElementsByClassName(WeekArr[i]))
                    var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
                    if (dayTimeArr.length > 0) {
                        weekly.Weekly_Schedule[WeekArr[i]] = []
                        for (var j = 0; j < dayTimeArr.length; j++) {
                            console.log(dayTimeArr)
                            var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                            var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
                            weekly.Weekly_Schedule[WeekArr[i]].push(
                                {
                                    time: {
                                        "hour": starttime.getHours(),
                                        "minute": starttime.getMinutes(),
                                        "second": starttime.getSeconds(),
                                        "hundredths": 0
                                    },
                                    value: "1"
                                }, {
                                    time: {
                                        "hour": endtime.getHours(),
                                        "minute": endtime.getMinutes(),
                                        "second": endtime.getSeconds(),
                                        "hundredths": 0
                                    },
                                    value: "0"
                                }
                            )
                        }

                    }
                }
                console.log(Ext.encode(weekly))

            }
            }
            , {
                text: "next", handler: function () {
                    var me = this.up("window");
                    var l = me.getLayout();
                    console.log(l)
                    l.setActiveItem(1)
                }
            }, {
                text: "Previous", handler: function () {
                    var me = this.up("window");
                    var l = me.getLayout();
                    l.setActiveItem(0)
                }
            }
        ],

        listeners: {
            el: {
                contextmenu: function (win, el, eOpts) {
                    console.log(arguments)
                    //柱子间隔 27  宽100  高625
                    if (el.tagName != "CANVAS") {
                        return;
                    }
                    ;
                    Ext.create('Ext.menu.Menu', {
                        width: 100,
                        plain: true,
                        x: win.pageX + 5,
                        y: win.pageY + 5,
                        autoShow: true,
                        floating: true,  // usually you want this set to True (default)
                        items: [{
                            text: 'Add Time',
                            handler: function () {
                                addNewBar(win)

                            }
                        }
                        ]
                    });
                    //addNewBar(th)

                    win.stopEvent();
                }
            }
        },
        items: [
            Ext.create({
                xtype: 'chart',
                width: 1000,
                height: 800,
                padding: '10 0 0 0',
                store: {
                    fields: ['time', 'open', 'high', 'low', 'close'],
                    data: [{
                        'time': "Sunday",
                        'open': 2649600000,
                        'low': 2649600000,
                        'high': 2736000000,
                        'close': 2736000000
                    }, {
                        'time': "Monday",
                        'open': 2649600000,
                        'low': 2699600000,
                        'high': 2706000000,
                        'close': 2730000000
                    }, {
                        'time': "Tuesday",
                        'open': 2649600000,
                        'low': 2699600000,
                        'high': 2706000000,
                        'close': 2730000000
                    }, {
                        'time': "Wednesday",
                        'open': 2649600000,
                        'high': 2726000000,
                        'low': 2659600000,
                        'close': 2726000000
                    }, {
                        'time': "Thursday",
                        'open': 2649600000,
                        'low': 2699600000,
                        'high': 2706000000,
                        'close': 2730000000
                    }, {
                        'time': "Friday",
                        'open': 2649600000,
                        'low': 2699600000,
                        'high': 2706000000,
                        'close': 2730000000
                    }, {
                        'time': "Saturday",
                        'open': 2649600000,
                        'low': 2699600000,
                        'high': 2706000000,
                        'close': 2730000000
                    }

                    ]
                },
                axes: [{
                    type: 'category',

                    position: 'top',
                    title: {
                        text: 'Week',
                        fontSize: 15
                    },
                    fields: 'time'
                }, {
                    type: 'numeric',
                    position: 'left',
                    fields: 'open',
                    grid: true,
                    minimum: 2649600000,
                    maximum: 2736000000,
                    renderer: function (label, layout, lastLabel) {
                        var chaTime = (2736000000 - label) + 2649600000;

                        var time = new Date(chaTime)
                        var hours = time.getHours();
                        var min = time.getMinutes();
                        var sec = time.getSeconds();
                        //return new Date(label).toLocaleTimeString();
                        return hours + ":" + min + ":" + sec;
                    },
                    title: {
                        text: 'Date',
                        fontSize: 15
                    },
                    style: {
                        axisLine: false
                    }
                }],
                series: [
                    {
                        type: 'bar',
                        xField: 'time',
                        id: "bar_Sec",
                        listeners: {
                            itemclick: function (series, item, event, eOpts) {
                                console.log(arguments)
                            }
                        },
                        /*tips: {
                         trackMouse: true,
                         style: 'background: #FFF',
                         height: 20,
                         renderer: function (storeItem, item) {
                         this.setTitle("aa")
                         console.log(arguments)
                         }
                         },*/
                        style: {
                            width: 100
                            //margin:40
                        },
                        yField: ["open", "high", "low", "close"],
                        style: {
                            fill: "steelblue"
                        }
                    }

                ]
            }),
            {
                xtype: "panel",
                html: "asdf"
            }
        ]
    }
)
function drawWindowAddDiv() {
    var d = {
        "Weekly_Schedule": {
            "sunday": [{
                "time": {"hour": 2, "minute": 8, "second": 46, "hundredths": 0},
                "value": "1"
            }, {"time": {"hour": 2, "minute": 55, "second": 36, "hundredths": 0}, "value": "0"}],
            "monday": [{
                "time": {"hour": 9, "minute": 19, "second": 36, "hundredths": 0},
                "value": "1"
            }, {"time": {"hour": 10, "minute": 6, "second": 26, "hundredths": 0}, "value": "0"}],
            "thursday": [{
                "time": {"hour": 11, "minute": 14, "second": 20, "hundredths": 0},
                "value": "1"
            }, {"time": {"hour": 12, "minute": 1, "second": 10, "hundredths": 0}, "value": "0"}]
        }
    }
    var dw = dwPars.dw;
    var oCanvas = dwPars.oCanvas;
    var oneDay = dwPars.oneDay;
    var bWidth = dwPars.bWidth;
    var winOffsetLeft = dwPars.winOffsetLeft;
    var winOffsetTop = dwPars.winOffsetTop;
    var bMarginLeft = dwPars.bMarginLeft;
    var bMaxWidth = dwPars.bMaxWidth;
    var interval = dwPars.interval;
    var startPoint = dwPars.startPoint;
    var posLeftArr = dwPars.posLeftArr;
    var oneDay = dwPars.oneDay;

    for (var i = 0; i < WeekArr.length; i++) {
        if (d['Weekly_Schedule'][WeekArr[i]]) {
            var div = dwPars.div()
            div.addClass(WeekArr[i])
            var times = d['Weekly_Schedule'][WeekArr[i]];
            for (var j = 0; j < times.length; j += 2) {
                var starttime = new Date(1970, 1, 1, times[j].time.hour, times[j].time.minute, times[j].time.second)
                var endtime = new Date(1970, 1, 1, times[j + 1].time.hour, times[j + 1].time.minute, times[j + 1].time.second)
                div.attr("starttime", starttime)
                div.attr("endtime", endtime)
                div.addClass(WeekArr[i])
                $(dw.el.dom).append(div)
                weekDivAddEvent(div)
            }


        }
    }


    weekDivResetPosition()

    console.log(d)
}

var single = (function () {
    var unique;

    function getInstance() {
        if (unique === undefined) {
            unique = new Construct();
        }
        return unique;
    }

    function Construct() {
        // ... 生成单例的构造函数的代码
    }

    return {
        getInstance: getInstance
    }
})();
var dwPars;
Ext.onReady(function () {
    dwPars = (function () {

        var WeekArrJson = [{name: "sunday", left: ""},
            {name: "monday", left: ""},
            {name: "tuesday", left: ""},
            {name: "wednesday", left: ""},
            {name: "thursday", left: ""},
            {name: "friday", left: ""},
            {name: "saturday", left: ""}];
        var dw = Ext.getCmp("drawWindow")
        var oCanvas = $(dw.el.dom.querySelectorAll("canvas")[4]);
        var oneDay = 86400000;
        var bWidth = 100;
        var winOffsetLeft = dw.el.getLeft(true);
        var winOffsetTop = dw.el.getTop(true);
        var bMarginLeft = oCanvas.offset().left - winOffsetLeft;
        var bMaxWidth = oCanvas.attr("width");
        var interval = (bMaxWidth - bWidth * WeekArr.length) / 7;
        var bMarginTop = oCanvas.offset().top - winOffsetTop - 6;
        var startPoint = bMarginLeft + interval / 2 - 6;
        var posLeftArr = [];
        posLeftArr.push(startPoint)
        WeekArrJson[0]['left'] = startPoint;
        for (var i = 0; i < 7; i++) {
            var weekleft = Math.ceil(startPoint += bWidth + interval);
            posLeftArr.push(weekleft)
            if (i < 6) {
                WeekArrJson[i + 1]['left'] = weekleft;
            }
        }
        var bMaxHeight = oCanvas.attr("height");
        var bMarginTopHeight = parseInt(bMarginTop) + parseInt(bMaxHeight);

        function newDiv() {
            var div = $("<div></div>")
            div.css("width", "100px")
                .css("height", "20px")
                .css("backgroundColor", "rgba(91,164,60,1)")
                .css("zIndex", "9")
                .css("position", "absolute")
                .addClass("week")
                .attr("id", "bar" + Math.floor(Math.random() * 100000000000000))
            return div;
        }

        //.css("top", bMarginTop + "px");
        //.css("top", win.pageY - winOffsetTop + "px");

        var e = {
            WeekArrJson: WeekArrJson,
            dw: dw,
            oCanvas: oCanvas,
            oneDay: oneDay,
            bWidth: bWidth,
            winOffsetLeft: winOffsetLeft,
            winOffsetTop: winOffsetTop,
            bMarginLeft: bMarginLeft,
            bMaxWidth: bMaxWidth,
            interval: interval,
            bMarginTop: bMarginTop,
            startPoint: startPoint,
            posLeftArr: posLeftArr,
            bMaxHeight: bMaxHeight,
            bMarginTopHeight: bMarginTopHeight,
            div: newDiv
        }
        return e;
    })()
})


function weekDivResetPosition() {
    var WeekArrJson = dwPars.WeekArrJson
    var oCanvas = dwPars.oCanvas
    var oneDay = dwPars.oneDay;
    var bMarginTop = dwPars.bMarginTop;
    for (var i = 0; i < WeekArr.length; i++) {
        var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
        if (dayTimeArr.length > 0) {
            for (var j = 0; j < dayTimeArr.length; j++) {
                var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                var divStartPageY = parseInt(oCanvas.css("height")) * ((starttime - 2649600000) / oneDay);
                $(dayTimeArr[j]).css("top", divStartPageY + bMarginTop)
                var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
                var divEndPageY = parseInt(oCanvas.css("height")) * ((endtime - 2649600000) / oneDay);
                $(dayTimeArr[j]).css("height", divEndPageY - divStartPageY + "px");
            }
        }
    }
    var aWeeks = $(".week");
    for (var i = 0; i < aWeeks.length; i++) {
        for (var j = 0; j < WeekArrJson.length; j++) {
            if ($(aWeeks[i]).hasClass(WeekArrJson[j].name)) {
                $(aWeeks[i]).css("left", WeekArrJson[j].left);
            }
        }
    }

}

function addNewBar(win) {
    console.log(win)
    //var posLeftArr;
    var WeekArr = dwPars.WeekArrJson
    var dw = dwPars.dw;
    //var oCanvas = dwPars.oCanvas;
    var oneDay = dwPars.oneDay;
    var bWidth = dwPars.bWidth;
    var winOffsetLeft = dwPars.winOffsetLeft
    var winOffsetTop = dwPars.winOffsetTop
    /*var bMarginLeft =dwPars.bMarginLeft
     var bMaxWidth =dwPars.bMaxWidth
     var interval =dwPars.interval*/
    var posLeftArr = dwPars.posLeftArr;
    console.log(posLeftArr)
    var bMarginTop = dwPars.bMarginTop
    var bMaxHeight = dwPars.bMaxHeight
    var bMarginTopHeight = dwPars.bMarginTopHeight
    var bLeft;

    var div = dwPars.div()
        .css("top", win.pageY - winOffsetTop + "px");
    for (var i = 0; i < posLeftArr.length; i++) {
        if (isBarCollsion(win.pageX, win.pageY, posLeftArr[i] + winOffsetLeft, bMarginTop, bWidth, bMaxHeight)) {
            bLeft = posLeftArr[i];
            div.addClass(WeekArr[i].name);
        }
    }
    // div.css("left", bLeft + "px")
    if (bLeft) {
        $(dw.el.dom).append(div)
    } else {
        div.remove()
    }
    weekDivResetPosition()
    weekDivAddEvent(div)


    var tmStart = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
    var tmEnd = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
    div.attr("startTime", tmStart).attr("endTime", tmEnd)


}
function weekDivAddEvent(div) {
    console.log(div)
    div.hover(
        function () {
            //var tmStart = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
            //var tmEnd = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
            var tmStart = new Date(div.attr("startTime"))
            var tmEnd = new Date(div.attr("endTime"))
            console.log(div.attr("startTime"))
            console.log(div.attr("endTime"))
            //div.attr("startTime", tmStart.getTime()).attr("endTime", tmEnd.getTime())
            Ext.create('Ext.tip.ToolTip', {
                target: div.attr("id"),
                float: true,
                trackMouse: true,
                showDelay: 0,
                hideDelay: 100,
                dissmissDelay: 30000,
                html: "StartTime:" + tmStart.toTimeString() + "<br>EndTime:&nbsp;" + tmEnd.toTimeString()
            });
        },
        function () {
        }
    );
    div.contextmenu(function (e) {
        e.stopPropagation()
        Ext.create('Ext.menu.Menu', {
            width: 100,
            plain: true,
            x: e.pageX,
            y: e.pageY,
            autoShow: true,
            floating: true,  // usually you want this set to True (default)
            items: [{
                text: 'Delete Time',
                handler: function () {
                    div.remove()
                }
            }
            ]
        });
        return false;
    })

    Ext.create("Ext.resizer.Resizer", {
        target: div.attr("id"),
        handles: 'n,s',
        maxHeight: dwPars.bMaxHeight,
        minHeight: 1,
        //constrainTo:th.id,
        pinned: true,
        listeners: {
            resize: function (th, width, height, e, eOpts) {
                var tmStart = getTimeByLocation(parseInt(div.css("Top")) - dwPars.bMarginTop);
                var tmEnd = getTimeByLocation(parseInt(div.css("Top")) - dwPars.bMarginTop + parseInt(div.css("height")))
                div.attr("startTime", tmStart).attr("endTime", tmEnd)
                var top = th.el.getTop(true)
                if (top < dwPars.bMarginTop) {
                    th.el.setTop(dwPars.bMarginTop + "px")
                }
                var bt = height + top;
                if (bt > dwPars.bMarginTopHeight) {
                    var cha = bt - dwPars.bMarginTopHeight;
                    th.el.setTop(top - cha);

                }
            }
        }
    })
}
function getTimeByLocation(weizhi) {
    var time = new Date(dwPars.oneDay * (weizhi / dwPars.bMaxHeight) + 2649600000);
    return time;
}

function isBarCollsion(x1, y1, x2, y2, w, h) {
    if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
        return true;
    }
    return false;
}

