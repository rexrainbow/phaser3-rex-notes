import Title from '../gameobjects/label/Title.js';
import CreateBackground from './CreateBackground.js';
import Scrollable from '../gameobjects/scrollable/Scrollable.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollable = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // Scrollable-title
    var title = new Title(scene, (style.title || {}));
    scene.add.existing(title);

    // panel
    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
    }
    var child = parent.createTweaker(tweakerConfig);

    // slider
    var sliderStyle = style.slider;
    if (sliderStyle) {
        sliderStyle = DeepClone(sliderStyle);
        var trackStyle = sliderStyle.track;
        if (trackStyle) {
            sliderStyle.track = CreateBackground(scene, config, trackStyle);
        }
        var thumbStyle = sliderStyle.thumb;
        if (thumbStyle) {
            sliderStyle.thumb = CreateBackground(scene, config, thumbStyle);
        }
    }

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

        slider: sliderStyle,

        background: background,

        height: GetValue(config, 'height', 0),

        space: style.space,
    })
    scene.add.existing(scrollable);

    return scrollable;
}

export default CreateScrollable;