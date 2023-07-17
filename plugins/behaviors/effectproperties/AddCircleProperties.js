import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddCircleProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'circleColor')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var circleColor,
        circleThickness = 8,
        circleBackgroundColor = 0x000000,
        circleBackgroundAlpha = 0.4,
        circleScale = 1,
        circleFeather = 0.005;
    Object.defineProperty(gameObject, 'circleColor', {
        get: function () {
            return circleColor;
        },
        set: function (value) {
            if (circleColor === value) {
                return;
            }

            circleColor = value;

            if ((circleColor === null) || (circleColor === false)) {
                if (gameObject._circle) {
                    fxFactory.remove(gameObject._circle);
                    gameObject._circle = undefined;
                }
            } else {
                if (!gameObject._circle) {
                    gameObject._circle = fxFactory.addCircle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
                    gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
                }

                gameObject._circle.color = circleColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'circleThickness', {
        get: function () {
            return circleThickness;
        },
        set: function (value) {
            if (circleThickness === value) {
                return;
            }

            circleThickness = value;

            if (gameObject._circle) {
                gameObject._circle.thickness = circleThickness;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleBackgroundColor', {
        get: function () {
            return circleBackgroundColor;
        },
        set: function (value) {
            if (circleBackgroundColor === value) {
                return;
            }

            circleBackgroundColor = value;

            if (gameObject._circle) {
                gameObject._circle.backgroundColor = circleBackgroundColor;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
        get: function () {
            return circleBackgroundAlpha;
        },
        set: function (value) {
            if (circleBackgroundAlpha === value) {
                return;
            }

            circleBackgroundAlpha = value;

            if (gameObject._circle) {
                gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
            }
        },
    })


    Object.defineProperty(gameObject, 'circleScale', {
        get: function () {
            return circleScale;
        },
        set: function (value) {
            if (circleScale === value) {
                return;
            }

            circleScale = value;

            if (gameObject._circle) {
                gameObject._circle.scale = circleScale;
            }
        },
    })

    Object.defineProperty(gameObject, 'circleFeather', {
        get: function () {
            return circleFeather;
        },
        set: function (value) {
            if (circleFeather === value) {
                return;
            }

            circleFeather = value;

            if (gameObject._circle) {
                gameObject._circle.feather = circleFeather;
            }
        },
    })

    gameObject.circleColor = null;

    AddClearEffectCallback(gameObject, 'circleColor');

    return gameObject;
}

export default AddCircleProperties;