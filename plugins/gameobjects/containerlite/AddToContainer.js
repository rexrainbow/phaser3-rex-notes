import SortGameObjectsByDepth from '../../utils/system/SortGameObjectsByDepth.js';

var AddToContainer = function (layer) {
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects)
    layer.add(gameObjects);
    return this;
}

export default {
    addToContainer: AddToContainer,
    addToLayer: AddToContainer,

}