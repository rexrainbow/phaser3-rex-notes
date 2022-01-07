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

        var expression = "($a._b_.__c + d.e.f)*0.5";
        var f = parser.compile(expression);
        
        var context = {
            $a: {
                _b_: {
                    __c: 10
                }
            },
            d: {
                e: {
                    f: 20
                }
            }
        }
        console.log(f(context));
        
        context.$a._b_.__c = 100;
        context.d.e.f = 200;
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