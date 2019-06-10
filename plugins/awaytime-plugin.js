import AwayTime from './awaytime.js'

class AwayTimePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        this._awayTime = this.add();
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    destroy() {
        this._awayTime.destroy();
        super.destroy();
    }

    get awayTime() {
        return this._awayTime.awayTime;
    }

    add(config) {
        return new AwayTime(config);
    }

}

export default AwayTimePlugin;