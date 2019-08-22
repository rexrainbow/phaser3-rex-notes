import Factory from './gameobjects/perspectivecard/Factory.js';
import Creator from './gameobjects/perspectivecard/Creator.js';
import PerspectiveCard from './gameobjects/perspectivecard/PerspectiveCard.js';
import SetValue from './utils/object/SetValue.js';

class PerspectiveCardPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexPerspectiveCard', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', PerspectiveCard);

export default PerspectiveCardPlugin;