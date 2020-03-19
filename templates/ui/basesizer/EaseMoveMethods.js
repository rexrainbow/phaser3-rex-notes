import { EaseMoveTo, EaseMoveFrom } from '../../../plugins/easemove.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    moveTo(x, y, duration, ease) {
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveTo(this, x, y, duration, ease, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('move.complete', this);
        }, this);
        return this;
    },

    moveToPromise(x, y, duration, ease) {
        this.moveTo(x, y, duration, ease);
        return WaitComplete(this._easeMove);
    },

    moveFrom(x, y, duration, ease) {        
        if (IsPlainObject(x)) {
            var config = x;
            x = config.x;
            y = config.y;
            duration = config.duration;
            ease = config.ease;
        }

        this._easeMove = EaseMoveFrom(this, x, y, duration, ease, this._easeMove);
        this._easeMove.once('complete', function () {
            this.emit('move.complete', this);
        }, this);
        return this;
    },

    moveFromoPromise(x, y, duration, ease) {
        this.moveFrom(x, y, duration, ease);
        return WaitComplete(this._easeMove);
    }
}