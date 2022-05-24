import MergeStyle from './utils/MergeStyle.js';

const PhaserImage = Phaser.GameObjects.Image;
const OtherProperites = ['tint', 'alpha', 'visible', 'flipX', 'flipY'];

var CreateImage = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new PhaserImage(scene, 0, 0, data.key, data.frame);

    if (data.width !== undefined) {
        gameObject.setDisplayWidth(data.width);
    }
    if (data.height !== undefined) {
        gameObject.setDisplayHeight(data.height);
    }

    for (var i = 0, cnt = OtherProperites.length; i < cnt; i++) {
        var key = OtherProperites[i];
        var value = data[key];
        if (value !== undefined) {
            gameObject[key] = value;
        }
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;