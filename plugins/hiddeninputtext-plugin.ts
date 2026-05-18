import HiddenInputText from './behaviors/hiddentextedit/HiddenTextEdit';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class HiddenInputTextPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(textObject?: any, config?: any) {
        return new HiddenInputText(textObject, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.HiddenInputText', HiddenInputText);

export default HiddenInputTextPlugin;