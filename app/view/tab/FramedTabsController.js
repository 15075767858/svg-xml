Ext.define('svgxml.view.tab.FramedTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.framedtabs',

    render: function (th) {
        th.add(Ext.create("svgxml.view.tab.DrawPanel", {
            title: "1000"
        }))
    },


    showIndex: function () {
        console.log(this)
        var me = this.view;
        if (me.showIndex) {
            showIndex()
            me.showIndex = false;

        } else {

hideIndex()
            me.showIndex = true

        }

    }
});

function showIndex() {
    var panels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < panels.length; i++) {
        if (panels[i].button) {
            panels[i].removeDocked(panels[i].button);
        }
        var button = Ext.create("Ext.button.Button", {
            text: panels[i].index,
            hidden: true
        })
        panels[i].button = button;
        panels[i].addDocked(button)
    }
    saveXml()
}
function hideIndex() {
    var panels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < panels.length; i++) {
        var dock = panels[i].getDockedItems("button[hidden!=true]")[0]
        if (dock) {
            panels[i].removeDocked(dock);
        }
    }
}