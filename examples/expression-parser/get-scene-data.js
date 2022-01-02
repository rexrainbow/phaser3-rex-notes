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

        var expression = "scene.data.get('coin') > 0";
        var f = parser.compile(expression);

        var context = {
            scene: this
        }
        this.data.set('coin', 3);
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