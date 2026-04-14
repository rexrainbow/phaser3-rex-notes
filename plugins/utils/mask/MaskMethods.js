import IsWebGLRenderMode from '../system/IsWebGLRenderMode.js';

const MaskController = Phaser.Filters.Mask;

var SetMask = function (gameObject, maskGameObject, invert, isLocalMask) {
    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        WebGLSetSharedMask(gameObject, maskGameObject, invert);
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
        WebglClearSharedMask(gameObject);

    } else {
        CanvasClearMask(gameObject);
    }

}

var WebglClearSharedMask = function (gameObject) {
    if (!gameObject.mask) {
        return;
    }
    var filterList = gameObject.filters.external;
    var list = filterList.list;

    // Remove current mask object from external filter list
    var index = list.indexOf(gameObject.mask);
    if (index !== -1) {
        list.splice(index, 1);
    }

    gameObject.mask = null;
}

var CanvasClearMask = function (gameObject) {
    gameObject.mask = null;
}

export {
    SetMask,
    ClearMask,
}
