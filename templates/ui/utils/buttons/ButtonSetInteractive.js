import Click from '../../click/Click.js';

var ButtonSetInteractive = function (button, clickConfig) {
    //Default: Fire 'click' event when touch released after pressed.
    button._buttonBehavior = new Click(button, clickConfig);

    button._buttonBehavior
        .on('click', function (buttonBehavior, gameObject, pointer, event) {
            FireEvent.call(this, 'button.click', gameObject, pointer, event);
        }, this)
        .on('enable', function (buttonBehavior, gameObject) {
            FireEvent.call(this, 'button.enable', gameObject);
        }, this)
        .on('disable', function (buttonBehavior, gameObject) {
            FireEvent.call(this, 'button.disable', gameObject);
        }, this)

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
        button = this.buttons[index];
        if (!button) {
            return;
        }
    } else {
        index = this.buttons.indexOf(button);
        if (index === -1) {
            return;
        }
    }

    // Buttons is a child. Fire internal events.
    if (this.eventEmitter !== this) {
        this.emit(eventName, button, index, pointer, event);
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