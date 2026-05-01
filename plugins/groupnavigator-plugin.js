import GroupNavigator from './groupnavigator.js';

import { Plugins as PhaserPlugins } from 'phaser';
class GroupNavigatorPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new GroupNavigator(config);
    }
}

export default GroupNavigatorPlugin;