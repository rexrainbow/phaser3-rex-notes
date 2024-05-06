import phaser from 'phaser/src/phaser.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'Demo'
        })
    }

    preload() {
        AddLoadingAnimation(this);

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
    }

    loadingAnimation() {
        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });

        this.load.once('complete', function (loader) {
            spinner.destroy();
        });
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }
}

var AddLoadingAnimation = function (scene) {
    var spinner = scene.rexSpinner.add.facebook({
        x: 400, y: 300,
        width: 200, height: 200
    }).setDepth(100);

    scene.load.once('complete', function (loader) {
        spinner.destroy();
    });
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }],
        scene: [{
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);