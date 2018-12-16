import ButtonBehavior from '../../../plugins/input/button/Button.js';

var ButtonSetInteractive = function (button, groupName, index, clickConfig) {
    if (clickConfig === undefined) {
        clickConfig = defaultConfig;
    }
    if (!clickConfig.hasOwnProperty('mode')) {
        clickConfig.mode = 0; // Default is 'press'('pointerdown')
    }
    button._buttonBehavior = new ButtonBehavior(button, clickConfig);
    button._buttonBehavior.on('click', FireEvent('button.click', button, groupName, index), this);

    button
        .on('pointerover', FireEvent('button.over', button, groupName, index), this)
        .on('pointerout', FireEvent('button.out', button, groupName, index), this);
}

var FireEvent = function (eventName, button, groupName, index) {
    var callback;
    if (groupName !== undefined) {
        callback = function () {
            this.eventEmitter.emit(eventName, button, groupName, index);
        }
    } else {
        callback = function () {
            this.eventEmitter.emit(eventName, button, index);
        }
    }
    return callback;
}

var defaultConfig = {};

export default ButtonSetInteractive;