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
        /*
        var context = new Proxy({}, {
            has(target, key) {
                return data.has(key);
            },
            get(target, key) {
                return data.get(key);
            }
        })
        */
        var context = this.plugins.get('rexExpressionParser').createProxyContext({
            has(target, key) {
                console.log(`has handler : ${key}`)
                return data.has(key);
            },
            get(target, key) {
                console.log(`get handler : ${key}`)
                return data.get(key);
            }
        })
        this.data.set('coin', 3);
        console.log(f(context));

        // Test dot-notation
        this.data.set('data', { value: { a: 10, b: 20 } });
        console.log(parser.exec('data.value', context));
        console.log(parser.exec('data.value.a', context));
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