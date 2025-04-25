import phaser from 'phaser/src/phaser.js';
import AwaitComlinkLoaderPlugin from '../../plugins/awaitcomlinkloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples',

            // load comlink api before preload stage
            pack: {
                files: [
                    {
                        'type': 'script',
                        'key': 'comlink',
                        'url': 'https://unpkg.com/comlink/dist/umd/comlink.js'
                    },
                    {
                        'type': 'text',
                        'key': 'worker-code',
                        'url': './examples/awaitcomlinkloader/worker-code.js'
                    }
                ]
            }
        })
    }

    preload() {
        var textObject = this.add.text(0, 0, 'Preload\n');

        var workerCode = this.cache.text.get('worker-code');
        console.log('preload');
        this.load.rexAwaitComlink({
            workerCode: workerCode,

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