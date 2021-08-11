import FadeIn from '../../../plugins/fade-in.js';
import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var OnInitFade = function (gameObject, fade) {
    // Route 'complete' of fade to gameObject
    fade.completeEventName = undefined;
    fade.on('complete', function () {
        if (fade.completeEventName) {
            gameObject.emit(fade.completeEventName, gameObject);
            fade.completeEventName = undefined;
        }
    })

    // Update local state
    fade.on('update', function () {
        var parent = gameObject.getParentSizer();
        if (parent) {
            parent.resetChildAlphaState(gameObject);
        }
    })
}

export default {
    fadeIn(duration, alpha) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
        }

        var isInit = (this._fade === undefined);

        this._fade = FadeIn(this, duration, alpha, this._fade);

        if (isInit) {
            OnInitFade(this, this._fade);
        }

        this._fade.completeEventName = 'fadein.complete';

        return this;
    },

    fadeInPromoise(duration, alpha) {
        this.fadeIn(duration, alpha);
        return WaitComplete(this._fade);
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
            OnInitFade(this, this._fade);
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
    }
}