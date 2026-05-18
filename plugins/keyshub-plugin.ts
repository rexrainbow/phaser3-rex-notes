import KeysHub from './keyshub';

import { Plugins as PhaserPlugins } from 'phaser';
class KeysHubPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new KeysHub(scene, config);
    }
}

export default KeysHubPlugin;