import TouchGroup from './touchgroup.js';

class GroupTopPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.touchGroup = this.add();
    }

    destroy() {
        this.touchGroup.destroy();
        super.destroy();
    }

    add() {
        return new TouchGroup(this.game);
    }

    isAtTop(groupName, key) {
        return this.touchGroup.isAtTop(groupName, key);
    }
}

export default GroupTopPlugin;