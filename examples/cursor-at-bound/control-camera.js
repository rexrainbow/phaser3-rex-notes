import CursorAtBoundPlugin from 'rexPlugins/cursoratbound-plugin.js';

const Random = Phaser.Math.Between;

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
        DrawSomethings(this);

        this.cursorAtBounds = this.plugins.get('rexCursorAtBound').add(this, {
            sensitiveDistance: 20,
            // bounds: new Phaser.Geom.Rectangle(x, y, width, height)
        });

        var cursors = this.cursorAtBounds.createCursorKeys();
        this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
            camera: this.cameras.main,

            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: null,
            zoomOut: null,

            acceleration: 0.06,
            drag: 0.003,
            maxSpeed: 0.5
        });

        this.print = this.add.text(0, 0, '').setScrollFactor(0);
    }

    update(time, delta) {
        var camera = this.cameras.main;
        this.print.text = camera.x + ',' + camera.y;
        var cursorKeys = this.cursorAtBounds.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';

        this.cameraController.update(delta);
        var camera = this.cameras.main;
        s += camera.scrollX + ',' + camera.scrollY;

        this.print.text = s;
    }
}

var DrawSomethings = function (scene) {
    for (var i = 0; i < 500; i++) {
        scene.add.circle(Random(-1000, 1000), Random(-1000, 1000), Random(10, 100), Random(0, 0xffffff), 0.5);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCursorAtBound',
            plugin: CursorAtBoundPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);