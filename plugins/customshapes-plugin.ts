import Factory from './gameobjects/shape/customshapes/Factory';
import Creator from './gameobjects/shape/customshapes/Creator';
import CustomShapes from './gameobjects/shape/customshapes/CustomShapes';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CustomShapesPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCustomShapes', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CustomShapes', CustomShapes);

export default CustomShapesPlugin;