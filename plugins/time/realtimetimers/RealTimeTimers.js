import EventEmitter from 'eventemitter3';
import GetValue from '../../utils/object/GetValue.js';
import GetPeriodMS from '../../utils/time/GetPeriodMS.js';
import RemoveItems from '../../utils/array/Remove.js';

class RealTimeTimer extends EventEmitter {
    constructor(config) {
        super();

        this.timers = [];

        var getTimestampCallback = GetValue(config, 'getTimestampCallback');
        if (!getTimestampCallback) {
            var startTimestamp = GetValue(config, 'startTimestamp', undefined);
            if (startTimestamp === undefined) {
                startTimestamp = new Date().getTime();
            }
            this.setStartTimestamp(startTimestamp);
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

    add(name, period, currentTimestamp) {
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
        this._push(timer);

        return this;
    }

    getExpired(currentTimestamp) {
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

    popExpired(currentTimestamp) {
        var result = this.getExpiredTimers(currentTimestamp);
        this._pop(result);
        return result;
    }

    getProgress(currentTimestamp) {
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

    get(name) {
        var result = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
            var timer = this.timers[i];
            if (timer.name === name) {
                result.push(timer);
            }
        }
        return result;
    }

    remove(name) {
        var result = this.get(name);
        this._pop(result);
        return result;
    }


    // Internal
    _push(timer) {
        this.timers.push(timer);

        this.emit('add', timer, this.timers);
        this.emit('update', this.timers);
    }

    // Internal
    _pop(timers) {
        RemoveItems(this.timers, timers, function (timer) {
            this.emit('remove', timer, this.timers);
        }, this);
        this.emit('update', this.timers);
    }

}

var GetCurrentTimestampFromStartCallback = function () {
    return this.startTimestamp + window.performance.now();
}

export default RealTimeTimer;