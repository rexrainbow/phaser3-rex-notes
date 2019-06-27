import ButtonBehavior from '../../../plugins/input/button/Button.js';

var ButtonSetInteractive = function (button, clickConfig) {
    //Default: Fire 'click' event when touch released after pressed.
    button._buttonBehavior = new ButtonBehavior(button, clickConfig);

    button._buttonBehavior.on('click', function (buttonBehavior, gameObject, pointer) {
        FireEvent.call(this, 'button.click', button, pointer);
    }, this);

    button
        .on('pointerover', function (pointer) {
            FireEvent.call(this, 'button.over', button, pointer);
        }, this)
        .on('pointerout', function (pointer) {
            FireEvent.call(this, 'button.out', button, pointer);
        }, this)
}

var FireEvent = function (eventName, button, pointer) {
    var index;
    if (typeof (button) === 'number') {
        index = button;
        button = this.childrenMap.buttons[index];
        if (!button) {
            return;
        }
    } else {
        index = this.childrenMap.buttons.indexOf(button);
        if (index === -1) {
            return;
        }
    }

    if (this.groupName !== undefined) {
        this.eventEmitter.emit(eventName, button, this.groupName, index, pointer);
    } else {
        this.eventEmitter.emit(eventName, button, index, pointer);
    }
}

export {
    ButtonSetInteractive,
    FireEvent
};