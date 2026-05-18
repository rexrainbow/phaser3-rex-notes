import GetLayer from './GetLayer';

var GetRootGameObject = function(gameObject?: any) {
    if (gameObject.parentContainer) {  // At a container
        return GetRootGameObject(gameObject.parentContainer);
    }

    var layer = GetLayer(gameObject);
    if (layer?: any) {  // At a layer
        return GetRootGameObject(layer);
    }

    return gameObject;
}

export default GetRootGameObject;