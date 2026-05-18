import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';

var AddBarrelProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'barrel')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var barrel;
    Object.defineProperty(gameObject, 'barrel', {
        get: function() {
            return barrel;
        },
        set: function(value?: any) {
            if (barrel === value) {
                return;
            }

            barrel = value;

            if ((barrel === null) || (barrel === false)) {
                if (gameObject._barrelEffect) {
                    filterList.remove(gameObject._barrelEffect);
                    gameObject._barrelEffect = undefined;
                }
            } else {
                if (!gameObject._barrelEffect) {
                    gameObject._barrelEffect = filterList
                        .addBarrel()
                        .setPaddingOverride(null);
                }
                gameObject._barrelEffect.amount = barrel;
            }

        },
    })

    gameObject.barrel = null;

    AddClearEffectCallback(gameObject, 'barrel');

    return gameObject;
}

export default AddBarrelProperties;