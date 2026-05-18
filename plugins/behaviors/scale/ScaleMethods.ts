import PopUp from './PopUp';
import ScaleDownDestroy from './ScaleDownDestroy';
import Yoyo from './Yoyo';
import { WaitComplete } from '../../utils/promise/WaitEvent';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

export default {
    onInitScale() {
        var gameObject = this;
        var scale = this._scaleBehavior;

        // Route 'complete' of scale to gameObject
        scale.completeEventName = undefined;
        scale.on('complete', function() {
            if (scale.completeEventName) {
                gameObject.emit(scale.completeEventName, gameObject);
                scale.completeEventName = undefined;
            }
        })
    },

    popUp(duration?: any, orientation?: any, ease?: any) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = PopUp(this, duration, orientation, ease, this._scaleBehavior);

        if (isInit?: any) {
            this.onInitScale();
        }

        this._scaleBehavior.completeEventName = 'popup.complete';

        return this;
    },

    popUpPromise(duration?: any, orientation?: any, ease?: any) {
        this.popUp(duration, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },

    isRunningPopUp() {
        return this._scaleBehavior && (this._scaleBehavior.completeEventName === 'popup.complete');
    },

    scaleDownDestroy(duration?: any, orientation?: any, ease?: any, destroyMode?: any) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            orientation = config.orientation;
            ease = config.ease;
            destroyMode = config.destroy;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scaleBehavior);

        if (isInit?: any) {
            this.onInitScale();
        }

        this._scaleBehavior.completeEventName = 'scaledown.complete';

        return this;
    },

    scaleDownDestroyPromise(duration?: any, orientation?: any, ease?: any, destroyMode?: any) {
        this.scaleDownDestroy(duration, orientation, ease, destroyMode);
        return WaitComplete(this._scaleBehavior);
    },

    scaleDown(duration?: any, orientation?: any, ease?: any) {
        this.scaleDownDestroy(duration, orientation, ease, false);
        return this;
    },

    scaleDownPromise(duration?: any, orientation?: any, ease?: any) {
        this.scaleDown(duration, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },

    isRunningScaleDown() {
        return this._scaleBehavior && (this._scaleBehavior.completeEventName === 'scaledown.complete');
    },

    scaleYoyo(duration?: any, peakValue?: any, repeat?: any, orientation?: any, ease?: any) {
        if (IsPlainObject(duration)) {
            var config = duration;
            duration = config.duration;
            peakValue = config.peakValue;
            repeat = config.repeat;
            orientation = config.orientation;
            ease = config.ease;
        }

        var isInit = (this._scaleBehavior === undefined);

        this._scaleBehavior = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scaleBehavior);

        if (isInit?: any) {
            this.onInitScale();
        }

        this._scaleBehavior.completeEventName = 'scaleyoyo.complete';

        return this;
    },

    scaleYoyoPromise(duration?: any, peakValue?: any, repeat?: any, orientation?: any, ease?: any) {
        this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
        return WaitComplete(this._scaleBehavior);
    },

    isRunningScaleYoyo() {
        return this._scaleBehavior && (this._scaleBehavior.completeEventName = 'scaleyoyo.complete');
    },

    isRunningEaseScale() {
        return this.isRunningPopUp() || this.isRunningScaleDown() || this.isRunningScaleYoyo();
    },
}