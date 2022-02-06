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
        console.log(parser.exec('(a > 5) && (a < b)', { a: 10, b: 20 }));
        console.log(parser.exec('(a > 5)? ((b < 10)? (0xf-0xf):(10%3)):(4/2)', { a: 10, b: 20 }));
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