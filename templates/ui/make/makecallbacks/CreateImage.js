/*
type: image
key: 
frame:
width:
height:
*/
const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, config, defaultConfig, customMakeCallbacks) {
    var gameObjects = new PhaserImage(scene, 0, 0, config.key, config.frame);

    if (config.width !== undefined) {
        gameObjects.setDisplayWidth(config.width);
    }
    if (config.height !== undefined) {
        gameObjects.setDisplayHeight(config.height);
    }

    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateImage;