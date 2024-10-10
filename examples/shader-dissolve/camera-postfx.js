import phaser from 'phaser/src/phaser.js';
import DissolvePipelinePlugin from '../../plugins/dissolvepipeline-plugin.js';

var DissolveMainCamera = function (scene, duration) {
    var postFxPlugin = scene.plugins.get('rexDissolvePipelinePlugin');
    var mainCamera = scene.cameras.main;

    var postFxPipeline = postFxPlugin.add(mainCamera, {
    });

    scene.tweens.add({
        targets: postFxPipeline,
        progress: 1,
        ease: 'Quad',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: duration,
        repeat: 0,            // -1: infinity
        yoyo: false
    })
        .on('complete', function () {
            postFxPlugin.remove(mainCamera);
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
            key: 'rexDissolvePipelinePlugin',
            plugin: DissolvePipelinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);