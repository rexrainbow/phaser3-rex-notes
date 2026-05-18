import Factory from './gameobjects/shape/lineprogress/Factory';
import Creator from './gameobjects/shape/lineprogress/Creator';
import LineProgress from './gameobjects/shape/lineprogress/LineProgress';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class LineProgressPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLineProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.LineProgress', LineProgress);

export default LineProgressPlugin;