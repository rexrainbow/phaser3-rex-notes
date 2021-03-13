import ExpressionParser from './expressionparser.js';
import SetValue from './utils/object/SetValue.js';

class ExpressionParserPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ExpressionParser();
    }
}

SetValue(window, 'RexPlugins.ExpressionParser', ExpressionParser);

export default ExpressionParserPlugin;