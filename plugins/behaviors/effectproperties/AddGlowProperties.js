import HasProperty from '../../utils/object/HasProperty.js';

var AddGlowProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'glowColor') || !gameObject.preFX) {
        return gameObject;
    }

    var glowColor,
        glowOuterStrength = 4,
        glowInnerStrength = 0;
    Object.defineProperty(gameObject, 'glowColor', {
        get: function () {
            return glowColor;
        },
        set: function (value) {
            if (glowColor === value) {
                return;
            }

            glowColor = value;

            if ((glowColor === null) || (glowColor === false)) {
                if (gameObject._glow) {
                    gameObject.preFX.remove(gameObject._glow);
                    gameObject._glow = undefined;
                    gameObject.preFX.setPadding(0);
                }
            } else {
                if (!gameObject._glow) {
                    gameObject._glow = gameObject.preFX.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
                    gameObject.preFX.setPadding(glowOuterStrength + 1);
                }

                gameObject._glow.color = glowColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'glowOuterStrength', {
        get: function () {
            return glowOuterStrength;
        },
        set: function (value) {
            if (glowOuterStrength === value) {
                return;
            }

            glowOuterStrength = value;

            if (gameObject._glow) {
                gameObject.preFX.setPadding(glowOuterStrength + 1);
                gameObject._glow.outerStrength = glowOuterStrength;
            }
        },
    })

    Object.defineProperty(gameObject, 'glowInnerStrength', {
        get: function () {
            return glowInnerStrength;
        },
        set: function (value) {
            if (glowInnerStrength === value) {
                return;
            }

            glowInnerStrength = value;

            if (gameObject._glow) {
                gameObject._glow.innerStrength = glowInnerStrength;
            }
        },
    })

    gameObject.glowColor = null;

    return gameObject;
}

export default AddGlowProperties;