import phaser from '../../../phaser/src/phaser.js';
import RoundrRctanglePlugin from '../../plugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rexRoundRectangle(400, 300, 100, 100, 30, 0x008888)
            .setStrokeStyle(2, 0x00ff00, 1)

        gameObject
            .enableFilters()
            .filters.internal.addShadow(-2, -2, 0.1, 1, 0xff0000, 2, 1)
            .setPaddingOverride(null)
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
        global: [{
            key: 'rexRoundrRctangle',
            plugin: RoundrRctanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);