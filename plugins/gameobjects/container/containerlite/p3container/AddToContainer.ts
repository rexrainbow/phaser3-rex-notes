import GetLocalState from '../utils/GetLocalState';
import SortGameObjectsByDepth from '../../../../utils/system/SortGameObjectsByDepth';
import GetValidChildren from './GetValidChildren';


var SetLayerState = function(gameObjects?: any, layer?: any) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        GetLocalState(gameObjects[i]).layer = layer;
    }
}

var AddToContainer = function(p3Container?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }
    var {
        includeParent = false,
        setLayerState = false,
        clearDepthSort = false
    } = config;

    var gameObjects = GetValidChildren(this, includeParent);

    SortGameObjectsByDepth(gameObjects);

    p3Container.add(gameObjects);

    if (setLayerState?: any) {
        SetLayerState(gameObjects, p3Container);
    }

    if (clearDepthSort?: any) {
        p3Container.sortChildrenFlag = false;
    }

    return gameObjects;
}

export default AddToContainer;