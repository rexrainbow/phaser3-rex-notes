import GetLocalState from '../utils/GetLocalState.js';
import SortGameObjectsByDepth from '../../../../utils/system/SortGameObjectsByDepth.js';
import GetValidChildren from './GetValidChildren.js';


var SetLayerState = function (gameObjects, layer) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        GetLocalState(gameObjects[i]).layer = layer;
    }
}

var AddToContainer = function (p3Container, config) {
    if (config === undefined) {
        config = {};
    }
    var {
        includeParent = false,
        setLayerState = false,
        clearDepthSort = false
    } = config;

    var gameObjects = GetValidChildren(this, includeParent);

    // This containerLite parent should be considered.
    if (includeParent && (gameObjects.indexOf(this) === -1)) {
        gameObjects.push(this);
    }

    SortGameObjectsByDepth(gameObjects);

    p3Container.add(gameObjects);

    if (setLayerState) {
        SetLayerState(gameObjects, p3Container);
    }

    if (clearDepthSort) {
        p3Container.sortChildrenFlag = false;
    }

    return gameObjects;
}

export default AddToContainer;
