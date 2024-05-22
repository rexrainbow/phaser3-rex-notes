import GetLayer from '../system/GetLayer.js';

var GetRootRenderGameObject = function (gameObject) {
    if (gameObject.parentContainer) {  // At a container
        return GetRootRenderGameObject(gameObject.parentContainer);
    }

    var layer = GetLayer(gameObject);
    if (layer) {  // At a layer
        return GetRootRenderGameObject(layer);
    }

    return gameObject;
}

export default GetRootRenderGameObject;