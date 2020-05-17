var EmitChildEvent = function (eventEmitter, eventName, sizer, x, y, pointer) {
    var child, index;
    if (y === undefined) {
        index = x;
        child = sizer.sizerChildren[index];
    } else {
        child = sizer.pointToChild(x, y);
        index = sizer.sizerChildren.indexOf(child);
    }

    if (!child) {
        return;
    }

    if (sizer.groupName !== undefined) {
        eventEmitter.emit(eventName, child, sizer.groupName, index, pointer, event);
    } else {
        eventEmitter.emit(eventName, child, index, pointer, event);
    }
}

export default EmitChildEvent;