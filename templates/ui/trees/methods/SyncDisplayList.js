import IsLayerGameObject from '../../../../plugins/utils/system/IsLayerGameObject.js';

var SyncDisplayList = function (sourceGameObject, targetGameObject) {    
    var p3Container = sourceGameObject.parentContainer;
    if (p3Container) {
        if (targetGameObject.isRexContainerLite) {
            // Add containerLite and its children
            targetGameObject.addToContainer(p3Container);
        } else {
            // Add gameObject directly
            p3Container.add(targetGameObject);
        }

        return;
    }

    var layer = sourceGameObject.displayList;
    if (IsLayerGameObject(layer)) {
        if (targetGameObject.isRexContainerLite) {
            // Add containerLite and its children
            targetGameObject.addToLayer(layer);
        } else {
            // Add gameObject directly
            layer.add(targetGameObject);
        }

        return;
    }

    sourceGameObject.scene.add.existing(targetGameObject);
}

export default SyncDisplayList;