import Wrap from '../gameobjects/wrap/Wrap.js';
import Title from '../gameobjects/label/Title.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateWrap = function (parent, config, style) {
    var scene = parent.scene;

    // Create title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var itemWidth = GetValue(style, 'itemWidth', 0);
    var itemHeight = GetValue(style, 'itemHeight', 0);
    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space'),
        align: GetValue(style, 'align', 5),

        wrap: true,
        itemWidth: GetValue(config, 'itemWidth', itemWidth),
        itemHeight: GetValue(config, 'itemHeight', itemHeight),
    }

    var backgroundStyle = GetValue(style, 'background');
    if (backgroundStyle && !Array.isArray(backgroundStyle)) {
        backgroundStyle = [backgroundStyle];
    }

    var tweakerChild = parent.createTweaker(tweakerConfig);

    var wrap = new Wrap(scene, {
        title: title,
        child: tweakerChild,
    });
    scene.add.existing(wrap);

    return wrap;
}

export default CreateWrap;