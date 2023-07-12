import HasProperty from '../../../utils/object/HasProperty.js';

var AddPolaroidProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'polaroid') || !gameObject.preFX) {
        return gameObject;
    }

    var polaroid;
    Object.defineProperty(gameObject, 'polaroid', {
        get: function () {
            return polaroid;
        },
        set: function (value) {
            if (polaroid === value) {
                return;
            }

            polaroid = value;

            if ((polaroid === null) || (polaroid === false)) {
                if (gameObject._polaroidEffect) {
                    gameObject.preFX.remove(gameObject._polaroidEffect);
                    gameObject._polaroidEffect = undefined;
                }
            } else {
                if (!gameObject._polaroidEffect) {
                    gameObject._polaroidEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._polaroidEffect.polaroid();
            }

        },
    })

    gameObject.polaroid = null;

    return gameObject;
}

export default AddPolaroidProperties;