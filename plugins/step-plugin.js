import Step from './step.js';
import StepMethods from './behaviors/step/StepMethods.js';

import { GameObjects as PhaserGameObjects, Plugins as PhaserPlugins } from 'phaser';
class StepPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Step(gameObject, config);
    }

    injectMethods(gameObject) {
        Object.assign(gameObject, StepMethods);
        return gameObject;
    }

    injectMethodsToRootClass() {
        this.injectMethods(PhaserGameObjects.GameObject.prototype);
        return this;
    }
}

export default StepPlugin;