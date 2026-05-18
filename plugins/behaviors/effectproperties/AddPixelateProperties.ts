import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';

var AddPixelateProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'pixelate')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var pixelate;
    Object.defineProperty(gameObject, 'pixelate', {
        get: function() {
            return pixelate;
        },
        set: function(value?: any) {
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