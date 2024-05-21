import IsLayerGameObject from './IsLayerGameObject.js';

var GetLayer = function (gameObject) {
    var layer = gameObject.displayList;
    if (!IsLayerGameObject(layer)) {
        return null;
    }

    return layer;

}
export default GetLayer;