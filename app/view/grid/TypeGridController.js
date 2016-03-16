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
    griditemmousedown: function (th, record, item, index,el, e, eOpts) {
       // console.log(arguments);
        curDrawPanel.setSprites([{
            type: 'path',
            path: 'M115,115 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
            fillStyle: 'blue'
        }])
              /*      var mainSurface = curDrawPanel.getSurface("temp"); // --- getSurface('main')
        var oLine = { // add sprite to the surface
            type: 'line',
            fromX: 50,
            fromY: 50,
            toX:100,
            toY:100,
            strokeStyle: '#1F6D91',
            lineWidth: 3
        };
        mainSurface.add(oLine)
        mainSurface.renderFrame();*/
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
