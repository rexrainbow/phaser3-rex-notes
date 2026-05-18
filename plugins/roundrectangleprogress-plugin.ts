import Factory from './gameobjects/shape/roundrectangleprogress/Factory';
import Creator from './gameobjects/shape/roundrectangleprogress/Creator';
import RoundRectangleProgress from './gameobjects/shape/roundrectangleprogress/RoundRectangleProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class RoundRectangleProgressPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangleProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangleProgress', RoundRectangleProgress);

export default RoundRectangleProgressPlugin;