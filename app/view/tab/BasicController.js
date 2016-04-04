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
                //console.log(target)
                //console.log(e)
                //console.log(id)
                var typeName = Ext.get(el).select(".x-grid-cell-inner").elements[1].innerHTML;
                Ext.getCmp(id).add(Ext.create("svgxml.view.grid.TypeGrid", {
                    title: typeName,
                    store: Ext.create(typeName,{
                        listeners: {
                            add: function () {
                                setTimeout(currentDrawPanelGridPanelsTrSetId,1000)
                            }
                        }
                    }),
                    x: e.browserEvent.offsetX,
                    y: e.browserEvent.offsetY,
                    icon: "img/SVG/" + typeName + ".svg"
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



var slotsJson={
    add:{
        type:"52",
        initData:[
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'aodo':{
        type:"58",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:false
    },
    'aver':{
        type:"55",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'comp':{
        type:"61",
        initData: [
            {"name": "model", value: "0"},
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:false
    },
    'count':{
        type:"62",
        initData: [
            {'name': 'Out', 'value': "1"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'delay':{
        type:"60",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'Time', 'value': "2"}
        ],
        isAddSlot:false
    },
    'enth':{
        type:"70",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'Temp', 'value': "1"},
            {'name': 'RH', 'value': "2"}
        ],
        isAddSlot:false
    },
    'fa':{
        type:"54",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "1"}
        ],
        isAddSlot:false
    },
    'fd':{
        type:"57",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "1"}
        ],
        isAddSlot:false
    },
    'hour':{
        type:"59",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:false
    },
    'hy':{
        type:"68",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'On', 'value': "2"},
            {'name': 'Off', 'value': "2"}
        ],
        isAddSlot:false
    },
    'lock':{
        type:"69",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'Unlock', 'value': "2"}
        ],
        isAddSlot:false
    },
    'logic':{
        type:"56",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },

    'max':{
        type:"63",
        initData: [
            {'name': 'model', 'value': "0"},
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'mul':{
        type:"53",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'pid':{
        type:"67",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'PV', 'value': "1"},
            {'name': 'SP', 'value': "2"},
            {'name': 'Enable', 'value': "3"},
            {'name': 'Direction', 'value': "4"}
        ],
        isAddSlot:false
    },
    'Pulse':{
        type:"65",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'Enable', 'value': "1"},
            {'name': 'OnTime', 'value': "2"},
            {'name': 'OffTime', 'value': "3"}
        ],
        isAddSlot:false
    },
    'sub':{
        type:"52",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"}
        ],
        isAddSlot:true,
        maxSlot:10
    },
    'Switch':{
        type:"64",
        initData: [
            {'name': 'Out', 'value': "0"},
            {'name': 'In', 'value': "2"},
            {'name': 'In', 'value': "2"},
            {'name': 'Enable', 'value': "3"}
        ],
        isAddSlot:false
    }

};
Ext.define('add', {
    extend: "Ext.data.Store",
    storeId: 'aodoStore',
    fields: ['name', 'value'],
    data: slotsJson.add.initData,
    proxy: oproxy
});
Ext.define('aodo', {
    extend: "Ext.data.Store",
    storeId: 'aodoStore',
    fields: ['name', 'value'],
    data: slotsJson.aodo.initData,
    proxy: oproxy
});
Ext.define('aver', {
    extend: "Ext.data.Store",
    storeId: 'averStore',
    fields: ['name', 'value'],
    data: slotsJson.aver.initData,
    proxy: oproxy
});
Ext.define('comp', {
    extend: "Ext.data.Store",
    storeId: 'compStore',
    fields: ['name', 'value'],
    data: slotsJson.comp.initData,
    proxy: oproxy
});
Ext.define('count', {
    extend: "Ext.data.Store",
    storeId: 'countStore',
    fields: ['name', 'value'],
    data: slotsJson.count.initData,
    proxy: oproxy
});
Ext.define('delay', {
    extend: "Ext.data.Store",
    storeId: 'delayStore',
    fields: ['name', 'value'],
    data: slotsJson.delay.initData,
    proxy: oproxy
});
Ext.define('enth', {
    extend: "Ext.data.Store",
    storeId: 'enthStore',
    fields: ['name', 'value'],
    data: slotsJson.enth.initData,
    proxy: oproxy
});
Ext.define('fa', {
    extend: "Ext.data.Store",
    storeId: 'faStore',
    fields: ['name', 'value'],
    data: slotsJson.fa.initData,
    proxy: oproxy
});
Ext.define('fd', {
    extend: "Ext.data.Store",
    storeId: 'fdStore',
    fields: ['name', 'value'],
    data: slotsJson.fd.initData,
    proxy: oproxy
});
Ext.define('hour', {
    extend: "Ext.data.Store",
    storeId: 'hourStore',
    fields: ['name', 'value'],
    data: slotsJson.hour.initData,
    proxy: oproxy
});
Ext.define('hy', {
    extend: "Ext.data.Store",
    storeId: 'hyStore',
    fields: ['name', 'value'],
    data: slotsJson.hy.initData,
    proxy: oproxy
});
Ext.define('lock', {
    extend: "Ext.data.Store",
    storeId: 'lockStore',
    fields: ['name', 'value'],
    data: slotsJson.lock.initData,
    proxy: oproxy
});
Ext.define('logic', {
    extend: "Ext.data.Store",
    storeId: 'logicStore',
    fields: ['name', 'value'],
    data: slotsJson.logic.initData,
    proxy: oproxy
});

Ext.define('max', {
    extend: "Ext.data.Store",
    storeId: 'maxStore',
    fields: ['name', 'value'],
    data: slotsJson.max.initData,
    proxy: oproxy
});
Ext.define('mul', {
    extend: "Ext.data.Store",
    storeId: 'mulStore',
    fields: ['name', 'value'],
    data: slotsJson.mul.initData,
    proxy: oproxy
});
Ext.define('pid', {
    extend: "Ext.data.Store",
    storeId: 'pidStore',
    fields: ['name', 'value'],
    data: slotsJson.pid.initData,
    proxy: oproxy
});
Ext.define('Pulse', {
    extend: "Ext.data.Store",
    storeId: 'PulseStore',
    fields: ['name', 'value'],
    data: slotsJson.Pulse.initData,
    proxy: oproxy
});
Ext.define('sub', {
    extend: "Ext.data.Store",
    storeId: 'subStore',
    fields: ['name', 'value'],
    data: slotsJson.sub.initData,
    proxy: oproxy
});
Ext.define('Switch', {
    extend: "Ext.data.Store",
    storeId: 'switchStore',
    fields: ['name', 'value'],
    data: slotsJson.Switch.initData,
    proxy: oproxy
});
/*
 Ext.define('timer', {
 extend:"Ext.data.Store",
 storeId: 'timerStore',
 fields: ['name', 'value'],
 data:slotsJson.timer.initData,
 proxy: oproxy
 });
 Ext.define('etolalaz', {
 extend:"Ext.data.Store",
 storeId: 'tolalazerStore',
 fields: ['name', 'value'],
 data:slotsJson.tolalazer.initData,
 proxy: oproxy
 });*/
