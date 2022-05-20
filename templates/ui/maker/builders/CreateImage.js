/*
type: image
name:

key: 
frame:
width:
height:
*/

import GetConfig from './GetConfig.js';

const PhaserImage = Phaser.GameObjects.Image;

var CreateImage = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);
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