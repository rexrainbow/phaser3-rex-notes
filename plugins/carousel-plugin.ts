import Factory from './gameobjects/container/carousel/Factory';
import Creator from './gameobjects/container/carousel/Creator';
import Carousel from './gameobjects/container/carousel/Carousel';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class CarouselPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCarousel', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Carousel', Carousel);

export default CarouselPlugin;