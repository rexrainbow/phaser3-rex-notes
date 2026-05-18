import Factory from './gameobjects/dynamictext/textplayer/Factory';
import Creator from './gameobjects/dynamictext/textplayer/Creator';
import TextPlayer from './gameobjects/dynamictext/textplayer/TextPlayer';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class DynamicTextPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexTextPlayer', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.TextPlayer', TextPlayer);

export default DynamicTextPlugin;