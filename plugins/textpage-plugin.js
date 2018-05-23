'use strict'

import TextPage from './textpage.js';

class TextPagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new TextPage(gameobject, config);
    }

}

export default TextPagePlugin;