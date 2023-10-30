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

        // Loading task
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1500);
        });

        // Loading task
        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2000);
        });

        this.plugins.get('rexLoadingAnimationScene').startScene(this, 'loading-animation');
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
        this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });
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