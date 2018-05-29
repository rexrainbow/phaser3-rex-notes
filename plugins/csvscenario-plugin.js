import CSVScenario from './csvscenario.js';

class CSVScenarioPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new CSVScenario(scene, config);
    }
}

export default CSVScenarioPlugin;