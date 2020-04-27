import OpenFileChooser from './behaviors/filechooser/Open.js';

class FileChooserPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    open(config) {
        return OpenFileChooser(this.game, config);
    }
}

export default FileChooserPlugin;