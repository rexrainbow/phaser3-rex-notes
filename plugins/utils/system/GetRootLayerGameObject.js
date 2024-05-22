import GetLayer from './GetLayer.js';

var GetRootLayerGameObject = function (gameObject) {
    if (gameObject.parentContainer) {  // At a container
        return GetRootLayerGameObject(gameObject.parentContainer);
    }

    var layer = GetLayer(gameObject);
    if (layer) {  // At a layer
        return GetRootLayerGameObject(layer);
    }

    return gameObject;
}

export default GetRootLayerGameObject;