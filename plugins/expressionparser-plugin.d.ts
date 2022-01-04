import ExpressionParser from './expressionparser';
import Compile from './math/expressionparser/Compile';

export default class ExpressionParserPlugin extends Phaser.Plugins.BasePlugin {
    add(): ExpressionParser;

    compile: typeof Compile;
}