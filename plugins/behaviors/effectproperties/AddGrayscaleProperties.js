import HasProperty from '../../utils/object/HasProperty.js';

var AddGrayscaleProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'grayscale') || !gameObject.preFX) {
        return gameObject;
    }

    var grayscale;
    Object.defineProperty(gameObject, 'grayscale', {
        get: function () {
            return grayscale;
        },
        set: function (value) {
            if (grayscale === value) {
                return;
            }

            grayscale = value;

            if ((grayscale === null) || (grayscale === false)) {
                if (gameObject._grayscaleEffect) {
                    gameObject.preFX.remove(gameObject._grayscaleEffect);
                    gameObject._grayscaleEffect = undefined;
                }
            } else {
                if (!gameObject._grayscaleEffect) {
                    gameObject._grayscaleEffect = gameObject.preFX.addColorMatrix();
                }
                gameObject._grayscaleEffect.grayscale(grayscale);
            }

        },
    })

    gameObject.grayscale = null;

    return gameObject;
}

export default AddGrayscaleProperties;