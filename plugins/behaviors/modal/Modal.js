import Transition from '../transition/Transition.js';
import CreateCover from './CreateCover.js';
import DefaultTransitCallbacks from './DefaultTransitCallbacks.js';
import {
    DefaultCoverTransitInCallback,
    DefaultCoverTransitOutCallback
} from './DefaultCoverTransitCallbacks.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Modal extends Transition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('transitIn')) {
            config.transitIn = TransitionMode.popUp;
        }
        if (!config.hasOwnProperty('transitOut')) {
            config.transitOut = TransitionMode.scaleDown;
        }

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        // Cover : key of modal, to block touch input        
        var coverConfig = GetValue(config, 'cover');
        this.cover = (coverConfig !== false) ? CreateCover(gameObject, coverConfig) : undefined;
        if (this.cover) {
            this.setCoverTransitInCallback(GetValue(coverConfig, 'transitIn', DefaultCoverTransitInCallback));
            this.setCoverTransitOutCallback(GetValue(coverConfig, 'transitOut', DefaultCoverTransitOutCallback));
        }

        // Close conditions:
        // OK/Cancel buttons, invoke modal.requestClose()
        var manualClose = GetValue(config, 'manualClose', true);
        // Timeout/any-touch
        if (!manualClose) {
            this.setDisplayTime(GetValue(config, 'duration.hold', 2000));
            var anyTouchClose = GetValue(config, 'anyTouchClose', true);
            if (anyTouchClose) {
                this.anyTouchClose();
            }
        } else {
            this.setDisplayTime(-1);
        }

        this.start();
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // Registered in anyTouchClose()
        if (!this.cover) {
            this.scene.input.off('pointerup', this.requestClose, this);
        }

        if (this.cover && !fromScene) {
            this.cover.destroy();
            this.cover = undefined;
        }

        super.shutdown(fromScene);
    }

    anyTouchClose() {
        if (this.cover) {
            this.cover.once('pointerup', this.requestClose, this);
        } else {
            this.scene.input.once('pointerup', this.requestClose, this);
        }
        return this;
    }

    transitionIn() {
        super.transitionIn();

        var duration = this.transitInTime;
        var cover = this.cover;
        if (cover && this.coverTransitInCallback) {
            this.coverTransitInCallback(cover, duration);
        }

        return this;
    }

    transitionOut() {
        super.transitionOut();

        var duration = this.transitOutTime;
        var cover = this.cover;
        if (cover && this.coverTransitOutCallback) {
            this.coverTransitOutCallback(cover, duration);
        }

        return this;
    }

    onOpen() {
        var duration = this.displayTime;
        if (duration >= 0) {
            this.delayCall(
                duration,
                this.requestClose, // callback
                this               // scope
            );
        }

        this.emit('open', this.parent, this);

        super.onOpen();
    }

    onClose() {
        this.emit('close', this.closeEventData);

        super.onClose();
    }

    setDisplayTime(time) {
        this.displayTime = time;
        return this;
    }

    setTransitInCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback) {
            case TransitionMode.popUp:
                callback = DefaultTransitCallbacks.popUp;
                break;
            case TransitionMode.fadeIn:
                callback = DefaultTransitCallbacks.fadeIn;
                break;
        }

        super.setTransitInCallback(callback);
        // callback = function(gameObject, duration) {}
        return this;
    }

    setTransitOutCallback(callback) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback) {
            case TransitionMode.scaleDown:
                callback = DefaultTransitCallbacks.scaleDown;
                break;
            case TransitionMode.fadeOut:
                callback = DefaultTransitCallbacks.fadeOut;
                break;
        }

        super.setTransitOutCallback(callback);
        // callback = function(gameObject, duration) {}
        return this;
    }

    setCoverTransitInCallback(callback) {
        this.coverTransitInCallback = callback;
        return this;
    }

    setCoverTransitOutCallback(callback) {
        this.coverTransitOutCallback = callback;
        return this;
    }

}

const TransitionMode = {
    popUp: 0,
    fadeIn: 1,
    scaleDown: 0,
    fadeOut: 1,
}

export default Modal;