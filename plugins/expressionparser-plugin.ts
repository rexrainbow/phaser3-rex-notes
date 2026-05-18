import ExpressionParser from './expressionparser';
import Compile from './math/expressionparser/utils/Complile';
import CreateProxyContext from './utils/proxy/createproxycontext/CreateProxyContext';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class ExpressionParserPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ExpressionParser();
    }

    compile(expression?: any) {
        return Compile(expression);
    }

    createProxyContext(config?: any, baseContext?: any) {
        return CreateProxyContext(config, baseContext);
    }
}

SetValue(window, 'RexPlugins.ExpressionParser', ExpressionParser);

export default ExpressionParserPlugin;