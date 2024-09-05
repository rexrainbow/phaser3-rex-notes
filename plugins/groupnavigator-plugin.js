import GroupNavigator from './groupnavigator.js';

class GroupNavigatorPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new GroupNavigator(undefined, config);
    }
}

export default GroupNavigatorPlugin;