import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import BobBase from './bobbase/BobBase.js';
import IsEmpty from '../../object/IsEmpty.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GOManager {
    constructor(scene, config) {
        this.scene = scene;

        this.BobClass = GetValue(config, 'BobClass', BobBase);
        this.setCreateGameObjectCallback(
            GetValue(config, 'createGameObject'),
            GetValue(config, 'createGameObjectScope')
        );
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        var fadeConfig = GetValue(config, 'fade', 500);
        if (typeof (fadeConfig) === 'number') {
            this.setGOFadeMode(0);
            this.setGOFadeTime(fadeConfig);
        } else {
            this.setGOFadeMode(GetValue(fadeConfig, 'mode', 0));
            this.setGOFadeTime(GetValue(fadeConfig, 'time', 500));
        }

        this.setViewportCoordinateEnable(GetValue(config, 'viewportCoordinate', false));

        this.bobs = {};
        this.removedGOs = [];
        this._timeScale = 1;
    }

    destroy(fromScene) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.scene = undefined;
    }

    set timeScale(timeScale) {
        if (this._timeScale === timeScale) {
            return;
        }

        this._timeScale = timeScale;

        var bobs = this.bobs;
        for (var name in bobs) {
            bobs[name].setTimeScale(timeScale);
        }
    }

    get timeScale() {
        return this._timeScale;
    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    setCreateGameObjectCallback(callback, scope) {
        this.createGameObjectCallback = callback;
        this.createGameObjectScope = scope;
        return this;
    }

    setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.viewportCoordinateEnable = enable;
        return this;
    }

    get isEmpty() {
        return IsEmpty(this.bobs) && (this.removedGOs.length === 0);
    }

}

Object.assign(
    GOManager.prototype,
    EventEmitterMethods,
    Methods
);

export default GOManager;