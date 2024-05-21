import Factory from './Factory.js';
import Creator from './Creator.js';
import TransitionImagePack from './TransitionImagePack.js';
import SetValue from '../../plugins/utils/object/SetValue.js';

class TransitionImagePackPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
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