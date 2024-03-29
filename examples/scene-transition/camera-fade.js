import phaser from 'phaser/src/phaser.js';

class BaseScene extends Phaser.Scene {
    setupTransition() {
        this.events.on('transitionout', function (toScene, duration) {
            var fromScene = this;
            var fromSceneCamera = fromScene.cameras.main
            fromSceneCamera.fadeOut(duration / 2);
            fromScene.time.delayedCall(duration / 2, function () {
                fromSceneCamera.setVisible(false);
            });

            var toSceneCamera = toScene.cameras.main;
            toSceneCamera.setVisible(false);
            this.time.delayedCall(duration / 2, function () {
                toSceneCamera.setVisible(true);
                toSceneCamera.fadeIn(duration / 2);
            });
        }, this);

        this.events.on('transitioncomplete', function () {
            var sceneKey = this.sys.config.key;
            console.log(`${sceneKey} transition complete`);
        }, this);
    }
}

class SceneA extends BaseScene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.setupTransition();
        console.log('Create SceneA')
        this.add.image(400, 300, 'classroom');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneB',
                duration: 6000,
                moveBelow: true
            });
        }, this)
    }

    update() {

    }
}

class SceneB extends BaseScene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        this.setupTransition();
        console.log('Create SceneB')
        this.add.image(400, 300, 'road');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneA',
                duration: 3000,
                moveBelow: true
            });
        }, this)
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: [SceneA, SceneB]
};

var game = new Phaser.Game(config);