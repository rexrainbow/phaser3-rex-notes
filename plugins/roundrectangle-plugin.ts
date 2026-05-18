import Factory from './gameobjects/shape/roundrectangle/Factory';
import Creator from './gameobjects/shape/roundrectangle/Creator';
import RoundRectangle from './gameobjects/shape/roundrectangle/RoundRectangle';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class RoundRectanglePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRoundRectangle', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RoundRectangle', RoundRectangle);

export default RoundRectanglePlugin;