import {
    EaseMove,
    EaseMoveTo, EaseMoveToDestroy,
    EaseMoveFrom, EaseMoveFromDestroy,
    EaseMoveMethods
} from './easemove.js';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class EaseMovePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new EaseMove(gameObject, config);
    }

    injectMethods(gameObject) {
        Object.assign(gameObject, EaseMoveMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

// mixin
var methods = {
    moveTo: EaseMoveTo,
    moveFrom: EaseMoveFrom,
    moveToDestroy: EaseMoveToDestroy,
    moveFromDestroy: EaseMoveFromDestroy
}
Object.assign(
    EaseMovePlugin.prototype,
    methods
);

export default EaseMovePlugin;