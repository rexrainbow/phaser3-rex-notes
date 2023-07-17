import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddBokehProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'bokehRadius')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var bokehRadius,
        bokehAmount = 1,
        bokehContrast = 0.2;
    Object.defineProperty(gameObject, 'bokehRadius', {
        get: function () {
            return bokehRadius;
        },
        set: function (value) {
            if (bokehRadius === value) {
                return;
            }

            bokehRadius = value;

            if ((bokehRadius === null) || (bokehRadius === false)) {
                if (gameObject._bokeh) {
                    fxFactory.remove(gameObject._bokeh);
                    gameObject._bokeh = undefined;
                }
            } else {
                if (!gameObject._bokeh) {
                    gameObject._bokeh = fxFactory.addBokeh(bokehRadius, bokehAmount, bokehContrast);
                }

                gameObject._bokeh.radius = bokehRadius;
            }

        },
    })

    Object.defineProperty(gameObject, 'bokehAmount', {
        get: function () {
            return bokehAmount;
        },
        set: function (value) {
            if (bokehAmount === value) {
                return;
            }

            bokehAmount = value;

            if (gameObject._bokeh) {
                gameObject._bokeh.amount = bokehAmount;
            }
        },
    })

    Object.defineProperty(gameObject, 'bokehContrast', {
        get: function () {
            return bokehContrast;
        },
        set: function (value) {
            if (bokehContrast === value) {
                return;
            }

            bokehContrast = value;

            if (gameObject._bokeh) {
                gameObject._bokeh.contrast = bokehContrast;
            }
        },
    })

    gameObject.bokehRadius = null;

    AddClearEffectCallback(gameObject, 'bokehRadius');

    return gameObject;
}

export default AddBokehProperties;