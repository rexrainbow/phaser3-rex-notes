import KeysHub from './keyshub.js';

import { Plugins as PhaserPlugins } from 'phaser';
class KeysHubPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new KeysHub(scene, config);
    }
}

export default KeysHubPlugin;