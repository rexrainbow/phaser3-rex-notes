import TabPages from '../gameobjects/tabpages/TabPages.js';
import CreateLabel from '../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTab = function (tweaker, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }
    var scene = tweaker.scene;

    var tabPages = new TabPages(scene, style);
    scene.add.existing(tabPages);

    var tabConfig = style.tab;
    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
    }
    var pages = config.pages || [];
    for (var i = 0, cnt = pages.length; i < cnt; i++) {
        var page = pages[i];
        tabPages.addPage({
            key: page.title,
            tab: CreateLabel(scene, tabConfig)
                .setActiveState(false)
                .resetDisplayContent({ text: page.title }),
            page: tweaker.createTweaker(tweakerConfig)
        })
    }

    tabPages
        .on('tab.focus', function (tab, key) {
            tab.setActiveState(true);
        })
        .on('tab.blur', function (tab, key) {
            tab.setActiveState(false);
        })

    return tabPages;
}

export default CreateTab;