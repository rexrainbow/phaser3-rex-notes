var ButtonSetInteractive = function (button, groupName, index) {
    button
        .setInteractive()
        .on('pointerdown', FireEvent('button.click', button, groupName, index), this.eventEmitter)
        .on('pointerover', FireEvent('button.over', button, groupName, index), this.eventEmitter)
        .on('pointerout', FireEvent('button.out', button, groupName, index), this.eventEmitter);
}

var FireEvent = function (eventName, button, groupName, index) {
    var callback;
    if (groupName !== undefined) {
        callback = function () {
            this.emit(eventName, button, groupName, index);
        }
    } else {
        callback = function () {
            this.emit(eventName, button, index);
        }
    }
    return callback;
}

export default ButtonSetInteractive;