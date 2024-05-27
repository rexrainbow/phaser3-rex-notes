import EaseMoveTo from './EaseMoveTo.js';
import EaseMoveFrom from './EaseMoveFrom.js';
import { WaitComplete } from '../../utils/promise/WaitEvent.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DistanceBetween = Phaser.Math.Distance.Between;

export default {
    onInitEaseMove() {
        var gameObject = this;
        var easeMove = this._easeMove;
        // Route 'complete' of easeMove to gameObject
        easeMove.completeEventName = undefined;
        easeMove.on('complete', function () {
            if (easeMove.completeEventName) {
                gameObject.emit(easeMove.completeEventName, gameObject);
                easeMove.completeEventName = undefined;
            }
        })
    },

    moveFrom(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            x = config.x;
            y = config.y;
            if (config.hasOwnProperty('speed')) {
                duration = (DistanceBetween(x, y, this.x, this.y) * 1000) / config.speed;
            } else {
                duration = config.duration;
            }

            ease = config.ease;
        }

        var isInit = (this._easeMove === undefined);

        this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);

        if (isInit) {
            this.onInitEaseMove();
        }

        this._easeMove.completeEventName = 'movefrom.complete';

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

    isRunningMoveFrom() {
        return this._easeMove && (this._easeMove.completeEventName = 'movefrom.complete');
    },

    moveTo(duration, x, y, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            x = config.x;
            y = config.y;
            if (config.hasOwnProperty('speed')) {
                duration = (DistanceBetween(x, y, this.x, this.y) * 1000) / config.speed;
            } else {
                duration = config.duration;
            }

            ease = config.ease;
        }

        var isInit = (this._easeMove === undefined);

        this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);

        if (isInit) {
            this.onInitEaseMove();
        }

        this._easeMove.completeEventName === 'moveto.complete';

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
    },

    isRunningMoveTo() {
        return this._easeMove && (this._easeMove.completeEventName === 'moveto.complete');
    },

    isRunningEaseMove() {
        return this.isRunningMoveFrom() || this.isRunningMoveTo();
    },

    moveStop(toEnd) {
        if (!this._easeMove) {
            return this;
        }

        this._easeMove.stop(toEnd);
        return this;
    }
}