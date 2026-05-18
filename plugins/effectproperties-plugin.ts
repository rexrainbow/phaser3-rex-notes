import AddEffectProperties from './effectproperties';

import { Plugins as PhaserPlugins } from 'phaser';
class EffectPropertiesPlugin extends PhaserPlugins.BasePlugin {
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
        return AddEffectProperties(gameObject, config);
    }
}

export default EffectPropertiesPlugin;