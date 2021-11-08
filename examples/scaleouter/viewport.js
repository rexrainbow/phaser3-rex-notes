import 'phaser';
import ScaleOuterPlugin from '../../plugins/scaleouter-plugin.js';

class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })
    }

    preload() {

    }

    create() {
        var graphics = this.add.graphics();
        this.scale.on('resize', function () {
            var innerViewport = this.rexScaleOuter.innerViewport;
            var outerViewport = this.rexScaleOuter.outerViewport;
            graphics
                .clear()
                .lineStyle(10, 0x00ff00)
                .strokeRectShape(innerViewport)
                .lineStyle(10, 0xff0000)
                .strokeRectShape(outerViewport)
        }, this);

    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x333333,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NONE,
    },
    scene: Game,
    plugins: {
        scene: [{
            key: 'rexScaleOuter',
            plugin: ScaleOuterPlugin,
            mapping: 'rexScaleOuter'
        }]
    }
};

var game = new Phaser.Game(config);