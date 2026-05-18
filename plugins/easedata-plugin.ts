import { EaseData } from './easedata';

import { Plugins as PhaserPlugins } from 'phaser';
class EaseDataPlugin extends PhaserPlugins.BasePlugin {
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
        return new EaseData(gameObject, config);
    }
}

export default EaseDataPlugin;