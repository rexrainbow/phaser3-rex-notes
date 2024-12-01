import phaser from '../../../phaser/src/phaser.js';
import { DisolveFilter, DissolveController } from '../../plugins/dissolvefilter.js';

var DissolveMainCamera = function (scene, duration) {
    if (!scene.renderer.renderNodes.hasNode(DisolveFilter.FilterName)) {
        scene.renderer.renderNodes.addNodeConstructor(DisolveFilter.FilterName, DisolveFilter);
    }

    var filterList = scene.cameras.main.filters.internal;
    var controller = filterList.add(
        new DissolveController(filterList.camera)
    )


    scene.tweens.add({
        targets: controller,
        progress: 1,
        ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: duration,
        repeat: 0,            // -1: infinity
        yoyo: false
    })
        .on('complete', function () {
            filterList.remove(controller);
        })
}

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        console.log('Create SceneA');
        this.add.image(400, 300, 'classroom');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneB',
                duration: 2000,
                moveBelow: true,

                onStart(fromScene, toScene, duration) {
                    DissolveMainCamera(fromScene, duration);
                }
            });
        }, this)
    }

    update() {
    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        console.log('Create SceneB');
        this.add.image(400, 300, 'road');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneA',
                duration: 2000,
                moveBelow: true,

                onStart(fromScene, toScene, duration) {
                    DissolveMainCamera(fromScene, duration);
                }
            });
        }, this)
    }

    update() {
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
};

var game = new Phaser.Game(config);