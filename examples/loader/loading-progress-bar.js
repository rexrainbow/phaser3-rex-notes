import phaser from 'phaser/src/phaser.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';
import EventPromisePlugin from '../../plugins/eventpromise-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var scene = this;
        var WaitEvent = this.plugins.get('rexEventPromise').waitEvent;
        this.load.rexAwait(async function (successCallback, failureCallback) {
            // Create progress bar
            var ui = CreateKnob(scene, 400, 300).layout();

            // Wait popup
            await ui.popUpPromise(300);

            var progress = GetProgress(scene);
            if (progress < 1) {
                // Present loading progress
                while (progress < 1) {
                    await WaitEvent(scene.load, 'progress');

                    progress = GetProgress(scene);
                    ui.setValue(progress);
                }
            } else {
                // Progress is 1 already
                ui.setValue(1);
            }

            // Wait scale down
            await ui.scaleDownDestroyPromise(300);

            // Finish this loading task, goto create stage
            successCallback();
        });

        LoadOtherAssets(this);
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() { }
}

var GetProgress = function (scene) {
    var loader = scene.load;
    var total = loader.totalToLoad - 1;
    var remainder = loader.list.size + loader.inflight.size - 1;
    var progress = 1 - (remainder / total);
    return progress;
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateKnob = function (scene, x, y) {
    return scene.rexUI.add.knob({
        x: x, y: y,
        width: 300, height: 300,

        space: { left: 20, right: 20, top: 20, bottom: 20 },

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(1, COLOR_LIGHT),

        trackColor: COLOR_DARK,
        barColor: COLOR_LIGHT,
        // centerColor: COLOR_PRIMARY,
        // anticlockwise: true,

        text: scene.rexUI.add.label({
            text: scene.add.text(0, 0, '', {
                fontSize: '30px',
            }),
            space: {
                icon: 10
            }
        }),
        textFormatCallback: function (value) {
            return Math.floor(value * 100).toString();
        },

        input: 'none'
    })
}

var LoadOtherAssets = function (scene) {
    scene.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    scene.load.image('road', 'assets/images/backgrounds/road.png');

    // Add more delay
    scene.load.rexAwait(function (successCallback, failureCallback) {
        setTimeout(successCallback, 1000);
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
        ],
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);