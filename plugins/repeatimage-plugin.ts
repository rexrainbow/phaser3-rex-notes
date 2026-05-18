import Factory from './gameobjects/canvas/repeatimage/Factory';
import Creator from './gameobjects/canvas/repeatimage/Creator';
import RepeatImage from './gameobjects/canvas/repeatimage/RepeatImage';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class RepeatImagePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexRepeatImage', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.RepeatImage', RepeatImage);

export default RepeatImagePlugin;