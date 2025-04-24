import phaser from 'phaser/src/phaser.js';
import AwaitComlinkLoaderPlugin from '../../plugins/awaitcomlinkloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples',

            // load comlink api before preload stage
            pack: {
                files: [{
                    'type': 'script',
                    'key': 'comlink',
                    'url': './assets/comlink/comlink.js'
                }]
            }
        })
    }

    preload() {
        var textObject = this.add.text(0, 0, 'Preload\n');

        this.load.rexAwaitComlink({
            // load comlink api before start worker
            // comlink: './assets/comlink/comlink.js',

            worker: './examples/awaitcomlinkloader/worker.js',

            payload: {
                a: 10, b: 20
            },

            onBeforeWorker(payload) {
                textObject.text += `a=${payload.a}, b=${payload.b}\n`
            },

            onAfterWorker(payload) {
                textObject.text += `a=${payload.a}, b=${payload.b}\n`
            }
        })

        this.print = textObject;
    }

    create() {
        this.print.text += 'Create\n';
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexAwaitComlinkLoader',
            plugin: AwaitComlinkLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);