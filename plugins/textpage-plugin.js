'use strict'

import TextPage from './textpage.js';

class TextPagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameobject, config) {
        return new TextPage(gameobject, config);
    }

}

export default TextPagePlugin;