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
                var WeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var weekly = {
                    "Weekly_Schedule": {}
                }
                for (var i = 0; i < WeekArr.length; i++) {
                    //console.log(this.up("window").el.dom.getElementsByClassName(WeekArr[i]))
                    var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
                    if (dayTimeArr.length > 0) {
                        weekly.Weekly_Schedule[WeekArr[i]] = []
                        for (var j = 0; j < dayTimeArr.length; j++) {
                            var hour;
                            var minute;
                            var second;
                            var hundredths;
                            weekly.Weekly_Schedule[WeekArr[i]].push({
                                "hour": 1,
                                "minute": 2,
                                "second": 3,
                                "hundredths": 4
                            })
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

function addNewBar(win) {
    console.log(win)
    //var posLeftArr;
    var WeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var oCanvas=$(win.el.dom.querySelectorAll("canvas")[4]);
    
    var bWidth = 100;
    var bMarginLeft = $(win.target).offset().left - $("#" + win.currentTarget.id).offset().left;
    var bMaxWidth = win.target.width;
    var interval = (bMaxWidth - bWidth * WeekArr.length) / 7;
    var startPoint = bMarginLeft + interval / 2 - 6;
    var posLeftArr = [];
    posLeftArr.push(startPoint)
    for (var i = 0; i < 7; i++) {
        posLeftArr.push(Math.ceil(startPoint += bWidth + interval))
    }
    var bMarginTop = $(win.target).offset().top - win.currentTarget.offsetTop - 6;

    var bMaxHeight = win.target.height;
    var bMarginTopHeight = bMarginTop + bMaxHeight;
    var bLeft;
    var winOffsetLeft = win.currentTarget.offsetLeft;
    var oneDay = 86400000;
    var div = $("<div></div>")
    div.css("width", bWidth + "px")
        .css("height", "20px")
        .css("backgroundColor", "rgba(91,164,60,1)")
        .css("zIndex", "9")
        .css("top", win.pageY - win.currentTarget.offsetTop + "px")
        .css("position", "absolute")
        .addClass("week")
        .attr("id", "bar" + Math.floor(Math.random() * 100000000000000));

    for (var i = 0; i < posLeftArr.length; i++) {
        if (isBarCollsion(win.pageX, win.pageY, posLeftArr[i] + winOffsetLeft, bMarginTop, bWidth, bMaxHeight)) {
            bLeft = posLeftArr[i];
            div.addClass(WeekArr[i]);
        }
    }

    div.css("left", bLeft + "px")

    function isBarCollsion(x1, y1, x2, y2, w, h) {
        if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
            return true;
        }
        return false;
    }

    if (bLeft) {
        $(win.currentTarget).append(div)
    } else {
        div.remove()
    }
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
    var tmStart = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
    var tmEnd = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
    div.attr("startTime", tmStart).attr("endTime", tmEnd)
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

    function getTimeByLocation(weizhi) {
        var time = new Date(oneDay * (weizhi / bMaxHeight) + 2649600000);
        return time;
    }

    Ext.create("Ext.resizer.Resizer", {
        target: div.attr("id"),
        handles: 'n,s',
        maxHeight: bMaxHeight,
        minHeight: 1,
        //constrainTo:th.id,
        pinned: true,
        listeners: {
            resize: function (th, width, height, e, eOpts) {
                var tmStart = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
                var tmEnd = getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
                div.attr("startTime", tmStart).attr("endTime", tmEnd)
                var top = th.el.getTop(true)
                if (top < bMarginTop) {
                    th.el.setTop(bMarginTop + "px")
                }

                var bt = height + top;
                if (bt > bMarginTopHeight) {
                    var cha = bt - bMarginTopHeight;
                    th.el.setTop(top - cha);
                }

            },
            resizedrag: function (th, width, height, e, eOpts) {
            }
        }
    })
}



