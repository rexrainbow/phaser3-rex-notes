import HasProperty from '../../../utils/object/HasProperty.js';

var AddBlackWhiteProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'blackWhite') || !gameObject.preFX) {
        return gameObject;
    }

    var blackWhite;
    Object.defineProperty(gameObject, 'blackWhite', {
        get: function () {
            return blackWhite;
        },
        set: function (value) {
            if (blackWhite === value) {
                return;
            }

            blackWhite = value;

            if ((blackWhite === null) || (blackWhite === false)) {
                if (gameObject._blackWhiteEffect) {
                    gameObject.preFX.remove(gameObject._blackWhiteEffect);
                    gameObject._blackWhiteEffect = undefined;
                }
            } else {
                if (!gameObject._blackWhiteEffect) {
                    gameObject._blackWhiteEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._blackWhiteEffect.blackWhite();
            }

        },
    })

    gameObject.blackWhite = null;

    return gameObject;
}

export default AddBlackWhiteProperties;