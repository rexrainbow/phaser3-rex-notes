import Factory from './gameobjects/bbocdetext/Factory.js';
import Creator from './gameobjects/bbocdetext/Creator.js';
import BBCodeText from './gameobjects/bbocdetext/BBCodeText.js';
import SetValue from './utils/object/SetValue.js';

class BBCodeTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBBCodeText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.BBCodeText', BBCodeText);

export default BBCodeTextPlugin;