import {
    EaseMove,
    EaseMoveTo, EaseMoveToDestroy,
    EaseMoveFrom, EaseMoveFromDestroy,
    EaseMoveMethods
} from './easemove';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class EaseMovePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new EaseMove(gameObject, config);
    }

    injectMethods(gameObject?: any) {
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