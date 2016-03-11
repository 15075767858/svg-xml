/**
 * Created by Administrator on 2016/2/27.
 */

Ext.define("svgxml.store.Files", {
    extend: "Ext.data.TreeStore",
    alias:"svgxml.Files",

    root: {
        expanded: true,
        "children": [
            /* {leaf: true, text: "Action.js"},
            {leaf: true, text: "Layer.js"},
            {leaf: true, text: "LoadMask.js"},*/
            {text: "192.168.1.1", children: [
            {leaf: true, text: "1100"},
            {leaf: true, text: "1101"}
        ]},
            {text: "192.168.1.2",
            expanded: true,
            children: [
                {leaf: true, text: "1201"},
                {leaf: true, text: "1202"},
                {leaf: true, text: "1203"}
            ]
        }, {
            text: "192.168.1.3",
            children: [
                {leaf: true, text: "1301"},
                {leaf: true, text: "1301"},
                {leaf: true, text: "1301" }]
        }, {
            text: "192.168.1.4",
            children: [{
                text: "dom",
                children: [{leaf: true, text: "Element.form.js"}, {leaf: true, text: "Element.static-more.js"}]
            }]
        }
        ]
    }
});

