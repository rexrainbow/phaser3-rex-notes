import Step from './step.js';
import StepMethods from './behaviors/step/StepMethods.js';

class StepPlugin extends Phaser.Plugins.BasePlugin {

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

    inject(gameObject) {
        Object.assign(gameObject, StepMethods);
        return gameObject;
    }
}

export default StepPlugin;