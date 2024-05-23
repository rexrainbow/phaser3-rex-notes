import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddVignetteProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'vignetteRadius')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var vignetteRadius,
        vignetteX = 0.5,
        vignetteY = 0.5,
        vignetteStrength = 0.5;
    Object.defineProperty(gameObject, 'vignetteRadius', {
        get: function () {
            return vignetteRadius;
        },
        set: function (value) {
            if (vignetteRadius === value) {
                return;
            }

            vignetteRadius = value;

            if ((vignetteRadius === null) || (vignetteRadius === false)) {
                if (gameObject._vignette) {
                    fxFactory.remove(gameObject._vignette);
                    gameObject._vignette = undefined;
                }
            } else {
                if (!gameObject._vignette) {
                    gameObject._vignette = fxFactory.addVignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
                }

                gameObject._vignette.radius = vignetteRadius;
            }

        },
    })

    Object.defineProperty(gameObject, 'vignetteX', {
        get: function () {
            return vignetteX;
        },
        set: function (value) {
            if (vignetteX === value) {
                return;
            }

            vignetteX = value;

            if (gameObject._vignette) {
                gameObject._vignette.x = vignetteX;
            }
        },
    })

    Object.defineProperty(gameObject, 'vignetteY', {
        get: function () {
            return vignetteY;
        },
        set: function (value) {
            if (vignetteY === value) {
                return;
            }

            vignetteY = value;

            if (gameObject._vignette) {
                gameObject._vignette.y = vignetteY;
            }
        },
    })

    Object.defineProperty(gameObject, 'vignetteStrength', {
        get: function () {
            return vignetteStrength;
        },
        set: function (value) {
            if (vignetteStrength === value) {
                return;
            }

            vignetteStrength = value;

            if (gameObject._vignette) {
                gameObject._vignette.strength = vignetteStrength;
            }
        },
    })

    gameObject.vignetteRadius = null;

    AddClearEffectCallback(gameObject, 'vignetteRadius');

    return gameObject;
}

export default AddVignetteProperties;