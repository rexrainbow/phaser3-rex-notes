import MergeStyle from './MergeStyle.js';

const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObjects = new PhaserImage(scene, 0, 0, data.key, data.frame);

    if (data.width !== undefined) {
        gameObjects.setDisplayWidth(data.width);
    }
    if (data.height !== undefined) {
        gameObjects.setDisplayHeight(data.height);
    }

    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateImage;