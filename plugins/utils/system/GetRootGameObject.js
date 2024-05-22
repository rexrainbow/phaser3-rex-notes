import GetLayer from './GetLayer.js';

var GetRootGameObject = function (gameObject) {
    if (gameObject.parentContainer) {  // At a container
        return GetRootGameObject(gameObject.parentContainer);
    }

    var layer = GetLayer(gameObject);
    if (layer) {  // At a layer
        return GetRootGameObject(layer);
    }

    return gameObject;
}

export default GetRootGameObject;