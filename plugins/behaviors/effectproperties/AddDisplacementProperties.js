import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddDisplacementProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'displacementKey')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var displacementKey,
        displacementX = 0.005,
        displacementY = 0.005;
    Object.defineProperty(gameObject, 'displacementKey', {
        get: function () {
            return displacementKey;
        },
        set: function (value) {
            if (displacementKey === value) {
                return;
            }

            displacementKey = value;

            if ((displacementKey === null) || (displacementKey === false)) {
                if (gameObject._displacement) {
                    fxFactory.remove(gameObject._displacement);
                    gameObject._displacement = undefined;
                }
            } else {
                if (!gameObject._displacement) {
                    gameObject._displacement = fxFactory.addDisplacement(displacementKey, displacementX, displacementY);
                }

                gameObject._displacement.setTexture(displacementKey);
            }

        },
    })

    Object.defineProperty(gameObject, 'displacementX', {
        get: function () {
            return displacementX;
        },
        set: function (value) {
            if (displacementX === value) {
                return;
            }

            displacementX = value;

            if (gameObject._displacement) {
                gameObject._displacement.x = displacementX;
            }
        },
    })

    Object.defineProperty(gameObject, 'displacementY', {
        get: function () {
            return displacementY;
        },
        set: function (value) {
            if (displacementY === value) {
                return;
            }

            displacementY = value;

            if (gameObject._displacement) {
                gameObject._displacement.y = displacementY;
            }
        },
    })

    gameObject.displacementKey = null;

    AddClearEffectCallback(gameObject, 'displacementKey');

    return gameObject;
}

export default AddDisplacementProperties;