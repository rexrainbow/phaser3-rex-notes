import { EaseData } from '../../../plugins/easedata';
import { WaitEvent } from '../utils/WaitEvent';

var OnInitEaseData = function(gameObject?: any, easeData?: any) {
    // Route 'complete' of easeData to gameObject
    easeData.on('complete', function(key?: any) {
        gameObject.emit(`easedata.${key}.complete`, gameObject);
        gameObject.emit('easedata.complete', key, gameObject);
    })
}

export default {
    easeDataTo(key?: any, value?: any, duration?: any, ease?: any) {
        if (!this._easeData) {
            this._easeData = new EaseData(this);
            OnInitEaseData(this, this._easeData);
        }
        this._easeData.easeTo(key, value, duration, ease);
        return this;
    },

    easeDataToPromise(key?: any, value?: any, duration?: any, ease?: any) {
        this.easeDataTo(key, value, duration, ease);
        return WaitEvent(this._easeData, `complete-${key}`);
    },

    stopEaseData(key?: any, toEnd?: any) {
        if (!this._easeData) {
            return this;
        }

        this._easeData.stopEase(key, toEnd);
        return this;
    },

    stopAllEaseData(toEnd?: any) {
        if (!this._easeData) {
            return this;
        }

        this._easeData.stopAll(toEnd);
        return this;
    }
}