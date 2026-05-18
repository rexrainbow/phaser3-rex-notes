import BracketParser from './bracketparser2';

import { Plugins as PhaserPlugins } from 'phaser';
class BracketParserPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new BracketParser(config);
    }
}

export default BracketParserPlugin;