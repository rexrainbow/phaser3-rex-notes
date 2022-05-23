import MergeStyle from './utils/MergeStyle.js';
import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var width = (data.width === undefined) ? 1 : data.width;
    var height = (data.height === undefined) ? 1 : data.height;

    var gameObject = new RoundRectangle(scene, 0, 0, width, height, data.radius);

    if (data.color !== undefined) {
        gameObject.setFillStyle(data.color)
    }
    if (data.strokeColor !== undefined) {
        var strokeWidth = data.strokeWidth;
        if (strokeWidth === undefined) {
            strokeWidth = 2;
        }
        gameObject.setStrokeStyle(strokeWidth, data.strokeColor)
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateRoundRectangle;