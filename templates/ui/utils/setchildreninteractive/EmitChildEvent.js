var EmitChildEvent = function (eventEmitter, eventName, sizer, x, y, pointer) {
    var child;
    if (y === undefined) {
        child = sizer.sizerChildren[x];
    } else {
        child = sizer.pointToChild(x, y);
    }

    if (!child) {
        return;
    }

    eventEmitter.emit(eventName, child, pointer);
}

export default EmitChildEvent;