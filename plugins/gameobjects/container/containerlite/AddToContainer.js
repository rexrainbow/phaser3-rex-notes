import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';

var AddToContainer = function (layer) {
    this._setParentContainerFlag = true;

    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    layer.add(gameObjects);

    this._setParentContainerFlag = false;
    return this;
}

var RemoveFromContainer = function () {
    if (!this.parentContainer) {
        return this;
    }

    this._setParentContainerFlag = true;

    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    gameObjects.reverse();
    this.parentContainer.remove(gameObjects);

    this._setParentContainerFlag = false;
    return this;
}

export default {
    addToLayer: AddToContainer,
    addToContainer: AddToContainer,
    removeFromContainer: RemoveFromContainer,

}