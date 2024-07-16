import MDScenario from './MDScenario.js';
import CSV2MD from '../../plugins/logic/eventsheets/markedeventsheets/CSV2MD.js';

class MDScenarioPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new MDScenario(scene, config);
    }
}

var methods = {
    csv2md: CSV2MD
}

Object.assign(
    MDScenarioPlugin.prototype,
    methods,
)

export default MDScenarioPlugin;