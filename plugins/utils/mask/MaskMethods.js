import IsWebGLRenderMode from '../system/IsWebGLRenderMode.js';

var SetMask = function (gameObject, maskGameObject, invert) {
    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        var maskFilter = gameObject.mask;
        if (maskFilter) {
            maskFilter.setGameObject(maskGameObject);
            maskFilter.invert = invert;
        } else {
            if (!gameObject.filters) {
                if (!gameObject.enableFilters) {
                    return;
                }

                gameObject.enableFilters();
            }
            gameObject.mask = gameObject.filters.external.addMask(maskGameObject, invert);
        }

    } else {
        // CANVAS mask
        if (!gameObject.setMask) {
            return;
        }

        var maskObject = maskGameObject._maskObject;
        if (!maskObject) {
            // Only support GeometryMask
            maskObject = maskGameObject.createGeometryMask();
            maskGameObject._maskObject = maskObject;
            // Destroy mask object when mask game object is destroyed
            maskGameObject.once('destroy', function () {
                maskObject.destroy();
                maskGameObject._maskObject = undefined;
            });
        }
        gameObject.setMask(maskObject);
    }

}

var CleaerMask = function (gameObject) {
    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        var maskFilter = gameObject.mask;
        if (maskFilter) {
            gameObject.filters.external.remove(maskFilter); 
            // Also destroy mask controller, but maskGameObject is not destroyed
            gameObject.mask = null;
        }

    } else {
        // CANVAS mask
        if (!gameObject.clearMask) {
            return;
        }

        gameObject.clearMask();
    }

}

var GetMaskGameObject = function (gameObject) {
    var mask = gameObject.mask;
    if (!mask) {
        return null;
    }

    // WEBGL mask
    if (mask.maskGameObject) {
        return mask.maskGameObject;
    }

    // CANVAS mask   
    return mask.geometryMask;
}

export {
    SetMask,
    CleaerMask,
    GetMaskGameObject,
}