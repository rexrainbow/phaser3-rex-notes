import phaser from '../../../phaser/src/phaser.js';
import DisolveFilterPlugin from '../../plugins/dissolvefilter-plugin.js';

var DissolveMainCamera = function (scene, duration) {
    var camera = scene.cameras.main;

    /*
    var controller = scene.plugins.get('rexDisolveFilter').add(camera, {
    })
    */
    var controller = camera
        .filters.internal.addRexDissolve();

    scene.tweens.add({
        targets: controller,
        progress: 1,
        ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: duration,
        repeat: 0,            // -1: infinity
        yoyo: false
    })
        .on('complete', function () {
            scene.plugins.get('rexDisolveFilter').remove(camera);
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
    plugins: {
        global: [{
            key: 'rexDisolveFilter',
            plugin: DisolveFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);