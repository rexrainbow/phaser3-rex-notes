import { EaseMoveTo, EaseMoveFrom } from '../../../plugins/easemove.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    moveFrom(x, y, duration, ease, destroyMode) {
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveFrom(this, x, y, duration, ease, destroyMode, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('move.complete', this);
        }, this);
        return this;
    },

    moveFromPromise(x, y, duration, ease, destroyMode) {
        this.moveFrom(x, y, duration, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveFromDestroy(x, y, duration, ease) {
        this.moveFrom(x, y, duration, ease, true);
        return this;
    },

    moveFromDestroyPromise(x, y, duration, ease) {
        this.moveFromDestroy(x, y, duration, ease);
        return WaitComplete(this._easeMove);
    },

    moveTo(x, y, duration, ease, destroyMode) {
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveTo(this, x, y, duration, ease, destroyMode, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('move.complete', this);
        }, this);
        return this;
    },

    moveToPromise(x, y, duration, ease, destroyMode) {
        this.moveTo(x, y, duration, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveToDestroy(x, y, duration, ease) {
        this.moveTo(x, y, duration, ease, true)
        return this;
    },

    moveToDestroyPromise(x, y, duration, ease) {
        this.moveToDestroy(x, y, duration, ease, true);
        return WaitComplete(this._easeMove);
    }
}