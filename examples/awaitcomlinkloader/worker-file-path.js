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

        console.log('preload');
        this.load.rexAwaitComlink({
            // load comlink api before start worker
            // comlink: './assets/comlink/comlink.js',

            workerFilePath: './examples/awaitcomlinkloader/worker.js',

            data: {
                a: 10, b: 20
            },

            async onBegin(data) {
                console.log('onBegin', data);
                textObject.text += `a=${data.a}, b=${data.b}\n`;
                await new Promise(function (resolve, reject) {
                    setTimeout(resolve, 1000);
                });
            },

            async onBeforeWorker(data) {
                console.log('onBeforeWorker', data);
                await new Promise(function (resolve, reject) {
                    setTimeout(resolve, 1000);
                });
            },

            async onAfterWorker(data) {
                console.log('onAfterWorker', data);
                await new Promise(function (resolve, reject) {
                    setTimeout(resolve, 1000);
                });
            },

            async onEnd(data) {
                console.log('onEnd', data);
                textObject.text += `a=${data.a}, b=${data.b}\n`;
                await new Promise(function (resolve, reject) {
                    setTimeout(resolve, 1000);
                });
            }
        })

        this.print = textObject;
    }

    create() {
        console.log('create');
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