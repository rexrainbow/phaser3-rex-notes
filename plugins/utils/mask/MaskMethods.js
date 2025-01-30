var AddMask = function (gameObject, maskGameObject, invert) {
    var renderer = gameObject.scene.sys.renderer;
    if (renderer && renderer.gl) {
        // WEBGL render mode
        var maskFilter = gameObject.mask;
        if (maskFilter) {
            maskFilter.setGameObject(maskGameObject);
            maskFilter.invert = invert;
        } else {
            if (!gameObject.filters) {
                gameObject.enableFilters();
            }
            gameObject.mask = gameObject.filters.external.addMask(maskGameObject, invert);
        }

    } else {
        // CANVAS render mode
        var maskObject = maskGameObject.__maskObject;
        if (!maskObject) {
            // Only support GeometryMask
            maskObject = maskGameObject.createGeometryMask();
            maskGameObject.__maskObject = maskObject;
        }
        gameObject.setMask(maskObject);
    }

}

var RemoveMask = function (gameObject) {
    if (gameObject.renderer && gameObject.renderer.gl) {
        // WEBGL render mode
        var maskFilter = gameObject.mask;
        if (maskFilter) {
            gameObject.filters.external.remove(maskFilter);
            gameObject.mask = null;
        }

    } else {
        // CANVAS render mode
        gameObject.clearMask();
    }

}

export {
    AddMask,
    RemoveMask
}