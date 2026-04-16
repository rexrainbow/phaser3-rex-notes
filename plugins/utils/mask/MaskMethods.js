import IsWebGLRenderMode from '../system/IsWebGLRenderMode.js';

const MaskController = Phaser.Filters.Mask;

var SetMask = function (gameObject, maskGameObject, invert, maskType) {
    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        // maskType = undefined('shared'), 'local', or 'world'
        if (maskType === undefined) {
            maskType = 'shared';
        }
        maskGameObject._maskTpe = maskType;

        switch (maskType) {
            case 'local':
            case 'world':
                WebGLSetPrivateMask(gameObject, maskGameObject, invert, maskType);
                break;

            default: // shared
                WebGLSetSharedMask(gameObject, maskGameObject, invert);
                break;
        }

        /*
        gameObject.mask
        maskGameObject._maskTpe
        */

    } else {
        // CANVAS mask
        CanvasSetMask(gameObject, maskGameObject);
    }

}

var WebGLSetSharedMask = function (gameObject, maskGameObject, invert) {
    // Share this mask filter controller for all mask target game object
    var maskObject = maskGameObject._maskObject;
    if (!maskObject) {
        maskObject = new MaskController(maskGameObject.scene.cameras.main, maskGameObject, invert);
        maskObject.ignoreDestroy = true;
        // camera, mask, invert, viewCamera, viewTransform, scaleFactor
        maskGameObject._maskObject = maskObject;
        // Destroy mask object when mask source game object is destroyed
        maskGameObject.once('destroy', function () {
            maskObject.destroy();
            maskGameObject._maskObject = undefined;
        });

    } else {
        if ((invert !== undefined) && (maskObject.invert !== undefined)) {
            maskObject.invert = invert;
        }

    }

    if (gameObject.mask === maskObject) {
        // The same mask object
        return;
    }

    if (!gameObject.filters) {
        if (!gameObject.enableFilters) {
            return;
        }

        gameObject.enableFilters();
    }

    var filterList = gameObject.filters.external;
    var list = filterList.list;

    if (gameObject.mask) {
        // gameObject.mask !== maskObject
        // Replace current mask controller
        var index = list.indexOf(gameObject.mask);
        list[index] = maskObject;
    } else {
        // Append mask controller
        list.push(maskObject);
    }

    gameObject.mask = maskObject;
}

var WebGLSetPrivateMask = function (gameObject, maskGameObject, invert, maskType) {
    if (!gameObject.filters) {
        if (!gameObject.enableFilters) {
            return;
        }

        gameObject.enableFilters();
    }

    if (gameObject.mask) {
        ClearMask(gameObject);
    }

    var filtersList = (maskType === 'local') ? gameObject.filters.internal : gameObject.filters.external;
    var maskObject = filtersList.addMask(maskGameObject, invert, undefined, maskType);
    gameObject.mask = maskObject;
}

var CanvasSetMask = function (gameObject, maskGameObject) {
    // Share this GeometryMask for all mask target game object
    var maskObject = maskGameObject._maskObject;
    if (!maskObject) {
        maskObject = maskGameObject.createGeometryMask();
        maskGameObject._maskObject = maskObject;
        // Destroy mask object when mask source game object is destroyed
        maskGameObject.once('destroy', function () {
            maskObject.destroy();
            maskGameObject._maskObject = undefined;
        });
    }

    gameObject.mask = maskObject;
}

var ClearMask = function (gameObject) {
    if (!gameObject.mask) {
        return;
    }

    if (IsWebGLRenderMode(gameObject)) {
        var maskTpe = gameObject.mask.maskGameObject._maskTpe;
        switch (maskTpe) {
            case 'local':
            case 'world':
                WebGLClearPrivateMask(gameObject, maskTpe);
                break;
            default: // shared
                WebglClearSharedMask(gameObject);
                break;
        }

    } else {
        CanvasClearMask(gameObject);
    }

}

var WebglClearSharedMask = function (gameObject) {
    if (!gameObject.mask) {
        return;
    }
    gameObject.filters.external.remove(gameObject.mask, false);
    gameObject.mask = null;
}

var WebGLClearPrivateMask = function (gameObject, maskTpe) {
    if (!gameObject.mask) {
        return;
    }
    var filtersList = (maskTpe === 'local') ? gameObject.filters.internal : gameObject.filters.external;
    filtersList.remove(gameObject.mask, true);
    gameObject.mask = null;
}

var CanvasClearMask = function (gameObject) {
    gameObject.mask = null;
}

export {
    SetMask,
    ClearMask,
}
