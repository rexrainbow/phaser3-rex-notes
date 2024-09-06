
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GroupNavigator {
    constructor(parent, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.parent = parent;
        this.focusedTarget = undefined;
        this.focusIndex = { x: undefined, y: undefined };

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setTargets(GetValue(o, 'targets'));

        var focusEnableCallback = GetValue(o, 'getFocusEnableCallback');
        if (focusEnableCallback) {
            this.setGetFocusEnableCallback(focusEnableCallback);
        } else {
            var focusEnableDataKey = GetValue(o, 'focusEnableDataKey');
            if (focusEnableDataKey) {
                this.setFocusEnableDataKey(focusEnableDataKey);
            } else {
                var focusEnableKey = GetValue(o, 'focusEnableKey');
                if (focusEnableKey) {
                    this.setFocusEnableKey(focusEnableKey);
                }
            }
        }
    }


    destroy() {
        this.targets = undefined;
    }

    setTargets(targets) {
        this.targets = targets;

        this.blur();
        this.focusIndex.x = undefined;
        this.focusIndex.y = undefined;

        return this;
    }

    setFocusEnableDataKey(dataKey) {
        var callback;
        if (dataKey) {
            callback = function (gameObject) {
                return gameObject.getData(dataKey);
            }
        }
        this.setGetFocusEnableCallback(callback);
        return this;
    }

    setFocusEnableKey(key) {
        var callback;
        if (key) {
            callback = function (gameObject) {
                return gameObject[key];
            }
        }
        this.setGetFocusEnableCallback(callback);
        return this;
    }

    setGetFocusEnableCallback(callback) {
        this.getFocusEnableCallback = callback;
        return this;
    }

    getFocusedTarget() {
        return this.focusedTarget;
    }
}

Object.assign(
    GroupNavigator.prototype,
    EventEmitterMethods,
    Methods,
);

export default GroupNavigator;