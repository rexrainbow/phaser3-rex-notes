import IsLayerGameObject from '../../../../plugins/utils/system/IsLayerGameObject';

var SyncDisplayList = function(sourceGameObject?: any, targetGameObject?: any) {    
    var p3Container = sourceGameObject.parentContainer;
    if (p3Container?: any) {
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