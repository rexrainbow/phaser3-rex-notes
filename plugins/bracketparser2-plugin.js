import BracketParser from './bracketparser2.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BracketParserPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new BracketParser(config);
    }
}

export default BracketParserPlugin;