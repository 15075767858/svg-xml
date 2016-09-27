Ext.define('svgxml.view.chart.RenameChart', {
    extend: 'Ext.panel.Panel',

    requires: [
        'svgxml.view.chart.RenameChartController',
        'svgxml.view.chart.RenameChartModel'
    ],

    controller: 'chart-renamechart',
    viewModel: {
        type: 'chart-renamechart'
    },
    layout:"hbox",
    initComponent: function () {
        var me = this;

        me.rbar=[
            {text:"AI",menu:[
                {devType:6,text:"+",handler:"addType",handler:"addType"},
                {devType:6,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"AO",menu:[
                {devType:5,text:"+",handler:"addType",handler:"addType"},
                {devType:5,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"AV",menu:[
                {devType:4,text:"+",handler:"addType",handler:"addType"},
                {devType:4,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"BI",menu:[
                {devType:3,text:"+",handler:"addType",handler:"addType"},
                {devType:3,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"BO",menu:[
                {devType:2,text:"+",handler:"addType",handler:"addType"},
                {devType:2,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"BV",menu:[
                {devType:1,text:"+",handler:"addType",handler:"addType"},
                {devType:1,text:"-",scope:chart,handler:"deleteType"}
            ]},
            {text:"SCHDULE",menu:[
                {devType:0,text:"+",handler:"addType",handler:"addType"},
                {devType:0,text:"-",scope:chart,handler:"deleteType"}
            ]}
        ]

        var chart =  Ext.create({
            xtype: 'cartesian',
            width: 500,
            height: 300,
            flipXY:true,
            innerPadding: '0 10 0 10',
            store: {
                fields: ['name', 'count', 'devs'],
                data: me.storeData
            },
            /*store:Ext.create("Ext.data.Store",{
             fields: ['name', 'count', 'devs'],
             data: me.storeData
             }),*/

            axes: [{
                type: 'numeric3d',
                position: 'bottom',

                fields: ['count', 'devs'],
                title: {
                    text: 'Number',
                    fontSize: 15
                },
                grid: {
                    odd: {
                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                    },
                    even: {
                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                    }
                }
            }, {
                type: 'category3d',
                position: 'left',

                title: {
                    text: 'device',
                    fontSize: 15
                },
                fields: 'name'
            }],
            series: {
                type: 'bar3d',
                xField: 'name',
                position:'left',
                yField: ['count'],
                label: {
                    field: 'count',
                    display: 'insideEnd',
                    //renderer: 'onSeriesLabelRender'
                },
                tooltip:{
                    trackMouse:true,
                    style:{
                        wordWrap:"break-word"
                    },
                    renderer:function(record, item){
                        console.log(this)
                        console.log(arguments)
                        this.setHtml("<div style='background-color: #0f5f99;color: white'>"+record.data.devs+"</div>")
                    }
                }
            }
        });



        me.items=chart;

        me.callParent();
    }
});



