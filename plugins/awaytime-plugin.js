import AwayTime from './awaytime.js'

class AwayTimePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        this._awayTime = this.add();
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this._awayTime.destroy();
        super.destroy();
    }

    add(config) {
        return new AwayTime(config);
    }

    get awayTime() {
        return this._awayTime.awayTime;
    }

    setKey(key) {
        this._awayTime.setKey(key);
        return this;
    }

    setPeriod(time) {
        this._awayTime.setPeriod(time);
        return this;
    }
}

export default AwayTimePlugin;