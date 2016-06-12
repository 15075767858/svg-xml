
Ext.define("svgxml.view.window.AlarmWindow",{
    extend: "Ext.window.Window",
 
    requires: [
        "svgxml.view.window.AlarmWindowController",
        "svgxml.view.window.AlarmWindowModel"
    ],
    
    controller: "window-alarmwindow",
    viewModel: {
        type: "window-alarmwindow"
    },
    autoShow:true,
    width:800,
    height:600
});
