import IsWebGLRenderMode from '../system/IsWebGLRenderMode.js';

const MaskController = Phaser.Filters.Mask;

var CreateMaskObject = function (gameObject, invert) {
    // invert : WebGL only feature

    // A gameObject can own a (WEBGL) MaskController, or a (CANVAS) GeometryMask
    // Share this MaskController/GeometryMask for all mask target game object
    var maskObject = gameObject._maskObject;
    if (maskObject) {
        if ((invert !== undefined) && (maskObject.invert !== undefined)) {
            maskObject.invert = invert;
        }
        return maskObject;
    }

    if (IsWebGLRenderMode(gameObject)) {
        maskObject = new MaskController(gameObject.scene.cameras.main, gameObject, invert);

    } else {
        // CANVAS Only support GeometryMask
        maskObject = gameObject.createGeometryMask();

    }

    gameObject._maskObject = maskObject;

    // Destroy mask object when mask source game object is destroyed
    gameObject.once('destroy', function () {
        maskObject.destroy();
        gameObject._maskObject = undefined;
    });

    return maskObject;
}

var SetMask = function (gameObject, maskGameObject, invert) {
    var maskObject = CreateMaskObject(maskGameObject, invert);
    // A (WEBGL) MaskController, or a (CANVAS) GeometryMask

    if (gameObject.mask === maskObject) {
        // The same mask object
        return;
    }

    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        if (!gameObject.filters) {
            if (!gameObject.enableFilters) {
                return;
            }

            gameObject.enableFilters();
        }

        var filterList = gameObject.filters.external;
        var list = filterList.list;

        if (gameObject.mask) {
            // Replace current mask controller
            var index = list.indexOf(gameObject.mask);
            list[index] = maskGameObject;
        } else {
            // Append mask controller
            list.push(maskObject);
        }

    } else {
        // CANVAS mask
        if (!gameObject.setMask) {
            return;
        }
    }

    gameObject.mask = maskObject;
}

var ClearMask = function (gameObject) {
    if (!gameObject.mask) {
        return;
    }

    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        var filterList = gameObject.filters.external;
        var list = filterList.list;

        // Remove current mask object from external filter list
        var index = list.indexOf(gameObject.mask);
        list.splice(index, 1);

    } else {
        // CANVAS mask
        if (!gameObject.clearMask) {
            return;
        }

    }

    gameObject.mask = null;
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
    CreateMaskObject,
    SetMask,
    ClearMask,
    GetMaskGameObject,
}