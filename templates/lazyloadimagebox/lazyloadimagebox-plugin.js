import Factory from './Factory.js';
import Creator from './Creator.js';
import LazyLoadImageBox from './LazyLoadImageBox.js';
import SetValue from '../../plugins/utils/object/SetValue.js';

class LazyLoadImageBoxPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
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