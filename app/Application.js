/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.define('svgxml.Application', {
    extend: 'Ext.app.Application',
    requires: [
      //"svgxml.store.SvgImgs",
        "svgxml.view.Viewport"
    ],
    name: 'svgxml',
    appFolder:'app',
   // controllers:['User'],
    autoCreateViewport:true,
    stores: [
        // TODO: add global / shared stores here
    ],
  /*  models:[
        "User"
    ],*/
    launch: function () {
        // TODO - Launch the application
    }
});


/*Ext.application({
    name: "MyApp",
    appFolder: 'app',
    controllers: ["User"],
    autoCreateViewport: true,
    launch: function () {
        // 页面加载完成之后执行
    }
});*/
