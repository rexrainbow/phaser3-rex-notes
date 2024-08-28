import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 1024 / 2,
            y: 768 / 2,
            width: 400,
            height: 600,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: CreatePanel(this),

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


        this.add.text(0, 580, 'scale')
            .setInteractive()
            .once('pointerdown', function () {
                scrollablePanel
                    .setScale(0.75)
                    .layout();
            })

    }

    update() { }
}

var CreatePanel = function (scene) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
        }
    })

    for (var i = 0; i < 100; i++) {
        panel
            .add(
                scene.rexUI.add.label({
                    width: 100, height: 45,
                    background: scene.rexUI.add.roundRectangle({ color: COLOR_DARK }),
                    text: scene.add.text(0, 0, i.toString(), { fontSize: 36 })
                })

            )
    }

    return panel;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
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