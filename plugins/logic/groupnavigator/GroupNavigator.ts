
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class GroupNavigator {
    enable: any;
    scene: any;

    focusedTarget: any;
    focusIndex: any;
    getFocusEnableCallback: any;
    setEventEmitter: any;
    setTargets: any;
    targets: any;

    constructor(scene?: any, config?: any) {
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

    resetFromJSON(o?: any) {
        this.setEnable(GetValue(o, 'enable', true));

        this.setTargets(GetValue(o, 'targets'), GetValue(o, 'columns'));

        var focusEnableCallback = GetValue(o, 'getFocusEnableCallback');
        if (focusEnableCallback?: any) {
            this.setGetFocusEnableCallback(focusEnableCallback);
        } else {
            var focusEnableDataKey = GetValue(o, 'focusEnableDataKey');
            if (focusEnableDataKey?: any) {
                this.setFocusEnableDataKey(focusEnableDataKey);
            } else {
                var focusEnableKey = GetValue(o, 'focusEnableKey');
                if (focusEnableKey?: any) {
                    this.setFocusEnableKey(focusEnableKey);
                }
            }
        }
    }


    destroy() {
        this.targets = undefined;
    }

    setEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setFocusEnableDataKey(dataKey?: any) {
        var callback;
        if (dataKey?: any) {
            callback = function(gameObject?: any) {
                return gameObject.getData(dataKey);
            }
        }
        this.setGetFocusEnableCallback(callback);
        return this;
    }

    setFocusEnableKey(key?: any) {
        var callback;
        if (key?: any) {
            callback = function(gameObject?: any) {
                return gameObject[key];
            }
        }
        this.setGetFocusEnableCallback(callback);
        return this;
    }

    setGetFocusEnableCallback(callback?: any) {
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