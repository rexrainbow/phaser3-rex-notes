import BuildArcadeObject from './buildarcadeobject.js';
import ArcadeMethods from './utils/arcade/ArcadeMethods.js';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class BuildArcadeObjectPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    build(gameObject, isStatic) {
        return BuildArcadeObject(gameObject, isStatic);
    }

    injectMethods(gameObject) {
        Object.assign(gameObject, ArcadeMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

export default BuildArcadeObjectPlugin;