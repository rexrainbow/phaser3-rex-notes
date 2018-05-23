'use strict'

import Drag from './drag.js';

class DragPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameobject, config) {
        return new Drag(gameobject, config);
    }

}

export default DragPlugin;