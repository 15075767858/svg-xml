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

    initComponent: function () {
        var me = this;


        var chart =  Ext.create({
            xtype: 'cartesian',
            width: 500,
            height: 300,
            flipXY:true,
            innerPadding: '0 10 0 10',
            store: {
                fields: ['name', 'apples', 'oranges'],
                data: [{
                    name: 'AI',
                    apples: 10,
                    oranges: 3
                }, {
                    name: 'AO',
                    apples: 7,
                    oranges: 2
                }, {
                    name: 'AV',
                    apples: 5,
                    oranges: 2
                }, {
                    name: 'BI',
                    apples: 2,
                    oranges: 3
                }, {
                    name: 'BO',
                    apples: 19,
                    oranges: 1
                }, {
                    name: 'BV',
                    apples: 13,
                    oranges: 4
                },{
                    name:"SCHEDULE",
                    apples:10
                }
                ]
            },

            axes: [{
                type: 'numeric3d',
                position: 'bottom',

                fields: ['apples', 'oranges'],
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
                yField: ['apples', 'oranges'],
                tooltip:{
                    trackMouse:true,
                    /*renderer:function(){
                        console.log(arguments)
                    }*/
                }
            }
        });
        me.items=chart;

            me.callParent();
    }
});



