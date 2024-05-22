import IsFunction from '../object/IsFunction.js';
import IsSceneObject from '../system/IsSceneObject.js';
import IsLayerGameObject from '../system/IsLayerGameObject.js';
import IsContainerGameObject from '../system/IsContainerGameObject.js';

var ForEachGameObjectInDisplayList = function (parent, typeNameFilter, callback, scope) {
    if (IsFunction(typeNameFilter)) {
        scope = callback;
        callback = typeNameFilter;
        typeNameFilter = undefined;
    }

    var children;
    if (IsSceneObject(parent)) {
        children = parent.children.list
    } else { // parent is a Layer or Container
        children = parent.list;
    }

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if ((!typeNameFilter) || (typeNameFilter.indexOf(child.type) !== -1)) {

            if (scope) {
                callback.call(scope, child);
            } else {
                callback(child);
            }
        }

        if (IsLayerGameObject(child) || IsContainerGameObject(child)) {
            ForEachGameObjectInDisplayList(child, typeNameFilter, callback, scope);
        }

    }

}

export default ForEachGameObjectInDisplayList;