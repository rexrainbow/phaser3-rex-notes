import CreateTitleLabel from './CreateTitleLabel.js';
import CreateSlider from './CreateSlider.js';
import CreateBackground from './CreateBackground.js';
import Scrollable from '../gameobjects/scrollable/Scrollable.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollable = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // title
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    // panel
    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
    }
    var child = parent.createTweaker(tweakerConfig);

    // slider
    var slider = CreateSlider(scene, config.slider, style.slider);

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

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