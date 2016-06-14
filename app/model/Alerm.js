Ext.define('svgxml.model.Alerm', {
    extend: 'Ext.data.Model',
    alias: "svgxml.Alerm",
    fields: [
        {name: 'high_limit', type: 'string'},
        {name: 'low_limit', type: 'string'},
        {name: 'delay_time', type: 'string'},
        {name: 'deadband', type: 'string'},
        {name: 'notification_class', type: 'string'},
        {name: 'limit', type: 'number'},
        {name: 'event_enable', type: 'number'}
    ]
});
