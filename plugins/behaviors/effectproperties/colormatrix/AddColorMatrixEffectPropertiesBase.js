import HasProperty from '../../../utils/object/HasProperty.js';

var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName) {
    // Don't attach properties again
    if (HasProperty(gameObject, effectName) || !gameObject.preFX) {
        return gameObject;
    }

    var EffectInstancePropertyName = `_${effectName}Effect`;

    var currentValue;
    Object.defineProperty(gameObject, effectName, {
        get: function () {
            return currentValue;
        },
        set: function (value) {
            if (currentValue === value) {
                return;
            }

            currentValue = value;

            if ((currentValue === null) || (currentValue === false)) {
                if (gameObject[EffectInstancePropertyName]) {
                    gameObject.preFX.remove(gameObject[EffectInstancePropertyName]);
                    gameObject[EffectInstancePropertyName] = undefined;
                }
            } else {
                if (!gameObject[EffectInstancePropertyName]) {
                    gameObject[EffectInstancePropertyName] = gameObject.preFX.addColorMatrix();
                }
                var effectInstance = gameObject[EffectInstancePropertyName];
                effectInstance[effectName](value);
            }

        },
    })

    gameObject[effectName] = null;

    return gameObject;
}

export default AddColorMatrixEffectPropertiesBase;