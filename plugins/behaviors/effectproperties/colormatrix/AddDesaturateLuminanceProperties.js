import HasProperty from '../../../utils/object/HasProperty.js';

var AddDesaturateLuminanceProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'desaturateLuminance') || !gameObject.preFX) {
        return gameObject;
    }

    var desaturateLuminance;
    Object.defineProperty(gameObject, 'desaturateLuminance', {
        get: function () {
            return desaturateLuminance;
        },
        set: function (value) {
            if (desaturateLuminance === value) {
                return;
            }

            desaturateLuminance = value;

            if ((desaturateLuminance === null) || (desaturateLuminance === false)) {
                if (gameObject._desaturateLuminanceEffect) {
                    gameObject.preFX.remove(gameObject._desaturateLuminanceEffect);
                    gameObject._desaturateLuminanceEffect = undefined;
                }
            } else {
                if (!gameObject._desaturateLuminanceEffect) {
                    gameObject._desaturateLuminanceEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._desaturateLuminanceEffect.desaturateLuminance();
            }

        },
    })

    gameObject.desaturateLuminance = null;

    return gameObject;
}

export default AddDesaturateLuminanceProperties;