import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('volume', './assets/images/volume.png');
    }

    create() {
        var knob0 = CreateKnob(this, 200, 300, 'pan').layout();
        var print0 = this.add.text(0, 0, '');
        knob0
            .on('valuechange', function (value) { print0.text = value; })
            .setValue(0.5);
        this.add.text(0, 580, 'Pan this knob');

        var knob1 = CreateKnob(this, 600, 300, 'click').layout();
        var print1 = this.add.text(400, 0, '');
        knob1
            .on('valuechange', function (value) { print1.text = value; })
            .setValue(0.5);
        this.add.text(400, 580, 'Click this knob');
    }

    update() { }
}

var CreateKnob = function (scene, x, y, inputMode) {
    return scene.rexUI.add.knob({
        x: x, y: y,
        width: 200, height: 200,

        space: { left: 20, right: 20, top: 20, bottom: 20 },

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(1, COLOR_LIGHT),

        trackColor: COLOR_DARK,
        barColor: COLOR_LIGHT,
        // centerColor: COLOR_PRIMARY,
        // anticlockwise: true,

        text: scene.rexUI.add.label({
            text: scene.add.text(0, 0, '', {
                fontSize: '30px',
            }),
            icon: scene.add.image(0, 0, 'volume'),
            space: {
                icon: 10
            }
        }),
        textFormatCallback: function (value) {
            return Math.floor(value * 100).toString();
        },

        easeValue: { duration: 250 },
        input: inputMode
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);