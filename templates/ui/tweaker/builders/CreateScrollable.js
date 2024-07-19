import Title from '../gameobjects/label/Title.js';
import CreateBackground from './CreateBackground.js';
import Scrollable from '../gameobjects/scrollable/Scrollable.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollable = function (parent, config, style) {
    var scene = parent.scene;

    // Create Folder-title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space') || {}
    }
    var child = parent.createTweaker(tweakerConfig);

    var sliderStyle = GetValue(style, 'slider');
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

    var backgroundStyle = GetValue(style, 'background');
    var background = CreateBackground(scene, config, backgroundStyle);

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

        space: GetValue(style, 'space', undefined),
    })
    scene.add.existing(scrollable);

    return scrollable;
}

export default CreateScrollable;