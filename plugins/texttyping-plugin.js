'use strict'

import TextTyping from './texttyping.js';

class TextTypingPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameobject, config) {
        return new TextTyping(gameobject, config);
    }

}

export default TextTypingPlugin;