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

    preload() {
    }

    create() {
        var panel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            width: 200, height: 300,

            scrollMode: 'y',

            panel: {
                child: CreatePanel(this),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({
                    width: 20, radius: 10,
                    color: COLOR_DARK
                }),
                thumb: this.rexUI.add.roundRectangle({
                    radius: 13,
                    color: COLOR_LIGHT,
                }),
            },

            space: {
                slider: 10,
            }
        })
            .layout()

        var print = this.add.text(0, 0, '');
        panel.setChildrenInteractive({
            targets: [
                panel.getElement('panel')
            ]
        })
            .on('child.click', function (child) {
                // child : Label from CreateItem()  
                print.text += `Click ${child.name}`;
                console.log(`Click ${child.name}`);
                if (child.isInTouching('actions[0]')) {
                    print.text += `'s action button`;
                }
                print.text += '\n';
            })
    }

    update() { }
}

var CreatePanel = function (scene) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 5 }
    })

    for (var i = 0; i < 30; i++) {
        panel
            .add(
                CreateItem(scene, i.toString()),
                { expand: true }
            )
    }

    return panel;
}

var CreateItem = function (scene, text) {
    var item = scene.rexUI.add.dialog({
        height: 80,

        space: { left: 10, right: 10, top: 10, bottom: 10 },

        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_MAIN
        }),

        title: scene.rexUI.add.label({
            text: scene.add.text(0, 0, text),
        }),

        content: scene.rexUI.add.label({
            text: scene.add.text(0, 0, 'AAAAAAAA'),
        }),

        actions: [
            scene.rexUI.add.label({
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: scene.rexUI.add.roundRectangle({
                    color: COLOR_DARK
                }),
                text: scene.add.text(0, 0, 'OK'),
            }),
        ],

        proportion: {
            content: 1,
        },

        align: {
            actions: 'right'
        },

        name: text
    })
    return item;
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