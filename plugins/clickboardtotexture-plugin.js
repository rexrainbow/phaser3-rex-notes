import ClickboardToTexture from './clickboardtotexture.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ClickboardToTexturePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene) {
        return new ClickboardToTexture(scene);
    }
}

export default ClickboardToTexturePlugin;