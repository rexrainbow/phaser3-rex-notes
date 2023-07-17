import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddGradientProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'gradientColor')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var gradientColor1,
        gradientColor2,
        gradientAlpha = 0.5,
        gradientFromX = 0,
        gradientFromY = 0,
        gradientToX = 0,
        gradientToY = 1,
        gradientSize = 0;
    Object.defineProperty(gameObject, 'gradientColor', {
        get: function () {
            return [gradientColor1, gradientColor2];
        },

        set: function (value) {
            var color1, color2;
            if ((value === null) || (value === false)) {
                color1 = null;
                color2 = null;
            } else {
                color1 = value[0];
                color2 = value[1];
            }

            if ((gradientColor1 === color1) && (gradientColor2 === color2)) {
                return;
            }

            gradientColor1 = color1;
            gradientColor2 = color2;

            if ((gradientColor1 === null) || (gradientColor1 === false)) {
                if (gameObject._gradient) {
                    fxFactory.remove(gameObject._gradient);
                    gameObject._gradient = undefined;
                }
            } else {
                if (!gameObject._gradient) {
                    gameObject._gradient = fxFactory.addGradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
                }

                gameObject._gradient.color1 = gradientColor1;
                gameObject._gradient.color2 = gradientColor2;
            }

        },
    })

    Object.defineProperty(gameObject, 'gradientColor1', {
        get: function () {
            return gradientColor1;
        },
        set: function (value) {
            if ((value === null) || (value === false)) {
                gameObject.gradientColor = value;
                return;
            }

            if (gradientColor1 === value) {
                return;
            }

            gradientColor1 = value;

            if (gameObject._gradient) {
                gameObject._gradient.color1 = gradientColor1;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientColor2', {
        get: function () {
            return gradientColor2;
        },
        set: function (value) {
            if ((value === null) || (value === false)) {
                gameObject.gradientColor = value;
                return;
            }

            if (gradientColor2 === value) {
                return;
            }

            gradientColor2 = value;

            if (gameObject._gradient) {
                gameObject._gradient.color2 = gradientColor2;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientAlpha', {
        get: function () {
            return gradientAlpha;
        },
        set: function (value) {
            if (gradientAlpha === value) {
                return;
            }

            gradientAlpha = value;

            if (gameObject._gradient) {
                gameObject._gradient.alpha = gradientAlpha;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientFromX', {
        get: function () {
            return gradientFromX;
        },
        set: function (value) {
            if (gradientFromX === value) {
                return;
            }

            gradientFromX = value;

            if (gameObject._gradient) {
                gameObject._gradient.fromX = gradientFromX;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientFromY', {
        get: function () {
            return gradientFromY;
        },
        set: function (value) {
            if (gradientFromY === value) {
                return;
            }

            gradientFromY = value;

            if (gameObject._gradient) {
                gameObject._gradient.fromY = gradientFromY;
            }
        },
    })


    Object.defineProperty(gameObject, 'gradientToX', {
        get: function () {
            return gradientToX;
        },
        set: function (value) {
            if (gradientToX === value) {
                return;
            }

            gradientToX = value;

            if (gameObject._gradient) {
                gameObject._gradient.toX = gradientToX;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientToY', {
        get: function () {
            return gradientToY;
        },
        set: function (value) {
            if (gradientToY === value) {
                return;
            }

            gradientToY = value;

            if (gameObject._gradient) {
                gameObject._gradient.toY = gradientToY;
            }
        },
    })

    Object.defineProperty(gameObject, 'gradientSize', {
        get: function () {
            return gradientSize;
        },
        set: function (value) {
            if (gradientSize === value) {
                return;
            }

            gradientSize = value;

            if (gameObject._gradient) {
                gameObject._gradient.size = gradientSize;
            }
        },
    })

    gameObject.gradientColor = null;

    AddClearEffectCallback(gameObject, 'gradientColor');

    return gameObject;
}

export default AddGradientProperties;