import CreateCircleTexture from './utils/texture/CreateCircleTexture.js';
import CreateRextangleTexture from './utils/texture/CreateRectangleTexture.js';

class CreateCanvasTexturePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    get textureManager() {
        return this.game.textures;
    }

    circle(config) {
        CreateCircleTexture(this.textureManager, config);
        return this;
    }

    rectangle(config) {
        CreateRextangleTexture(this.textureManager, config);
        return this;
    }
}

export default CreateCanvasTexturePlugin;