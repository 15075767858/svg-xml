/**
 * Created by Administrator on 2016/2/25.
 */


Ext.define('svgxml.view.tab.BasicTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'basic-tabs',
    requires: [
        "svgxml.view.tree.XmlTree",
        "Ext.tree.Panel",
        "svgxml.view.tree.DevTree",
        "svgxml.view.tab.BasicController"
    ],
    width: 400,
    height: 300,
    maxHeight: "100%",
    defaults: {
        //bodyPadding: 10,
        //autoScroll: true
    },
    style: "border-right:10px",
    controller: 'grid-panel-gridpanel',

    items: [{
        title: 'Active',
        layout: "border",
        items: [
            Ext.create("svgxml.view.tree.DevTree", {
                region: "north",
                id: "leftDevTree",
                height: 300,
                minHeight: 200
                //maxHeight: 400
            }),
            Ext.create("Ext.grid.Panel", {
                region: "center",
                manageHeight: true,
                title: "Icons",
                autoScroll: true,
                collapsible: true,
                //resizable: true,
                stateful: true,
                store: Ext.create("svgxml.store.SvgImgs", {}),
                id: "leftPanelIcons",
                columns: [
                    {
                        draggable: false,
                        menuDisabled: true,
                        sortable: false,
                        header: 'type', dataIndex: "src", flex: 1,
                        renderer: function (value) {
                            return Ext.String.format('<img src="{0}" width="67px" height="33px"/>', value);
                        }
                    },
                    {draggable: false, menuDisabled: true, sortable: false, header: 'name', dataIndex: 'name', flex: 1}
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
                    expand: function () {
                        setTimeout(function () {
                            Ext.getCmp("leftDevTree").setHeight(400);
                            //console.log(Ext.getCmp("leftDevTree").getHeight());
                        }, 50)

                    },
                    collapse: function () {
                        setTimeout(function () {
                            Ext.getCmp("leftDevTree").setHeight("95%");
                            //console.log(Ext.getCmp("leftDevTree").getHeight());
                        }, 50)

                    },
                    render: "basicRender",
                    viewready: "basicViewready",
                    itemclick: "basicItemclick",
                    afterDragDrop: "basicAfterDragDrop"
                }

            })
        ]
    }, {
        title: 'Inactive'
        //disabled: true,
        //width:"50%"
        //html: KitchenSink.DummyText.extraLongText
    }]
});

