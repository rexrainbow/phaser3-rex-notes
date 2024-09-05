
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

        this.blur();
        this.focusIndex.x = undefined;
        this.focusIndex.y = undefined;

        return this;
    }

    setGetFocusEnableCallback(callbakc) {
        this.getFocusEnableCallback = callbakc;
        return this;
    }
}

Object.assign(
    GroupNavigator.prototype,
    EventEmitterMethods,
    Methods,
);

export default GroupNavigator;