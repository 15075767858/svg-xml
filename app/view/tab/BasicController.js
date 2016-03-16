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
    basicRender:function () {
    },
    basicViewready:function () {
        var overrides = {};
        var aTables = Ext.get("leftPanelIcons").select(".x-grid-item")
        Ext.each(aTables.elements, function (el) {
            var dd = new Ext.dd.DragSource(el, {
                ddGroup: "IconDragDropGroup",
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
    basicItemclick: function () {

        console.log(arguments);

    },
    basicAfterDragDrop: function () {
        console.log(arguments)
    }
});
