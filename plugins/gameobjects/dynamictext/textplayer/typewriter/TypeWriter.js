import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './Methods.js';
import Clock from '../../../../time/clock/Clock.js';
import { WaitComplete } from '../../../../utils/promise/WaitEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

// Events: start, char.start, char.progress, char.complete, complete
class TypeWriter {
    constructor(dynamicText, config) {
        this.setEventEmitter();
        this.dynamicText = dynamicText;
        this.clock = new Clock(dynamicText);
        this.onTypeStart = GetValue(config, 'onTypeStart', SetAllInvisible);
        this.setTypingSpeed(0);
    }

    setTypingSpeed(speed) {
        this.typingSpeed = speed;
        return this;
    }

    get nextChild() {
        var child = this.children[this.index];
        this.index++;
        return child;
    }

    start(children) {
        this.children = children;
        this.index = 0;
        this.onTypeStart(children);
        this.typing();
        return WaitComplete(this);  // Promise
    }
}

var SetAllInvisible = function (children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i].setVisible(false);
    }
}

Object.assign(
    TypeWriter.prototype,
    EventEmitterMethods,
    Methods,
);

export default TypeWriter;