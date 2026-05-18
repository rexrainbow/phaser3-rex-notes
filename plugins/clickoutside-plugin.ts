import ClickOutside from './clickoutside';

import { Plugins as PhaserPlugins } from 'phaser';
class ClickOutsidePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new ClickOutside(gameObject, config);
    }

}

export default ClickOutsidePlugin;