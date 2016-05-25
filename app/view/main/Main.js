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
/*

Ext.onReady(function(){
    setTimeout(function(){

Ext.create( 'svgxml.view.window.DrawWeeksWindow',{
    sDevNodeName:"9900601",
    sDevName:"9900",
    id:"drawWindow"
})


    },5000)
})
*/
