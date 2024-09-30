import ContainsPoint from './ContainsPoint.js';

var EmitChildEvent = function (eventEmitter, eventName, targets, targetMode, worldX, worldY, pointer, event) {
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