import WaitEvents from './waitevents.js';

import { Plugins as PhaserPlugins } from 'phaser';
class WaitEventsPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(completeCallback, scope) {
        return new WaitEvents(completeCallback, scope);
    }

}

export default WaitEventsPlugin;