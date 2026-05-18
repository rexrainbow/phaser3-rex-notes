import HasProperty from '../../utils/object/HasProperty';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList';
import AddClearEffectCallback from './AddClearEffectCallback';

var AddDisplacementProperties = function(gameObject?: any) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'displacementKey')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var displacementKey,
        displacementX = 0.005,
        displacementY = 0.005;
    Object.defineProperty(gameObject, 'displacementKey', {
        get: function() {
            return displacementKey;
        },
        set: function(value?: any) {
            if (displacementKey === value) {
                return;
            }

            displacementKey = value;

            if ((displacementKey === null) || (displacementKey === false)) {
                if (gameObject._displacement) {
                    filterList.remove(gameObject._displacement);
                    gameObject._displacement = undefined;
                }
            } else {
                if (!gameObject._displacement) {
                    gameObject._displacement = filterList.addDisplacement(displacementKey, displacementX, displacementY);
                }

                gameObject._displacement.setTexture(displacementKey);
            }

        },
    })

    Object.defineProperty(gameObject, 'displacementX', {
        get: function() {
            return displacementX;
        },
        set: function(value?: any) {
            if (displacementX === value) {
                return;
            }

            displacementX = value;

            if (gameObject._displacement) {
                gameObject._displacement.x = displacementX;
            }
        },
    })

    Object.defineProperty(gameObject, 'displacementY', {
        get: function() {
            return displacementY;
        },
        set: function(value?: any) {
            if (displacementY === value) {
                return;
            }

            displacementY = value;

            if (gameObject._displacement) {
                gameObject._displacement.y = displacementY;
            }
        },
    })

    gameObject.displacementKey = null;

    AddClearEffectCallback(gameObject, 'displacementKey');

    return gameObject;
}

export default AddDisplacementProperties;