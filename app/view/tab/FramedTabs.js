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
    listeners : {
      //  viewready: "viewready",
      //  render:"render"
    }
});