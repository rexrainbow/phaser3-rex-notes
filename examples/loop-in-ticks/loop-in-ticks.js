import LoopInTicksPlugin from '../../plugins/loopinticks-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.plugins.get('rexLoopInTicksPlugin').add(this)
            .addNumberLoop('y', 0, 3)
            .addNumberLoop('x', 0, 3)
            .setCallback(function (loopIndexes, loopInTicks) {
                console.log(`${Math.floor(loopInTicks.progress * 100)} x:${loopIndexes.x}, y:${loopIndexes.y}`);
            })
            .once('complete', function () {
                console.log('complete')
            })
            .start();
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLoopInTicksPlugin',
            plugin: LoopInTicksPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);