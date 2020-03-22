import PopUp from '../../../plugins/popup.js';
import ScaleDownDestroy from '../../../plugins/scale-down-destroy.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    popUp(duration, orientation, ease) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
        }

        this._scale = PopUp(this, duration, orientation, ease, this._scale);
        this._scale.once('complete', function () {
            this.emit('popup.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._scale.on('update', function () {
                parent.resetChildPositionState(child);
            })
        }
        return this;
    },

    popUpPromise(duration, orientation, ease) {
        this.popUp(duration, orientation, ease);
        return WaitComplete(this._scale);
    },

    scaleDownDestroy(duration, orientation, ease, destroyMode) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
            destroyMode = config.destroy;
        }

        this._scale = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scale);
        this._scale.once('complete', function () {
            this.emit('scaledown.complete', this);
        }, this);

        var parent = this.getParentSizer();
        if (parent) {
            var child = this;
            this._scale.on('update', function () {
                parent.resetChildPositionState(child);
            })
        }
        return this;
    },

    scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
        this.scaleDownDestroy(duration, orientation, ease, destroyMode);
        return WaitComplete(this._scale);
    },

    scaleDown(duration, orientation, ease) {
        this.scaleDownDestroy(duration, orientation, ease, false);
        return this;
    },

    scaleDownPromise(duration, orientation, ease) {
        this.scaleDown(duration, orientation, ease);
        return WaitComplete(this._scale);
    }


}