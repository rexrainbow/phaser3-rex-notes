import phaser from 'phaser/src/phaser.js';
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

        // Round-rectangle with stroke, horizontal gradient
        this.add.rexRoundRectangleCanvas(100, 300, 100, 100, 30, 0x008888, 0x880000, 2, 0x001111);
        // Round-rectangle with stroke, vertical gradient
        this.add.rexRoundRectangleCanvas(250, 300, 100, 100, 30, 0x008888, 0x880000, 2, 0x001111, false);
        // Rhombus
        this.add.rexRoundRectangleCanvas(400, 300, 100, 100, {
            radius: 50,
            iteration: 0
        }, 0x008888, 0x880000, 4, 0x001111);
        // Octagon
        this.add.rexRoundRectangleCanvas(550, 300, 100, 100, {
            radius: 30,
            iteration: 0
        }, 0x008888, 0x880000, 4, 0x001111);
        // Round-rectangle with stroke, custom gradient
        var fillStyle = function (canvas, context) {
            var grd = context.createRadialGradient(40, 40, 5, 60, 60, 90);
            grd.addColorStop(0, '#008888');
            grd.addColorStop(1, '#001111');
            return grd;
        }
        this.add.rexRoundRectangleCanvas(700, 300, 100, 100, 30, fillStyle, 0x880000, 2);
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