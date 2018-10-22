import RoundrRctanglePlugin from 'rexPlugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var graphics = this.add.graphics({
                fillStyle: {
                    color: 0xffffff,
                    alpha: 1
                }
            })
            .setDepth(1);

        this.add.rexRoundRectangle(200, 300, 100, 100, undefined, 0x880000);
        this.add.rexRoundRectangle(400, 300, 100, 100, 20, 0x000088);
        this.add.rexRoundRectangle(600, 300, undefined, undefined, 50, 0x008800);

        graphics
            .fillPoint(200, 300, 10)
            .fillPoint(400, 300, 10)
            .fillPoint(600, 300, 10);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRoundrRctangle',
            plugin: RoundrRctanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);