import Factory from './gameobjects/canvas/roundrectangle/Factory';
import Creator from './gameobjects/canvas/roundrectangle/Creator';
import RoundRectangle from './gameobjects/canvas/roundrectangle/RoundRectangle';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CircleMaskImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangleCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangleCanvas', RoundRectangle);

export default CircleMaskImagePlugin;