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
            setTimeout(successCallback, 1500);
        });

        // Loading task
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2000);
        });

        // Loading task
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2500);
        });

        this.plugins.get('rexLoadingAnimationScene').startScene(this, 'loading-animation',
            function (successCallback, animationScene) {
                animationScene.onClose(successCallback);
            }
        );
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

    create() {
        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });

        this.tweens.add({
            targets: spinner,
            scale: { start: 0, to: 1 },
            duration: 500
        })

        spinner.on('destroy', function () {
            console.log('spinner is destroyed')
        })

        var scene = this;
        this.onClose = function (onComplete) {
            scene.tweens.add({
                targets: spinner,
                scale: 0,
                duration: 500,
                onComplete: onComplete
            })
        }
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