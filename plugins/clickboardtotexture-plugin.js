import ClickboardToTexture from './clickboardtotexture.js';

class ClickboardToTexturePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new ClickboardToTexture(scene, config);
    }
}

export default ClickboardToTexturePlugin;