Ext.define('svgxml.view.tab.DrawPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tab-drawpanel',
    boxready: function (th, width, height, eOpts) {
        th.el.dom.onmousedown = function (e) {

            var mainSurface = th.getSurface("temp"); // --- getSurface('main')
            var oLine = { // add sprite to the surface
                type: 'line',
                fromX: e.offsetX,
                fromY: e.offsetY,

                strokeStyle: '#1F6D91',
                lineWidth: 3
            };
            // --- renders all the sprites in the surface
            th.el.dom.onmousemove = function (e) {
                th.getSurface("temp").removeAll();
                oLine.toX = e.offsetX;
                oLine.toY = e.offsetY;
                mainSurface.add(oLine)
                mainSurface.renderFrame();
            }
            th.el.dom.onmouseup = function (e) {
                th.el.dom.onmousemove = null;
            }
        }

        th.setSprites([{
            type: 'path',
            path: 'M115,115 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
            fillStyle: 'blue'
        }])

    },

    render: function (th, eOpts) {

        new Ext.dd.DDTarget(th.getId(), "IconDragDropGroup");
    },
    show: function (th, event, eOpts) {
        // currentDrawPanel=this;
        console.log("这是DrawPanel.show事件")
    }

});
