import phaser from 'phaser/src/phaser.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';
import EventPromisePlugin from '../../plugins/eventpromise-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.print = this.add.text(0, 0, 'Preload\n');

        var scene = this;
        var WaitEvent = this.plugins.get('rexEventPromise').waitEvent;
        this.load.rexAwait(async function (successCallback, failureCallback) {
            var loader = scene.load;
            var myprogress = 0;
            while (myprogress < 1) {
                await WaitEvent(loader, 'progress');

                var total = loader.totalToLoad - 1;
                var remainder = loader.list.size + loader.inflight.size - 1;
                myprogress = 1 - (remainder / total);

                scene.print.text += `${Math.floor(loader.progress * 100)}% vs ${Math.floor(myprogress * 100)}%\n`;
            }

            scene.print.text += 'Complete\n';
            successCallback();
        });

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
        global: [
            {
                key: 'rexAwaitLoader',
                plugin: AwaitLoaderPlugin,
                start: true
            },
            {
                key: 'rexEventPromise',
                plugin: EventPromisePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);