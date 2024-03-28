import phaser from 'phaser/src/phaser.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';
import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

// Extend scene from this BaseScene
class BaseScene extends Phaser.Scene {
    create() {
        this._preload();
        if (this.load.list.size + this.load.inflight.size > 0) {
            this._loadAnimation(this._create.bind(this));
            this.load.start();
        } else {
            this._create();
        }
    }

    _preload() { }

    _loadAnimation(onComplete) {
        this.load.once('complete', function (loader) {
            if (onComplete) {
                onComplete();
            }
        });
    }

    _create() { }
}

class Demo extends BaseScene {
    constructor() {
        super({
            key: 'Demo'
        })
    }

    _preload() {
        console.log('_preload()')

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

    _loadAnimation(onComplete) {
        console.log('_loadAnimation()')

        // loading animation
        var spinner = this.rexSpinner.add.facebook({
            x: 400, y: 300,
            width: 200, height: 200
        });
        this.tweens.add({
            targets: spinner,
            scale: { start: 0, to: 1 },
            duration: 500
        });

        // loading progress bar
        var progressBar = this.add.rectangle(0, 500, 800, 10, 0x880000).setOrigin(0, 0.5)
        this.load.on('progress', function (progress) {
            console.log('_loadAnimation().progress', progress)

            progressBar.scaleX = progress;
        });

        this.load.once('complete', function (loader) {
            this.tweens.add({
                targets: spinner,
                scale: 0,
                duration: 500,
                onComplete: function () {
                    spinner.destroy();
                    progressBar.destroy();
                    if (onComplete) {
                        onComplete();
                    }
                }
            })
        }, this);
    }

    _create() {
        console.log('_create()')

        this.add.image(400, 300, 'classroom');
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