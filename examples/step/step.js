import phaser from 'phaser/src/phaser.js';
import StepPlugin from '../../plugins/step-plugin.js';
import FadePlugin from '../../plugins/fade-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.circle(100, 100, 20, 0xffffff)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                gameObject.setPosition(dragX, dragY);
            });

        var stepBehavior =  this.plugins.get('rexStep').add(gameObject, {
            step: 10
        })

        var fadeOutDestroy = this.plugins.get('rexFade').fadeOutDestroy;
        stepBehavior.on('step', function (gameObject, stepBehavior, x, y) {
            var footPrint = this.add.circle(x, y, 10, 0xff0000);
            fadeOutDestroy(footPrint, 2000);
        }, this)

    }

    update() { }
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
        global: [
            {
                key: 'rexStep',
                plugin: StepPlugin,
                start: true
            },
            {
                key: 'rexFade',
                plugin: FadePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);