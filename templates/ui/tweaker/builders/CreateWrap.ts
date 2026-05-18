import CreateTitleLabel from './utils/CreateTitleLabel';
import Wrap from '../gameobjects/wrap/Wrap';
import CreateBackground from './utils/CreateBackground';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateWrap = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = tweaker.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title    
    var title = CreateTitleLabel(scene, undefined, (style.title || {}));

    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
        space: style.space,
        align: GetValue(style, 'align', 5),

        wrap: true,
        itemWidth: GetValue(config, 'itemWidth', 0, style),
        itemHeight: GetValue(config, 'itemHeight', 0, style),
    }

    var tweakerChild = tweaker.createTweaker(tweakerConfig);

    var wrap = new Wrap(scene, {
        title: title,
        child: tweakerChild,
        background: background,
    });
    scene.add.existing(wrap);

    return wrap;
}

export default CreateWrap;