Ext.define("svgxml.view.tab.DrawPanel", {
    extend: "Ext.draw.Container",
    xtype: "drawpanel",
    requires: [
        "svgxml.view.tab.DrawPanelController",
        "svgxml.view.tab.DrawPanelModel"
    ],
    engine: "Ext.draw.engine.Svg",
    controller: "tab-drawpanel",
    viewModel: {
        type: "tab-drawpanel"
    },
    autoScroll: true,
    closable: true,
    bodyStyle: 'background:url(resources/img/square.gif);',
    bodyPadding: "0",
    layout: {
        type: "absolute"
    },
    enableDragDrop: true,

    listeners: {
        boxready: "boxready",
        add: "add",
        render: "render",
        show: "show",
        hide: "hide",

        el: {
            contextmenu: function (th, el, eOpts) {
                console.log(arguments)
                if (el.tagName != "svg") {
                    return;
                }
                ;

                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    x: th.pageX,
                    y: th.pageY,
                    listeners: {
                        show: function (thi, eOpts) {
                            try {
                                if (hideCom)
                                    thi.getComponent("addSlot").setDisabled(false);
                            } catch (e) {

                            }

                        }
                    }
                })
                th.stopEvent();
            }
        }
    },
    afterFirstLayout: function (th) {
        this.callParent(arguments);
        var body = this.body;
        console.log(body)

        this.PanelDropTarget = new Ext.dd.DropTarget(body.id, {
            ddGroup: "DevTreeDragDropGroup",
            notifyEnter: function (ddSource, e, data) {
                //console.log("notifyEnter")
                //console.log(arguments)
                //Add some flare to invite drop.
                body.stopAnimation();
                body.highlight();
            },
            notifyDrop: function (ddSource, e, data) {
                var selectRecord = ddSource.dragData.records[0].data;
                var aData, ostore, type = selectRecord.type, typeName = getNameByType(selectRecord.type), value = selectRecord.value + "", title = selectRecord.text;
                console.log(selectRecord)
                console.log(typeName)
                if (type != 0 & type != 3) {
                    aData = [
                        {'name': 'Out', 'value': "0"},
                        {'name': 'Instance', 'value': value.substr(5, 6)},
                        {'name': 'In', 'value': "2"}
                    ];
                } else {
                    aData = [
                        {'name': 'Out', 'value': "0"},
                        {'name': 'Instance', 'value': value.substr(5, 6)}
                    ];
                }
                ostore = Ext.create(typeName, {
                    data: aData,
                    listeners: {
                        add: function (th) {
                            setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                        }
                    }
                })
                getCurrentDrawPanel().add(Ext.create("svgxml.view.grid.TypeGrid", {
                        title: title,
                        store: ostore,
                        x: e.browserEvent.offsetX,
                        y: e.browserEvent.offsetY,
                        icon: "resources/img/SVG/" + typeName + ".svg",
                        listeners: {
                            add: function () {
                                setTimeout(currentDrawPanelGridPanelsTrSetId,1000)
                            },
                            render: function (thi) {

                                thi.datas.type =type;
                                thi.datas.value =value;
                                console.log(thi.getStore().data);

                            }
                        }
                    })
                );

                // Reference the record (single selection) for readability

                return true;
            }
        });

    }/*,
     beforeDestroy: function(){
     var target = this.PanelDropTarget;
     if (target) {
     target.unreg();
     this.PanelDropTarget = null;
     }
     this.callParent();
     }*/
});



