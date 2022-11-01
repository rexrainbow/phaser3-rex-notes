import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    var gameObject = new RoundRectangle(scene, config);
    scene.add.existing(gameObject);

    if (config.radius !== undefined) {
        gameObject.setRadius(config.radius);
    }

    if (config.color) {
        gameObject.setFillStyle(config.color, config.alpha);
    }

    if (config.strokeColor) {
        if (config.strokeWidth === undefined) {
            config.strokeWidth = 2;
        }
        gameObject.setStrokeStyle(config.strokeWidth, config.strokeColor, config.strokeAlpha);
    }

    return gameObject;
}

export default CreateRoundRectangle;