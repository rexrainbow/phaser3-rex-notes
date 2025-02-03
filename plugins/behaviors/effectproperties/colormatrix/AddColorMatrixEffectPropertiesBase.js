import HasProperty from '../../../utils/object/HasProperty.js';
import GetFilterList from '../../../utils/renderer/filterpluginbase/GetFilterList.js';
import AddClearEffectCallback from '../AddClearEffectCallback.js';

var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName, inputMode) {
    // Don't attach properties again
    if (HasProperty(gameObject, effectName)) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

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
                    filterList.remove(gameObject[EffectInstancePropertyName]);
                    gameObject[EffectInstancePropertyName] = undefined;
                }
            } else {
                if (!gameObject[EffectInstancePropertyName]) {
                    gameObject[EffectInstancePropertyName] = filterList.addColorMatrix();
                }
                var effectInstance = gameObject[EffectInstancePropertyName];
                effectInstance.colorMatrix[effectName]((inputMode === 1) ? value : undefined);
            }

        },
    })

    gameObject[effectName] = null;

    AddClearEffectCallback(gameObject, effectName);

    return gameObject;
}

export default AddColorMatrixEffectPropertiesBase;