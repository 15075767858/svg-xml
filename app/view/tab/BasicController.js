/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('svgxml.view.tab.BasicController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],
    alias: 'controller.grid-panel-gridpanel',
    basicRender: function () {
    },
    basicViewready: function () {
        var overrides = {};
        var aTables = Ext.get("leftPanelIcons").select(".x-grid-item")
        Ext.each(aTables.elements, function (el) {
            var dd = new Ext.dd.DragSource(el, {
                ddGroup: "IconDragDropGroup",
                isTarget: false
            })
            dd.afterDragDrop = function (target, e, id) {
                    var typeName = Ext.get(el).select(".x-grid-cell-inner").elements[1].innerHTML;
                    console.log(typeName)

                var store=Ext.create(typeName, {
                    listeners: {
                        add: function (store) {
                            setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                        }
                    }
                })
                store.setData(slotsJson[typeName].initData())
                    Ext.getCmp(id).add(Ext.create("svgxml.view.grid.TypeGrid", {
                        title: typeName,
                        store: store,
                        x: e.browserEvent.offsetX,
                        y: e.browserEvent.offsetY,
                        icon: "resources/img/SVG/" + typeName + ".svg",
                        listeners: {
                            render: function (thi) {
                                thi.datas = {
                                    isAddSlot: slotsJson[typeName].isAddSlot,
                                    plantId: "",
                                    type: slotsJson[typeName].type
                                };
                            }
                        }
                    }));
            }

            Ext.apply(dd, overrides);
        })
    },
    basicItemclick: function () {

        console.log(arguments);

    },
    basicAfterDragDrop: function () {
        console.log(arguments)
    }
});

var oproxy = {
    type: 'memory',
    reader: {
        type: 'json',
        rootProperty: 'items'
    }
}

Ext.define('AI', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
    //data: slotsJson.AI.initData(),

    //proxy: oproxy
});
Ext.define('AO', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
    //data: slotsJson.AO.initData(),

    //proxy: oproxy
});
Ext.define('BI', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
    //data: slotsJson.DI.initData(),

    //proxy: oproxy
});
Ext.define('BO', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
});
Ext.define('AV', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
    //data: slotsJson.AV.initData(),

    //proxy: oproxy
});
Ext.define('BV', {
    extend: "Ext.data.Store",
    fields: ['name', 'value']
    //data: slotsJson.DV.initData(),

    //proxy: oproxy
});

Ext.define('add', {
    extend: "Ext.data.Store",
    storeId: 'addStore',
    fields: ['name', 'value'],
    data: slotsJson.add.initData(),

    proxy: oproxy
});
Ext.define('aodo', {
    extend: "Ext.data.Store",
    storeId: 'aodoStore',
    fields: ['name', 'value'],
    data: slotsJson.aodo.initData(),
    proxy: oproxy
});
Ext.define('aver', {
    extend: "Ext.data.Store",
    storeId: 'averStore',
    fields: ['name', 'value'],
    data: slotsJson.aver.initData(),
    proxy: oproxy
});
Ext.define('comp', {
    extend: "Ext.data.Store",
    storeId: 'compStore',
    fields: ['name', 'value'],
    data: slotsJson.comp.initData(),
    proxy: oproxy
});
Ext.define('count', {
    extend: "Ext.data.Store",
    storeId: 'countStore',
    fields: ['name', 'value'],
    data: slotsJson.count.initData(),
    proxy: oproxy
});
Ext.define('delay', {
    extend: "Ext.data.Store",
    storeId: 'delayStore',
    fields: ['name', 'value'],
    data: slotsJson.delay.initData(),
    proxy: oproxy
});
Ext.define('enth', {
    extend: "Ext.data.Store",
    storeId: 'enthStore',
    fields: ['name', 'value'],
    data: slotsJson.enth.initData(),
    proxy: oproxy
});
Ext.define('fa', {
    extend: "Ext.data.Store",
    storeId: 'faStore',
    fields: ['name', 'value'],
    data: slotsJson.fa.initData(),
    proxy: oproxy
});
Ext.define('fd', {
    extend: "Ext.data.Store",
    storeId: 'fdStore',
    fields: ['name', 'value'],
    data: slotsJson.fd.initData(),
    proxy: oproxy
});
Ext.define('hour', {
    extend: "Ext.data.Store",
    storeId: 'hourStore',
    fields: ['name', 'value'],
    data: slotsJson.hour.initData(),
    proxy: oproxy
});
Ext.define('hy', {
    extend: "Ext.data.Store",
    storeId: 'hyStore',
    fields: ['name', 'value'],
    data: slotsJson.hy.initData(),
    proxy: oproxy
});
Ext.define('lock', {
    extend: "Ext.data.Store",
    storeId: 'lockStore',
    fields: ['name', 'value'],
    data: slotsJson.lock.initData(),
    proxy: oproxy
});
Ext.define('logic', {
    extend: "Ext.data.Store",
    storeId: 'logicStore',
    fields: ['name', 'value', "delay", "time", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"],
    data: slotsJson.logic.initData(),
    proxy: oproxy
});

Ext.define('max', {
    extend: "Ext.data.Store",
    storeId: 'maxStore',
    fields: ['name', 'value'],
    data: slotsJson.max.initData(),
    proxy: oproxy
});
Ext.define('mul', {
    extend: "Ext.data.Store",
    storeId: 'mulStore',
    fields: ['name', 'value'],
    data: slotsJson.mul.initData(),
    proxy: oproxy
});
Ext.define('pid', {
    extend: "Ext.data.Store",
    storeId: 'pidStore',
    fields: ['name', 'value'],
    data:  slotsJson.pid.initData(),
    proxy: oproxy
});
Ext.define('pulse', {
    extend: "Ext.data.Store",
    storeId: 'pulseStore',
    fields: ['name', 'value'],
    data: slotsJson.pulse.initData(),
    proxy: oproxy
});
Ext.define('sub', {
    extend: "Ext.data.Store",
    storeId: 'subStore',
    fields: ['name', 'value'],
    data: slotsJson.sub.initData(),
    proxy: oproxy
});
Ext.define('switch', {
    extend: "Ext.data.Store",
    storeId: 'switchStore',
    fields: ['name', 'value'],
    data: slotsJson.switch.initData(),
    proxy: oproxy
});
Ext.define('SCFM', {
    extend: "Ext.data.Store",
    storeId: 'SCFMStore',
    fields: ['name', 'value'],
    data: slotsJson.SCFM.initData(),
    proxy: oproxy
});
Ext.define('scale', {
    extend: "Ext.data.Store",
    storeId: 'scaleStore',
    fields: ['name', 'value'],
    data: slotsJson.scale.initData(),
    proxy: oproxy
});
/*
 Ext.define('timer', {
 extend:"Ext.data.Store",
 storeId: 'timerStore',
 fields: ['name', 'value'],
 data:slotsJson.timer.initData(),
 proxy: oproxy
 });
 Ext.define('etolalaz', {
 extend:"Ext.data.Store",
 storeId: 'tolalazerStore',
 fields: ['name', 'value'],
 data:slotsJson.tolalazer.initData(),
 proxy: oproxy
 });*/
