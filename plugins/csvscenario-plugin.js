import CSVScenario from './csvscenario.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CSVScenarioPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new CSVScenario(scene, config);
    }
}

export default CSVScenarioPlugin;