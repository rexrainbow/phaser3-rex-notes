import Factory from './gameobjects/transitionimage/Factory.js';
import Creator from './gameobjects/transitionimage/Creator.js';
import TransitionImage from './gameobjects/transitionimage/TransitionImage.js';
import SetValue from './utils/object/SetValue.js';

class TransitionImagePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTransitionImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TransitionImage', TransitionImage);

export default TransitionImagePlugin;