import CanvasInputFactory from './gameobjects/dynamictext/canvasinput/Factory';
import CanvasInputCreator from './gameobjects/dynamictext/canvasinput/Creator.js';
import CanvasInput from './gameobjects/dynamictext/canvasinput/CanvasInput.js';

import SingleLineInputFactory from './gameobjects/dynamictext/singlelineinput/Factory.js';
import SingleLineInputCreator from './gameobjects/dynamictext/singlelineinput/Creator.js';
import SingleLineInput from './gameobjects/dynamictext/singlelineinput/SingleLineInput.js';

import SetValue from './utils/object/SetValue.js';

class CanvasInputPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvasInput', CanvasInputFactory, CanvasInputCreator);
        pluginManager.registerGameObject('rexSingleLineInput', SingleLineInputFactory, SingleLineInputCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.CanvasInput', CanvasInput);
SetValue(window, 'RexPlugins.GameObjects.SingleLineInput', SingleLineInput);

export default CanvasInputPlugin;