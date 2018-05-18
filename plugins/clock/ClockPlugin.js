'use strict'

import Clock from './Clock.js';

class ClockPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(scene, config) {
        return new Clock(scene, config);
    }

}

export default ClockPlugin;