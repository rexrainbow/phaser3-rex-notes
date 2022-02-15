import phaser from '../../../rex-phaser/src/phaser.js';

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
        console.log('Create SceneA')
        this.add.image(400, 300, 'classroom');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneB',
                duration: 6000,
                moveBelow: true,

                onStart(fromScene, toScene, duration) {
                    fromScene.tweens.add({
                        targets: fromScene.cameras.main,
                        alpha: { start: 1, to: 0 },
                        delay: 0,
                        duration: duration * 0.6,
                        repeat: 0,
                    });

                    toScene.tweens.add({
                        targets: toScene.cameras.main,
                        alpha: { start: 0, to: 1 },
                        delay: duration * 0.4,
                        duration: duration * 0.6,
                        repeat: 0,
                    });
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
        console.log('Create SceneB')
        this.add.image(400, 300, 'road');

        this.input.on('pointerdown', function () {
            this.scene.transition({
                target: 'SceneA',
                duration: 3000,
                moveBelow: true,

                onStart(fromScene, toScene, duration) {
                    fromScene.tweens.add({
                        targets: fromScene.cameras.main,
                        scrollX: { start: 0, to: -800 },
                        duration: duration,
                        repeat: 0,
                    });

                    toScene.tweens.add({
                        targets: toScene.cameras.main,
                        scrollX: { start: 800, to: 0 },
                        duration: duration,
                        repeat: 0,
                    });
                }
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