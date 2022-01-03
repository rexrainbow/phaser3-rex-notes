import 'phaser';
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

        var expression = 'coin > 0';
        var f = parser.compile(expression);

        var data = this.data;
        var context = new Proxy({}, {
            has(target, key) {
                return data.has(key);
            },
            get: function (target, prop) {
                return data.get(prop);
            }
        })
        this.data.set('coin', 3);
        console.log(f(context));

        // Test dot-notation
        this.data.set('data', { value: 10 });
        console.log(parser.exec('data.value', context));
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