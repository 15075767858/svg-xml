var hideCom;

Ext.define('svgxml.view.grid.TypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-typegrid',
    girdviewready:function(th,eO){
        th.getHeader().el.dom.oncontextmenu=function(e){
            e.preventDefault();
            th.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    floating: true,  // usually you want this set to True (default)
                    x: e.pageX,
                    y: e.pageY//,
                    /*listeners:{
                     click:function(){
                     console.log(Ext.removeNode(th))
                     }
                     }*/
                })
            )
            console.log(arguments)

        }
    },
    girdmove: function (t, x, y, eOpts) {
        if (x < 0 & !t.getActiveAnimation()) {
            t.setPagePosition(t.up().getX() + 10, t.up().getY() + 10, true)
        }
        if (y < 0 & !t.getActiveAnimation()) {
            t.setPagePosition(t.up().getX() + 10, t.up().getY() + 10, true)
        }
    },
    girditemdblclick:function (me, record, item, index, e, eopts) {
        var win = Ext.create("Ext.window.Window", {
            title: "表格",
            width: 300,
            height: 200,
            layout: "fit",
            autoShow:true,
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
                    { xtype: "textfield", name: "name", fieldLabel: "名字" },
                    { xtype: "numberfield", name: "age", fieldLabel: "年龄" ,maxValue: 3,  minValue: 0 },
                    { xtype: "textfield", name: "phone", fieldLabel: "电话" }
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
    }

});
