import Wrap from '../gameobjects/wrap/Wrap.js';
import Title from '../gameobjects/label/Title.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateWrap = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }
    var scene = parent.scene;

    // title    
    var title = new Title(scene, (style.title || {}));
    scene.add.existing(title);

    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
        space: style.space,
        align: GetValue(style, 'align', 5),

        wrap: true,
        itemWidth: GetValue(config, 'itemWidth', 0, style),
        itemHeight: GetValue(config, 'itemHeight', 0, style),
    }

    var tweakerChild = parent.createTweaker(tweakerConfig);

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    var wrap = new Wrap(scene, {
        title: title,
        child: tweakerChild,
        background: background,
    });
    scene.add.existing(wrap);

    return wrap;
}

export default CreateWrap;