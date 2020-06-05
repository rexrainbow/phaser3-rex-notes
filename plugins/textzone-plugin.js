import TextZone from './textzone.js';

class TextZonePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(textObject) {
        return new TextZone(textObject);
    }
}

export default TextZonePlugin;