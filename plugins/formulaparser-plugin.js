import FormulaParser from './formulaparser.js';
import SetValue from './utils/object/SetValue.js';

class FormulaParserPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new FormulaParser();
    }
}

SetValue(window, 'RexPlugins.FormulaParser', FormulaParser);

export default FormulaParserPlugin;