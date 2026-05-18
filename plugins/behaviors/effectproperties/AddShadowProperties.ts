import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';

var AddShadowProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shadowColor')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var shadowColor,
        shadowX = 0,
        shadowY = 0,
        shadowDecay = 0.1,
        shadowPower = 1,
        shadowSamples = 6,
        shadowIntensity = 1;
    Object.defineProperty(gameObject, 'shadowColor', {
        get: function() {
            return shadowColor;
        },
        set: function(value?: any) {
            if (shadowColor === value) {
                return;
            }

            shadowColor = value;

            if ((shadowColor === null) || (shadowColor === false)) {
                if (gameObject._shadow) {
                    filterList.remove(gameObject._shadow);
                    gameObject._shadow = undefined;
                }
            } else {
                if (!gameObject._shadow) {
                    gameObject._shadow = filterList
                        .addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity)
                        .setPaddingOverride(null);
                }

                gameObject._shadow.color = shadowColor;
            }

        },
    })

    Object.defineProperty(gameObject, 'shadowX', {
        get: function() {
            return shadowX;
        },
        set: function(value?: any) {
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
        get: function() {
            return shadowY;
        },
        set: function(value?: any) {
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
        get: function() {
            return shadowDecay;
        },
        set: function(value?: any) {
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
        get: function() {
            return shadowPower;
        },
        set: function(value?: any) {
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
        get: function() {
            return shadowSamples;
        },
        set: function(value?: any) {
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
        get: function() {
            return shadowIntensity;
        },
        set: function(value?: any) {
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