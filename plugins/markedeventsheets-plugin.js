import MarkedEventSheets from './logic/eventsheets/markedeventsheets/MarkedEventSheets.js';

class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new MarkedEventSheets(config);
    }
}

export default MarkedEventSheetsPlugin;