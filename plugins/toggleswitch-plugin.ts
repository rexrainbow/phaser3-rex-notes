import Factory from './gameobjects/shape/toggleswitch/Factory';
import Creator from './gameobjects/shape/toggleswitch/Creator';
import ToggleSwitch from './gameobjects/shape/toggleswitch/ToggleSwitch';
import ToggleSwitchShapeFactory from './gameobjects/shape/toggleswitch/ToggleSwitchShapeFactory';
import ToggleSwitchShapeCreator from './gameobjects/shape/toggleswitch/ToggleSwitchShapeCreator';
import ToggleSwitchShape from './gameobjects/shape/toggleswitch/ToggleSwitchShape';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class ToggleSwitchPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexToggleSwitch', Factory, Creator);
        pluginManager.registerGameObject('rexToggleSwitchShape', ToggleSwitchShapeFactory, ToggleSwitchShapeCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ToggleSwitch', ToggleSwitch);
SetValue(window, 'RexPlugins.GameObjects.ToggleSwitchShape', ToggleSwitchShape);

export default ToggleSwitchPlugin;