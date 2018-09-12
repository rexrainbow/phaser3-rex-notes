import FSM from './fsm.js';

class FSMPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(config) {
        return new FSM(config);
    }

}

export default FSMPlugin;