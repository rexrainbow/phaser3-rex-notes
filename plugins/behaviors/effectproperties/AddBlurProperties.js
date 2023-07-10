import HasProperty from '../../utils/object/HasProperty.js';

var AddBlurProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'blurColor') || !gameObject.preFX) {
        return gameObject;
    }

    var blurColor,
        blurQuality = 0,
        blurOffsetX = 1,
        blurOffsetY = 1,
        blurStrength = 1,
        blurSteps = 4;
    Object.defineProperty(gameObject, 'blurColor', {
        get: function () {
            return blurColor;
        },
        set: function (value) {
            if (blurColor === value) {
                return;
            }

            blurColor = value;

            if ((blurColor === null) || (blurColor === false)) {
                if (gameObject._blur) {
                    gameObject.preFX.remove(gameObject._blur);
                    gameObject._blur = undefined;
                }
            } else {
                if (!gameObject._blur) {
                    var offset = Math.max(blurOffsetX, blurOffsetY);
                    gameObject.preFX.setPadding(offset + 1);
                    gameObject._blur = gameObject.preFX.addBlur(blurQuality, blurOffsetX, blurOffsetY, blurStrength, blurColor, blurSteps);
                } else {
                    gameObject._blur.color = blurColor;
                }
            }

        },
    })

    Object.defineProperty(gameObject, 'blurQuality', {
        get: function () {
            return blurQuality;
        },
        set: function (value) {
            if (blurQuality === value) {
                return;
            }

            blurQuality = value;

            if (gameObject._blur) {
                gameObject._blur.quality = blurQuality;
            }

        },
    })

    Object.defineProperty(gameObject, 'blurOffsetX', {
        get: function () {
            return blurOffsetX;
        },
        set: function (value) {
            if (blurOffsetX === value) {
                return;
            }

            blurOffsetX = value;

            if (gameObject._blur) {
                var offset = Math.max(blurOffsetX, blurOffsetY);
                gameObject.preFX.setPadding(offset + 1);
                gameObject._blur.x = blurOffsetX;
            }
        },
    })

    Object.defineProperty(gameObject, 'blurOffsetY', {
        get: function () {
            return blurOffsetY;
        },
        set: function (value) {
            if (blurOffsetY === value) {
                return;
            }

            blurOffsetY = value;

            if (gameObject._blur) {
                var offset = Math.max(blurOffsetX, blurOffsetY);
                gameObject.preFX.setPadding(offset + 1);
                gameObject._blur.y = blurOffsetY;
            }
        },
    })

    Object.defineProperty(gameObject, 'blurStrength', {
        get: function () {
            return blurStrength;
        },
        set: function (value) {
            if (blurStrength === value) {
                return;
            }

            blurStrength = value;

            if (gameObject._blur) {
                gameObject._blur.strength = blurStrength;
            }
        },
    })

    Object.defineProperty(gameObject, 'blurSteps', {
        get: function () {
            return blurSteps;
        },
        set: function (value) {
            if (blurSteps === value) {
                return;
            }

            blurSteps = value;

            if (gameObject._blur) {
                gameObject._blur.steps = blurSteps;
            }
        },
    })

    gameObject.blurColor = null;

    return gameObject;
}

export default AddBlurProperties;