import HasProperty from '../../utils/object/HasProperty.js';
import GetFilterList from '../../utils/renderer/filterpluginbase/GetFilterList.js';
import AddClearEffectCallback from './AddClearEffectCallback.js';

var AddBlockyProperties = function (gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'blockySize')) {
        return gameObject;
    }

    var filterList = GetFilterList(gameObject);

    var blockySize,
        blockyOffsetX = 0,
        blockyOffsetY = 0;
    Object.defineProperty(gameObject, 'blockySize', {
        get: function () {
            return blockySize;
        },
        set: function (value) {
            if (blockySize === value) {
                return;
            }

            blockySize = value;

            if ((blockySize === null) || (blockySize === false)) {
                if (gameObject._blockyEffect) {
                    filterList.remove(gameObject._blockyEffect);
                    gameObject._blockyEffect = undefined;
                }
            } else {
                if (!gameObject._blockyEffect) {
                    gameObject._blockyEffect = filterList.addBlocky({
                        size: blockySize,
                        offset: { x: blockyOffsetX, y: blockyOffsetY },
                    });
                }
                gameObject._blockyEffect.size.x = blockySize;
                gameObject._blockyEffect.size.y = blockySize;
            }

        },
    })

    Object.defineProperty(gameObject, 'blockyOffsetX', {
        get: function () {
            return blockyOffsetX;
        },
        set: function (value) {
            if (blockyOffsetX === value) {
                return;
            }

            blockyOffsetX = value;

            if (gameObject._blockyEffect) {
                gameObject._blockyEffect.offset.x = blockyOffsetX;
            }
        },
    })
        Object.defineProperty(gameObject, 'blockyOffsetY', {
        get: function () {
            return blockyOffsetY;
        },
        set: function (value) {
            if (blockyOffsetY === value) {
                return;
            }

            blockyOffsetY = value;

            if (gameObject._blockyEffect) {
                gameObject._blockyEffect.offset.y = blockyOffsetY;
            }
        },
    })

    AddClearEffectCallback(gameObject, 'blockySize');

    return gameObject;
}

export default AddBlockyProperties;