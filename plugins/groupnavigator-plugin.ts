import GroupNavigator from './groupnavigator';

import { Plugins as PhaserPlugins } from 'phaser';
class GroupNavigatorPlugin extends PhaserPlugins.BasePlugin {
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
        return new GroupNavigator(config);
    }
}

export default GroupNavigatorPlugin;