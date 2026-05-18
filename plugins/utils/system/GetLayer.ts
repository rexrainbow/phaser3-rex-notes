import IsLayerGameObject from './IsLayerGameObject';

var GetLayer = function(gameObject?: any) {
    var layer = gameObject.displayList;
    if (!IsLayerGameObject(layer)) {
        return null;
    }

    return layer;

}
export default GetLayer;