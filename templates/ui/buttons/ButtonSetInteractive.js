import ButtonBehavior from '../../../plugins/input/button/Button.js';

var ButtonSetInteractive = function (button, clickConfig) {
    //Default: Fire 'click' event when touch released after pressed.
    button._buttonBehavior = new ButtonBehavior(button, clickConfig);
    button._buttonBehavior.on('click', GetEventCallback.call(this, 'button.click', button));

    button
        .on('pointerover', GetEventCallback.call(this, 'button.over', button))
        .on('pointerout', GetEventCallback.call(this, 'button.out', button));
}

var GetEventCallback = function (eventName, button) {
    var self = this;
    var callback = function () {
        FireEvent.call(self, eventName, button);
    }
    return callback;
}

var FireEvent = function (eventName, button) {
    var index;
    if (typeof (button) === 'number') {
        index = button;
        if (index >= this.childrenMap.buttons.length) {
            return;
        }
        button = this.childrenMap.buttons[index];
    } else {
        index = this.childrenMap.buttons.indexOf(button);
        if (index === -1) {
            return;
        }
    }

    if (this.groupName !== undefined) {
        this.eventEmitter.emit(eventName, button, this.groupName, index);
    } else {
        this.eventEmitter.emit(eventName, button, index);
    }
}

export {
    ButtonSetInteractive,
    FireEvent
};