'use strict'

import Swirlpipeline from './swirlpipeline.js';

class SwirlpipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(game, key) {
        return new Swirlpipeline(game, key);
    }

}

export default SwirlpipelinePlugin;