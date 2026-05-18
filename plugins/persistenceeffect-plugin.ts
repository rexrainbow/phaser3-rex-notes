import Factory from './gameobjects/blitter/persistenceeffect/Factory';
import Creator from './gameobjects/blitter/persistenceeffect/Creator';
import PersistenceEffect from './gameobjects/blitter/persistenceeffect/PersistenceEffect';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class PersistenceEffectPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPersistenceEffect', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PersistenceEffect', PersistenceEffect);

export default PersistenceEffectPlugin;