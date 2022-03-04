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
            this.load.on('progress', function (progress) {
                var loader = this.load;
                var total = loader.totalToLoad - 1;
                var remainder = loader.list.size + loader.inflight.size - 1;
                var myProgress = 1 - (remainder / total);
                this.print.text += `${Math.floor(progress * 100)}% vs ${Math.floor(myProgress * 100)}%\n`;
                if (myProgress === 1) {
                    this.print.text += 'Complete\n';
                    successCallback();
                }
            }, this);
        }, this);

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
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
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);