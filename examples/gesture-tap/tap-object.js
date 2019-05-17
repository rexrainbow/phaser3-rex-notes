import GesturesPlugin from '../../plugins/gestures-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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
        this.input.addPointer(9);

        var zone = this.add.zone(0, 0, 800, 600).setOrigin(0);
        this.rexGestures.add.tap(zone, { taps: 1 })
            .on('tap', function (tap) {
                createObject(this, tap.worldX, tap.worldY);
            }, this);
    }
}

var createObject = function (scene, x, y) {
    var gameObject = scene.add.rectangle(
        x, y,
        100, 100,
        COLOR_DARK
    )
        .setStrokeStyle(1, COLOR_LIGHT);

    scene.rexGestures.add.tap(gameObject, { taps: 2 })
        .on('tap', function (tap) {
            var gameObject = tap.gameObject;
            var curColor = gameObject.fillColor;
            var newColor = (curColor === COLOR_DARK) ? COLOR_PRIMARY : COLOR_DARK;
            gameObject.setFillStyle(newColor);
        });

    return gameObject;
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
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);