'use strict'

import TextTyping from './TextTyping.js';

class TextTypingPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameobject, config) {
        return new TextTyping(gameobject, config);
    }

}

export default TextTypingPlugin;