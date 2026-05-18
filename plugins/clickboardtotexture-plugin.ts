import ClickboardToTexture from './clickboardtotexture';

import { Plugins as PhaserPlugins } from 'phaser';
class ClickboardToTexturePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any) {
        return new ClickboardToTexture(scene);
    }
}

export default ClickboardToTexturePlugin;