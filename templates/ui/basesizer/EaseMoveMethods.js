import { EaseMoveTo, EaseMoveFrom } from '../../../plugins/easemove.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    moveFrom(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('movefrom.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._easeMove.on('update', function () {
                parent.resetChildPositionState(child);
            })
        }
        return this;
    },

    moveFromPromise(duration, x, y, ease, destroyMode) {
        this.moveFrom(duration, x, y, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveFromDestroy(duration, x, y, ease) {
        this.moveFrom(duration, x, y, ease, true);
        return this;
    },

    moveFromDestroyPromise(duration, x, y, ease) {
        this.moveFromDestroy(duration, x, y, ease);
        return WaitComplete(this._easeMove);
    },

    moveTo(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('moveto.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._easeMove.on('update', function () {
                parent.resetChildPositionState(child);
            })
        }
        return this;
    },

    moveToPromise(duration, x, y, ease, destroyMode) {
        this.moveTo(duration, x, y, ease, destroyMode);
        return WaitComplete(this._easeMove);
    },

    moveToDestroy(duration, x, y, ease) {
        this.moveTo(duration, x, y, ease, true)
        return this;
    },

    moveToDestroyPromise(duration, x, y, ease) {
        this.moveToDestroy(duration, x, y, ease, true);
        return WaitComplete(this._easeMove);
    }
}