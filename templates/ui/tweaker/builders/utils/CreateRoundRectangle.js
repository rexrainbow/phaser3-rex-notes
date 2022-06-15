import RoundRectangle from '../../../roundrectangle/RoundRectangle.js';

var CreateBackground = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new RoundRectangle(scene);
        scene.add.existing(gameObject);
    }

    if (styles.radius !== undefined) {
        gameObject.setRadius(styles.radius);
    }

    if (styles.color) {
        gameObject.setFillStyle(styles.color, styles.alpha);
    }

    if (styles.strokeColor) {
        if (styles.strokeWidth === undefined) {
            styles.strokeWidth = 2;
        }
        gameObject.setStrokeStyle(styles.strokeWidth, styles.strokeColor, styles.strokeAlpha);
    }

    return gameObject;
}

export default CreateBackground;