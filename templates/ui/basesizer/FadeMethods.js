import FadeIn from '../../../plugins/fade-in.js';
import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    fadeIn(duration, alpha) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
        }

        this._fade = FadeIn(this, duration, alpha, this._fade);
        this._fade.once('complete', function () {
            this.emit('fadein.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._fade.on('update', function () {
                parent.resetChildAlphaState(child);
            })
        }
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
        this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);
        this._fade.once('complete', function () {
            this.emit('fadeout.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._fade.on('update', function () {
                parent.resetChildAlphaState(child);
            })
        }
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