import Sequence from './sequence.js';

class SequencePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    add(config) {
        return new Sequence(undefined, config);
    }
}

export default SequencePlugin;