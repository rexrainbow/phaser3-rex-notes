import GetFirstChildContains from './GetFirstChildContains.js';

var SetChildrenInteractive = function () {
    this
        .on('pointerdown', OnPointerDown, this)

        .on('pointerdown', OnPointerUp, this)

        .on('pointermove', OnAreaOverOut, this)
        .on('pointerover', OnAreaOverOut, this)
        .on('pointerout', function (pointer, event) {
            OnAreaOverOut.call(this, pointer, null, null, event);
        }, this)

    return this;
}

var OnPointerDown = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    var result = GetFirstChildContains(this.children, localX, localY);    
    if (!result.child) {
        return;
    }

    this.emit('child.pointerdown', result.child, result.index, pointer, localX, localY, event);
}

var OnPointerUp = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    var result = GetFirstChildContains(this.children, localX, localY);
    if (!result.child) {
        return;
    }

    this.emit('child.pointerup', result.child, result.index, pointer, localX, localY, event);
}

var OnAreaOverOut = function (pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
        return;
    }

    if (localX === null) {  // Case of pointerout
        if (this.lastOverChild !== null) {
            this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
            this.lastOverChild = null;
        }
        return;
    }

    var result = GetFirstChildContains(this.children, localX, localY);
    if (!result.child) {
        return;
    }

    if (this.lastOverChild !== null) {
        var lastOverChild = this.children.indexOf(this.lastOverChild);
        this.emit('child.pointerout', this.lastOverChild, lastOverChild, pointer, localX, localY, event);
    }

    if (result.child !== null) {
        this.emit('child.pointerover', result.child, result.index, pointer, localX, localY, event);
    }

    this.lastOverChild = result.child;
}

export default SetChildrenInteractive;