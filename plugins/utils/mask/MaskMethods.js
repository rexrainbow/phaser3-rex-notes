import IsWebGLRenderMode from '../system/IsWebGLRenderMode.js';

import { Filters as PhaserFilters } from 'phaser';
const MaskController = PhaserFilters.Mask;

var SetMask = function (gameObject, maskGameObject, invert, maskType) {
    if (IsWebGLRenderMode(gameObject)) {
        // WEBGL mask
        // maskType = undefined('shared'), 'local', or 'world'
        if (maskType === undefined) {
            maskType = 'shared';
        }
        maskGameObject._maskType = maskType;

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
        maskGameObject._maskType
        */

    } else {
        // CANVAS mask
        CanvasSetMask(gameObject, maskGameObject);
    }

}

var SyncMaskFilter = function (maskGameObject, maskObject, maskType) {
    if (maskGameObject._syncMaskFilter) {
        // Set scaleFactor and viewTransform in maskGameObject._syncMaskFilter()
        maskGameObject._syncMaskFilter(maskObject, maskType);
    }
}

var WarnInvalidMaskFilterUsage = function (message) {
    if ((typeof console !== 'undefined') && console.warn) {
        console.warn(message);
    }
}

var AssignMaskObject = function (maskGameObject, maskObject, maskObjectType, maskTarget, maskType) {
    /*
    maskObjectType:

    - 'shared'：WebGL shared mask filter
    - 'local'：WebGL private internal/local mask filter
    - 'world'：WebGL private external/world mask filter
    - 'canvas'：Canvas GeometryMask

    maskType: undefined('shared'), 'local', or 'world'
    */
     
    maskGameObject._maskObject = maskObject;
    maskGameObject._maskObjectType = maskObjectType;
    maskGameObject._maskTarget = maskTarget;

    if (maskObject) {
        maskObject._maskType = maskType;
    }
}

var ClearAssignedMaskObject = function (maskGameObject, maskObject) {
    if (maskGameObject._maskObject !== maskObject) {
        return;
    }

    maskGameObject._maskObject = undefined;
    maskGameObject._maskObjectType = undefined;
    maskGameObject._maskTarget = undefined;
}

var WebGLSetSharedMask = function (gameObject, maskGameObject, invert) {
    // Share this mask filter controller for all mask target game objects
    var maskObject = maskGameObject._maskObject;
    if (!maskObject) {
        maskObject = new MaskController(maskGameObject.scene.cameras.main, maskGameObject, invert);
        maskObject.ignoreDestroy = true;
        AssignMaskObject(maskGameObject, maskObject, 'shared', undefined, maskGameObject._maskType);
        SyncMaskFilter(maskGameObject, maskObject, maskGameObject._maskType);
        // Destroy mask object when mask source game object is destroyed
        maskGameObject.once('destroy', function () {
            maskObject.destroy();
            ClearAssignedMaskObject(maskGameObject, maskObject);
        });

    } else {
        if (maskGameObject._maskObjectType !== 'shared') {
            WarnInvalidMaskFilterUsage('MaskMethods: this mask game object is already used by a private mask filter.');
            return;
        }

        if ((invert !== undefined) && (maskObject.invert !== undefined)) {
            maskObject.invert = invert;
        }
        AssignMaskObject(maskGameObject, maskObject, 'shared', undefined, maskGameObject._maskType);
        SyncMaskFilter(maskGameObject, maskObject, maskGameObject._maskType);

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
    if (maskGameObject._maskObject) {
        if (maskGameObject._maskObjectType === 'shared') {
            WarnInvalidMaskFilterUsage('MaskMethods: this mask game object is already used by a shared mask filter.');
            return;
        }

        if (maskGameObject._maskTarget !== gameObject) {
            WarnInvalidMaskFilterUsage('MaskMethods: a private mask filter can only be used by one target game object.');
            return;
        }
    }

    var maskObject = filtersList.addMask(maskGameObject, invert, undefined, maskType);
    AssignMaskObject(maskGameObject, maskObject, maskType, gameObject, maskType);
    SyncMaskFilter(maskGameObject, maskObject, maskType);
    gameObject.mask = maskObject;
}

var CanvasSetMask = function (gameObject, maskGameObject) {
    // Share this GeometryMask for all mask target game object
    var maskObject = maskGameObject._maskObject;
    if (!maskObject) {
        maskObject = maskGameObject.createGeometryMask();
        AssignMaskObject(maskGameObject, maskObject, 'canvas', undefined, undefined);
        // Destroy mask object when mask source game object is destroyed
        maskGameObject.once('destroy', function () {
            maskObject.destroy();
            ClearAssignedMaskObject(maskGameObject, maskObject);
        });
    }

    gameObject.mask = maskObject;
}

var ClearMask = function (gameObject) {
    if (!gameObject.mask) {
        return;
    }

    if (IsWebGLRenderMode(gameObject)) {
        var maskType = gameObject.mask._maskType || gameObject.mask.maskGameObject._maskType;
        switch (maskType) {
            case 'local':
            case 'world':
                WebGLClearPrivateMask(gameObject, maskType);
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

var WebGLClearPrivateMask = function (gameObject, maskType) {
    if (!gameObject.mask) {
        return;
    }
    var maskObject = gameObject.mask;
    var maskGameObject = maskObject.maskGameObject;
    var filtersList = (maskType === 'local') ? gameObject.filters.internal : gameObject.filters.external;
    ClearAssignedMaskObject(maskGameObject, maskObject);
    filtersList.remove(maskObject, true);
    gameObject.mask = null;
}

var CanvasClearMask = function (gameObject) {
    gameObject.mask = null;
}

export {
    SetMask,
    ClearMask,
}
