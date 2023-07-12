import HasProperty from '../../../utils/object/HasProperty.js';

var AddKodachromeProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'kodachrome') || !gameObject.preFX) {
        return gameObject;
    }

    var kodachrome;
    Object.defineProperty(gameObject, 'kodachrome', {
        get: function () {
            return kodachrome;
        },
        set: function (value) {
            if (kodachrome === value) {
                return;
            }

            kodachrome = value;

            if ((kodachrome === null) || (kodachrome === false)) {
                if (gameObject._kodachromeEffect) {
                    gameObject.preFX.remove(gameObject._kodachromeEffect);
                    gameObject._kodachromeEffect = undefined;
                }
            } else {
                if (!gameObject._kodachromeEffect) {
                    gameObject._kodachromeEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._kodachromeEffect.kodachrome();
            }

        },
    })

    gameObject.kodachrome = null;

    return gameObject;
}

export default AddKodachromeProperties;