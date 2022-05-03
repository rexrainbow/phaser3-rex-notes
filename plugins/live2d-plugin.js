import Factory from './gameobjects/live2d/gameobject/Factory.js';
import Creator from './gameobjects/live2d/gameobject/Creator.js';
import Live2dGameObject from './gameobjects/live2d/gameobject/Live2dGameObject.js';
import Live2dCoreFileCallback from './gameobjects/live2d/loader/core/CoreScriptFileCallback.js';
import Live2dFileCallback from './gameobjects/live2d/loader/model/Live2dFileCallback.js';
import SetValue from './utils/object/SetValue.js';

class Live2dPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        var game = pluginManager.game;

        var isWebGL = (game.config.renderType === 2);

        if (!isWebGL) {
            console.error('Live2d can\'t run in CANVAS render mode.')
            return;
        }

        game.cache.addCustom('live2d');


        // Register new file type to loader, to load live2d core script file (live2dcubismcore.min.js)
        pluginManager.registerFileType('rexLive2dCoreScript', Live2dCoreFileCallback);

        // Register new file type to loader, to load live2d model assets
        pluginManager.registerFileType('rexLive2d', Live2dFileCallback);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLive2d', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Live2d', Live2dGameObject);

export default Live2dPlugin;