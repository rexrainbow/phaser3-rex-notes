import ContainsPoint from './ContainsPoint';

var EmitChildEvent = function(eventEmitter?: any, eventName?: any, targets?: any, targetMode?: any, worldX?: any, worldY?: any, pointer?: any, event?: any) {
    var child;
    if (worldY === undefined) {
        child = worldX;
    } else {
        var firstChild = targets[0];
        if (!firstChild) {
            return;
        }
        var camera = pointer.camera;
        var px = worldX + camera.scrollX * (firstChild.scrollFactorX - 1);
        var py = worldY + camera.scrollY * (firstChild.scrollFactorY - 1);
        child = ContainsPoint(targetMode, targets, px, py);
    }

    if (!child) {
        return;
    }

    eventEmitter.emit(eventName, child, pointer, event);
}

export default EmitChildEvent;