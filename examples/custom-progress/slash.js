import phaser from 'phaser/src/phaser.js';
import CustomProgressPlugin from '../../plugins/customprogress-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var slash = CreateSlash(this, 30, 30)
            .setSize(200, 400)
            .setFillStyle(0xffffff, 1)
            .setPosition(400, 300)

        var graphics = this.add.graphics()
            .lineStyle(2, 0xff0000, 0.5)
            .strokeRectShape(slash.getBounds())

        var gui = new Dat.GUI();
        gui.add(slash, 'value', 0, 1);
    }

    update() { }
}

var Linear = Phaser.Math.Linear;
var Clamp = Phaser.Math.Clamp;
var CreateSlash = function (scene, slashLineWidth, slashSlope) {
    return scene.add.rexCustomProgress({
        type: 'SlashProgress',
        create: [
            { name: 'slash', type: 'lines' },
        ],
        update: function () {
            var slash = this.getShape('slash')
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)

            /*
            x0 - x3
            |    |
            x1 - x2
            */
            var width = this.width,
                height = this.height;
            var startX0 = width + (slashLineWidth / 2);
            var endX0 = 0 + (slashLineWidth / 2);
            var x0 = Linear(startX0, endX0, this.value);
            var x1 = x0 - slashSlope;
            var x2 = x1 + slashLineWidth;
            var x3 = x0 + slashLineWidth;

            x0 = Clamp(x0, 0, width);
            x1 = Clamp(x1, 0, width);
            x2 = Clamp(x2, 0, width);
            x3 = Clamp(x3, 0, width);

            slash
                .startAt(x0, 0)
                .lineTo(x1, height)
                .lineTo(x2, height)
                .lineTo(x3, 0)
                .close()

        },
    })
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
            key: 'CustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);