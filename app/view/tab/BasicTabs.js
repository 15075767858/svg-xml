/**
 * Created by Administrator on 2016/2/25.
 */


Ext.define('svgxml.view.tab.BasicTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'basic-tabs',
    requires: [
        "svgxml.view.tree.XmlTree",
        "Ext.tree.Panel",
        'svgxml.view.main.MainController',
        "svgxml.view.tree.DevTree"
    ],
    width: 400,
    height: 300,
    defaults: {
        //bodyPadding: 10,
        //autoScroll: true
    },
    style: "border-right:10px",
    controller: 'main',

    items: [{
        title: 'Active Tab',
        layout: "border",
        items: [
            Ext.create("svgxml.view.tree.DevTree", {
                region: "north",
                maxHeight: 300
            }),
            Ext.create("Ext.grid.Panel", {
                region: "center",
                manageHeight: true,
                title: "Icons",

                autoScroll: true,
                collapsible: true,
                //resizable: true,
                stateful: true,
                //title:"aaa",
                store: Ext.create("svgxml.store.SvgImgs", {}),
                id: "leftPanelIcons",
                columns: [
                    {
                        header: 'type', dataIndex: "src", flex: 1,
                        renderer: function (value) {
                            return Ext.String.format('<img src="{0}" width="67px" height="67px"/>', value);
                        }
                    },
                    {header: 'name', dataIndex: 'name', flex: 1}
                ],
                autoShow: true,

                viewConfig: {

                    /*   plugins: {
                     ptype: 'gridviewdragdrop',
                     dragText: 'Drag and drop to reorganize',
                     ddGroup:    'DragDropGroup1',
                     enableDrop:true
                     }*/

                },
                listeners: {
                    render: function () {
                        // alert("aaaaaaa")
                    },
                    viewready: function () {
                        console.log(arguments);
                        var overrides = {};
                        var aTables = Ext.get("leftPanelIcons").select(".x-grid-item")
                        Ext.each(aTables.elements, function (el) {
                            var dd = new Ext.dd.DragSource(el, {
                                ddGroup: "DragDropGroup2",
                                isTarget: false

                            })
                            dd.afterDragDrop = function (target, e, id) {
                                console.log(target)
                                console.log(e)

                                console.log(id)
                                var typeName = Ext.get(el).select(".x-grid-cell-inner").elements[1].innerHTML;
                                Ext.getCmp(id).add(Ext.create("svgxml.view.grid.TypeGrid", {
                                    title: typeName,
                                    store: typeName + "Store",
                                    x: e.browserEvent.offsetX,
                                    y: e.browserEvent.offsetY,
                                    icon: "img/SVG/" + typeName + ".svg"
                                }));
                            }

                            Ext.apply(dd, overrides);
                        })
                    },
                    itemclick: function () {

                        console.log(arguments);

                    },
                    afterDragDrop: function () {
                        console.log(arguments)
                    }
                }

            })
        ]
    }, {
        title: 'Inactive Tab'
        //disabled: true,
        //width:"50%"
        //html: KitchenSink.DummyText.extraLongText
    }]
});

