import phaser from 'phaser/src/phaser.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';
import LoadingAnimationScenePlugin from '../../plugins/loadinganimationscene-plugin.js';

class Main extends Phaser.Scene {
    constructor() {
        super({
            key: 'main'
        })
    }

    preload() {
        // Loading task
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        // Loading task
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1000);
        });
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1500);
        });
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2000);
        });
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2500);
        });


        this.scene.launch('loading-animation', { mainScene: this })
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() { }
}

class LoadingAnimation extends Phaser.Scene {
    constructor() {
        super({
            key: 'loading-animation'
        })
    }

    preload() { }

    create(data) {
        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });
        this.tweens.add({
            targets: spinner,
            scale: { start: 0, to: 1 },
            duration: 500
        })

        var progressBar = this.add.rectangle(0, 500, 800, 10, 0x880000).setOrigin(0, 0.5)

        this.plugins.get('rexLoadingAnimationScene').startScene(
            data.mainScene,
            'loading-animation',
            function (successCallback, animationScene) {
                animationScene.tweens.add({
                    targets: spinner,
                    scale: 0,
                    duration: 500,
                    onComplete: successCallback
                })
            },
            function (progress, animationScene) {
                console.log(progress)
                progressBar.scaleX = progress;
            }
        );
    }

    update() { }
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
    scene: [Main, LoadingAnimation],
    plugins: {
        global: [
            {
                key: 'rexLoadingAnimationScene',
                plugin: LoadingAnimationScenePlugin,
                start: true
            }
        ],
        scene: [{
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);