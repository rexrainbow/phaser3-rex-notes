import Factory from './gameobjects/blitter/blitter/Factory';
import Creator from './gameobjects/blitter/blitter/Creator';
import Blitter from './gameobjects/blitter/blitter/Blitter';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class BlitterPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBlitter', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Blitter', Blitter);

export default BlitterPlugin;