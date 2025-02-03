import HasProperty from '../../utils/object/HasProperty.js';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddPixelateProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'pixelate')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var pixelate;
    Object.defineProperty(gameObject, 'pixelate', {
        get: function () {
            return pixelate;
        },
        set: function (value) {
            if (pixelate === value) {
                return;
            }

            pixelate = value;

            if ((pixelate === null) || (pixelate === false)) {
                if (gameObject._pixelateEffect) {
                    filterList.remove(gameObject._pixelateEffect);
                    gameObject._pixelateEffect = undefined;
                }
            } else {
                if (!gameObject._pixelateEffect) {
                    gameObject._pixelateEffect = filterList.addPixelate();
                }
                gameObject._pixelateEffect.amount = pixelate;
            }

        },
    })

    gameObject.pixelate = null;

    AddClearEffectCallback(gameObject, 'pixelate');

    return gameObject;
}

export default AddPixelateProperties;