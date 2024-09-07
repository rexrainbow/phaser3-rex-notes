
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class GroupNavigator {
    constructor(scene, config) {
        if (IsPlainObject(scene) && (config === undefined)) {
            config = scene;
            scene = undefined;
        }

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = scene;
        this.focusedTarget = undefined;
        this.focusIndex = { x: undefined, y: undefined };

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));

        this.setTargets(GetValue(o, 'targets'), GetValue(o, 'columns'));

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

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
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