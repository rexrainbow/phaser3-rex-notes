import phaser from 'phaser/src/phaser.js';
import ExpressionParserPlugin from '../../plugins/expressionparser-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        });
    }

    preload() { }

    create() {
        var parser = this.plugins.get('rexExpressionParser').add();

        var expression = "你好== 世界";
        var f = parser.compile(expression);

        var context = {
            你好: 1,
            世界: 1,
            蘋果: {
                個數: 3,
                價錢: 10
            }
        }
        console.log(f(context));

        context.世界 = 2;
        console.log(f(context));

        // dot-notation
        var expression = "蘋果.個數*蘋果.價錢";
        var f = parser.compile(expression);
        console.log(f(context));
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexExpressionParser',
            plugin: ExpressionParserPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);