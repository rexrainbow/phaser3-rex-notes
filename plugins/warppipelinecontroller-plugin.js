import WarpPostFxPipelineController from './warppipelinecontroller.js';
import SetValue from './utils/object/SetValue.js';

class WarpPipelineControllerPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new WarpPostFxPipelineController(gameObject, config);
    }
}

SetValue(window, 'RexPlugins.Pipelines.WarpPostFxPipelineController', WarpPostFxPipelineController);

export default WarpPipelineControllerPlugin;