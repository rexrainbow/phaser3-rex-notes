import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';

var CreateBackground = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new RoundRectangle(scene);
        scene.add.existing(gameObject);
    }

    if (style.radius !== undefined) {
        gameObject.setRadius(style.radius);
    }

    if (style.color) {
        gameObject.setFillStyle(style.color, style.alpha);
    }

    if (style.strokeColor) {
        if (style.strokeWidth === undefined) {
            style.strokeWidth = 2;
        }
        gameObject.setStrokeStyle(style.strokeWidth, style.strokeColor, style.strokeAlpha);
    }

    return gameObject;
}

export default CreateBackground;