import CSVScenario from './csvscenario';

import { Plugins as PhaserPlugins } from 'phaser';
class CSVScenarioPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new CSVScenario(scene, config);
    }
}

export default CSVScenarioPlugin;