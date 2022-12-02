import phaser from 'phaser/src/phaser.js';
import TrianglePlugin from '../../plugins/triangle-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var triangle = this.add.rexTriangle(400, 300, 100, 100, 0x888888)
            .setRadius(1);

        var graphics = this.add.graphics({
            lineStyle: {
                width: 1, color: 0xff0000, alpha: 1
            }
        })
            .strokeRectShape(triangle.getBounds())

        var gui = new Dat.GUI();
        gui.add(triangle, 'verticeAngle', 0, 360);
        gui.add(triangle, 'radius', 0, 1);
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
            key: 'rexTriangle',
            plugin: TrianglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);