import CursorAtBoundPlugin from '../../plugins/cursoratbound-plugin.js';
import MouseWheelToUpDownPlugin from '../../plugins/mousewheeltoupdown-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        this.cameras.main.setBounds(-1000, -1000, 2000, 2000);

        DrawSomethings(this);

        this.cursorAtBounds = this.plugins.get('rexCursorAtBound').add(this, {
            sensitiveDistance: 20,
            // bounds: new Phaser.Geom.Rectangle(x, y, width, height)
        });
        this.mouseWheelToUpDown = this.plugins.get('rexMouseWheelToUpDown').add(this);

        var cursorKeys = this.cursorAtBounds.createCursorKeys();
        var zoomKeys = this.mouseWheelToUpDown.createCursorKeys();
        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            camera: this.cameras.main,

            left: cursorKeys.left,
            right: cursorKeys.right,
            up: cursorKeys.up,
            down: cursorKeys.down,
            zoomIn: zoomKeys.down,
            zoomOut: zoomKeys.up,

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.3,
            zoomSpeed: 0.05
        });
    }

    update(time, delta) {
        this.cameraController.update(delta);
    }
}

const Random = Phaser.Math.Between;
var DrawSomethings = function (scene) {
    var bounds = scene.cameras.main._bounds; // TODO: getBounds()
    var left = bounds.left,
        right = bounds.right,
        top = bounds.top,
        bottom = bounds.bottom;
    for (var i = 0; i < 500; i++) {
        scene.add.circle(
            Random(left, right), Random(top, bottom), // x, y
            Random(10, 100), // r
            Random(0, 0xffffff), // color
            0.5 // alpha
        );
    }
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
                key: 'rexCursorAtBound',
                plugin: CursorAtBoundPlugin,
                start: true
            },
            {
                key: 'rexMouseWheelToUpDown',
                plugin: MouseWheelToUpDownPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);