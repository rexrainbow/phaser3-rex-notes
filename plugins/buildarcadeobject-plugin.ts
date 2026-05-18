import BuildArcadeObject from './buildarcadeobject';
import ArcadeMethods from './utils/arcade/ArcadeMethods';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class BuildArcadeObjectPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    build(gameObject?: any, isStatic?: any) {
        return BuildArcadeObject(gameObject, isStatic);
    }

    injectMethods(gameObject?: any) {
        Object.assign(gameObject, ArcadeMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

export default BuildArcadeObjectPlugin;