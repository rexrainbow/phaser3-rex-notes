import HasProperty from '../../../utils/object/HasProperty.js';

var AddBrownProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'brown') || !gameObject.preFX) {
        return gameObject;
    }

    var brown;
    Object.defineProperty(gameObject, 'brown', {
        get: function () {
            return brown;
        },
        set: function (value) {
            if (brown === value) {
                return;
            }

            brown = value;

            if ((brown === null) || (brown === false)) {
                if (gameObject._brownEffect) {
                    gameObject.preFX.remove(gameObject._brownEffect);
                    gameObject._brownEffect = undefined;
                }
            } else {
                if (!gameObject._brownEffect) {
                    gameObject._brownEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._brownEffect.brown();
            }

        },
    })

    gameObject.brown = null;

    return gameObject;
}

export default AddBrownProperties;