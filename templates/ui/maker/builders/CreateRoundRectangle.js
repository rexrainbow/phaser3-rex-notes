/*
type: roundrectangle
name:

color: 
radius:
strokeColor:
strokeWidth:
width:
height:
*/

import GetConfig from './GetConfig.js';
import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    var width = (config.width === undefined) ? 1 : config.width;
    var height = (config.height === undefined) ? 1 : config.height;

    var gameObjects = new RoundRectangle(scene, 0, 0, width, height, config.radius);

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