import MergeStyle from './MergeStyle.js';
import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var width = (data.width === undefined) ? 1 : data.width;
    var height = (data.height === undefined) ? 1 : data.height;

    var gameObjects = new RoundRectangle(scene, 0, 0, width, height, data.radius);

    if (data.color !== undefined) {
        gameObjects.setFillStyle(data.color)
    }
    if (data.strokeColor !== undefined) {
        var strokeWidth = data.strokeWidth;
        if (strokeWidth === undefined) {
            strokeWidth = 2;
        }
        gameObjects.setStrokeStyle(strokeWidth, data.strokeColor)
    }

    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateRoundRectangle;