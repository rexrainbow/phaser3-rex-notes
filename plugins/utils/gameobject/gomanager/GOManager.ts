import EventEmitterMethods from '../../eventemitter/EventEmitterMethods';
import BobBase from './bobbase/BobBase';
import IsEmpty from '../../object/IsEmpty';
import Methods from './methods/Methods';
import GetViewport from '../../system/GetViewport';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class GOManager {
    viewport: any;

    _timeScale: any;
    BobClass: any;
    bobs: any;
    clear: any;
    createGameObjectCallback: any;
    createGameObjectScope: any;
    effectPropertiesConfig: any;
    gameObjectDepth: any;
    name: any;
    removedGOs: any;
    scene: any;
    setEventEmitter: any;
    setGOFadeMode: any;
    setGOFadeTime: any;
    symbols: any;
    viewportCoordinateEnable: any;

    constructor(scene?: any, config?: any) {
        this.scene = scene;

        this.BobClass = GetValue(config, 'BobClass', BobBase);
        this.setCreateGameObjectCallback(
            GetValue(config, 'createGameObject'),
            GetValue(config, 'createGameObjectScope')
        );
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.setGameObjectDepth(GetValue(config, 'depth', undefined));

        var fadeConfig = GetValue(config, 'fade', 500);
        if (typeof (fadeConfig) === 'number') {
            this.setGOFadeMode();
            this.setGOFadeTime(fadeConfig);
        } else {
            this.setGOFadeMode(GetValue(fadeConfig, 'mode'));
            this.setGOFadeTime(GetValue(fadeConfig, 'time', 500));
        }

        var viewportCoordinateConfig = GetValue(config, 'viewportCoordinate', false);
        if (viewportCoordinateConfig !== false) {
            this.setViewportCoordinateEnable(GetValue(config, 'enable', true));
            this.setViewport(GetValue(viewportCoordinateConfig, 'viewport'))
        } else {
            this.setViewportCoordinateEnable(false);
        }

        var effectPropertiesConfig = GetValue(config, 'effectProperties', false);
        this.setEffectPropertiesConfig(effectPropertiesConfig);

        this.setSymbols(GetValue(config, 'symbols'));

        this.bobs = {};
        this.removedGOs = [];
        this._timeScale = 1;

        this.name = GetValue(config, 'name');
    }

    destroy(fromScene?: any) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.viewport = undefined;
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

    setTimeScale(timeScale?: any) {
        this.timeScale = timeScale;
        return this;
    }

    setCreateGameObjectCallback(callback?: any, scope?: any) {
        this.createGameObjectCallback = callback;
        this.createGameObjectScope = scope;
        return this;
    }

    setGameObjectDepth(depth?: any) {
        this.gameObjectDepth = depth;
        return this;
    }

    setViewportCoordinateEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.viewportCoordinateEnable = enable;
        return this;
    }

    setEffectPropertiesConfig(config?: any) {
        if (config === undefined) {
            config = true;
        }

        this.effectPropertiesConfig = config;
        return this;
    }

    setViewport(viewport?: any) {
        if (viewport === undefined) {
            viewport = GetViewport(this.scene, this.scene.cameras.main);
        }

        this.viewport = viewport;
        return this;
    }

    setSymbols(symbols?: any) {
        this.symbols = symbols;
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