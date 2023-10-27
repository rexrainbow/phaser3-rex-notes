import phaser from 'phaser/src/phaser.js';
import LoadingProgressPlugin from '../../plugins/loadingprogress-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';

class ScaneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        console.log('In SceneA.preload');

        var ui = CreateKnob(this, 400, 300).layout();
        this.plugins.get('rexLoadingProgress').add(ui, {
            duration: {
                in: 300,
                out: 300,
            },

            progress: function (gameObject, progress) {
                // Present progress changing
                gameObject.setValue(progress);
            }
        });
        // ui will be destroyed after loading completed

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1000);
        });

        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 1500);
        });

        this.load.rexAwait(function (successCallback, failureCallback) {
            setTimeout(successCallback, 2000);
        });

        this.load.once('complete', function () {
            console.log('SceneA.preload complete')
        });

        this.scene.start('SceneB');
    }

    create() {
        this.add.image(400, 300, 'classroom');
    }

    update() { }
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateKnob = function (scene, x, y) {
    return scene.rexUI.add.knob({
        x: x, y: y,
        width: 300, height: 300,

        space: { left: 20, right: 20, top: 20, bottom: 20 },

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN).setStrokeStyle(1, COLOR_LIGHT),

        trackColor: COLOR_DARK,
        barColor: COLOR_LIGHT,
        // centerColor: COLOR_MAIN,
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

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
        console.log('In SceneB.preload');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        this.load.once('complete', function () {
            console.log('SceneB.preload complete');
        });
    }

    create() {
        this.add.image(400, 300, 'classroom').setAlpha(0.5);
        this.add.text(0, 0, 'SceneB');
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
    scene: [ScaneA, SceneB],
    plugins: {
        global: [
            {
                key: 'rexLoadingProgress',
                plugin: LoadingProgressPlugin,
                start: true
            },
            {
                key: 'rexAwaitLoader',
                plugin: AwaitLoaderPlugin,
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