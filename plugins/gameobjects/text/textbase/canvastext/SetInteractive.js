var SetInteractive = function () {
    this.parent
        .on('pointerdown', function (pointer, localX, localY, event) {
            FireEvent.call(this, 'areadown', pointer, localX, localY);
        }, this)
        .on('pointerup', function (pointer, localX, localY, event) {
            FireEvent.call(this, 'areaup', pointer, localX, localY);
        }, this)
}

var FireEvent = function (eventName, pointer, localX, localY) {
    var area = this.hitAreaManager.getFirstHitArea(localX, localY);
    if (area === null) {
        return;
    }
    var key = area.key;
    this.parent.emit(`${eventName}-${key}`, pointer, localX, localY)
    this.parent.emit(eventName, key, pointer, localX, localY)
}
export default SetInteractive;