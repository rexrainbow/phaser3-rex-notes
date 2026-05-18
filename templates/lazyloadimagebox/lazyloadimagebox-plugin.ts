import Factory from './Factory';
import Creator from './Creator';
import LazyLoadImageBox from './LazyLoadImageBox';
import SetValue from '../../plugins/utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class LazyLoadImageBoxPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLazyLoadImageBox', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.LazyLoadImageBox', LazyLoadImageBox);

export default LazyLoadImageBoxPlugin;