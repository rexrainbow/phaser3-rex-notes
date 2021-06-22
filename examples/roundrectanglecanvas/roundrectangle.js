import 'phaser';
import RoundrRctangleCanvasPlugin from '../../plugins/roundrectanglecanvas-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Rectangle
        this.add.rexRoundRectangleCanvas(100, 150, 100, 100, 0, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangleCanvas(250, 150, 100, 100, 30, 0x008888);
        // Circle
        this.add.rexRoundRectangleCanvas(400, 150, 100, 100, 50, 0x008888);
        // Round-rectangle with stroke
        this.add.rexRoundRectangleCanvas(550, 150, 100, 100, 30, 0x008888, 0x880000, 2);
        // Round-rectangle with stroke
        this.add.rexRoundRectangleCanvas(700, 150, 100, 100, 30, 0x008888, 0x880000, 2, 0x001111);

        // Rhombus
        this.add.rexRoundRectangleCanvas(100, 300, 100, 100, {
            radius: 50,
            iteration: 0
        }, 0x008888, 0x880000, 4, 0x001111);
        // Octagon
        this.add.rexRoundRectangleCanvas(250, 300, 100, 100, {
            radius: 30,
            iteration: 0
        }, 0x008888, 0x880000, 4, 0x001111);
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
            key: 'rexRoundrRctangleCanvasPlugin',
            plugin: RoundrRctangleCanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);