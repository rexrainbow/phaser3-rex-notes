import phaser from 'phaser/src/phaser.js';
import StepPlugin from '../../plugins/step-plugin.js';
import FadePlugin from '../../plugins/fade-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() { }

    preload() { }

    create() {
        this.plugins.get('rexStep').injectMethodsToRootClass();
        this.plugins.get('rexFade').injectMethodsToRootClass();

        this.add.circle(100, 100, 20, 0xffffff)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
            })
            .stepStart(10)
            .on('step.step', function (stepX, stepY) {
                this.add.circle(stepX, stepY, 10, 0xff0000)
                    .fadeOutDestroy(2000)
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