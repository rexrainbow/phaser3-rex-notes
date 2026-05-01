import AddEffectProperties from './effectproperties.js';

import { Plugins as PhaserPlugins } from 'phaser';
class EffectPropertiesPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return AddEffectProperties(gameObject, config);
    }
}

export default EffectPropertiesPlugin;