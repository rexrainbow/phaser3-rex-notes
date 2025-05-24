import phaser from '../../../phaser/src/phaser.js';
import CameraControllerPlugin from '../../plugins/cameracontroller-plugin.js';

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
        var controller = this.plugins.get('rexCameraController').add(this, {
        });

        var pointer0GO = this.add.rectangle(0, 0, 40, 40, 0xff0000).setVisible(false);
        var pointer1GO = this.add.rectangle(0, 0, 40, 40, 0xff0000).setVisible(false);
        var midPointerGO = this.add.rectangle(0, 0, 40, 40, 0x00ff00).setVisible(false);
        var camera = this.cameras.main;
        var pinch = controller.pinchZoom.pinch;
        var pointers = pinch.pointers;
        pinch
            .on('pinchstart', function () {
                pointer0GO.setVisible(true);
                pointer1GO.setVisible(true);
                midPointerGO.setVisible(true);
            })
            .on('pinchend', function () {
                pointer0GO.setVisible(false);
                pointer1GO.setVisible(false);
                midPointerGO.setVisible(false);
            })
            .on('pinch', function () {
                pointer0GO.setScale(1 / camera.zoom).setPosition(pointers[0].worldX, pointers[0].worldY);
                pointer1GO.setScale(1 / camera.zoom).setPosition(pointers[1].worldX, pointers[1].worldY);
                midPointerGO.setScale(1 / camera.zoom).setPosition((pointer0GO.x + pointer1GO.x) * 0.5, (pointer0GO.y + pointer1GO.y) * 0.5);
            });

    }

    update() {
        // var camera = this.cameras.main;
        // this.print(`${camera.scrollX}\n${camera.scrollY}\n${camera.zoom}`)
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
        global: [
            {
                key: 'rexCameraController',
                plugin: CameraControllerPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);