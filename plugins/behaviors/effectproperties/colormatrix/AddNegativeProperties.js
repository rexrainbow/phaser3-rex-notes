import HasProperty from '../../../utils/object/HasProperty.js';

var AddNegativeProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'negative') || !gameObject.preFX) {
        return gameObject;
    }

    var negative;
    Object.defineProperty(gameObject, 'negative', {
        get: function () {
            return negative;
        },
        set: function (value) {
            if (negative === value) {
                return;
            }

            negative = value;

            if ((negative === null) || (negative === false)) {
                if (gameObject._negativeEffect) {
                    gameObject.preFX.remove(gameObject._negativeEffect);
                    gameObject._negativeEffect = undefined;
                }
            } else {
                if (!gameObject._negativeEffect) {
                    gameObject._negativeEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._negativeEffect.negative();
            }

        },
    })

    gameObject.negative = null;

    return gameObject;
}

export default AddNegativeProperties;