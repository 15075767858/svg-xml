Ext.define("svgxml.view.view.ImgView", {
    extend: "Ext.view.View",

    requires: [
        "svgxml.view.view.ImgViewController",
        "svgxml.view.view.ImgViewModel"
    ],
    controller: "view-imgview",
    viewModel: {
        type: "view-imgview"
    },
    autoScroll: true,
    store: Ext.create("svgxml.store.SvgImgs", {}),
    //draggable: false,
    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap1"  id="{}" >',
        '<div > <img border="0" style="" src="{Img_0}" draggable="false" onclick = "deleteViewItem()"/>     {name}</div></div>',
        //,'<div style="height: 5px;background: steelblue;"></div>',
        '</tpl>',
        '<div class="x-clear" ></div>'
    ],
    draggable: {
        delegate: 'div'
    },
    trackOver: true,
    itemSelector: ".thumb-wrap1"
});
