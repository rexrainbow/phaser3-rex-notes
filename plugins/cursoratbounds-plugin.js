import CursorAtBounds from './cursoratbounds.js';

class CursorAtBoundsPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new CursorAtBounds(scene, config);
    }

}

export default CursorAtBoundsPlugin;