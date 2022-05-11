import EventEmitter from 'eventemitter3';
import GetValue from '../../utils/object/GetValue.js';
import GetPeriodMS from '../../utils/time/GetPeriodMS.js';
import RemoveItems from '../../utils/array/Remove.js';

class RealTimeTimers extends EventEmitter {
    constructor(config) {
        super();

        this.timers = [];

        var getTimestampCallback = GetValue(config, 'getTimestampCallback');
        if (!getTimestampCallback) {
            this.setStartTimestamp(GetValue(config, 'startTimestamp'));
            getTimestampCallback = GetCurrentTimestampFromStartCallback.bind(this);
        }
        this.setGetTimestampCallback(getTimestampCallback);

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var timers = GetValue(o, 'timers', undefined);
        if (timers) {
            this.timers = timers;
        }
    }

    toJSON() {
        return {
            timers: this.timers
        }
    }

    setStartTimestamp(timestamp) {
        if (timestamp === undefined) {
            timestamp = new Date().getTime();
        }
        this.startTimestamp = timestamp - window.performance.now();
        return this;
    }

    setGetTimestampCallback(callback) {
        if (callback === undefined) {
            callback = DefaultGetCurrentTimestampCallback;
        }
        this.getCurrentTimestampCallback = callback;
        return this;
    }

    addTimer(name, period, currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        period = GetPeriodMS(period);

        var timer = {
            name: name,
            start: currentTimestamp,
            period: period,
            expire: currentTimestamp + period
        }
        this._add(timer);

        return this;
    }

    getExpiredTimers(currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (currentTimestamp >= timer.expire) {
                result.push(timer);
            }
        }
        return result;
    }

    popExpiredTimers(currentTimestamp) {
        var result = this.getExpiredTimers(currentTimestamp);
        this._remove(result);
        return result;
    }

    getTimersProgress(currentTimestamp) {
        if (currentTimestamp === undefined) {
            currentTimestamp = this.getCurrentTimestampCallback();
        }

        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            var progress = (currentTimestamp - timer.start) / timer.period;
            progress = Math.min(progress, 1);
            result.push({
                name: timer.name,
                progress: progress,
            })
        }
        return result;
    }

    getTimers(name) {
        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (timer.name === name) {
                result.push(timer);
            }
        }
        return result;
    }

    removeTimers(timers) {
        if (typeof (timers) === 'string') {
            timers = this.getTimers(timers);
        }
        this._remove(result);
        return result;
    }


    // Internal
    _add(timer) {
        this.timers.push(timer);

        this.emit('add', timer, this.timers);
        this.emit('update', this.timers);
    }

    // Internal
    _remove(timers) {
        RemoveItems(this.timers, timers, function (timer) {
            this.emit('remove', timer, this.timers);
        }, this);
        this.emit('update', this.timers);
    }

}

var GetCurrentTimestampFromStartCallback = function () {
    return this.startTimestamp + window.performance.now();
}

export default RealTimeTimers;