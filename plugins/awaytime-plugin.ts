import AwayTime from './awaytime'

import { Plugins as PhaserPlugins } from 'phaser';
class AwayTimePlugin extends PhaserPlugins.BasePlugin {
    _defaultAwayTimer: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        if (this._defaultAwayTimer) {
            this._defaultAwayTimer.destroy();
        }
        super.destroy();
    }

    add(config?: any) {
        return new AwayTime(config);
    }

    get defaultAwayTimer() {
        if (!this._defaultAwayTimer) {
            this._defaultAwayTimer = this.add();
        }
        return this._defaultAwayTimer;
    }

    get awayTime() {
        return this.defaultAwayTimer.awayTime;
    }

    setKey(key?: any) {
        this.defaultAwayTimer.setKey(key);
        return this;
    }

    setPeriod(time?: any) {
        this.defaultAwayTimer.setPeriod(time);
        return this;
    }
}

export default AwayTimePlugin;