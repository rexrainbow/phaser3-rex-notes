import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './Methods.js';
import Timeline from '../../../../time/progresses/Timeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TypeWriter {
    constructor(textPlayer, config) {
        this.setEventEmitter();
        this.textPlayer = textPlayer;
        this.isPageTyping = false;
        this.timeline = new Timeline(textPlayer);
        this.typingTimer = undefined;  // Typing delay
        this.pauseTypingTimer = undefined;  // Wait time
        this.inTypingProcessLoop = false;  // Used in this.typing()
        this.isTypingPaused = false;  // Used in this.wait(), this.pauseTyping(), this.resumeTyping()
        this.setIgnoreWait(false);
        this.setSkipTypingAnimation(false);

        this.setTypingStartCallback(GetValue(config, 'onTypingStart', SetChildrenInvisible));
        this.setDefaultTypingSpeed(GetValue(config, 'speed', 250));
        this.setTypingSpeed();
        this.setAnimationConfig(GetValue(config, 'animation', undefined));
    }

    destroy() {
        this.destroyEventEmitter();

        this.textPlayer = undefined;

        this.timeline.destroy();
        this.timeline = undefined;

        this.typingTimer = undefined;

        this.pauseTypingTimer = undefined;

        this.onTypeStart = undefined;

        this.animationConfig = undefined;
    }

    set timeScale(value) {
        this.timeline.timeScale = value;
    }

    get timeScale() {
        return this.timeline.timeScale;
    }

    setTypingStartCallback(callback) {
        this.onTypeStart = callback;
        return this;
    }

    setAnimationConfig(config) {
        if (!config) {
            config = {};
        }

        if (!config.hasOwnProperty('duration')) {
            config.duration = 0;
        }

        if (!config.hasOwnProperty('onStart')) {
            // Apply default onStart callback
            config.onStart = SetChildVisible;
        }

        this.animationConfig = config;
        return this;
    }

    getNextChild() {
        var child = this.children[this.index];
        this.index = Math.min(this.index + 1, this.children.length);  // Point to next child
        return child;
    }
}

var SetChildVisible = function (child) {
    if (child.setVisible) {
        child.setVisible();
    }
}

var SetChildrenInvisible = function (children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.setVisible) {
            child.setVisible(false);
        }
    }
}

Object.assign(
    TypeWriter.prototype,
    EventEmitterMethods,
    Methods,
);

export default TypeWriter;