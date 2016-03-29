
Ext.define("svgxml.view.main.toolbar.TopToolbar",{
    extend: "Ext.toolbar.Toolbar",
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    requires: [
        "svgxml.view.main.toolbar.TopToolbarController",
        "svgxml.view.main.toolbar.TopToolbarModel"
    ],
    
    controller: "main-toolbar-toptoolbar",
    viewModel: {
        type: "main-toolbar-toptoolbar"
    },

    initComponent: function() {
        Ext.apply(this, {

            width: "100%",
            items: [
                {
                    text:'File',
                    glyph: 70,
                    menu:[{
                        text:'New Xml'
                    },
                        {
                            text:'Open Xml'
                        },{
                            text:'Save Xml',
                            listeners:{
                                click:"saveXmlClick"
                            }
                        },{
                            text:"Save as Xml"
                        }
                    ]
                }]
        });
        this.callParent();
    }
});
