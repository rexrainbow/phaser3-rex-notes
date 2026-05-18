import Step from './step';
import StepMethods from './behaviors/step/StepMethods';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class StepPlugin extends PhaserPlugins.BasePlugin {
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
        return new Step(gameObject, config);
    }

    injectMethods(gameObject?: any) {
        Object.assign(gameObject, StepMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

export default StepPlugin;