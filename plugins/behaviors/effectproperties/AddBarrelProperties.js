import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';

var AddBarrelProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'barrel')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var barrel;
    Object.defineProperty(gameObject, 'barrel', {
        get: function () {
            return barrel;
        },
        set: function (value) {
            if (barrel === value) {
                return;
            }

            barrel = value;

            if ((barrel === null) || (barrel === false)) {
                if (gameObject._barrelEffect) {
                    fxFactory.remove(gameObject._barrelEffect);
                    gameObject._barrelEffect = undefined;
                }
            } else {
                if (!gameObject._barrelEffect) {
                    gameObject._barrelEffect = fxFactory.addBarrel();
                }
                gameObject._barrelEffect.amount = barrel;
            }

        },
    })

    gameObject.barrel = null;

    return gameObject;
}

export default AddBarrelProperties;