import phaser from 'phaser/src/phaser.js';
import GesturesPlugin from '../../plugins/gestures-plugin.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneA',
            active: true,
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(400, 300, 'classroom');

        var pinch = this.rexGestures.add.pinch();

        var camera = this.cameras.main;
        var focusWorldX = undefined;
        var focusWorldY = undefined;
        pinch
            .on('drag1', function (pinch) {
                var drag1Vector = pinch.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
            })

            .on('pinchstart', function (pinch) {
                var pointer0 = pinch.pointers[0];
                var pointer1 = pinch.pointers[1];
                focusWorldX = (pointer0.worldX + pointer1.worldX) * 0.5;
                focusWorldY = (pointer0.worldY + pointer1.worldY) * 0.5;
                this.print(`${focusWorldX}\n${focusWorldY}`)
            }, this)

            .on('pinch', function (pinch) {
                camera.zoom *= pinch.scaleFactor;
                camera.preRender();

                var pointer0 = pinch.pointers[0];
                var pointer1 = pinch.pointers[1];
                var focusLocalX = (pointer0.x + pointer1.x) * 0.5;
                var focusLocalY = (pointer0.y + pointer1.y) * 0.5;
                var newWorldXY = camera.getWorldPoint(focusLocalX, focusLocalY);
                camera.scrollX -= (newWorldXY.x - focusWorldX);
                camera.scrollY -= (newWorldXY.y - focusWorldY);
            }, this)

            .on('pinchend', function () {
                focusWorldX = undefined;
                focusWorldY = undefined;
                this.print(`${this.focusWorldX}\n${this.focusWorldY}`)
            }, this)
    }

    print(text, appendMode) {
        var sceneB = this.scene.get('sceneB');

        if (appendMode) {
            text = sceneB.print.text + text;
        }
        sceneB.print.text = text;
    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneB',
            active: true,
        })
    }

    create() {
        this.print = this.add.text(0, 0, '');
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
    scene: [SceneA, SceneB],
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
};

var game = new Phaser.Game(config);