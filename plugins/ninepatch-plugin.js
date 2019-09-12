import Factory from './gameobjects/ninepatch/Factory.js';
import Creator from './gameobjects/ninepatch/Creator.js';
import NinePatch from './gameobjects/ninepatch/NinePatch.js';
import SetValue from './utils/object/SetValue.js';

class NinePatchPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexNinePatch', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.NinePatch', NinePatch);

export default NinePatchPlugin;