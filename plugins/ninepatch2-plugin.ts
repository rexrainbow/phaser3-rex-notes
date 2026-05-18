import Factory from './gameobjects/blitter/ninepatch/Factory';
import Creator from './gameobjects/blitter/ninepatch/Creator';
import NinePatch from './gameobjects/blitter/ninepatch/NinePatch';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class NinePatchPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexNinePatch2', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.NinePatch2', NinePatch);

export default NinePatchPlugin;