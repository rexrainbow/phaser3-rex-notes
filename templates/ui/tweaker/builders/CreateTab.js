import TabPages from '../gameobjects/tabpages/TabPages.js';
import CreateLabel from '../../utils/build/CreateLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTab = function (parent, config, style) {
    var scene = parent.scene;

    var tabPages = new TabPages(scene, style);
    scene.add.existing(tabPages);

    var tabConfig = GetValue(style, 'tab');
    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker')
    }
    var pages = GetValue(config, 'pages') || [];
    for (var i = 0, cnt = pages.length; i < cnt; i++) {
        var page = pages[i];
        tabPages.addPage({
            key: page.title,
            tab: CreateLabel(scene, tabConfig)
                .setActiveState(false)
                .resetDisplayContent({ text: page.title }),
            page: parent.createTweaker(tweakerConfig)
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