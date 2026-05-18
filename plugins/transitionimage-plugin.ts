import Factory from './gameobjects/image/transitionimage/Factory';
import Creator from './gameobjects/image/transitionimage/Creator';
import TransitionImage from './gameobjects/image/transitionimage/TransitionImage';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class TransitionImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
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