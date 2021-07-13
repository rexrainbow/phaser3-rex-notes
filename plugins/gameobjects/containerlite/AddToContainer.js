import SortGameObjectsByDepth from '../../utils/system/SortGameObjectsByDepth.js';

var AddToLayer = function (layer) {
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects)
    layer.add(gameObjects);
    return this;
}

export default {
    addToLayer: AddToLayer,
    addToContainer: AddToLayer,
}