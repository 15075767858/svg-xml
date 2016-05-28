Ext.define("svgxml.view.window.DrawWeeksWindow", {
    extend: "Ext.window.Window",
    alias: "drawweekswindow",
    requires: [
        "svgxml.view.window.DrawWeeksWindowController",
        "svgxml.view.window.DrawWeeksWindowModel"

    ],

    controller: "window-drawweekswindow",
    viewModel: {
        type: "window-drawweekswindow"
    },
    height: 768,
    width: 1024,
    constrainHeader: true,//禁止移出父窗口
    autoShow: true,
    layout: 'card',
    resizable: false,
    group: new Ext.grid.feature.Grouping({
        groupHeaderTpl: '{name}{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true
    }),
    buttons: [
        {
            text: "next",
            id: "drawWindow_next",
            handler: function () {
                var me = this.up("window");
                me.controller.getDivData.call(me)

                var store = Ext.data.StoreManager.lookup('drawWindowStore');
                store.setData(me.dwPars.drawWindowData)
                var me = this.up("window");
                var l = me.getLayout();
                this.hide()
                $(".week").hide()
                me.controller.weekDivResetPosition.call(me)
                Ext.getCmp("drawWindow_previous").show()
                l.setActiveItem(1)
            }
        }, {
            text: "Previous",
            id: "drawWindow_previous",
            hidden: true,
            handler: function () {
                var me = this.up("window");
                var l = me.getLayout();
                this.hide()
                $(".week").show()
                me.controller.weekDivResetPosition.call(me)
                Ext.getCmp("drawWindow_next").show()
                l.setActiveItem(0)
            }
        },
        {
            text: "Ok",
            handler: function (th) {
                var me = this.up("window");
                var oJson = me.controller.getDivData.call(me)
                console.log(oJson)
                Ext.Ajax.request({
                    url: "resources/test1.php?par=changevaluenopublish&nodename=" + me.sDevNodeName + "&type=Weekly_Schedule",
                    params: {
                        value: Ext.encode(oJson.weekly)
                    },
                    success: function (response) {
                        var text = response.responseText;
                        delayToast("Status", "Changes saved successfully .", 1000)
                    }
                });
                if (me.sDevName != getNetNumberValue()) {
                    devPublish(me.sDevName + ".8.*", me.sDevNodeName + "\r\nWeekly_Schedule\r\n" + (Ext.encode(oJson.pubweekly)).replaceAll("\\s*|\t|\r|\n", ""));
                }
                this.up("window").close()
            }
        }

    ],
    initComponent: function () {
        var me = this;
        me.title = me.sDevNodeName + " Property",
            me.callParent();
    },
    items: [
        {
            xtype: 'chart',
            width: 1000,
            height: 800,
            padding: '10 0 0 0',
            store: {
                fields: ['time', 'open', 'high', 'low', 'close'],
                data: [{
                    'time': "Monday",
                    'close': 2730000000
                }, {
                    'time': "Tuesday",
                    'close': 2730000000
                }, {
                    'time': "Wednesday",
                    'close': 2726000000
                }, {
                    'time': "Thursday",
                    'close': 2730000000
                }, {
                    'time': "Friday",
                    'close': 2730000000
                }, {
                    'time': "Saturday",
                    'close': 2730000000
                }, {
                    'time': "Sunday",
                    'close': 2736000000
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
                    style: {
                        width: 100
                        //margin:40
                    },
                    yField: ["close"],
                    style: {
                        fill: "steelblue"
                    }
                }
            ]
        },
        {
            xtype: "gridpanel",
            store: Ext.create('Ext.data.Store', {
                storeId: "drawWindowStore",
                groupField: 'SortWeek',
                //groupDir:"DESC",
                sortOnLoad: false,
                fields: ["divId", 'Week', 'StartTime', 'EndTime']
                //data: dwPars.drawWindowData
            }),

            features: new Ext.grid.feature.Grouping({

                groupHeaderTpl: '{name}{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                hideGroupedHeader: true,
                startCollapsed: true
            }),
            tbar: [{
                text: 'Expand All',
                handler: function () {
                    var me = this.up("gridpanel")
                    me.features[0].expandAll()
                }
            }, {
                text: 'Collapse All',
                handler: function () {
                    var me = this.up("gridpanel")
                    me.features[0].collapseAll()
                }
            }],
            columnLines: true,
            rowLines: true,
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 1,
                listeners: {
                    edit: function (edit, context, eOpts) {
                        var me = context.grid.up("window");
                        console.log(arguments)
                        var aStarttime = context.newValues.StartTime.split(":");
                        var aEndtime = context.newValues.EndTime.split(":");
                        var starttime = new Date(1970, 1, 1, aStarttime[0], aStarttime[1], aStarttime[2])
                        var endtime = new Date(1970, 1, 1, aEndtime[0], aEndtime[1], aEndtime[2])
                        if (starttime > endtime) {
                            me.dwPars.drawWindowData[context.rowIdx].StartTime = context.originalValues.StartTime
                            me.dwPars.drawWindowData[context.rowIdx].EndTime = context.originalValues.EndTime
                            context.store.store.loadData(me.dwPars.drawWindowData)
                            Ext.Msg.alert('Error', 'Start time is not greater than end time .');
                            return false;
                        }
                        console.log($("#" + context.originalValues.divId))
                        $("#" + context.originalValues.divId).attr("starttime", starttime).attr("endtime", endtime)
                        //return false
                    }
                }
            },
            selModel: 'rowmodel',
            columns: [
                {
                    text: 'divId', dataIndex: 'divId', hidden: true
                },
                {
                    text: 'Week',
                    dataIndex: 'Week',
                    flex: 1
                },
                {
                    text: 'Start time', dataIndex: 'StartTime', flex: 1, editor: {
                    xtype: 'spinnerfield',
                    allowBlank: false,
                    validator: isTime,
                    onSpinUp: function () {
                        var oldValue = this.getValue().split(":");
                        var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                        time += 10000;
                        var newTime = new Date(time)
                        var H = newTime.getHours()
                        var M = newTime.getMinutes()
                        var S = newTime.getSeconds()
                        //if(newTime>2649600000&newTime<2736000000)
                        this.setValue(H + ":" + M + ":" + S);
                    },
                    onSpinDown: function () {
                        var oldValue = this.getValue().split(":");
                        var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                        time -= 10000;
                        var newTime = new Date(time)
                        var H = newTime.getHours()
                        var M = newTime.getMinutes()
                        var S = newTime.getSeconds()
                        this.setValue(H + ":" + M + ":" + S);
                    }
                }
                },
                {
                    text: 'End time', dataIndex: 'EndTime', flex: 1
                    , editor: {
                    xtype: 'spinnerfield',
                    allowBlank: false,
                    validator: isTime,
                    onSpinUp: function () {
                        var oldValue = this.getValue().split(":");
                        var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                        time += 10000;
                        var newTime = new Date(time)
                        var H = newTime.getHours()
                        var M = newTime.getMinutes()
                        var S = newTime.getSeconds()
                        //if(newTime>2649600000&newTime<2736000000)
                        this.setValue(H + ":" + M + ":" + S);
                    },
                    onSpinDown: function () {
                        var oldValue = this.getValue().split(":");
                        var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                        time -= 10000;
                        var newTime = new Date(time)
                        var H = newTime.getHours()
                        var M = newTime.getMinutes()
                        var S = newTime.getSeconds()
                        this.setValue(H + ":" + M + ":" + S);
                    }
                }
                }
            ]
        }
    ],

    listeners: {

        boxready: function () {
            var me = this;
            var canIntval= setInterval(isCanvasRender,1)
            function isCanvasRender(){
                if(me.el.dom.querySelectorAll("canvas").length>4){
                    me.controller.dwParsInit.call(me)
                    clearInterval(canIntval)
                    Ext.MessageBox.progress('Message', {msg: 'Server Ready ...'});
                    var count = 0;
                    var interval_0 = setInterval(function () {
                        Ext.MessageBox.updateProgress(count / 9, 'Loading,please wait... ');
                        count++
                        if (count == 10) {
                            clearInterval(interval_0)
                            Ext.MessageBox.close();
                            myAjax("resources/test1.php?par=getvalue&nodename=" + me.sDevNodeName + "&type=Weekly_Schedule", function (response) {
                                try {
                                    var text = Ext.decode(response.responseText);
                                    if (text) {
                                        me.controller.drawWindowAddDiv.call(me, text)
                                    }
                                } catch (e) {
                                    Ext.Msg.alert('Error', 'load data failure .');
                                }
                            })
                        }
                    }, 100)
                }
            }
        },
        el: {
            contextmenu: function (win, el, eOpts) {
                var me = Ext.getCmp(this.id);
                console.log(me)
                //柱子间隔 27  宽100  高625
                if (el.tagName != "CANVAS") {
                    return;
                };
                console.log(win.pageY)
                if(win.pageY<100){
                    return ;
                }
                console.log(me.el.getTop(true))
                var WeekArrJson = me.dwPars.WeekArrJson;
                var pageLeft = win.pageX-me.el.getLeft(true);
                for(var i=0;i<WeekArrJson.length;i++){
                    if(WeekArrJson[i].left<pageLeft&WeekArrJson[i].left+100>pageLeft){
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
                                    me.addNewBar(win)
                                }
                            },{
                                text:"Time Value",
                                disabled:true
                            },{
                                text:"Paste",
                                disabled:true
                            }
                            ]
                        });
                        break;
                    }

                }



                win.stopEvent();
            }
        }
    },
    addNewBar: function (eve) {
        var win = this;
        var WeekArr = win.dwPars.WeekArrJson
        var dw = win.dwPars.dw;
        var bWidth = win.dwPars.bWidth;
        var winOffsetLeft = win.dwPars.winOffsetLeft
        var winOffsetTop = win.dwPars.winOffsetTop
        var posLeftArr = win.dwPars.posLeftArr;
        var bMarginTop = win.dwPars.bMarginTop
        var bMaxHeight = win.dwPars.bMaxHeight
        var bLeft;

        var div = win.dwPars.div()
            .css("top", eve.pageY - winOffsetTop + "px");
        div.addClass("new")
        for (var i = 0; i < posLeftArr.length; i++) {
            if (isBarCollsion(eve.pageX, eve.pageY, posLeftArr[i] + winOffsetLeft, bMarginTop, bWidth, bMaxHeight)) {
                bLeft = posLeftArr[i];
                div.addClass(WeekArr[i].name);
                div.addClass("new"+WeekArr[i].name);
            }
        }
        if (bLeft) {
            $(dw.el.dom).append(div)
        } else {
            div.remove()
        }
        $(dw.el.dom).append(div)
        win.weekDivResetPosition()
        win.controller.weekDivAddEvent.call(win, div)
        var tmStart = win.getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
        var tmEnd = win.getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
        div.attr("startTime", tmStart).attr("endTime", tmEnd)
    },
    getTimeByLocation: function (weizhi) {
        var me=this;
        var time = new Date(me.dwPars.oneDay * (weizhi / me.dwPars.bMaxHeight) + 2649600000);
        return time;
    },
    weekDivResetPosition: function (banimate) {
        var me = this;
        var WeekArrJson = me.dwPars.WeekArrJson
        var oCanvas = me.dwPars.oCanvas
        var oneDay = me.dwPars.oneDay;
        var bMarginTop = me.dwPars.bMarginTop;
        WeekArr = me.dwPars.WeekArr;
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
                        $(aWeeks[i]).css("left", me.dwPars.dw.el.getWidth() / 2.5);
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
});
