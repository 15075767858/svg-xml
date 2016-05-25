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
    //frame: true,
    width: 4000,
    height: 3000,
    defaults: {
        //bodyPadding: 10,
        autoScroll: true
    },
    items:{
      xtype:"drawpanel",
        title:"1000"
    },
    listeners : {
      //  viewready: "viewready",
      //  render:"render"
    }
});

