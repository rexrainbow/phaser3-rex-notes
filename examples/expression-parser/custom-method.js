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
        // Solution 1:
        var parser = this.plugins.get('rexExpressionParser').add();
        parser.randomInt = function (a, b) {
            return Math.floor(Math.random() * (b - a) + a);
        };
        var f = parser.compile("randomInt(a, b)");
        var context = { a: 10, b: 20 };
        console.log('Solution 1:');
        for (var i = 0; i < 5; i++) {
            console.log(i, f(context));
        }

        // Solution 2:
        class MyParser extends RexPlugins.ExpressionParser {
            randomInt(a, b) {
                return Math.floor(Math.random() * (b - a) + a);
            }
        }
        var parser = new MyParser();
        var f = parser.compile("randomInt(a, b)");
        var context = { a: 10, b: 20 };
        console.log('Solution 2:');
        for (var i = 0; i < 5; i++) {
            console.log(i, f(context));
        }

        // Solution 3:
        var parser = this.plugins.get('rexExpressionParser').add();
        var f = parser.compile("randomInt(a, b)");
        var context = {
            randomInt(a, b) {
                return Math.floor(Math.random() * (b - a) + a);
            },
            a: 10,
            b: 20
        }
        console.log('Solution 3:');
        for (var i = 0; i < 5; i++) {
            console.log(i, f(context));
        }
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