import HasProperty from '../../../utils/object/HasProperty.js';

var AddVintagePinholeProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'vintagePinhole') || !gameObject.preFX) {
        return gameObject;
    }

    var vintagePinhole;
    Object.defineProperty(gameObject, 'vintagePinhole', {
        get: function () {
            return vintagePinhole;
        },
        set: function (value) {
            if (vintagePinhole === value) {
                return;
            }

            vintagePinhole = value;

            if ((vintagePinhole === null) || (vintagePinhole === false)) {
                if (gameObject._vintagePinholeEffect) {
                    gameObject.preFX.remove(gameObject._vintagePinholeEffect);
                    gameObject._vintagePinholeEffect = undefined;
                }
            } else {
                if (!gameObject._vintagePinholeEffect) {
                    gameObject._vintagePinholeEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._vintagePinholeEffect.vintagePinhole();
            }

        },
    })

    gameObject.vintagePinhole = null;

    return gameObject;
}

export default AddVintagePinholeProperties;