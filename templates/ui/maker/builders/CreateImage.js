import MergeStyle from './utils/MergeStyle.js';

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

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;