import Factory from './gameobjects/dom/inputtext/Factory';
import Creator from './gameobjects/dom/inputtext/Creator';
import InputText from './gameobjects/dom/inputtext/InputText';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class InputTextPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexInputText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

export default InputTextPlugin;