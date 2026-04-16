import GetLocalState from '../utils/GetLocalState.js';
import GetValidChildren from './GetValidChildren.js';
import SortGameObjectsByDepth from '../../../../utils/system/SortGameObjectsByDepth.js';

var ClearLayerState = function (gameObjects, layer) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (!gameObject.hasOwnProperty('rexContainer')) {
            continue;
        }

        var state = GetLocalState(gameObject);
        if (state.layer === layer) {
            state.layer = null;
        }
    }
}

var RemoveFromContainer = function (p3Container, descending, addToScene) {
    if (!this.scene) {
        // Destroyed
        return;
    }

    var gameObjects = GetValidChildren(this);

    SortGameObjectsByDepth(gameObjects, descending);

    p3Container.remove(gameObjects);

    ClearLayerState(gameObjects, p3Container);

    if (addToScene) {
        gameObjects.forEach(function (gameObject) {
            gameObject.addToDisplayList();
        });
    }
}

export default RemoveFromContainer;