import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './Methods.js';
import Timeline from '../../../../time/progresses/Timeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;

// Events: start, char.start, char.progress, char.complete, complete
class TypeWriter {
    constructor(dynamicText, config) {
        this.setEventEmitter();
        this.dynamicText = dynamicText;
        this.typingAnimation = {};

        this.timeline = new Timeline(dynamicText);

        this.onTypeStart = GetValue(config, 'onTypeStart', SetAllInvisible);
        this.setTypingSpeed(GetValue(config, 'speed', 250));
        this.setTypingAnimation(
            GetValue(config, 'animation.duration', 1000),
            GetValue(config, 'animation.onStart', SetVisible),
            GetValue(config, 'animation.onProgress', undefined),
            GetValue(config, 'animation.onComplete', undefined)
        )
    }

    setTypingSpeed(speed) {
        this.typingSpeed = speed;
        return this;
    }

    setTypingAnimation(duration, onStart, onProgress, onComplete) {
        var animation = this.typingAnimation;
        animation.duration = duration;
        animation.onStart = onStart;
        animation.onProgress = onProgress;
        animation.onComplete = onComplete;
        return this;
    }

    setTypingAnimationDuration(duration) {
        this.typingAnimationDuration = duration;
        return this;
    }

    getNextChild() {
        var child = this.children[this.index];
        this.index++; // Point to next child
        return child;
    }
}

var SetVisible = function (child) {
    child.setVisible();
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