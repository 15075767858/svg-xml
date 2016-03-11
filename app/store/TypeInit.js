/**
 * Created by Administrator on 2016/3/8.
 */
Ext.create('Ext.data.Store', {
    storeId:'addStore',
    fields:['name', 'value'],
    data:[
        { 'name': 'out', 'value':"4"},
        { 'name': 'in',  'value':"2"},
        { 'name': 'in',  'value':"2"}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
/*

Ext.define("svgxml.store.TypeInit", {
    extend: "Ext.data.Store",
    fields: ["name"],
    data: Imgs
});*/
