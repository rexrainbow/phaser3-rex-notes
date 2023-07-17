import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddShineProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shineSpeed')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var shineSpeed,
        shineLineWidth = 0.5,
        shineGradient = 3;
    Object.defineProperty(gameObject, 'shineSpeed', {
        get: function () {
            return shineSpeed;
        },
        set: function (value) {
            if (shineSpeed === value) {
                return;
            }

            shineSpeed = value;

            if ((shineSpeed === null) || (shineSpeed === false)) {
                if (gameObject._shine) {
                    fxFactory.remove(gameObject._shine);
                    gameObject._shine = undefined;
                }
            } else {
                if (!gameObject._shine) {
                    gameObject._shine = fxFactory.addShine(shineSpeed, shineLineWidth, shineGradient);
                }

                gameObject._shine.speed = shineSpeed;
            }

        },
    })

    Object.defineProperty(gameObject, 'shineLineWidth', {
        get: function () {
            return shineLineWidth;
        },
        set: function (value) {
            if (shineLineWidth === value) {
                return;
            }

            shineLineWidth = value;

            if (gameObject._shine) {
                gameObject._shine.lineWidth = shineLineWidth;
            }
        },
    })

    Object.defineProperty(gameObject, 'shineGradient', {
        get: function () {
            return shineGradient;
        },
        set: function (value) {
            if (shineGradient === value) {
                return;
            }

            shineGradient = value;

            if (gameObject._shine) {
                gameObject._shine.gradient = shineGradient;
            }
        },
    })

    gameObject.shineSpeed = null;

    AddClearEffectCallback(gameObject, 'shineSpeed');

    return gameObject;
}

export default AddShineProperties;