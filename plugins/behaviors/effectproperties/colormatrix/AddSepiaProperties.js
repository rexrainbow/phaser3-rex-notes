import HasProperty from '../../../utils/object/HasProperty.js';

var AddSepiaProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'sepia') || !gameObject.preFX) {
        return gameObject;
    }

    var sepia;
    Object.defineProperty(gameObject, 'sepia', {
        get: function () {
            return sepia;
        },
        set: function (value) {
            if (sepia === value) {
                return;
            }

            sepia = value;

            if ((sepia === null) || (sepia === false)) {
                if (gameObject._sepiaEffect) {
                    gameObject.preFX.remove(gameObject._sepiaEffect);
                    gameObject._sepiaEffect = undefined;
                }
            } else {
                if (!gameObject._sepiaEffect) {
                    gameObject._sepiaEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._sepiaEffect.sepia();
            }

        },
    })

    gameObject.sepia = null;

    return gameObject;
}

export default AddSepiaProperties;