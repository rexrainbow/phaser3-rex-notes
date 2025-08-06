import YAMLScenario from './YAMLScenario.js';
import CreateMonitorPanel from './monitor/CreateMonitorPanel.js';

class YAMLScenarioPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new YAMLScenario(scene, config);
    }

    addMonitorPanel(scene, style, target, properties) {
        return CreateMonitorPanel(scene, style, target, properties);
    }
}

export default YAMLScenarioPlugin;