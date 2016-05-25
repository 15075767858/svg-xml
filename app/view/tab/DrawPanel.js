Ext.define("svgxml.view.tab.DrawPanel", {
    extend: "Ext.panel.Panel",
    xtype: "drawpanel",

    requires: [
        "svgxml.view.tab.DrawPanelController",
        "svgxml.view.tab.DrawPanelModel",
        "svgxml.view.grid.PropertypeGrid"
    ],
    //engine: "Ext.draw.engine.Svg",
    controller: "tab-drawpanel",
    viewModel: {
        type: "tab-drawpanel"
    },
    //autoScroll: true,
    closable: true,
    bodyStyle: 'background:url(resources/img/square.png);',
    bodyPadding: "0",
    layout: {
        type: "absolute"
    },
    initComponent: function () {
        this.height = 3000;
        this.width = 3000;
        this.callParent();
    },
    enableDragDrop: true,
    listeners: {
        boxready: "boxready",
        //add: "add",
        render: "render",
        show: "show",
        hide: "hide",
        close: "close",
        el: {
            selectstart: function (th) {
                th.stopEvent();
                return ;
            },
            contextmenu: function (th, el, eOpts) {
                console.log(arguments)
                if (el.tagName != "svg") {
                    return;
                };


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
                console.info(selectRecord)
                var aData, type = selectRecord.type, typeName = getNameByType(selectRecord.type), value = selectRecord.value, title = selectRecord.text;
                console.log(typeName)
                aData = slotsJson[typeName].initData();
                aData[1].value = Number.valueOf()(value.substr(5, 6));
                var ostore = Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: aData
                })

                /*setInterval(function(){
                 aData[1].value=Math.random()*100
                 console.log(aData)
                 },1000)*/
                console.info(ostore)

                getCurrentDrawPanel().add(
                    Ext.create("svgxml.view.grid.TypeGrid", {
                        title: title,
                        store: ostore,
                        x: e.browserEvent.offsetX+5,
                        y: e.browserEvent.offsetY+5,
                        icon: "resources/img/SVG/" + typeName + ".svg",
                        listeners: {
                            add: function () {
                                setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                            },
                            render: function (thi) {
                                /*thi.datas.isAddSlot=slotsJson[getNameByType(type)].isAddSlot;
                                 thi.datas.plantId=""
                                 thi.datas.type =type;
                                 thi.datas.value =value;*/
                                thi.datas = {
                                    isAddSlot: slotsJson[getNameByType(type)].isAddSlot,
                                    plantId: "",
                                    type: type,
                                    value: value
                                };
                                //console.log(thi.getStore().data);
                            }
                        }
                    })
                );

                // Reference the record (single selection) for readability

                return true;
            }
        });

    }
});



