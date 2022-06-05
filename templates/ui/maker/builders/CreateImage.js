import MergeStyle from './utils/MergeStyle.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new PhaserImage(scene, 0, 0, data.key, data.frame);

    if (data.width !== undefined) {
        gameObject.setDisplayWidth(data.width);
    }
    if (data.height !== undefined) {
        gameObject.setDisplayHeight(data.height);
    }

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;