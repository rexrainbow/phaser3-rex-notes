import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';
import InstallGradientFX from '../../shaders/p3fx/InstallGradientFX';

var AddGradientProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'gradientColor')) {
        return gameObject;
    }

    InstallGradientFX(gameObject);

    var filterList = GetFilterList(gameObject);

    var gradientColor1,
        gradientColor2,
        gradientAlpha = 0.5,
        gradientFromX = 0,
        gradientFromY = 0,
        gradientToX = 0,
        gradientToY = 1,
        gradientSize = 0;
    Object.defineProperty(gameObject, 'gradientColor', {
        get: function() {
            return [gradientColor1, gradientColor2];
        },

        set: function(value?: any) {
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
                    filterList.remove(gameObject._gradient);
                    gameObject._gradient = undefined;
                }
            } else {
                if (!gameObject._gradient) {
                    gameObject._gradient = filterList.addP3Gradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
                }

                gameObject._gradient.color1 = gradientColor1;
                gameObject._gradient.color2 = gradientColor2;
            }

        },
    })

    Object.defineProperty(gameObject, 'gradientColor1', {
        get: function() {
            return gradientColor1;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientColor2;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientAlpha;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientFromX;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientFromY;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientToX;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientToY;
        },
        set: function(value?: any) {
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
        get: function() {
            return gradientSize;
        },
        set: function(value?: any) {
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