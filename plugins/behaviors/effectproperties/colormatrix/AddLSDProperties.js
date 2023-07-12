import HasProperty from '../../../utils/object/HasProperty.js';

var AddLSDProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'lsd') || !gameObject.preFX) {
        return gameObject;
    }

    var lsd;
    Object.defineProperty(gameObject, 'lsd', {
        get: function () {
            return lsd;
        },
        set: function (value) {
            if (lsd === value) {
                return;
            }

            lsd = value;

            if ((lsd === null) || (lsd === false)) {
                if (gameObject._lsdEffect) {
                    gameObject.preFX.remove(gameObject._lsdEffect);
                    gameObject._lsdEffect = undefined;
                }
            } else {
                if (!gameObject._lsdEffect) {
                    gameObject._lsdEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._lsdEffect.lsd();
            }

        },
    })

    gameObject.lsd = null;

    return gameObject;
}

export default AddLSDProperties;