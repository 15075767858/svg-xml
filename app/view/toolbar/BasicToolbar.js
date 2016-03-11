/**
 * Created by Administrator on 2016/2/26.
 */
Ext.define('svgxml.view.toolbar.BasicToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',

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
                        text:'Save Xml'
                    },{
                        text:"Save as Xml"
                    }
                ]
            }/*, {
                glyph: 72,
                text:'Help'
               //     margin:"0 0 0 50"
            }*/]
        });
        this.callParent();
    }
});


/*{
    xtype:'splitbutton',
        text:'Menu Button',
    glyph: 61,
    menu:[{
    text:'Menu Button 1'
}]
}, '-', {
    xtype:'splitbutton',
    text:'Cut',
    glyph: 67,
    menu: [{
        text:'Cut Menu Item'
    }]
}, {
    glyph: 102,
    text:'Copy'
},*/
