import { RemoveWaitEvents } from './Events.js';

var Wait = function (name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
        return this;
    }

    this.pauseTyping();
    if (name == null) {
        WaitEvent.call(this);
    } else if (typeof (name) === 'number') {
        WaitTime.call(this, name);
    } else if ((name.length > 1) && (name.indexOf('|') !== -1)) {
        WaitMultiple.call(this, name);
    } else if (name === 'click') {
        WaitClick.call(this);
    } else {
        WaitKey.call(this, name);
    }

    return this;
}

// Used in WaitClick, WaitKey
var ResumeTyping = function () {
    this.resumeTyping();
    this.emit(RemoveWaitEvents);
}

var WaitEvent = function () {
    this.dynamicText.emit('wait', ResumeTyping);
    // Don't have to remove any event when destroyed
}

var WaitTime = function (time) {
    this.pauseTypingTimer = this.timeline.addTimer({
        target: this,
        duration: time,
        onComplete: function (target, t, timer) {
            target.pauseTypingTimer = undefined;
            target.resumeTyping(timer.remainder);
            target.emit(RemoveWaitEvents);
        }
    })

    // Resumed by other event
    this.once(RemoveWaitEvents, function () {
        if (this.pauseTypingTimer) {
            this.pauseTypingTimer.remove();
        }
    }, this);
    // Don't have to remove any event when destroyed

    this.dynamicText.emit('wait.time', time);
}

var WaitClick = function () {
    var clickEE = this.dynamicText.clickEE;
    clickEE.once('pointerdown', ResumeTyping, this);

    // Resumed by other event, or object destroyed 
    this.once(RemoveWaitEvents, function () {
        clickEE.off('pointerdown', ResumeTyping, this);
    }, this);

    this.dynamicText.emit('wait.click');
}

var WaitKey = function (keyName) {
    var eventName = `keydown-${keyName.toUpperCase()}`;
    var keyboard = this.dynamicText.scene.input.keyboard;
    keyboard
        .once(eventName, ResumeTyping, this);

    // Resumed by other event, or object destroyed 
    this.once(RemoveWaitEvents, function () {
        keyboard.off(eventName, ResumeTyping, this);
    }, this);

    this.dynamicText.emit('wait.keydown', keyName);
}

var WaitMultiple = function (names) {
    names = names.split('|');
    for (var i = 0, cnt = names.length; i < cnt; i++) {
        var name = names[i];
        if (isNaN(name)) {
            if (name === 'click') {
                WaitClick.call(this);
            } else {
                WaitKey.call(this, name);
            }
        } else {
            WaitTime.call(this, parseFloat(name));
        }
    }
}

export default Wait;