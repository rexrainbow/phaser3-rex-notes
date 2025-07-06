import ClickboardToTexture from './clickboardtotexture.js';

class ClickboardToTexturePlugin extends Phaser.Plugins.BasePlugin {

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