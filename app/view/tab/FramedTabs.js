/**
 * Created by Administrator on 2016/2/25.
 */
Ext.define('svgxml.view.tab.FramedTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    BaseCls: "FramedTabs",
    requires: [
        "svgxml.view.tab.FramedTabsController",
        "svgxml.view.tab.DrawPanel"
    ],
    id:"frametab_drawpanel",
    controller: 'framedtabs',
    viewModel:Ext.create("Ext.app.ViewModel",{
        data:{
            allLine:0
        }
    }),
    //frame: true,
    width: 4000,
    height: 3000,

    defaults: {
        //bodyPadding: 10,
        autoScroll: true
    },
    tools: [
        {
            type: "search",
            qtip:"Show Index",
            handler:"showIndex",
            html:"show number"
        }
    ],
    bind:{
      title:"Program (line {allLine})"
    },
    //title: "",
    showIndex:true,
    items:{
      xtype:"drawpanel",
        title:"1000"
    },
    addDrawPanel:function(text){
        var me=this;

        var drawpanels = me.query("drawpanel");
        for (var i = 0; i < drawpanels.length; i++) {
            if (drawpanels[i].title == text) {
                me.setActiveTab(drawpanels[i].id);
                return;
            }
            drawpanels[i].close()
        }

        var drawpanel = Ext.create("svgxml.view.tab.DrawPanel", {
            title: text
        })
        //console.log(tabpanel.items)
        me.add(drawpanel)
        me.setActiveTab(drawpanel.id);

    },
    listeners : {
      //  viewready: "viewready",
      //  render:"render"
    }
});