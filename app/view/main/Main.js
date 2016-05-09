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
/*
Ext.create('Ext.window.Window', {
        id: "drawWindow",
        //title: record.data.value + " Property",
        title: "property",


        constrainHeader: true,//禁止移出父窗口
        height: 768,
        width: 1024,
        autoShow: true,
        layout: 'auto',
        resizable: false,
        listeners: {
            el: {
                selectstart: function (th) {
                    th.stopEvent();
                    return;
                },
                contextmenu: function (th, el, eOpts) {
                    var cxt = el.getContext("2d");
                    console.log(arguments)
                    //柱子间隔 27  宽100  高625
                    var div = $("<div id=aaaaa></div>")
                    div.css("width", "100px")
                        .css("height", "100px")
                        .css("backgroundColor", "red")
                        .css("zIndex", "9")
                        .css("left", "115px")
                        .css("top", "100px")
                        .css("position", "absolute")
                    console.log(div)
                    $(th.currentTarget).append(div)
                    console.log(th.pageX)
                    console.log(th.pageY)
                    if (el.tagName != "CANVAS") {
                        return;
                    }
                    ;

                    function getTimeDiv() {

                    }

                    Ext.create('svgxml.view.grid.menu.gridmenu', {
                        x: th.pageX,
                        y: th.pageY,
                        listeners: {
                            show: function (thi, eOpts) {
                                try {
                                    if (hideCom)
                                        thi.getComponent("addSlot").setDisabled(false);
                                } catch (e) {

                                }

                            }
                        }
                    })
                    th.stopEvent();
                }
            }
        },
        items: [
            Ext.create({
                xtype: 'chart',
                width: 1000,
                height: 700,
                padding: '10 0 0 0',

                /!*                interactions: [
                 'itemhighlight',
                 {
                 type: 'panzoom',
                 zoomOnPanGesture: true
                 }
                 ],*!/
                interactions: {
                    type: 'crosshair',
                    axes: {
                        left: {
                            label: {
                                fillStyle: 'white'
                            },
                            rect: {
                                fillStyle: 'brown',
                                radius: 6
                            }
                        },
                        bottom: {
                            label: {
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    lines: {
                        horizontal: {
                            strokeStyle: 'brown',
                            lineWidth: 2,
                            lineDash: [20, 2, 2, 2, 2, 2, 2, 2]
                        }
                    }
                },
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
                    position: 'bottom',
                    title: {
                        text: 'Sample Values',
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
                    //minimum: 2736000000,
                    //maximum: 2649600000,
                    renderer: function (label, layout, lastLabel) {
                        //console.log(arguments)
                        var time = new Date(label)
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
                        tips: {
                            trackMouse: true,
                            style: 'background: #FFF',
                            height: 20,
                            renderer: function (storeItem, item) {

                                //console.log(arguments)
                                this.setTitle("aa")
                                //this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                            }
                        },
                        style: {
                            width: 100
                            //margin:40
                        },
                        yField: ["open", "high", "low", "close"],
                        //xField: 'open',
                        //yField: 'low',
                        //openField: 'open',
                        //highField: 'high',
                        //lowField: 'low',
                        //closeField: 'close',
                        style: {
                            dropStyle: {
                                fill: 'rgb(222, 87, 87)',
                                stroke: 'rgb(222, 87, 87)',
                                lineWidth: 26
                            },
                            raiseStyle: {
                                fill: 'rgb(48, 189, 167)',
                                stroke: 'rgb(48, 189, 167)',
                                lineWidth: 26
                            }
                        }
                    }

                ]
            })
        ]
    }
)
*/
