import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods';
import Methods from './Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TypeWriter {
    _nextChild: any;
    animationConfig: any;
    children: any;
    destroyEventEmitter: any;
    fadeOutPageCallback: any;
    index: any;
    inTypingProcessLoop: any;
    isPageTyping: any;
    isTypingPaused: any;
    minSizeEnable: any;
    onTypeStart: any;
    pauseTyping: any;
    pauseTypingTimer: any;
    resumeTyping: any;
    setDefaultTypingSpeed: any;
    setEventEmitter: any;
    setIgnoreWait: any;
    setSkipSpaceEnable: any;
    setSkipTypingAnimation: any;
    setTypingSpeed: any;
    textPlayer: any;
    typing: any;
    typingTimer: any;
    wait: any;

    constructor(textPlayer?: any, config?: any) {
        this.setEventEmitter();
        this.textPlayer = textPlayer;
        this.isPageTyping = false;
        this.typingTimer = undefined;  // Typing delay
        this.pauseTypingTimer = undefined;  // Wait time
        this.inTypingProcessLoop = false;  // Used in this.typing()
        this.isTypingPaused = false;  // Used in this.wait(), this.pauseTyping(), this.resumeTyping()
        this.setIgnoreWait(false);
        this.setSkipTypingAnimation(false);

        this.setTypingStartCallback(GetValue(config, 'onTypingStart', SetChildrenInvisible));
        this.setDefaultTypingSpeed(GetValue(config, 'speed', 250));
        this.setTypingSpeed();
        this.setSkipSpaceEnable(GetValue(config, 'skipSpace', false));
        this.setAnimationConfig(GetValue(config, 'animation', undefined));
        this.setMinSizeEnable(GetValue(config, 'minSizeEnable', false));

        this.setFadeOutPageCallback(GetValue(config, 'fadeOutPage'));

    }

    destroy() {
        this.destroyEventEmitter();

        this.textPlayer = undefined;

        this.typingTimer = undefined;

        this.pauseTypingTimer = undefined;

        this.onTypeStart = undefined;

        this.animationConfig = undefined;
    }

    get timeline() {
        return this.textPlayer.timeline;
    }

    setTypingStartCallback(callback?: any) {
        this.onTypeStart = callback;
        return this;
    }

    setAnimationConfig(config?: any) {
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

    setFadeOutPageCallback(callback?: any) {
        this.fadeOutPageCallback = callback;
        return this;
    }

    setMinSizeEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.minSizeEnable = enable;
        return this;
    }

    getNextChild() {
        var child = this.nextChild;
        this.index = Math.min(this.index + 1, this.children.length);  // Point to next child
        this._nextChild = undefined;
        return child;
    }

    get nextChild() {
        if (!this._nextChild) {
            this._nextChild = this.children[this.index];
        }
        return this._nextChild;
    }
}

var SetChildVisible = function(child?: any) {
    if (child.setVisible) {
        child.setVisible();
    }
}

var SetChildrenInvisible = function(children?: any) {
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