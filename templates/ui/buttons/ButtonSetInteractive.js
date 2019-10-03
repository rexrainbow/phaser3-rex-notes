import ButtonBehavior from '../../../plugins/input/button/Button.js';

var ButtonSetInteractive = function (button, clickConfig) {
    //Default: Fire 'click' event when touch released after pressed.
    button._buttonBehavior = new ButtonBehavior(button, clickConfig);

    button._buttonBehavior.on('click', function (buttonBehavior, gameObject, pointer, event) {
        FireEvent.call(this, 'button.click', button, pointer, event);
    }, this);

    button
        .on('pointerover', function (pointer, localX, localY, event) {
            FireEvent.call(this, 'button.over', button, pointer, event);
        }, this)
        .on('pointerout', function (pointer, event) {
            FireEvent.call(this, 'button.out', button, pointer, event);
        }, this)
}

var FireEvent = function (eventName, button, pointer, event) {
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
        this.eventEmitter.emit(eventName, button, this.groupName, index, pointer, event);
    } else {
        this.eventEmitter.emit(eventName, button, index, pointer, event);
    }
}

export {
    ButtonSetInteractive,
    FireEvent
};