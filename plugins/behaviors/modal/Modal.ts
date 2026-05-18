import { Utils as PhaserUtils } from 'phaser';
import OpenCloseTransition from '../openclosetransition/OpenCloseTransition';
import CreateCover from './CreateCover';
import DefaultTransitCallbacks from './DefaultTransitCallbacks';
import {
    DefaultCoverTransitInCallback,
    DefaultCoverTransitOutCallback
} from './DefaultCoverTransitCallbacks';
import IsPointInBounds from '../../utils/bounds/IsPointInBounds';

const GetValue = PhaserUtils.Objects.GetValue;

class Modal extends OpenCloseTransition {
    clickOutsideTest: any;
    closeEventData: any;
    cover: any;
    coverTransitInCallback: any;
    coverTransitOutCallback: any;
    delayCall: any;
    displayTime: any;
    emit: any;
    isShutdown: any;
    once: any;
    parent: any;
    requestClose: any;
    requestOpen: any;
    scene: any;

    constructor(gameObject?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        if (config.transitIn == null) {
            config.transitIn = TransitionMode.popUp;
        }
        if (config.transitOut == null) {
            config.transitOut = TransitionMode.scaleDown;
        }

        config.destroy = GetValue(config, 'destroy', true);

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
        var touchOutsideClose = GetValue(config, 'touchOutsideClose', false);
        var timeOutDuration = GetValue(config, 'duration.hold', -1);
        var timeOutClose = GetValue(config, 'timeOutClose', (timeOutDuration >= 0));
        var anyTouchClose = GetValue(config, 'anyTouchClose', false);
        var manualClose = GetValue(config, 'manualClose', false);

        if (manualClose?: any) {
            touchOutsideClose = false;
            anyTouchClose = false;
            timeOutClose = false;
        }

        if (anyTouchClose?: any) {
            touchOutsideClose = false;
        }

        if (timeOutClose?: any) {
            this.setDisplayTime(timeOutDuration);
        } else {
            this.setDisplayTime(-1);
        }

        // Registet touch-close event after opened
        if (anyTouchClose?: any) {
            this.once('open', this.anyTouchClose, this);
        } else if (touchOutsideClose) {
            this.once('open', this.touchOutsideClose, this);
        }

        if (GetValue(config, 'openOnStart', true)) {
            // Run this.requestOpen() next tick
            // User can register events before this.requestOpen()
            this.delayCall(0, this.requestOpen, this);
        }
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // Registered in touchOutsideClose(), or anyTouchClose()
        if (!this.cover) {
            this.scene.input.off('pointerup', this.touchCloseCallback, this);
        }

        if (this.cover && !fromScene) {
            this.cover.destroy();
            this.cover = undefined;
        }

        super.shutdown(fromScene);
    }

    touchOutsideClose() {
        if (this.cover) {
            this.cover.on('pointerup', this.touchCloseCallback, this);
        } else {
            this.scene.input.on('pointerup', this.touchCloseCallback, this);
        }
        this.clickOutsideTest = true;
        return this;
    }

    anyTouchClose() {
        if (this.cover) {
            this.cover.once('pointerup', this.touchCloseCallback, this);
        } else {
            this.scene.input.once('pointerup', this.touchCloseCallback, this);
        }
        return this;
    }

    touchCloseCallback(pointer?: any) {
        if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
            return;
        }
        this.requestClose();
    }

    runTransitionInCallback() {
        var duration = super.runTransitionInCallback();

        var cover = this.cover;
        if (cover && this.coverTransitInCallback) {
            this.coverTransitInCallback(cover, duration);
        }

        return duration;
    }

    runTransitionOutCallback() {
        var duration = super.runTransitionOutCallback();

        var cover = this.cover;
        if (cover && this.coverTransitOutCallback) {
            this.coverTransitOutCallback(cover, duration);
        }

        return duration;
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

    setDisplayTime(time?: any) {
        this.displayTime = time;
        return this;
    }

    setTransitInCallback(callback?: any) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback?: any) {
            case TransitionMode.popUp:
                callback = DefaultTransitCallbacks.popUp;
                break;
            case TransitionMode.fadeIn:
                callback = DefaultTransitCallbacks.fadeIn;
                break;
        }

        super.setTransitInCallback(callback);
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    }

    setTransitOutCallback(callback?: any) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback?: any) {
            case TransitionMode.scaleDown:
                callback = DefaultTransitCallbacks.scaleDown;
                break;
            case TransitionMode.fadeOut:
                callback = DefaultTransitCallbacks.fadeOut;
                break;
        }

        super.setTransitOutCallback(callback);
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    }

    setCoverTransitInCallback(callback?: any) {
        this.coverTransitInCallback = callback;
        return this;
    }

    setCoverTransitOutCallback(callback?: any) {
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