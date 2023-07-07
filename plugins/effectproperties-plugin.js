import AddEffectProperties from './effectproperties.js';

class EffectPropertiesPlugin extends Phaser.Plugins.BasePlugin {

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