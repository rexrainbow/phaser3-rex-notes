import CreateTab from '../builders/CreateTab.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddTab = function (config) {
    var scene = this.scene;

    // Create tab
    var tabStyle = GetValue(this.styles, 'tab') || {};
    tabStyle.tweaker = this.styles;
    var tab = CreateTab(scene, config, tabStyle);
    delete tabStyle.tweaker;
    tab.swapFirstPage(0);

    // Add tab
    this.add(
        tab,
        { expand: true }
    );

    var pageCount = (GetValue(config, 'pages') || []).length;
    var pages = [];
    for (var i = 0; i < pageCount; i++) {
        pages.push(tab.getPage(i));
    }

    return pages;
}

export default AddTab;