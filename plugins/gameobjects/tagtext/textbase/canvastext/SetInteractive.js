var SetInteractive = function () {
    this.parent

        .on('pointerdown', OnAreaDown, this)

        .on('pointerup', OnAreaUp, this)

        .on('pointermove', OnAreaOverOut, this)
        .on('pointerover', OnAreaOverOut, this)
        .on('pointerout', function (pointer, event) {
            OnAreaOverOut.call(this, pointer, null, null, event);
        }, this)
}

var OnAreaDown = function (pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
        return;
    }

    FireEvent.call(this, 'areadown', area.key, pointer, localX, localY, event);
}

var OnAreaUp = function (pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
        return;
    }

    FireEvent.call(this, 'areaup', area.key, pointer, localX, localY, event);
}

var OnAreaOverOut = function (pointer, localX, localY, event) {
    if (localX === null) {  // Case of pointerout
        if (this.lastHitAreaKey !== null) {
            FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
            this.lastHitAreaKey = null;
        }
        return;
    }

    var area = this.hitAreaManager.getFirst(localX, localY);
    var hitAreaKey = (area) ? area.key : null;
    if (this.lastHitAreaKey === hitAreaKey) {
        return;
    }

    if (this.lastHitAreaKey !== null) {
        FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
    }
    if (hitAreaKey !== null) {
        FireEvent.call(this, 'areaover', hitAreaKey, pointer, localX, localY, event);
    }

    this.lastHitAreaKey = hitAreaKey;
}

var FireEvent = function (eventName, key, pointer, localX, localY, event) {
    this.parent.emit(`${eventName}-${key}`, pointer, localX, localY, event);
    this.parent.emit(eventName, key, pointer, localX, localY, event);
}
export default SetInteractive;