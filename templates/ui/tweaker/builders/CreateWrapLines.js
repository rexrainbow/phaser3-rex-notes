import WrapLines from '../gameobjects/wraplines/WrapLines.js';
import Title from '../gameobjects/label/Title.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateWrapLines = function (parent, config, style) {
    var scene = parent.scene;

    // Create title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var defaultItemWidth = GetValue(style, 'itemWidth', 0);
    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),

        wrap: true,
        itemWidth: GetValue(config, 'itemWidth', defaultItemWidth)
    }

    var backgroundStyle = GetValue(style, 'background');
    if (backgroundStyle && !Array.isArray(backgroundStyle)) {
        backgroundStyle = [backgroundStyle];
    }

    var tweakerChild = parent.createTweaker(tweakerConfig);

    var wrapLines = new WrapLines(scene, {
        header: title,
        child: tweakerChild,
        space: GetValue(style, 'space'),
    });
    scene.add.existing(wrapLines);

    return wrapLines;
}

export default CreateWrapLines;