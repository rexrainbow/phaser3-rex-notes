import CutJigsawImage from './cutjigsawimage';

class CutJigsawImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    gridCut(gameObject, config) {
        return CutJigsawImage(gameObject, config);
    }
}

export default CutJigsawImagePlugin;