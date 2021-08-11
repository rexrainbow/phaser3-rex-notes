import PopUp from '../../../plugins/popup.js';
import ScaleDownDestroy from '../../../plugins/scale-down-destroy.js';
import { WaitComplete } from '../utils/WaitEvent.js'

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var OnInitScale = function (gameObject, scale) {
    // Route 'complete' of scale to gameObject
    scale.completeEventName = undefined;
    scale.on('complete', function () {
        if (scale.completeEventName) {
            gameObject.emit(scale.completeEventName, gameObject);
            scale.completeEventName = undefined;
        }
    })

    // Update local state
    scale.on('update', function () {
        var parent = gameObject.getParentSizer();
        if (parent) {
            parent.resetChildPositionState(gameObject);
        }
    })
}

export default {
    popUp(duration, orientation, ease) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
        }

        var isInit = (this._scale === undefined);

        this._scale = PopUp(this, duration, orientation, ease, this._scale);

        if (isInit) {
            OnInitScale(this, this._scale);
        }

        this._scale.completeEventName = 'popup.complete';

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

        var isInit = (this._scale === undefined);

        this._scale = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scale);

        if (isInit) {
            OnInitScale(this, this._scale);
        }

        this._scale.completeEventName = 'scaledown.complete';

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