import phaser from 'phaser/src/phaser.js';
import LoadingProgressPlugin from '../../plugins/loadingprogress-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var ui = CreateKnob(this, 400, 300).layout();
        this.plugins.get('rexLoadingProgress').add(ui, {
            transitIn: function (gameObject) {
                // Return a promise
                return gameObject.popUpPromise(300);
            },

            transitionOut: function (gameObject) {
                // Return a promise
                return gameObject.scaleDownDestroyPromise(300);
            },

            progress: function (gameObject, progress) {
                // Present progress changing
                gameObject.setValue(progress);
            }
        });
        // ui will be destroyed after loading completed

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateKnob = function (scene, x, y) {
    return scene.rexUI.add.knob({
        x: x, y: y,
        width: 300, height: 300,

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
            space: {
                icon: 10
            }
        }),
        textFormatCallback: function (value) {
            return Math.floor(value * 100).toString();
        },

        input: 'none'
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
            key: 'rexLoadingProgress',
            plugin: LoadingProgressPlugin,
            start: true
        }],
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);