import Extend from '../../../utils/managers/Extend';
import Parser from './parser/Parser';
import AddSpriteManager from './methods/spritemanager/AddSpriteManager';
import AddTextManager from './methods/textmanager/AddTextManager';
import Methods from './methods/Methods';

import { Events as PhaserEvents, Utils as PhaserUtils } from 'phaser';
const EventEmitter = PhaserEvents.EventEmitter;
const GetValue = PhaserUtils.Objects.GetValue;

class TagPlayer extends Extend(EventEmitter) {
    destroyManagers: any;
    gameObjectManagers: any;
    getGameObjectManager: any;
    getTimeScale: any;
    initManagers: any;
    parser: any;
    scene: any;
    setTimeScale: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        super();

        this.scene = scene;

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.initManagers(scene, config);

        var spriteManagerConfig = GetValue(config, 'sprites');
        if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
            AddSpriteManager.call(this, spriteManagerConfig);
        }

        var textManagerConfig = GetValue(config, 'texts');
        if ((textManagerConfig !== false) && (textManagerConfig !== null)) {
            AddTextManager.call(this, textManagerConfig);
        }
    }

    get isPlaying() {
        return this.parser.isRunning;
    }

    get spriteManager() {
        return this.getGameObjectManager('sprite');
    }

    get textManager() {
        return this.getGameObjectManager('text');
    }

    get gameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy();

        this.destroyManagers(fromScene);

        this.scene = undefined;
    }

    set timeScale(value) {
        this.setTimeScale(value);
    }

    get timeScale() {
        return this.getTimeScale();
    }

}

Object.assign(
    TagPlayer.prototype,
    Methods
);

export default TagPlayer;