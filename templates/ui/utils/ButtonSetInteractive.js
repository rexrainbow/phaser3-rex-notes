var ButtonSetInteractive = function (button, groupName, index) {
    button
        .setInteractive()
        .on('pointerdown', FireEvent('button.click', button, groupName, index), this)
        .on('pointerover', FireEvent('button.over', button, groupName, index), this)
        .on('pointerout', FireEvent('button.out', button, groupName, index), this);
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