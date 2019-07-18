import Factory from './gameobjects/persistenceeffect/Factory.js';
import Creator from './gameobjects/persistenceeffect/Creator.js';
import PersistenceEffect from './gameobjects/persistenceeffect/PersistenceEffect.js';
import SetValue from './utils/object/SetValue.js';

class PersistenceEffectPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPersistenceEffect', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PersistenceEffect', PersistenceEffect);

export default PersistenceEffectPlugin;