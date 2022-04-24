// import Factory from './gameobjects/canvas/canvas/Factory.js';
// import Creator from './gameobjects/canvas/canvas/Creator.js';
// import Canvas from './gameobjects/canvas/canvas/Canvas.js';
import Live2dFileCallback from './gameobjects/live2d/loader/Live2dFileCallback.js';
import SetValue from './utils/object/SetValue.js';

class Live2dPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        var game = pluginManager.game;

        game.cache.addCustom('live2d');

        // Register new file type to loader
        pluginManager.registerFileType('rexLive2d', Live2dFileCallback);

        //  Register our new Game Object type
        // pluginManager.registerGameObject('rexCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

// SetValue(window, 'RexPlugins.GameObjects.Live2d', Canvas);

export default Live2dPlugin;