/*
type: roundrectangle
color: 
radius:
strokeColor:
strokeWidth:
*/

import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, config, defaultConfig, customMakeCallbacks) {
    var gameObjects = new RoundRectangle(scene, 0, 0, 1, 1, config.radius);

    if (config.color !== undefined) {
        gameObjects.setFillStyle(config.color)
    }
    if (config.strokeColor !== undefined) {
        var strokeWidth = config.strokeWidth;
        if (strokeWidth === undefined) {
            strokeWidth = 2;
        }
        gameObjects.setStrokeStyle(strokeWidth, config.strokeColor)
    }

    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateRoundRectangle;