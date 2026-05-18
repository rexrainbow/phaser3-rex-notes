import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';

var AddVignetteProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'vignetteRadius')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var vignetteRadius,
        vignetteX = 0.5,
        vignetteY = 0.5,
        vignetteStrength = 0.5;
    Object.defineProperty(gameObject, 'vignetteRadius', {
        get: function() {
            return vignetteRadius;
        },
        set: function(value?: any) {
            if (vignetteRadius === value) {
                return;
            }

            vignetteRadius = value;

            if ((vignetteRadius === null) || (vignetteRadius === false)) {
                if (gameObject._vignette) {
                    filterList.remove(gameObject._vignette);
                    gameObject._vignette = undefined;
                }
            } else {
                if (!gameObject._vignette) {
                    gameObject._vignette = filterList.addVignette(vignetteX, 1 - vignetteY, vignetteRadius, vignetteStrength);
                }

                gameObject._vignette.radius = vignetteRadius;
            }

        },
    })

    Object.defineProperty(gameObject, 'vignetteX', {
        get: function() {
            return vignetteX;
        },
        set: function(value?: any) {
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
        get: function() {
            return vignetteY;
        },
        set: function(value?: any) {
            if (vignetteY === value) {
                return;
            }

            vignetteY = value;

            if (gameObject._vignette) {
                gameObject._vignette.y = 1 - vignetteY;
            }
        },
    })

    Object.defineProperty(gameObject, 'vignetteStrength', {
        get: function() {
            return vignetteStrength;
        },
        set: function(value?: any) {
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

/*
Phaser 4's built-in Vignette filter uses a different falloff curve 
from the Phaser 3 built-in FX shader.
*/