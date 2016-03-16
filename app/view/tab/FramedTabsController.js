Ext.define('svgxml.view.tab.FramedTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.framedtabs',
    activate:function(){
        alert("jihuo")
    },
    viewready: function (th, eO) {

        th.getHeader().el.dom.oncontextmenu = function (e) {
            //e.preventDefault();
            th.add(
                Ext.create('svgxml.view.grid.menu.gridmenu', {
                    width: 100,
                    margin: '0 0 10 0',
                    //renderTo:Ext.getBody(),
                    autoShow: true,
                    floating: true,  // usually you want this set to True (default)
                    x: e.pageX,
                    y: e.pageY
                })
            )
            console.log(arguments)
        }
    }
});
