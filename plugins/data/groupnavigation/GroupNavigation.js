
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import Methods from './Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GroupNavigation {
    constructor(scene, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.scene = scene;
        this.focusedGameObject = undefined;
        this.focusIndex = { x: undefined, y: undefined };

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setTargets(GetValue(o, 'targets'));
        this.setGetFocusEnableCallback(GetValue(o, 'getFocusEnableCallback'));
    }


    destroy() {
        this.targets = undefined;
    }

    setTargets(targets) {
        this.targets = targets;
        this.is1DTargetsArray = (Array.isArray(targets)) && (!Array.isArray(targets[0]));
        return this;
    }

    setGetFocusEnableCallback(callbakc) {
        this.getFocusEnableCallback = callbakc;
        return this;
    }
}

Object.assign(
    GroupNavigation.prototype,
    EventEmitterMethods,
    Methods,
);

export default GroupNavigation;