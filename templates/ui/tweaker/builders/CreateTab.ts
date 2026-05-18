import TabPages from '../gameobjects/tabpages/TabPages';
import CreateLabel from '../../utils/build/CreateLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateTab = function(tweaker?: any, config?: any, style?: any) {
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
        .on('tab.focus', function(tab?: any, key?: any) {
            tab.setActiveState(true);
        })
        .on('tab.blur', function(tab?: any, key?: any) {
            tab.setActiveState(false);
        })

    return tabPages;
}

export default CreateTab;