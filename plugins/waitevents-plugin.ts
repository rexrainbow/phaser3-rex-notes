import WaitEvents from './waitevents';

import { Plugins as PhaserPlugins } from 'phaser';
class WaitEventsPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(completeCallback?: any, scope?: any) {
        return new WaitEvents(completeCallback, scope);
    }

}

export default WaitEventsPlugin;