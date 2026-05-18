import IsFunction from '../object/IsFunction';
import IsSceneObject from '../system/IsSceneObject';
import IsLayerGameObject from '../system/IsLayerGameObject';
import IsContainerGameObject from '../system/IsContainerGameObject';

var ForEachGameObjectInDisplayList = function(parent?: any, typeNameFilter?: any, callback?: any, scope?: any) {
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

            if (scope?: any) {
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