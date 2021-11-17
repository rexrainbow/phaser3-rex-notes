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
    if (this.eventEmitter !== this.parent) {
        this.parent.emit(eventName, button, index, pointer, event);
    }

    if (this.groupName !== undefined) {
        this.eventEmitter.emit(eventName, button, this.groupName, index, pointer, event);
    } else {
        this.eventEmitter.emit(eventName, button, index, pointer, event);
    }
}

export default FireEvent;