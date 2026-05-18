import Factory from './Factory';
import Creator from './Creator';
import TransitionImagePack from './TransitionImagePack';
import SetValue from '../../plugins/utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class TransitionImagePackPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTransitionImagePack', Factory, Creator);
    }

    boot() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TransitionImagePack', TransitionImagePack);

export default TransitionImagePackPlugin;