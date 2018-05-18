'use strict'

import TextTyping from './TextTyping.js';

class TextTypingPlugin extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {
        super(scene, pluginManager);
    }

    add(gameobject, config) {
        return new TextTyping(gameobject, config);
    }

}

export default TextTypingPlugin;