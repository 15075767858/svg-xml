var curDrawPanel;
Ext.define('svgxml.view.tab.DrawPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tab-drawpanel',
    boxready: function (th, width, height, eOpts) {
        var iLeft = th.up().el.dom.offsetLeft;
        var iTop = th.up().el.dom.offsetTop;
curDrawPanel=th;
        curDrawPanel.setSprites([{
            type: 'path',
            path: 'M115,115 c0,-25 50,25 50,0 c0,-25 -50,25 -50,0',
            fillStyle: 'blue'
        }])

       th.el.dom.onmousedown = function (e) {
            //if(e.target.tagName)

            var iMDX = e.offsetX
            var iMDY = e.offsetY
            // --- renders all the sprites in the surface

            th.el.dom.onmousemove = function (e) {

                var mainSurface = th.getSurface("temp"); // --- getSurface('main')
                var oLine = { // add sprite to the surface
                    type: 'line',
                    fromX: iMDX,
                    fromY: iMDY,
                    strokeStyle: '#1F6D91',
                    lineWidth: 3
                };

                oLine.toX = e.offsetX;
                oLine.toY = e.offsetY;
                mainSurface.add(oLine)
                mainSurface.renderFrame();
                if (th.getSurface("temp")) {
                    th.getSurface("temp").removeAll();
                }
            }
            th.el.dom.onmouseup = function (e) {
                th.getSurface("temp").removeAll();
                th.el.dom.onmousemove = null;
                th.el.dom.onmouseup = null;
            }
        }



    },

    render: function (th, eOpts) {

        new Ext.dd.DDTarget(th.getId(), "IconDragDropGroup");
    },
    show: function (th, event, eOpts) {
        // currentDrawPanel=this;
        console.log("这是DrawPanel.show事件")
    }

});
