import CreateTitleLabel from './utils/CreateTitleLabel';
import CreateSlider from './CreateSlider';
import CreateBackground from './utils/CreateBackground';
import Scrollable from '../gameobjects/scrollable/Scrollable';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateScrollable = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = tweaker.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    // panel
    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
    }
    var child = tweaker.createTweaker(tweakerConfig);

    // slider
    var slider = CreateSlider(scene, config.slider, style.slider);

    var scrollable = new Scrollable(scene, {
        scrollMode: 0,

        header: title,

        panel: {
            child: child,
            mask: {
                padding: 1,
            },
        },

        slider: slider,

        background: background,

        height: GetValue(config, 'height', 0),

        space: style.space,
    })
    scene.add.existing(scrollable);

    return scrollable;
}

export default CreateScrollable;