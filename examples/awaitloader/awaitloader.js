import phaser from 'phaser/src/phaser.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.print = this.add.text(0, 0, 'Preload\n');

        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1000);
        });
    }

    create() {
        this.print.setText(this.print.text + 'Create\n');
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
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);