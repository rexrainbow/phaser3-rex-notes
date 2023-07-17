import HasProperty from '../../utils/object/HasProperty.js';
import GetFXFactory from './GetFXFactory.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddShadowProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shadowColor')) {
        return gameObject;
    }

    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
        return gameObject;
    }

    var shadowColor,
        shadowX = 0,
        shadowY = 0,
        shadowDecay = 0.1,
        shadowPower = 1,
        shadowSamples = 6,
        shadowIntensity = 1;
    Object.defineProperty(gameObject, 'shadowColor', {
        get: function () {
            return shadowColor;
        },
        set: function (value) {
            if (shadowColor === value) {
                return;
            }

            shadowColor = value;

            if ((shadowColor === null) || (shadowColor === false)) {
                if (gameObject._shadow) {
                    fxFactory.remove(gameObject._shadow);
                    gameObject._shadow = undefined;
                }
            } else {
                if (!gameObject._shadow) {
                    gameObject._shadow = fxFactory.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
                }

                gameObject._shadow.color = shadowColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'shadowX', {
        get: function () {
            return shadowX;
        },
        set: function (value) {
            if (shadowX === value) {
                return;
            }

            shadowX = value;

            if (gameObject._shadow) {
                gameObject._shadow.x = shadowX;
            }
        },
    })

    Object.defineProperty(gameObject, 'shadowY', {
        get: function () {
            return shadowY;
        },
        set: function (value) {
            if (shadowY === value) {
                return;
            }

            shadowY = value;

            if (gameObject._shadow) {
                gameObject._shadow.y = shadowY;
            }
        },
    })

    Object.defineProperty(gameObject, 'decay', {
        get: function () {
            return shadowDecay;
        },
        set: function (value) {
            if (shadowDecay === value) {
                return;
            }

            shadowDecay = value;

            if (gameObject._shadow) {
                gameObject._shadow.decay = shadowDecay;
            }
        },
    })

    Object.defineProperty(gameObject, 'shadowPower', {
        get: function () {
            return shadowPower;
        },
        set: function (value) {
            if (shadowPower === value) {
                return;
            }

            shadowPower = value;

            if (gameObject._shadow) {
                gameObject._shadow.power = shadowPower;
            }
        },
    })

    Object.defineProperty(gameObject, 'shadowSamples', {
        get: function () {
            return shadowSamples;
        },
        set: function (value) {
            if (shadowSamples === value) {
                return;
            }

            shadowSamples = value;

            if (gameObject._shadow) {
                gameObject._shadow.samples = shadowSamples;
            }
        },
    })

    Object.defineProperty(gameObject, 'shadowIntensity', {
        get: function () {
            return shadowIntensity;
        },
        set: function (value) {
            if (shadowIntensity === value) {
                return;
            }

            shadowIntensity = value;

            if (gameObject._shadow) {
                gameObject._shadow.intensity = shadowIntensity;
            }
        },
    })

    gameObject.shadowColor = null;

    AddClearEffectCallback(gameObject, 'shadowColor');

    return gameObject;
}

export default AddShadowProperties;