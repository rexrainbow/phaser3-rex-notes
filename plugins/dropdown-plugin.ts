import DropDown from './behaviors/dropdown/DropDown';

import { Plugins as PhaserPlugins } from 'phaser';
class DropDownPlugin extends PhaserPlugins.BasePlugin {
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
        return new DropDown(gameObject, config);
    }
}

export default DropDownPlugin;