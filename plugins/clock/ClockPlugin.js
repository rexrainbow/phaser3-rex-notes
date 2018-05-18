'use strict'

import Clock from './Clock.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class ClockPlugin extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {
        super(scene, pluginManager);
    }

    add(config) {
        return new Clock(this.scene, config);
    }

}

export default ClockPlugin;