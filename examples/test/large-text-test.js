import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var content = [];
        for (var i = 0; i < 100; i++) {
            content.push(i);
        }

        this.print = this.add.text(0, 0, '');
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 220,
            height: 400,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: createPanel(this, content),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var createPanel = function (scene, content) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
    })
        .add(
            scene.add.text(0, 0, 'title', {
                fontSize: '20px'
            }), // child
            0, // proportion
            'left', // align
            0, // paddingConfig
            false // expand
        )
        .add(
            scene.add.text(0, 0, content, {
                fontSize: '20px'
            }), // child
            0, // proportion
            'left', // align
            0, // paddingConfig
            false // expand
        )
        .add(
            scene.add.text(0, 0, 'footer', {
                fontSize: '20px'
            }), // child
            0, // proportion
            'left', // align
            0, // paddingConfig
            false // expand
        )
    return sizer;
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);