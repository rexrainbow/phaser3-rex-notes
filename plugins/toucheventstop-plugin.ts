import TouchEventStop from './toucheventstop'

import { Plugins as PhaserPlugins } from 'phaser';
class TouchEventStopPlugin extends PhaserPlugins.BasePlugin {
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
        return new TouchEventStop(gameObject, config);
    }
}

export default TouchEventStopPlugin;