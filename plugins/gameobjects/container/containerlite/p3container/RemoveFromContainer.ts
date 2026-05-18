import GetLocalState from '../utils/GetLocalState';
import GetValidChildren from './GetValidChildren';
import SortGameObjectsByDepth from '../../../../utils/system/SortGameObjectsByDepth';

var ClearLayerState = function(gameObjects?: any, layer?: any) {
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

var RemoveFromContainer = function(p3Container?: any, descending?: any, addToScene?: any) {
    if (!this.scene) {
        // Destroyed
        return;
    }

    var gameObjects = GetValidChildren(this);

    SortGameObjectsByDepth(gameObjects, descending);

    p3Container.remove(gameObjects);

    ClearLayerState(gameObjects, p3Container);

    if (addToScene?: any) {
        gameObjects.forEach(function(gameObject?: any) {
            gameObject.addToDisplayList();
        });
    }
}

export default RemoveFromContainer;