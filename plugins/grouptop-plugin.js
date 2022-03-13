import GroupTop from './grouptop.js';

class GroupTopPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.groupTop = this.add();
    }

    destroy() {
        this.groupTop.destroy();
        super.destroy();
    }

    add() {
        return new GroupTop(this.game);
    }

    isAtTop(groupName, key) {
        return this.groupTop.isAtTop(groupName, key);
    }
}

export default GroupTopPlugin;