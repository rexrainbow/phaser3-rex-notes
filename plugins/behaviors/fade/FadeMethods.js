import FadeIn from './FadeIn.js';
import FadeOutDestroy from './FadeOutDestroy.js';
import { WaitComplete } from '../../utils/promise/WaitEvent.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    onInitFade() {
        var gameObject = this;
        var fade = this._fade;

        // Route 'complete' of fade to gameObject
        fade.completeEventName = undefined;
        fade.on('complete', function () {
            if (fade.completeEventName) {
                gameObject.emit(fade.completeEventName, gameObject);
                fade.completeEventName = undefined;
            }
        })
    },

    fadeIn(duration, alpha) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            alpha = config.alpha;
        }

        var isInit = (this._fade === undefined);

        this._fade = FadeIn(this, duration, alpha, this._fade);

        if (isInit) {
            this.onInitFade();
        }

        this._fade.completeEventName = 'fadein.complete';

        return this;
    },

    fadeInPromise(duration, alpha) {
        this.fadeIn(duration, alpha);
        return WaitComplete(this._fade);
    },

    isRunningFadeIn() {
        return this._fade && (this._fade.completeEventName === 'fadein.complete');
    },

    fadeOutDestroy(duration, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            destroyMode = config.destroy;
        }

        var isInit = (this._fade === undefined);

        this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);

        if (isInit) {
            this.onInitFade();
        }

        this._fade.completeEventName = 'fadeout.complete';

        return this;
    },

    fadeOutDestroyPromise(duration, destroyMode) {
        this.fadeOutDestroy(duration, destroyMode);
        return WaitComplete(this._fade);
    },

    fadeOut(duration) {
        this.fadeOutDestroy(duration, false);
        return this;
    },

    fadeOutPromise(duration) {
        this.fadeOut(duration);
        return WaitComplete(this._fade);
    },

    isRunningFadeOut() {
        return this._fade && (this._fade.completeEventName === 'fadeout.complete');
    },

    isRunningEaseFade() {
        return this.isRunningFadeIn() || this.isRunningFadeOut();
    }
}