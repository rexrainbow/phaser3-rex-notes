import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import BobBase from './BobBase.js';
import IsEmpty from '../../object/IsEmpty.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GOManager {
    constructor(scene, config) {
        this.scene = scene;

        this.BobClass = GetValue(config, 'BobClass', BobBase);
        this.setCreateGameObjectCallback(GetValue(config, 'createGameObject'));
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        this.setGOFadeTime(GetValue(config, 'fade', 500));
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

    setCreateGameObjectCallback(callback) {
        this.createGameObjectCallback = callback;
        return this;
    }

    setGOFadeTime(time) {
        this.fadeTime = time;
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