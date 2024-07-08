import Title from '../gameobjects/label/Title.js';
import CreateTweaker from '../gameobjects/utils/CreateTweaker.js';
import CreateBackground from './CreateBackground.js';
import Scrollable from '../gameobjects/scrollable/Scrollable.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollable = function (scene, config, style) {
    // Create Folder-title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space') || {}
    }
    var child = CreateTweaker(scene, tweakerConfig);

    var sliderStyle = GetValue(style, 'slider');

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
    })
    scene.add.existing(scrollable);

    return scrollable;
}

export default CreateScrollable;