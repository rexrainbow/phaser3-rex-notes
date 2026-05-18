import Factory from './gameobjects/image/imagebox/Factory';
import Creator from './gameobjects/image/imagebox/Creator';
import ImageBox from './gameobjects/image/imagebox/ImageBox';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class ImageBoxPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexImageBox', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ImageBox', ImageBox);

export default ImageBoxPlugin;