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


/*
function getDivData() {
    var weekly = {
        "Weekly_Schedule": {}
    }
    var pubweekly = {
        "Weekly_Schedule": []
    }
    dwPars.drawWindowData = []
    WeekArr = dwPars.WeekArr
    for (var i = 0; i < WeekArr.length; i++) {

        //console.log(this.up("window").el.dom.getElementsByClassName(WeekArr[i]))
        var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
        weekly.Weekly_Schedule[WeekArr[i]] = []
        var pubTimeArr = []
        pubweekly.Weekly_Schedule.push({
            day: i + 1,
            value: pubTimeArr
        })
        if (dayTimeArr.length > 0) {

            //pubweekly.Weekly_Schedule[WeekArr[i]] = []
            for (var j = 0; j < dayTimeArr.length; j++) {
                console.log(dayTimeArr)

                var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                var endtime = new Date($(dayTimeArr[j]).attr("endtime"));

                var sH = starttime.getHours()
                var sM = starttime.getMinutes()
                var sS = starttime.getSeconds()
                var eH = endtime.getHours()
                var eM = endtime.getMinutes()
                var eS = endtime.getSeconds()

                dwPars.drawWindowData.push({
                    divId: dayTimeArr[j].id,
                    SortWeek: (i + 1) + "_" + WeekArr[i],
                    Week: WeekArr[i],
                    StartTime: sH + ":" + sM + ":" + sS,
                    EndTime: eH + ":" + eM + ":" + eS
                })

                if ($(dayTimeArr[j]).hasClass("new")) {

                    pubTimeArr.push(
                        {
                            time: {
                                "hour": sH,
                                "minute": sM,
                                "second": sS,
                                "hundredths": 0
                            },
                            value: true
                        }, {
                            time: {
                                "hour": eH,
                                "minute": eM,
                                "second": eS,
                                "hundredths": 0
                            },
                            value: false
                        }
                    )
                }

                weekly.Weekly_Schedule[WeekArr[i]].push(
                    {
                        time: {
                            "hour": sH,
                            "minute": sM,
                            "second": sS,
                            "hundredths": 0
                        },
                        value: true
                    }, {
                        time: {
                            "hour": eH,
                            "minute": eM,
                            "second": eS,
                            "hundredths": 0
                        },
                        value: false
                    }
                )
            }

        }

        if (pubTimeArr.length == 0) {
            pubweekly.Weekly_Schedule.pop()
        }
    }
    console.log(pubweekly)
    console.log(Ext.encode(pubweekly))
    console.log(Ext.encode(weekly))
    return {weekly: weekly, pubweekly: pubweekly};

}
*/

function isTime(val) {
    var vals = val.split(":")
    if (vals.length != 3) {
        return "This field error";
    }
    if (!(vals[0] >= 0 & vals[0] <= 23 & vals[1] >= 0 & vals[1] <= 59 & vals[2] >= 0 & vals[2] <= 59)) {
        return "This field error";
    }
    for (var i = 0; i < vals.length; i++) {
        if (isNaN(vals[i]) || (vals[i] + "") == "-0") {
            return "This field error";
        }
    }
    return true;
}
/*
function drawWindowAddDiv(d) {
    WeekArr = dwPars.WeekArr
    var dw = dwPars.dw;
    for (var i = 0; i < WeekArr.length; i++) {
        if (d['Weekly_Schedule'][WeekArr[i]]) {

            var times = d['Weekly_Schedule'][WeekArr[i]];
            for (var j = 0; j < times.length; j += 2) {
                var div = dwPars.div()
                div.addClass(WeekArr[i])
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
    weekDivResetPosition(true)

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
})();*/
var dwPars;
/*
function dwParsInit() {
    dwPars = (function () {
        var drawWindowData = []
        var WeekArr = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        var WeekArrJson = [
            {name: "monday", left: ""},
            {name: "tuesday", left: ""},
            {name: "wednesday", left: ""},
            {name: "thursday", left: ""},
            {name: "friday", left: ""},
            {name: "saturday", left: ""},
            {name: "sunday", left: ""}];
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
            div: newDiv,
            WeekArr: WeekArr,
            drawWindowData: drawWindowData
        }
        return e;
    })()

}
*/

/*
function weekDivResetPosition(banimate) {
    var WeekArrJson = dwPars.WeekArrJson
    var oCanvas = dwPars.oCanvas
    var oneDay = dwPars.oneDay;
    var bMarginTop = dwPars.bMarginTop;
    WeekArr = dwPars.WeekArr;
    for (var i = 0; i < WeekArr.length; i++) {
        var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
        if (dayTimeArr.length > 0) {
            for (var j = 0; j < dayTimeArr.length; j++) {
                var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                var divStartPageY = parseInt(oCanvas.css("height")) * ((starttime - 2649600000) / oneDay);
                //$(dayTimeArr[j]).css("top", divStartPageY + bMarginTop)
                var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
                var divEndPageY = parseInt(oCanvas.css("height")) * ((endtime - 2649600000) / oneDay);
                //$(dayTimeArr[j]).css("height", divEndPageY - divStartPageY + "px");
                $(dayTimeArr[j]).animate({
                    top: divStartPageY + bMarginTop,
                    height: divEndPageY - divStartPageY
                }, 1000)
            }
        }
    }
    var aWeeks = $(".week");
    for (var i = 0; i < aWeeks.length; i++) {
        for (var j = 0; j < WeekArrJson.length; j++) {
            if ($(aWeeks[i]).hasClass(WeekArrJson[j].name)) {
                if (banimate) {
                    $(aWeeks[i]).css("left", dwPars.dw.el.getWidth() / 2.5);
                    function randomlingdao() {
                        for (var i = 0; i < 10; i++) {
                            var a = (Math.random() * 2.5);
                            if (a > 2 & a < 2.5) {
                                return a
                            }
                        }
                        return 2;
                    }

                    $(aWeeks[i]).animate({
                        left: WeekArrJson[j].left
                    }, 1000)
                }
                else {
                    $(aWeeks[i]).css("left", WeekArrJson[j].left);
                }


            }
        }
    }

}
*/

/*
function addNewBar(win) {
    console.log(win)

    var WeekArr = dwPars.WeekArrJson
    var dw = dwPars.dw;
    var bWidth = dwPars.bWidth;
    var winOffsetLeft = dwPars.winOffsetLeft
    var winOffsetTop = dwPars.winOffsetTop
    var posLeftArr = dwPars.posLeftArr;
    var bMarginTop = dwPars.bMarginTop
    var bMaxHeight = dwPars.bMaxHeight
    var bLeft;

    var div = dwPars.div()
        .css("top", win.pageY - winOffsetTop + "px");
    div.addClass("new")
    for (var i = 0; i < posLeftArr.length; i++) {
        if (isBarCollsion(win.pageX, win.pageY, posLeftArr[i] + winOffsetLeft, bMarginTop, bWidth, bMaxHeight)) {
            bLeft = posLeftArr[i];
            div.addClass(WeekArr[i].name);
        }
    }
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
*/

/*function weekDivAddEvent(div) {
    console.log(div)
    div.hover(
        function () {
            var tmStart = new Date(div.attr("startTime"))
            var tmEnd = new Date(div.attr("endTime"))
            console.log(div.attr("startTime"))
            console.log(div.attr("endTime"))
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
        target: div[0],
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
}*/
/*function getTimeByLocation(weizhi) {
    var time = new Date(dwPars.oneDay * (weizhi / dwPars.bMaxHeight) + 2649600000);
    return time;
}*/

function isBarCollsion(x1, y1, x2, y2, w, h) {
    if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
        return true;
    }
    return false;
}

function myAjax(url, success) {
    var devName = "";
    Ext.Ajax.request({
        url: url,
        method: "GET",
        async: false,
        params: {},
        success: success
    });
}


